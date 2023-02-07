import moment from 'moment'
import type { Entry, EntryList } from '@/services/types'

export function formatPubDate(dateStr: string): string {
  const lastWeek = new Date()
  lastWeek.setDate(lastWeek.getDate() - 7)

  const pubDate = new Date(dateStr)
  const pubMoment = moment(pubDate)

  const isOutdated = pubDate.getTime() - lastWeek.getTime() < 0

  return isOutdated ? pubMoment.format('MMM DD YYYY') : pubMoment.fromNow()
}

export function flattenEntryLists(entryLists: EntryList[]): EntryList {
  if (entryLists.length === 0) {
    return { total: 0, entries: [] }
  }

  const entries =
    entryLists.reduce<Entry[]>((acc, val) => [...acc, ...val.entries], []) ?? []

  return {
    total: entryLists[0].total,
    entries,
  }
}

export function sortEntriesByPubdate(a: Entry, b: Entry) {
  return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
}
