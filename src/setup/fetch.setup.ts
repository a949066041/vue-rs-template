import { patchFetch } from '~/api/fetch/patch'
import { useAuthStore, useTokenStore } from '~/store'

function fetchAuthIntercept(req: RequestInit): RequestInit {
  const { token } = useTokenStore()

  if (token.value) {
    return {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${token.value}`,
      },
    }
  }

  return req
}

async function fetchResponseIntercept(res: Response): Promise<Response> {
  if (res.status === 401) {
    const { logoutUser } = useAuthStore()
    await logoutUser()
    throw new Error('Unauthorized: please login again')
  }

  if (!res.ok) {
    const errorBody = await res.text().catch(() => 'Unknown error')
    throw new Error(`Request failed (${res.status}): ${errorBody}`)
  }

  return res
}

export function setupFetch() {
  patchFetch(
    [fetchAuthIntercept],
    [fetchResponseIntercept],
    'https://dummyjson.com',
  )
}
