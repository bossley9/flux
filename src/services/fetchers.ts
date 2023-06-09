import { request } from './utils'
import { entryLimit } from './constants'
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

export async function fetchFeedCounters({
  signal,
}: API.Context<
  typeof keys.getFeedCountersQueryKey
>): Promise<API.FeedCounters> {
  const response = await request<Wrapped<API.FeedCounters>>(
    'GET',
    'v1/feeds/counters',
    {
      signal,
    }
  )
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
  const [, { feedId }] = queryKey
  const response = await request<Wrapped<API.EntryList>>(
    'GET',
    `v1/feeds/${feedId}/entries?direction=desc&limit=${entryLimit}&offset=${
      pageParam * entryLimit
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

  const response = await request<Wrapped<API.EntryList>>(
    'GET',
    'v1/entries',
    { signal },
    {
      direction: 'desc',
      order: 'published_at',
      ...options,
      limit: String(entryLimit),
      offset: String(pageParam * entryLimit),
    }
  )
  return response.data
}

export async function fetchVersion(): Promise<string> {
  const response = await request<Wrapped<string>>('GET', 'version')
  return response.data
}
