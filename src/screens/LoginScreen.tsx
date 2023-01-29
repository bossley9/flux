import { useRef, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useMutationLogin } from '@/services/mutations'
import type { Screen, ScreenProps } from '@/navigation'

export function LoginScreen({ navigation }: ScreenProps<Screen.Login>) {
  const apiKeyInputRef = useRef<TextInput>(null)
  const [serverUrl, setServerUrl] = useState('https://reader.miniflux.app')
  const [apiKey, setApiKey] = useState('')

  const { error, mutate: login } = useMutationLogin(navigation)

  function handleLogin() {
    login({ serverUrl, apiKey })
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error.message}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Miniflux server URL"
        value={serverUrl}
        onChangeText={setServerUrl}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => apiKeyInputRef.current?.focus()}
      />
      <TextInput
        style={styles.input}
        ref={apiKeyInputRef}
        placeholder="Miniflux API key"
        value={apiKey}
        onChangeText={setApiKey}
        secureTextEntry
        onSubmitEditing={handleLogin}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
