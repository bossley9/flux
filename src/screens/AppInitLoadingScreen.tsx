import { ScreenContainer } from '@/components/ScreenContainer'
import { useEffect } from 'react'
import { getItem, StorageKey } from '@/storage'
import { Screen, ScreenProps } from '@/navigation'

export function AppInitLoadingScreen({
  navigation,
}: ScreenProps<Screen.AppInitLoading>) {
  async function readStoredData() {
    try {
      const storedServerUrl = await getItem(StorageKey.serverUrl)
      const storedApiKey = await getItem(StorageKey.apiKey)

      if (storedServerUrl !== null && storedApiKey !== null) {
        navigation.replace(Screen.Unread)
      } else {
        navigation.replace(Screen.Login)
      }
    } catch {
      navigation.replace(Screen.Login)
    }
  }

  useEffect(() => {
    readStoredData()
  }, [])

  return <ScreenContainer />
}
