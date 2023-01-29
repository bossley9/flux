import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryFeeds } from './queries'
import { storeItem, StorageKey } from '@/storage'
import { isMinifluxError, isAxiosError } from './errors'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { StackParamList } from '@/_app'
import type { GenericError } from './errors'

type LoginFormData = {
  serverUrl: string
  apiKey: string
}

export function useMutationLogin(
  navigation: NativeStackNavigationProp<StackParamList, 'Login'>
) {
  const queryClient = useQueryClient()

  return useMutation<void, GenericError, LoginFormData>({
    mutationFn: async ({ serverUrl, apiKey }) => {
      if (serverUrl.length === 0 || apiKey.length === 0) {
        throw new Error('Server URL and API key are required.')
      }
      // TODO switch to multi set
      try {
        await storeItem(StorageKey.serverUrl, serverUrl)
      } catch {
        throw new Error(
          'Server URL could not be saved. Check your app permissions and make sure storage is enabled.'
        )
      }
      try {
        await storeItem(StorageKey.apiKey, apiKey)
      } catch {
        throw new Error(
          'API key could not be saved. Check your app permissions and make sure storage is enabled.'
        )
      }

      try {
        await queryClient.fetchQuery({
          queryFn: useQueryFeeds.fetcher,
          queryKey: useQueryFeeds.getKey(),
        })
        navigation.navigate('Profile')
      } catch (e) {
        if (isMinifluxError(e)) {
          const message = e.response.data.error_message
          if (message === 'Access Unauthorized') {
            throw new Error('Invalid login credentials.')
          } else {
            throw new Error(message)
          }
        } else if (isAxiosError(e)) {
          throw new Error(e.message)
        } else {
          throw new Error(JSON.stringify(e))
        }
      }
    },
  })
}
