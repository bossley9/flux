import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getServerUrl() {
  const storedServerUrl = await AsyncStorage.getItem('serverUrl');
  return storedServerUrl ?? ''
}

async function getApiKey() {
  const storedApiKey = await AsyncStorage.getItem('apiKey');
  return storedApiKey ?? ''
}

export async function getHeaders(): Promise<RequestInit['headers']> {
  return {
    "User-Agent": "Miniflux Client Library",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Auth-Token": await getApiKey(),
  }
}
