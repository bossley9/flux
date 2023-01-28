import {useState} from 'react'
import {Button, StyleSheet, Text, TextInput} from 'react-native';
import {useQuery} from '@tanstack/react-query'

export function TestComponent() {
  const [serverUrl, setServerUrl] = useState('https://reader.miniflux.app')
  const [apiKey, setApiKey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function handlePress() {
    setIsAuthenticated(true)
  }

  function handleLogOut() {
    setIsAuthenticated(false)
  }

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const options: RequestInit = {
        method: 'GET',
        headers: {
          "User-Agent": "Miniflux Client Library",
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-Auth-Token": apiKey,
        },
      }

      return await fetch(serverUrl + '/v1/me', options)
        .then(res => res.json())
    },
    enabled: isAuthenticated
  })

  function handleRefetch() {
    refetch()
  }

  return (
    <>
      <Text>This is a test component!</Text>
      {!isAuthenticated && (
        <>
          <TextInput style={styles.input} onChangeText={setServerUrl} value={serverUrl} placeholder="Miniflux server url" />
          <TextInput style={styles.input} onChangeText={setApiKey} value={apiKey} placeholder="Miniflux API key" />
          <Button title="login" onPress={handlePress} />
        </>
      )}
      {isAuthenticated && (
        <>
          {isLoading ? <Text>fetching data...</Text> : <Text>data is {JSON.stringify(data)}</Text>}
          <Button title="fetch again" onPress={handleRefetch} />
          <Button title="reset" onPress={handleLogOut} />
        </>
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
