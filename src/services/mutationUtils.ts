import { sortEntriesByPubdate } from '@/utils'
import type { Updater, InfiniteData } from '@tanstack/react-query'
import type { Entry, EntryList, FeedCounters } from '@/services/types'

export function createInfiniteEntryAdd(
  entry: Entry
): Updater<
  InfiniteData<EntryList> | undefined,
  InfiniteData<EntryList> | undefined
> {
  return (prevData) => {
    if (!prevData) {
      return undefined
    }

    return {
      pageParams: [],
      pages:
        prevData.pages.map((page) => {
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
            return {
              total: page.total + 1,
              entries: page.entries,
            }
          }

          entries.push(entry)
          entries.sort(sortEntriesByPubdate)

          return {
            total: page.total + 1,
            entries,
          }
        }) ?? [],
    }
  }
}

export function createInfiniteEntryUpdate(
  entry: Entry
): Updater<
  InfiniteData<EntryList> | undefined,
  InfiniteData<EntryList> | undefined
> {
  return (prevData) => {
    if (!prevData) {
      return undefined
    }
    let entryFound = false

    const pages: EntryList[] = []
    for (const page of prevData.pages ?? []) {
      if (entryFound) {
        pages.push(page)
        continue
      }

      const entries = page.entries.map((item) => {
        if (item.id === entry.id) {
          entryFound = true
          return entry
        } else {
          return item
        }
      })
      pages.push({
        total: page.total,
        entries,
      })
    }

    return {
      pageParams: [],
      pages,
    }
  }
}

export function createInfiniteEntryDelete(
  entryId: number
): Updater<
  InfiniteData<EntryList> | undefined,
  InfiniteData<EntryList> | undefined
> {
  return (prevData) => {
    if (!prevData) {
      return undefined
    }

    return {
      pageParams: [],
      pages:
        prevData.pages?.map((page) => {
          const entries = page.entries.filter((item) => item.id !== entryId)
          return {
            total: page.total - 1,
            entries,
          }
        }) ?? [],
    }
  }
}

export function createFeedCountersUpdate(
  entry: Entry
): Updater<FeedCounters | undefined, FeedCounters | undefined> {
  return (prevData) => {
    if (!prevData) {
      return undefined
    }

    const feedId = String(entry.feed_id)
    let newReads = Math.max(prevData.reads[feedId] ?? 0, 0)
    let newUnreads = Math.max(prevData.unreads[feedId] ?? 0, 0)

    if (entry.status === 'read') {
      newReads = newReads + 1
      newUnreads = newUnreads - 1
    } else {
      newReads = newReads - 1
      newUnreads = newUnreads + 1
    }

    return {
      reads: { ...prevData.reads, [feedId]: newReads },
      unreads: { ...prevData.unreads, [feedId]: newUnreads },
    }
  }
}
