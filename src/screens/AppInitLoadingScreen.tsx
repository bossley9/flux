import { Text, View } from 'react-native'
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
        navigation.navigate(Screen.Unread)
      } else {
        navigation.navigate(Screen.Login)
      }
    } catch {
      navigation.navigate(Screen.Login)
    }
  }

  useEffect(() => {
    readStoredData()
  }, [])

  return (
    <View>
      <Text>loading...</Text>
    </View>
  )
}
