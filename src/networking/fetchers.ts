import { request } from './utils'
import type { getFeedEntriesQueryKey } from './keys'
import type * as API from './types'

export function fetchFeeds(): Promise<API.Feed[]> {
  return request<API.Feed[]>('GET', 'v1/feeds')
}

export async function fetchFeedEntries(
  context: API.Context<typeof getFeedEntriesQueryKey>
): Promise<API.Entries> {
  const [, { feedId }] = context.queryKey
  return request<API.Entries>('GET', `v1/feeds/${feedId}/entries`)
}
