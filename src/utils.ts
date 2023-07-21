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

export function sortEntriesByDatekey(
  a: Entry,
  b: Entry,
  datekey: 'published_at' | 'changed_at'
) {
  return new Date(b[datekey]).getTime() - new Date(a[datekey]).getTime()
}

export function normalizeTitle(title: string): string {
  const titleMaxLen = 66
  const lineTitle = title.replace(/\n/g, ' ')
  return lineTitle.length > titleMaxLen
    ? lineTitle.slice(0, titleMaxLen).replace(/ $/, '') + '...'
    : lineTitle
}
