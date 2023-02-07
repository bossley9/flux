import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserId } from './queries'
import {
  createInfiniteEntryAdd,
  createInfiniteEntryDelete,
  createInfiniteEntryUpdate,
} from './mutationUtils'
import * as keys from './keys'
import { request } from './utils'
import type { Entry } from './types'

export function useMutationToggleStar() {
  const queryClient = useQueryClient()
  const userId = useUserId()
  return useMutation({
    mutationFn: function (entry: Entry) {
      return request<void>('PUT', `v1/entries/${entry.id}/bookmark`)
    },
    onSettled: function (_data, _error, entry) {
      const newEntry: Entry = { ...entry, starred: !entry.starred }
      if (entry.starred) {
        queryClient.setQueryData(
          keys.getEntriesInfiniteQueryKey({ userId, starred: 'true' }),
          createInfiniteEntryDelete(entry.id)
        )
      } else {
        queryClient.setQueryData(
          keys.getEntriesInfiniteQueryKey({ userId, starred: 'true' }),
          createInfiniteEntryAdd(newEntry)
        )
      }

      if (entry.status === 'unread') {
        queryClient.setQueryData(
          keys.getEntriesInfiniteQueryKey({ userId, status: 'unread' }),
          createInfiniteEntryUpdate(newEntry)
        )
      } else {
        queryClient.setQueryData(
          keys.getEntriesInfiniteQueryKey({ userId, status: 'read' }),
          createInfiniteEntryUpdate(newEntry)
        )
      }

      // invalidate remaining
      queryClient.invalidateQueries([userId, { feedId: entry.feed_id }])
    },
  })
}

export function useMutationRefreshFeed() {
  const queryClient = useQueryClient()
  const userId = useUserId()
  return useMutation({
    mutationFn: function (feedId: number) {
      return request<void>('PUT', `v1/feeds/${feedId}/refresh`)
    },
    onSettled: function (_data, _error, feedId) {
      queryClient.invalidateQueries(keys.getFeedCountersQueryKey({ userId }))
      queryClient.invalidateQueries([userId, { feedId }])
      // invalidate all filtered entries queries
      const [, entriesKey] = keys.getEntriesInfiniteQueryKey({ userId })
      queryClient.invalidateQueries([userId, entriesKey])
    },
  })
}

export function useMutationToggleEntryRead() {
  const queryClient = useQueryClient()
  const userId = useUserId()
  return useMutation({
    mutationFn: function (entry: Entry) {
      return request<void>('PUT', 'v1/entries', {
        data: {
          entry_ids: [entry.id],
          status: entry.status === 'unread' ? 'read' : 'unread',
        },
      })
    },
    onSettled: function (_data, _error, entry) {
      queryClient.invalidateQueries(keys.getFeedCountersQueryKey({ userId }))
      queryClient.invalidateQueries([userId, { feedId: entry.feed_id }])
      // invalidate all filtered entries queries
      const [user, entriesKey] = keys.getEntriesInfiniteQueryKey({ userId })
      queryClient.invalidateQueries([user, entriesKey])
    },
  })
}
