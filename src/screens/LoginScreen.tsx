import { ScrollScreenContainer } from '@/components/ScrollScreenContainer'
import { useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { ErrorText, Heading, Input, MainButton, P } from '@/html'
import { useMutationLogin } from '@/services/auth'
import { useTheme, type Theme } from '@/theme'

export function LoginScreen() {
  const tokens = useTheme()
  const apiKeyInputRef = useRef<TextInput>(null)
  const [serverUrl, setServerUrl] = useState('https://reader.miniflux.app')
  const [apiKey, setApiKey] = useState('')
  const styles = makeStyles({ tokens })

  const { mutate: login, isLoading, isError, error } = useMutationLogin()

  function handleLogin() {
    login({ serverUrl, apiKey })
  }

  return (
    <ScrollScreenContainer style={styles.container}>
      <Heading align="center">Log In</Heading>
      <View style={styles.form}>
        <Input
          name="Miniflux server URL"
          placeholder="Miniflux server URL"
          value={serverUrl}
          onChangeText={setServerUrl}
          blurOnSubmit={false}
          onSubmitEditing={() => apiKeyInputRef.current?.focus()}
          returnKeyType="next"
        />
        <Input
          name="Miniflux API key"
          ref={apiKeyInputRef}
          placeholder="Miniflux API key"
          value={apiKey}
          onChangeText={setApiKey}
          secureTextEntry
          onSubmitEditing={handleLogin}
        />
      </View>
      <MainButton disabled={isLoading} onPress={handleLogin}>
        Login
      </MainButton>
      {isLoading && <P align="center">Loading...</P>}
      {isError && <ErrorText>{error.message}</ErrorText>}
    </ScrollScreenContainer>
  )
}

type StyleProps = {
  tokens: Theme
}
const makeStyles = ({ tokens }: StyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: tokens.space,
      paddingRight: tokens.space,
    },
    form: {
      padding: tokens.space * 2,
      marginTop: tokens.space * 2,
      marginBottom: tokens.space * 2,
    },
  })
