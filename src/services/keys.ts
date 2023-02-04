import type { EntryStatus } from './types'

export function getUserQueryKey() {
  return ['user']
}

export function getFeedsQueryKey({ userId }: { userId: number | null }) {
  return [userId, 'feeds'] as const
}

export function getFeedEntriesInfiniteQueryKey({
  userId,
  feedId,
  limit,
}: {
  userId: number | null
  feedId: number
  limit: number
}) {
  return [userId, { feedId, limit }] as const
}

export type FetchEntriesOptions = {
  status?: EntryStatus
  direction?: 'desc' | 'asc'
  order?: 'id' | 'status' | 'published_at' | 'category_title' | 'category_id'
  starred?: 'true' | 'false'
  limit?: number
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
