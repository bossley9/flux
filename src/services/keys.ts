import type { Feed } from './types'

export function getFeedsQueryKey() {
  return ['feeds'] as const
}

export function getFeedEntriesQueryKey({ feedId }: { feedId: Feed['id'] }) {
  return ['feeds', { feedId }] as const
}
