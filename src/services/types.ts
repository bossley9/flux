import type { QueryFunctionContext } from '@tanstack/react-query'

// query key creator functions can have any arguments and return any type of array elements
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Context<T extends (...args: any) => readonly any[]> =
  QueryFunctionContext<ReturnType<T>>

export type Feed = {
  id: number
  user_id: number
  feed_url: string
  site_url: string
  title: string
  checked_at?: string
  etag_header?: string
  last_modified?: string
  parsing_error_message?: string
  parsing_error_count?: number
  disabled: boolean
  ignore_http_cache: boolean
  allow_self_signed_certificated: boolean
  fetch_via_proxy: boolean
  scraper_rules: string
  rewrite_rules: string
  blocklist_rules: string
  keeplist_rules: string
  crawler: boolean
  user_agent: string
  cookie: string
  username: string
  password: string
  category?: Category
  hide_globally: boolean
}

export type Category = {
  id?: number
  title?: string
  user_id?: number
}

export type EntryList = {
  total: number
  entries: Entry[]
}

export type Entry = {
  id: number
  user_id: number
  feed_id: number
  status: EntryStatus
  hash: string
  title: string
  url: string
  comments_url: string
  published_at: string
  created_at: string
  changed_at: string
  content: string
  author: string
  share_code: string
  starred: boolean
  reading_time: number
  enclosures?: never
  feed?: Feed
}

export type EntryStatus = 'unread' | 'read' | 'removed'
