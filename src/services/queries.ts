import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import * as keys from './keys'
import * as fetchers from './fetchers'
import type { FetchEntriesOptions } from './keys'

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
    staleTime: 1000 * 60 * 60 * 24,
  })
}
useQueryFeeds.getKey = keys.getFeedsQueryKey
useQueryFeeds.fetcher = fetchers.fetchFeeds

export function useInfiniteQueryFeedEntries({ feedId }: { feedId: number }) {
  const userId = useUserId()
  const limit = 20
  return useInfiniteQuery({
    queryKey: keys.getFeedEntriesInfiniteQueryKey({ userId, feedId, limit }),
    queryFn: fetchers.fetchInfiniteFeedEntries,
    getNextPageParam: function (firstPage, pages) {
      const total = firstPage.total
      const entriesRendered = pages.length * limit
      return entriesRendered < total ? pages.length : undefined
    },
  })
}

export function useInfiniteQueryEntries(options?: FetchEntriesOptions) {
  const userId = useUserId()
  const batchNum = 20
  const filterOptions: FetchEntriesOptions = {
    direction: 'desc',
    order: 'published_at',
    ...options,
    limit: batchNum,
  }
  return useInfiniteQuery({
    queryKey: keys.getEntriesInfiniteQueryKey({ userId, ...filterOptions }),
    queryFn: fetchers.fetchInfiniteEntries,
    getNextPageParam: function (firstPage, pages) {
      const total = firstPage.total
      const entriesRendered = pages.length * batchNum
      return entriesRendered < total ? pages.length : undefined
    },
  })
}

export function useQueryVersion() {
  return useQuery({
    queryKey: keys.getVersionQueryKey(),
    queryFn: fetchers.fetchVersion,
    placeholderData: '1.0.00',
  })
}
