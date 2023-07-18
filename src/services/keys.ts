import type { EntryStatus, Entry } from './types'

export function getUserQueryKey() {
  return ['user']
}

export function getFeedsQueryKey({ userId }: { userId: number | null }) {
  return [userId, 'feeds'] as const
}

export function getFeedCountersQueryKey({ userId }: { userId: number | null }) {
  return [userId, 'feedcounters'] as const
}

export function getFeedEntriesInfiniteQueryKey({
  userId,
  feedId,
}: {
  userId: number | null
  feedId: number
}) {
  return [userId, { feedId }] as const
}

export type FetchEntriesOptions = {
  status?: EntryStatus
  starred?: 'true' | 'false'
  order?: keyof Entry
}

export function getEntriesInfiniteQueryKey({
  userId,
  ...options
}: { userId: number | null } & FetchEntriesOptions) {
  return [userId, 'entries', options] as const
}

export function getVersionQueryKey() {
  return ['version'] as const
}
