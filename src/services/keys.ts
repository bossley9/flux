import type { Feed } from './types'

export function getUserQueryKey() {
  return ['user']
}

export function getFeedsQueryKey({ userId }: { userId: number | null }) {
  return [userId, 'feeds'] as const
}

export function getUnreadEntriesQueryKey({
  userId,
}: {
  userId: number | null
}) {
  return [...getFeedsQueryKey({ userId }), 'unread entries'] as const
}

export function getReadEntriesQueryKey({ userId }: { userId: number | null }) {
  return [userId, 'entries', 'read'] as const
}

export function getFeedEntriesQueryKey({
  userId,
  feedId,
}: {
  userId: number | null
  feedId: Feed['id']
}) {
  return [...getFeedsQueryKey({ userId }), { feedId }] as const
}
