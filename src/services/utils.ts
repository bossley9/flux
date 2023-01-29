import axios from 'axios'
import { getItem, StorageKey } from '@/storage'

async function getHeaders(): Promise<Record<string, string>> {
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

  return axios.request({
    method,
    url,
    headers,
  })
}
