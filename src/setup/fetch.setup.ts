import { patchFetch } from '~/api/fetch/patch'
import { useAuthStore, useCacheStore } from '~/store'

function fetchAuthIntercept(req: RequestInit) {
  const { token } = useCacheStore()

  if (token.value) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${token.value}`,
    }
  }

  return req
}

async function fetchResponseIntercepet(res: Response) {
  const { logoutUser } = useAuthStore()
  if (res.status === 401) {
    logoutUser()
    throw new Error('unauthorized')
  }

  if (res.status !== 200) {
    throw new Error('error request')
  }
  return res
}

export function setupFetch() {
  patchFetch([fetchAuthIntercept], fetchResponseIntercepet, 'https://dummyjson.com')
}
