import type { EntryStatus } from './types'

export function getUserQueryKey() {
  return ['user']
}

export function getFeedsQueryKey({ userId }: { userId: number | null }) {
  return [userId, 'feeds'] as const
}

export type FetchEntriesOptions = {
  status?: EntryStatus
  direction?: 'desc' | 'asc'
  order?: 'id' | 'status' | 'published_at' | 'category_title' | 'category_id'
  starred?: 'true' | 'false'
}

export function getEntriesQueryKey({
  userId,
  ...options
}: { userId: number | null } & FetchEntriesOptions) {
  return [userId, 'entries', options] as const
}

export function getVersionQueryKey() {
  return ['version'] as const
}
