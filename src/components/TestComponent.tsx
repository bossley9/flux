import {useEffect, useState} from 'react'
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackParamList} from '../../_app'

export function TestComponent({navigation}: NativeStackScreenProps<StackParamList, 'Login'>) {
  const [serverUrl, setServerUrl] = useState('https://reader.miniflux.app')
  const [apiKey, setApiKey] = useState('')

  async function handlePress() {
    // console.log('authenticating...')
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
      // console.log('authenticated')
      navigation.navigate('Profile')
    }
    else {
      // console.log('server url or api key is invalid.')
      // display error
    }
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
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text>This is a test component!</Text>
        <TextInput style={styles.input} onChangeText={setServerUrl} value={serverUrl} placeholder="Miniflux server url" />
        <TextInput style={styles.input} onChangeText={setApiKey} value={apiKey} secureTextEntry placeholder="Miniflux API key" />
        <Button title="login" onPress={handlePress} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
