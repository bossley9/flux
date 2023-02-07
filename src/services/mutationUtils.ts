import { sortEntriesByPubdate } from '@/utils'
import type { Updater, InfiniteData } from '@tanstack/react-query'
import type { Entry, EntryList } from '@/services/types'

export function createInfiniteEntryAdd(
  entry: Entry
): Updater<
  InfiniteData<EntryList> | undefined,
  InfiniteData<EntryList> | undefined
> {
  return (prevData) => ({
    pageParams: [],
    pages:
      prevData?.pages.map((page) => {
        const entries = page.entries
        // because entries are sorted by publish date (newest to oldest),
        // we can assume that if the entry's publish date is newer than the
        // oldest entry's publish date, it belongs in this page.
        const pagePublishDate = new Date(
          entries[entries.length - 1].published_at
        )
        const entryPublishDate = new Date(entry.published_at)
        const belongsInPage =
          entryPublishDate.getTime() - pagePublishDate.getTime() > 0

        if (!belongsInPage) {
          return page
        }

        entries.push(entry)
        entries.sort(sortEntriesByPubdate)

        return {
          total: entries.length,
          entries,
        }
      }) ?? [],
  })
}

export function createInfiniteEntryDelete(
  entryId: number
): Updater<
  InfiniteData<EntryList> | undefined,
  InfiniteData<EntryList> | undefined
> {
  return (prevData) => ({
    pageParams: [],
    pages:
      prevData?.pages?.map((page) => {
        const entries = page.entries.filter((item) => item.id !== entryId)
        return {
          total: entries.length,
          entries,
        }
      }) ?? [],
  })
}
