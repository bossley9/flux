import { getItem, StorageKey } from '@/storage'

async function getHeaders(): Promise<RequestInit['headers']> {
  const apiKey = (await getItem(StorageKey.apiKey)) ?? ''
  return {
    'User-Agent': 'Miniflux Client Library',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Auth-Token': apiKey,
  }
}

export async function request<T>(
  method: RequestInit['method'],
  path: string
): Promise<T> {
  const serverUrl = (await getItem(StorageKey.serverUrl)) ?? ''
  const headers = await getHeaders()
  const url = serverUrl.replace(/\/$/, '') + '/' + path

  const options: RequestInit = {
    method,
    headers,
  }
  return fetch(url, options).then((res) => res.json())
}
