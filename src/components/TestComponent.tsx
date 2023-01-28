import {useEffect, useState} from 'react'
import {Button, StyleSheet, Text, TextInput} from 'react-native';
import {useQuery} from '@tanstack/react-query'
import {fetchUser} from '../networking/fetchers'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TestComponent() {
  const [serverUrl, setServerUrl] = useState('https://reader.miniflux.app')
  const [apiKey, setApiKey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function handlePress() {
    console.log('authenticating...')
    if (serverUrl.length > 0 && apiKey.length > 0) {
      try {
        await AsyncStorage.setItem('serverUrl', serverUrl)
      } catch {
        console.log('serverUrl could not be saved')
        // saving error
      }
      try {
        await AsyncStorage.setItem('apiKey', apiKey)
      } catch {
        console.log('apiKey could not be saved')
        // saving error
      }
      setIsAuthenticated(true)
      console.log('authenticated')
    }
    else {
      console.log('server url or api key is invalid.')
      // display error
    }
  }

  function handleLogOut() {
    setIsAuthenticated(false)
  }

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: isAuthenticated
  })

  function handleRefetch() {
    refetch()
  }

  async function autofillStoredLoginData() {
    try {
      const storedServerUrl = await AsyncStorage.getItem('serverUrl');
      if (storedServerUrl !== null) {
        setServerUrl(storedServerUrl)
      }
      const storedApiKey = await AsyncStorage.getItem('apiKey');
      if (storedApiKey !== null) {
        setApiKey(storedApiKey)
      }
    } catch {}
  }

  useEffect(() => {
    autofillStoredLoginData()
  }, [])

  return (
    <>
      <Text>This is a test component!</Text>
      {!isAuthenticated && (
        <>
          <TextInput style={styles.input} onChangeText={setServerUrl} value={serverUrl} placeholder="Miniflux server url" />
          <TextInput style={styles.input} onChangeText={setApiKey} value={apiKey} secureTextEntry placeholder="Miniflux API key" />
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
