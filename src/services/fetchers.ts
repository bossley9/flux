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

export async function fetchFeedEntries({
  queryKey,
  signal,
}: API.Context<typeof keys.getFeedEntriesQueryKey>): Promise<API.EntryList> {
  const [, , { feedId }] = queryKey
  const response = await request<Wrapped<API.EntryList>>(
    'GET',
    `v1/feeds/${feedId}/entries`,
    { signal }
  )
  return response.data
}
