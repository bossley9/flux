import {getServerUrl, getHeaders} from './utils'

async function request(method: RequestInit['method'], path: string) {
  const url = (await getServerUrl()).replace(/\/$/, '') + '/' + path
  const options: RequestInit = {
    method,
    headers: await getHeaders(),
  }

  return fetch(url, options)
    .then(res => res.json())
}

export function fetchUser() {
  return request('GET', 'v1/me')
}
