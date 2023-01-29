import { request } from './utils'
import type { getFeedEntriesQueryKey } from './keys'
import type * as API from './types'

export function fetchFeeds(): Promise<API.Feed[]> {
  return request<API.Feed[]>('GET', 'v1/feeds')
}

export async function fetchFeedEntries(
  context: API.Context<typeof getFeedEntriesQueryKey>
): Promise<API.EntryList> {
  const [, { feedId }] = context.queryKey
  return request<API.EntryList>('GET', `v1/feeds/${feedId}/entries`)
}
