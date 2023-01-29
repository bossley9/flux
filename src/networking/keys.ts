import type {Feed} from './types'

export function getFeedEntriesQueryKey({feedId}: {feedId: Feed['id']}) {
  return ['feeds', {feedId}] as const
}
