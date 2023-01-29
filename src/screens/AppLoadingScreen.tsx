import { Text, View } from 'react-native'
import { useEffect } from 'react'
import { getItem, StorageKey } from '@/storage'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { StackParamList } from '@/Index'

type Props = NativeStackScreenProps<StackParamList, 'AppLoading'>

export function AppLoadingScreen({ navigation }: Props) {
  async function readStoredData() {
    try {
      const storedServerUrl = await getItem(StorageKey.serverUrl)
      const storedApiKey = await getItem(StorageKey.apiKey)

      if (storedServerUrl !== null && storedApiKey !== null) {
        navigation.navigate('Profile')
      } else {
        navigation.navigate('Login')
      }
    } catch {
      navigation.navigate('Login')
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
