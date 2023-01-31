import { useQuery } from '@tanstack/react-query'
import {
  getUserQueryKey,
  getFeedsQueryKey,
  getReadEntriesQueryKey,
  getFeedEntriesQueryKey,
} from './keys'
import {
  fetchUser,
  fetchFeeds,
  fetchReadEntries,
  fetchFeedEntries,
} from './fetchers'
import type { Feed } from './types'

export function useUserId() {
  const { data } = useQueryUser()
  return data?.id ?? null
}

export function useQueryUser() {
  return useQuery({
    queryKey: getUserQueryKey(),
    queryFn: fetchUser,
  })
}
useQueryUser.getKey = getUserQueryKey
useQueryUser.fetcher = fetchUser

export function useQueryFeeds() {
  const userId = useUserId()
  return useQuery({
    queryKey: getFeedsQueryKey({ userId }),
    queryFn: fetchFeeds,
  })
}
useQueryFeeds.getKey = getFeedsQueryKey
useQueryFeeds.fetcher = fetchFeeds

export function useQueryFeedEntries(feed: Feed) {
  const userId = useUserId()
  return useQuery({
    queryKey: getFeedEntriesQueryKey({ userId, feedId: feed.id }),
    queryFn: fetchFeedEntries,
  })
}
useQueryFeedEntries.getKey = getFeedEntriesQueryKey
useQueryFeedEntries.fetcher = fetchFeedEntries

export function useQueryReadEntries() {
  const userId = useUserId()
  return useQuery({
    queryKey: getReadEntriesQueryKey({ userId }),
    queryFn: fetchReadEntries,
  })
}
useQueryReadEntries.getKey = getReadEntriesQueryKey
