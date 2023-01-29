import { useQuery } from '@tanstack/react-query'
import { getFeedsQueryKey, getFeedEntriesQueryKey } from './keys'
import { fetchFeeds, fetchFeedEntries } from './fetchers'
import type { Feed } from './types'

export function useQueryFeeds() {
  return useQuery({
    queryKey: getFeedsQueryKey(),
    queryFn: fetchFeeds,
  })
}

export function useQueryFeedEntries(feed: Feed) {
  return useQuery({
    queryKey: getFeedEntriesQueryKey({ feedId: feed.id }),
    queryFn: fetchFeedEntries,
  })
}
