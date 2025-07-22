import type { ILoginUserParams, IUserEntity, IUserList, LoginRes } from './user.type'
import { defineQueryOptions } from '@pinia/colada'
import { infiniteQueryOptions, queryOptions } from '@tanstack/vue-query'
import { fetchClient } from '~/api/fetch'
import { delay } from '~/utils'

const baseUrl = '/users'
/**
 * api
 */
export function fetchUserList() {
  return fetchClient.get<IUserList>(`${baseUrl}?limit=3`)
}

export function fetchUser(id: IUserEntity['id']) {
  return fetchClient.get<IUserEntity>(`${baseUrl}/${id}`)
}

const USER_PAGER_LIMIT = 40
export function fetchUserPager({ pageParam: offset }: { pageParam: number }): Promise<IUserList> {
  return fetchClient.get<IUserList>(`${baseUrl}?limit=${USER_PAGER_LIMIT}&skip=${USER_PAGER_LIMIT * (offset - 1)}`)
}

export function loginUser(params: ILoginUserParams) {
  return fetchClient.post<LoginRes>(`${baseUrl}/login`, params)
}

export async function getUserMe() {
  await delay(2000)
  return fetchClient.get<LoginRes>(`${baseUrl}/me`)
}

/**
 * react query client
 */
export const userQueryListOptions = queryOptions({
  queryKey: ['user-list'],
  queryFn: fetchUserList,
})

export function userQueryOptions(id: IUserEntity['id']) {
  return queryOptions({
    queryKey: ['user-list', { id }],
    queryFn: () => fetchUser(id),
  })
}

export const userQueryPagerOptions = infiniteQueryOptions({
  queryKey: ['user-pager'],
  queryFn: fetchUserPager,
  initialPageParam: 0,
  select(data) {
    return {
      pages: data.pages.map(item => item.users).flat(),
      pageParams: data.pageParams,
    }
  },
  getNextPageParam: (res, list) => {
    return res.total > list.map(item => item.users).flat().length
      ? (res.skip + USER_PAGER_LIMIT)
      : undefined
  },
})

export function userMeQueryOptions(enabled = false) {
  return queryOptions({
    queryKey: ['user-me'],
    queryFn: getUserMe,
    enabled,
  })
}

// pinia query
export const DOCUMENT_QUERY_KEYS = {
  root: ['user'] as const,
  byId: (id: number) => [...DOCUMENT_QUERY_KEYS.root, id] as const,
  byIdWithComments: (id: number) => [...DOCUMENT_QUERY_KEYS.byId(id)] as const,
}

export const documentByIdQuery = defineQueryOptions(
  ({ id }: { id: number }) => ({
    key: DOCUMENT_QUERY_KEYS.byIdWithComments(id),
    query: () => fetchUser(id),
  }),
)
