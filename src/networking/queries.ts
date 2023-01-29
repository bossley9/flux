import { useQuery } from '@tanstack/react-query'
import { fetchEntries } from './fetchers'
import { getFeedEntriesQueryKey } from './keys'
import type { Feed } from './types'

export function useQueryEntries(feed: Feed | null) {
  return useQuery({
    queryKey: getFeedEntriesQueryKey({ feedId: feed?.id ?? 0 }),
    queryFn: fetchEntries,
    enabled: Boolean(feed),
  })
}
