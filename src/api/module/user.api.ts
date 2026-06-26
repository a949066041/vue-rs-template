import type { MaybeRefOrGetter } from 'vue'
import type { LoginRes, UserEntity, UserList, UserLoginParams } from './user.type'
import { defineQueryOptions } from '@pinia/colada'
import { infiniteQueryOptions, queryOptions } from '@tanstack/vue-query'
import { toValue } from 'vue'
import fetchClient from '~/api/fetch/client'

const BASE_URL = '/users'
const USER_PAGER_LIMIT = 40

/**
 * API 请求函数
 */
export function fetchUserList() {
  return fetchClient.setPath(`${BASE_URL}?limit=3`).get<UserList>(true)
}

export function fetchUser(id: UserEntity['id']) {
  return fetchClient.setPath(`${BASE_URL}/${id}`).get<UserEntity>()
}

export function fetchUserPager({ pageParam: page }: { pageParam: number }): Promise<UserList> {
  const skip = USER_PAGER_LIMIT * page
  return fetchClient.setPath(`${BASE_URL}`).get<UserList>({
    limit: USER_PAGER_LIMIT,
    skip,
  })
}

export function loginUser(params: UserLoginParams) {
  return fetchClient.setPath(`${BASE_URL}/login`).post<LoginRes>(params)
}

export function getUserMe() {
  return fetchClient.setPath(`${BASE_URL}/me`).get<LoginRes>()
}

/**
 * Vue Query 配置
 */
export const userListQueryOptions = queryOptions({
  queryKey: ['user-list'],
  queryFn: fetchUserList,
})

export function userQueryOptions(id: MaybeRefOrGetter<UserEntity['id']>) {
  return queryOptions({
    queryKey: ['user-detail', id],
    queryFn: () => fetchUser(toValue(id)),
  })
}

export const userPagerQueryOptions = infiniteQueryOptions({
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
    const totalLoaded = list.flatMap(item => item.users).length
    return res.total > totalLoaded ? list.length : undefined
  },
})

export function userMeQueryOptions() {
  return queryOptions({
    queryKey: ['user-me'],
    queryFn: getUserMe,
  })
}

/**
 * Pinia Colada 配置
 */
export const USER_QUERY_KEYS = {
  root: ['user'] as const,
  byId: (id: number) => [...USER_QUERY_KEYS.root, id] as const,
}

export const userByIdQuery = defineQueryOptions(
  ({ id }: { id: number }) => ({
    key: USER_QUERY_KEYS.byId(id),
    query: () => fetchUser(id),
  }),
)
