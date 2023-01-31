import { useQuery } from '@tanstack/react-query'
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
  })
}
useQueryFeeds.getKey = keys.getFeedsQueryKey
useQueryFeeds.fetcher = fetchers.fetchFeeds

export function useQueryFeedEntries({ feedId }: { feedId: number }) {
  const userId = useUserId()
  return useQuery({
    queryKey: keys.getFeedEntriesQueryKey({ userId, feedId }),
    queryFn: fetchers.fetchFeedEntries,
  })
}

export function useQueryEntries(options?: FetchEntriesOptions) {
  const userId = useUserId()
  const filterOptions: FetchEntriesOptions = {
    direction: 'desc',
    order: 'published_at',
    ...options,
  }
  return useQuery({
    queryKey: keys.getEntriesQueryKey({ userId, ...filterOptions }),
    queryFn: fetchers.fetchEntries,
  })
}
useQueryEntries.getKey = keys.getEntriesQueryKey

export function useQueryVersion() {
  return useQuery({
    queryKey: keys.getVersionQueryKey(),
    queryFn: fetchers.fetchVersion,
  })
}
