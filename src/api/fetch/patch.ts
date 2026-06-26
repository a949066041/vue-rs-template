export type FetchRequestIntercept = (init: RequestInit) => RequestInit
export type FetchResponseIntercept = (response: Response) => Response | void | Promise<Response | void>

function normalizeBaseUrl(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

function isAbsoluteUrl(path: string): boolean {
  return /^[a-z][a-z\d+\-.]*:\/\//i.test(path)
}

function buildUrl(baseUrl: string | undefined, resource: string | URL | Request): string {
  const path = String(resource)
  // 已是绝对地址（http(s):// 等）时不再拼接 baseUrl
  if (!baseUrl || isAbsoluteUrl(path))
    return path
  const normalizedBase = normalizeBaseUrl(baseUrl)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

export function patchFetch(
  requestInterceptors: FetchRequestIntercept | FetchRequestIntercept[] = [],
  responseInterceptors: FetchResponseIntercept | FetchResponseIntercept[] = [],
  baseUrl?: string,
) {
  const { fetch: originFetch } = window
  const reqInterceptors = Array.isArray(requestInterceptors) ? requestInterceptors : [requestInterceptors]
  const resInterceptors = Array.isArray(responseInterceptors) ? responseInterceptors : [responseInterceptors]

  window.fetch = async (...args) => {
    const [resource, init = {}] = args

    // 执行请求拦截器
    const modifiedInit = reqInterceptors.reduce((acc, interceptor) => interceptor(acc), init)

    const url = buildUrl(baseUrl, resource)
    let response = await originFetch(url, modifiedInit)

    // 执行响应拦截器
    for (const interceptor of resInterceptors) {
      const result = await interceptor(response)
      if (result instanceof Response) {
        response = result
      }
    }

    return response
  }
}
