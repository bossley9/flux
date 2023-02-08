import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import * as keys from './keys'
import * as fetchers from './fetchers'
import { entryLimit } from './constants'
import type { FetchEntriesOptions } from './keys'

export function useUserId() {
  const { data } = useQueryUser()
  return data?.id ?? null
}

function useQueryUser() {
  return useQuery({
    queryKey: keys.getUserQueryKey(),
    queryFn: fetchers.fetchUser,
  })
}

export function useQueryFeeds() {
  const userId = useUserId()
  return useQuery({
    queryKey: keys.getFeedsQueryKey({ userId }),
    queryFn: fetchers.fetchFeeds,
    staleTime: 1000 * 60 * 60 * 24,
  })
}
useQueryFeeds.getKey = keys.getFeedsQueryKey
useQueryFeeds.fetcher = fetchers.fetchFeeds

export function useQueryFeedCounters() {
  const userId = useUserId()
  return useQuery({
    queryKey: keys.getFeedCountersQueryKey({ userId }),
    queryFn: fetchers.fetchFeedCounters,
  })
}

export function useInfiniteQueryFeedEntries({ feedId }: { feedId: number }) {
  const userId = useUserId()
  return useInfiniteQuery({
    queryKey: keys.getFeedEntriesInfiniteQueryKey({
      userId,
      feedId,
    }),
    queryFn: fetchers.fetchInfiniteFeedEntries,
    getNextPageParam: function (firstPage, pages) {
      if (!firstPage) {
        return true
      }
      const total = firstPage.total
      const entriesRendered = pages.length * entryLimit
      return entriesRendered < total ? pages.length : undefined
    },
    enabled: userId !== null,
  })
}

export function useInfiniteQueryEntries(options?: FetchEntriesOptions) {
  const userId = useUserId()
  return useInfiniteQuery({
    queryKey: keys.getEntriesInfiniteQueryKey({ userId, ...options }),
    queryFn: fetchers.fetchInfiniteEntries,
    getNextPageParam: function (firstPage, pages) {
      if (!firstPage) {
        return true
      }
      const total = firstPage.total
      const entriesRendered = pages.length * entryLimit
      return entriesRendered < total ? pages.length : undefined
    },
    enabled: userId !== null,
  })
}

export function useQueryVersion() {
  return useQuery({
    queryKey: keys.getVersionQueryKey(),
    queryFn: fetchers.fetchVersion,
    placeholderData: '1.0.00',
  })
}
