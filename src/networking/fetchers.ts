import { request } from './utils'
import { getFeedEntriesQueryKey } from './keys'
import type { QueryFunctionContext } from '@tanstack/react-query'
import type * as API from './types'

export function fetchUser() {
  return request<API.User>('GET', 'v1/me')
}

export function fetchFeeds() {
  return request<API.Feed[]>('GET', 'v1/feeds')
}

type EntriesQueryKey = ReturnType<typeof getFeedEntriesQueryKey>

export async function fetchEntries(
  context: QueryFunctionContext<EntriesQueryKey>
): Promise<API.Entries> {
  const [, { feedId }] = context.queryKey
  return request<API.Entries>('GET', `v1/feeds/${feedId}/entries`)
}
