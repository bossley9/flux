import { ScreenContainer } from '@/components/ScreenContainer'
import { useRef, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useMutationLogin } from '@/services/mutations'

export function LoginScreen() {
  const apiKeyInputRef = useRef<TextInput>(null)
  const [serverUrl, setServerUrl] = useState('https://reader.miniflux.app')
  const [apiKey, setApiKey] = useState('')

  const { error, mutate: login } = useMutationLogin()

  function handleLogin() {
    login({ serverUrl, apiKey })
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text>Log in</Text>
        <View>
          <Text>Miniflux server URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Miniflux server URL"
            value={serverUrl}
            onChangeText={setServerUrl}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => apiKeyInputRef.current?.focus()}
          />
        </View>
        <View>
          <Text>Miniflux API key</Text>
          <TextInput
            style={styles.input}
            ref={apiKeyInputRef}
            placeholder="Miniflux API key"
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
            onSubmitEditing={handleLogin}
          />
        </View>
        <Button title="Login" onPress={handleLogin} />
        {error && <Text style={styles.error}>{error.message}</Text>}
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    padding: 10,
  },
})
