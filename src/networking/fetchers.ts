import {request} from './utils'
import * as API from './types'

export function fetchUser() {
  return request<any>('GET', 'v1/me')
}

export function fetchFeeds() {
  return request<API.Feed[]>('GET', 'v1/feeds')
}
