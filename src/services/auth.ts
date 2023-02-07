import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserId } from './queries'
import { useNavigation } from '@react-navigation/native'
import { storeItems, removeItems, StorageKey } from '@/storage'
import { isMinifluxError, isAxiosError } from './errors'
import * as fetchers from './fetchers'
import * as keys from './keys'
import { RootScreen, RootScreenNavigationProp } from '@/navigation'
import type { GenericError } from './errors'

type LoginFormData = {
  serverUrl: string
  apiKey: string
}

export function useMutationLogin() {
  const queryClient = useQueryClient()
  const navigation = useNavigation<RootScreenNavigationProp<RootScreen.Login>>()

  return useMutation<void, GenericError, LoginFormData>({
    mutationFn: async ({ serverUrl, apiKey }) => {
      if (serverUrl.length === 0 || apiKey.length === 0) {
        throw new Error('Server URL and API key are both required.')
      }

      try {
        await storeItems({
          [StorageKey.serverUrl]: serverUrl,
          [StorageKey.apiKey]: apiKey,
        })
      } catch {
        throw new Error(
          'Server URL and API key could not be saved. Check your app permissions and make sure storage is enabled.'
        )
      }

      try {
        // keep fetchQuery to catch errors
        await queryClient.fetchQuery({
          queryFn: fetchers.fetchUser,
          queryKey: keys.getUserQueryKey(),
        })
        navigation.replace(RootScreen.Main)
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

export function useMutationLogout() {
  const queryClient = useQueryClient()
  const userId = useUserId()
  const navigation = useNavigation<RootScreenNavigationProp<RootScreen.Main>>()

  return useMutation({
    mutationFn: async () => {
      navigation.replace(RootScreen.Login)

      await removeItems([StorageKey.serverUrl, StorageKey.apiKey])

      // remove all queries from cache
      queryClient.removeQueries({ queryKey: keys.getUserQueryKey() })
      queryClient.removeQueries({ queryKey: keys.getVersionQueryKey() })
      queryClient.removeQueries({ queryKey: [userId] })
    },
  })
}
