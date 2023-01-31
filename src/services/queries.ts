import { useQuery } from '@tanstack/react-query'
import * as keys from './keys'
import * as fetchers from './fetchers'
import type { FetchEntriesOptions } from './keys'
import type { Feed } from './types'

export function useUserId() {
  const { data } = useQueryUser()
  return data?.id ?? null
}

export function useQueryUser() {
  return useQuery({
    queryKey: keys.getUserQueryKey(),
    queryFn: fetchers.fetchUser,
  })
}
useQueryUser.getKey = keys.getUserQueryKey
useQueryUser.fetcher = fetchers.fetchUser

export function useQueryFeeds() {
  const userId = useUserId()
  return useQuery({
    queryKey: keys.getFeedsQueryKey({ userId }),
    queryFn: fetchers.fetchFeeds,
  })
}
useQueryFeeds.getKey = keys.getFeedsQueryKey
useQueryFeeds.fetcher = fetchers.fetchFeeds

export function useQueryEntries(options?: FetchEntriesOptions) {
  const userId = useUserId()
  const filterOptions: FetchEntriesOptions = {
    direction: 'desc',
    ...options,
  }
  return useQuery({
    queryKey: keys.getEntriesQueryKey({ userId, ...filterOptions }),
    queryFn: fetchers.fetchEntries,
  })
}
useQueryEntries.getKey = keys.getEntriesQueryKey

export function useQueryFeedEntries(feed: Feed) {
  const userId = useUserId()
  return useQuery({
    queryKey: keys.getFeedEntriesQueryKey({ userId, feedId: feed.id }),
    queryFn: fetchers.fetchFeedEntries,
  })
}
useQueryFeedEntries.getKey = keys.getFeedEntriesQueryKey
useQueryFeedEntries.fetcher = fetchers.fetchFeedEntries

export function useQueryReadEntries() {
  const userId = useUserId()
  return useQuery({
    queryKey: keys.getReadEntriesQueryKey({ userId }),
    queryFn: fetchers.fetchReadEntries,
  })
}
useQueryReadEntries.getKey = keys.getReadEntriesQueryKey
