import AsyncStorage from '@react-native-async-storage/async-storage'

export enum StorageKey {
  serverUrl = 'serverUrl',
  apiKey = 'apiKey',
}

export async function getItem(key: StorageKey) {
  return AsyncStorage.getItem(key)
}

export async function storeItems(items: Partial<Record<StorageKey, string>>) {
  return AsyncStorage.multiSet(Object.entries(items))
}

export async function removeItems(keys: StorageKey[]) {
  return AsyncStorage.multiRemove(keys)
}
