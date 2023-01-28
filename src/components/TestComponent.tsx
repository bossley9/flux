import {useState} from 'react'
import {Button, StyleSheet, Text, TextInput} from 'react-native';
import {useQuery} from '@tanstack/react-query'

function basicAuth(username: string, password: string): string {
  const auth = username + ":" + password
  const Buffer = require("buffer").Buffer;
  return new Buffer(auth).toString("base64");
}

export function TestComponent() {
  const [serverUrl, setServerUrl] = useState('https://reader.miniflux.app')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function handlePress() {
    setIsAuthenticated(true)
  }

  const {data, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const options: RequestInit = {
        method: 'GET',
        headers: {
          "User-Agent": "Miniflux Client Library",
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Basic " + basicAuth(username, password)
        },
      }

      return await fetch(serverUrl + '/v1/me', options)
        .then(res => res.json())
    },
    enabled: isAuthenticated
  })

  return (
    <>
      <Text>This is a test component!</Text>
      {!isAuthenticated && (
        <>
          <TextInput style={styles.input} onChangeText={setServerUrl} value={serverUrl} />
          <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder="username" />
          <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="password" />
          <Button title="login" onPress={handlePress} />
        </>
      )}
      {isAuthenticated && (
        isLoading ? <Text>fetching data...</Text> : <Text>data is {JSON.stringify(data)}</Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
