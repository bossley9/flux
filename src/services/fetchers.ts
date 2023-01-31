import { request } from './utils'
import type * as keys from './keys'
import type * as API from './types'

type Wrapped<T> = { data: T }

export async function fetchUser({
  signal,
}: API.Context<typeof keys.getUserQueryKey>): Promise<API.User> {
  const response = await request<Wrapped<API.User>>('GET', 'v1/me', {
    signal,
  })
  return response.data
}

export async function fetchFeeds({
  signal,
}: API.Context<typeof keys.getFeedsQueryKey>): Promise<API.Feed[]> {
  const response = await request<Wrapped<API.Feed[]>>('GET', 'v1/feeds', {
    signal,
  })
  return response.data
}

export async function fetchEntries({
  queryKey,
  signal,
}: API.Context<typeof keys.getEntriesQueryKey>): Promise<API.EntryList> {
  const [, , options] = queryKey

  const response = await request<Wrapped<API.EntryList>>(
    'GET',
    'v1/entries',
    { signal },
    options
  )
  return response.data
}

export async function fetchVersion(): Promise<string> {
  const response = await request<Wrapped<string>>('GET', 'version')
  return response.data
}
