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
      const [user, entriesKey] = keys.getEntriesQueryKey({ userId })
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
      queryClient.invalidateQueries(
        keys.getFeedEntriesQueryKey({ userId, feedId })
      )
      // invalidate all filtered entries queries
      const [user, entriesKey] = keys.getEntriesQueryKey({ userId })
      queryClient.invalidateQueries([user, entriesKey])
    },
  })
}
