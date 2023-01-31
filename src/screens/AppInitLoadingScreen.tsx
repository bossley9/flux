import { ScreenContainer } from '@/components/ScreenContainer'
import { useEffect } from 'react'
import { getItem, StorageKey } from '@/storage'
import { RootScreen, RootScreenProps } from '@/navigation'

export function AppInitLoadingScreen({
  navigation,
}: RootScreenProps<RootScreen.AppInitLoading>) {
  async function readStoredData() {
    try {
      const storedServerUrl = await getItem(StorageKey.serverUrl)
      const storedApiKey = await getItem(StorageKey.apiKey)

      if (storedServerUrl !== null && storedApiKey !== null) {
        navigation.replace(RootScreen.Main)
      } else {
        navigation.replace(RootScreen.Login)
      }
    } catch {
      navigation.replace(RootScreen.Login)
    }
  }

  useEffect(() => {
    readStoredData()
  }, [])

  return <ScreenContainer />
}
