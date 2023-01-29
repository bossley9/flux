import { request } from './utils'
import type { getFeedEntriesQueryKey } from './keys'
import type * as API from './types'

type Wrapped<T> = { data: T }

export async function fetchUser(): Promise<API.User> {
  const response = await request<Wrapped<API.User>>('GET', 'v1/me')
  return response.data
}

export async function fetchFeeds(): Promise<API.Feed[]> {
  const response = await request<Wrapped<API.Feed[]>>('GET', 'v1/feeds')
  return response.data
}

export async function fetchFeedEntries(
  context: API.Context<typeof getFeedEntriesQueryKey>
): Promise<API.EntryList> {
  const [, , { feedId }] = context.queryKey
  const response = await request<Wrapped<API.EntryList>>(
    'GET',
    `v1/feeds/${feedId}/entries`
  )
  return response.data
}
