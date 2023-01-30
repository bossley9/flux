import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useUserId, useQueryFeeds, useQueryFeedEntries } from './queries'
import { fetchUnreadFeedEntries } from './fetchers'
import { getUnreadEntriesQueryKey } from './keys'
import type { EntryList, Entry } from './types'

function sortEntriesByDate(a: Entry, b: Entry) {
  const timeA = new Date(a.published_at).getTime()
  const timeB = new Date(b.published_at).getTime()

  if (timeB > timeA) return 1
  if (timeA > timeB) return -1
  return 0
}

export function useQueryUnreadEntries() {
  const queryClient = useQueryClient()
  const userId = useUserId()

  async function fetchUnreadEntries() {
    const feeds = await queryClient.fetchQuery({
      queryKey: useQueryFeeds.getKey({ userId }),
      queryFn: useQueryFeeds.fetcher,
    })

    const entryListPromises: Promise<EntryList>[] = []
    feeds.forEach(({ id: feedId }) => {
      entryListPromises.push(
        queryClient.fetchQuery({
          queryKey: useQueryFeedEntries.getKey({ userId, feedId }),
          queryFn: fetchUnreadFeedEntries,
        })
      )
    })
    // TODO asynchronously return entries
    const entryLists = await Promise.all(entryListPromises)

    let entries: Entry[] = []

    entryLists.forEach((entryList, i) => {
      const unreadEntries = entryList.entries.map((entry) => ({
        ...entry,
        author: feeds[i].title,
      }))
      entries = entries.concat(unreadEntries)
    })

    return entries.sort(sortEntriesByDate)
  }

  // TODO replace with useInfiniteQuery for paging
  return useQuery({
    queryKey: getUnreadEntriesQueryKey({ userId }),
    queryFn: fetchUnreadEntries,
  })
}
