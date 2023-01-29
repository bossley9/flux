import type { Feed } from './types'

export function getUserQueryKey() {
  return ['user']
}

export function getFeedsQueryKey({ userId }: { userId: number | null }) {
  return [userId, 'feeds'] as const
}

export function getFeedEntriesQueryKey({
  userId,
  feedId,
}: {
  userId: number | null
  feedId: Feed['id']
}) {
  return [userId, 'feeds', { feedId }] as const
}
