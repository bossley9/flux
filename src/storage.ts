import AsyncStorage from '@react-native-async-storage/async-storage'

export enum StorageKey {
  serverUrl = 'serverUrl',
  apiKey = 'apiKey',
}

export async function getItem(key: StorageKey) {
  return AsyncStorage.getItem(key)
}

export async function storeItem(key: StorageKey, value: string) {
  return AsyncStorage.setItem(key, value)
}

export async function removeItem(key: StorageKey) {
  return AsyncStorage.removeItem(key)
}
