import AsyncStorage from '@react-native-async-storage/async-storage';

async function getServerUrl() {
  const storedServerUrl = await AsyncStorage.getItem('serverUrl');
  return storedServerUrl ?? ''
}

async function getApiKey() {
  const storedApiKey = await AsyncStorage.getItem('apiKey');
  return storedApiKey ?? ''
}

async function getHeaders(): Promise<RequestInit['headers']> {
  return {
    "User-Agent": "Miniflux Client Library",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Auth-Token": await getApiKey(),
  }
}

export async function request<T>(method: RequestInit['method'], path: string): Promise<T> {
  const serverUrl = await getServerUrl()
  const headers = await getHeaders()
  const url = serverUrl.replace(/\/$/, '') + '/' + path

  const options: RequestInit = {
    method,
    headers
  }
  return fetch(url, options).then(res => res.json())
}

