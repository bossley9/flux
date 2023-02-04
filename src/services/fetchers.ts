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

export async function fetchInfiniteFeedEntries({
  queryKey,
  signal,
  pageParam = 0,
}: API.Context<
  typeof keys.getFeedEntriesInfiniteQueryKey,
  number
>): Promise<API.EntryList> {
  const [, { feedId, limit }] = queryKey
  const response = await request<Wrapped<API.EntryList>>(
    'GET',
    `v1/feeds/${feedId}/entries?direction=desc&limit=${limit}&offset=${
      pageParam * limit
    }`,
    { signal }
  )
  return response.data
}

export async function fetchInfiniteEntries({
  queryKey,
  signal,
  pageParam = 0,
}: API.Context<
  typeof keys.getEntriesInfiniteQueryKey,
  number
>): Promise<API.EntryList> {
  const [, , options] = queryKey
  const { limit = 0, ...restOptions } = options

  const response = await request<Wrapped<API.EntryList>>(
    'GET',
    'v1/entries',
    { signal },
    {
      ...restOptions,
      limit: String(limit),
      offset: String(pageParam * limit),
    }
  )
  return response.data
}

export async function fetchVersion(): Promise<string> {
  const response = await request<Wrapped<string>>('GET', 'version')
  return response.data
}
