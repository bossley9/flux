import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserId } from './queries'
import {
  createFeedCountersUpdate,
  createInfiniteEntryAdd,
  createInfiniteEntryDelete,
  createInfiniteEntryUpdate,
} from './mutationUtils'
import * as keys from './keys'
import { request } from './utils'
import type { Feed, Entry, EntryStatus } from './types'

export function useMutationToggleStar() {
  const queryClient = useQueryClient()
  const userId = useUserId()
  return useMutation({
    mutationFn: function (entry: Entry) {
      return request<void>('PUT', `v1/entries/${entry.id}/bookmark`)
    },
    onMutate: function (entry) {
      const newEntry: Entry = {
        ...entry,
        starred: !entry.starred,
        changed_at: new Date().toISOString(),
      }
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

      queryClient.setQueryData(
        keys.getFeedEntriesInfiniteQueryKey({ userId, feedId: entry.feed_id }),
        createInfiniteEntryUpdate(newEntry)
      )
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

type SetEntryReadProps = {
  entry: Entry
  newStatus: EntryStatus
}
export function useMutationSetEntryRead() {
  const queryClient = useQueryClient()
  const userId = useUserId()
  return useMutation({
    mutationFn: function ({ entry, newStatus }: SetEntryReadProps) {
      return request<void>('PUT', 'v1/entries', {
        data: {
          entry_ids: [entry.id],
          status: newStatus,
        },
      })
    },
    onMutate: function ({ entry, newStatus }) {
      const newEntry: Entry = {
        ...entry,
        status: newStatus,
        changed_at: new Date().toISOString(),
      }

      queryClient.setQueryData(
        keys.getFeedEntriesInfiniteQueryKey({ userId, feedId: entry.feed_id }),
        createInfiniteEntryUpdate(newEntry)
      )

      queryClient.setQueryData(
        keys.getFeedCountersQueryKey({ userId }),
        createFeedCountersUpdate(newEntry)
      )

      queryClient.setQueryData(
        keys.getEntriesInfiniteQueryKey({ userId, starred: 'true' }),
        createInfiniteEntryUpdate(newEntry)
      )

      if (newStatus === 'read') {
        queryClient.setQueryData(
          keys.getEntriesInfiniteQueryKey({
            userId,
            status: 'read',
            order: 'changed_at',
          }),
          createInfiniteEntryAdd(newEntry, 'changed_at')
        )
        queryClient.setQueryData(
          keys.getEntriesInfiniteQueryKey({ userId, status: 'unread' }),
          createInfiniteEntryDelete(entry.id)
        )
      } else {
        queryClient.setQueryData(
          keys.getEntriesInfiniteQueryKey({ userId, status: 'unread' }),
          createInfiniteEntryAdd(newEntry)
        )
        queryClient.setQueryData(
          keys.getEntriesInfiniteQueryKey({
            userId,
            status: 'read',
            order: 'changed_at',
          }),
          createInfiniteEntryDelete(entry.id)
        )
      }
    },
  })
}

export function useMutationMarkAllRead() {
  const queryClient = useQueryClient()
  const userId = useUserId()

  return useMutation({
    mutationFn: function (feedId: number) {
      return request<void>('PUT', `v1/feeds/${feedId}/mark-all-as-read`)
    },
    onSuccess: function (_data, feedId) {
      queryClient.invalidateQueries({
        queryKey: keys.getFeedEntriesInfiniteQueryKey({
          userId,
          feedId,
        }),
      })
      queryClient.invalidateQueries({
        queryKey: keys.getFeedCountersQueryKey({ userId }),
      })
    },
  })
}

type UpdateFeedProps = Partial<Feed> & Pick<Feed, 'id'>
export function useMutationUpdateFeed() {
  const queryClient = useQueryClient()
  const userId = useUserId()

  return useMutation({
    mutationFn: function ({ id, ...props }: UpdateFeedProps) {
      return request<void>('PUT', `v1/feeds/${id}`, {
        data: props,
      })
    },
    onSuccess: function () {
      queryClient.invalidateQueries({
        queryKey: keys.getFeedsQueryKey({ userId }),
      })
    },
  })
}
