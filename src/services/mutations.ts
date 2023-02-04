import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUserId } from './queries'
import * as keys from './keys'
import { request } from './utils'

export function useMutationToggleStar() {
  const queryClient = useQueryClient()
  const userId = useUserId()
  return useMutation({
    mutationFn: function (entryId: number) {
      return request<void>('PUT', `v1/entries/${entryId}/bookmark`)
    },
    onSettled: function () {
      // invalidate all filtered entries queries
      const [user, entriesKey] = keys.getEntriesInfiniteQueryKey({ userId })
      queryClient.invalidateQueries([user, entriesKey])
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
      queryClient.invalidateQueries([userId, { feedId }])
      // invalidate all filtered entries queries
      const [, entriesKey] = keys.getEntriesInfiniteQueryKey({ userId })
      queryClient.invalidateQueries([userId, entriesKey])
    },
  })
}

type SetReadMutationProps = {
  entryId: number
  read: boolean
}

export function useMutationSetEntryRead() {
  const queryClient = useQueryClient()
  const userId = useUserId()
  return useMutation({
    mutationFn: function ({ entryId, read }: SetReadMutationProps) {
      return request<void>('PUT', 'v1/entries', {
        data: {
          entry_ids: [entryId],
          status: read ? 'read' : 'unread',
        },
      })
    },
    onSettled: function () {
      // invalidate all filtered entries queries
      const [user, entriesKey] = keys.getEntriesInfiniteQueryKey({ userId })
      queryClient.invalidateQueries([user, entriesKey])
    },
  })
}
