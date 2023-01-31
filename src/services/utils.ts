import axios, { AxiosRequestConfig } from 'axios'
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

export function constructURL(
  baseURL: string,
  path: string,
  queryStringParams?: Record<string, string | undefined>
): string {
  let queryString = ''

  if (queryStringParams) {
    queryString = Object.entries(queryStringParams).reduce(
      (acc, [key, value], i) => {
        if (!value) return acc
        const prefix = i === 0 ? '?' : '&'
        return acc + prefix + key + '=' + value
      },
      ''
    )
  }

  return baseURL.replace(/\/$/, '') + '/' + path + queryString
}

export async function request<T>(
  method: RequestInit['method'],
  path: string,
  options?: Partial<AxiosRequestConfig>,
  queryStringParams?: Record<string, string | undefined>
): Promise<T> {
  const serverUrl = (await getItem(StorageKey.serverUrl)) ?? ''
  const headers = await getHeaders()
  const url = constructURL(serverUrl, path, queryStringParams)

  console.log({ url })
  return axios.request({
    ...options,
    method,
    url,
    headers,
  })
}
