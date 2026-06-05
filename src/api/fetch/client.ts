import type { ZodType } from 'zod'

<<<<<<< HEAD
type RequestParams = Record<string, string | number | boolean | null | undefined>
type RequestBody = object
=======
type RequestParams = Record<string, unknown>
type RequestBody = Record<string, unknown> | object
>>>>>>> 41bccda4c28974293d667d7e695d44bb6aba2559

function buildQueryString(params: RequestParams): string {
  const entries = Object.entries(params)
  if (entries.length === 0)
    return ''
  const query = entries
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&')
  return `?${query}`
}

function validateResponse<T>(data: T, schema?: ZodType): T {
  if (import.meta.env.DEV && schema) {
    const result = schema.safeParse(data)
    if (!result.success) {
      console.error('Response validation failed:', result.error)
    }
  }
  return data
}

async function handleResponse<T>(res: Response, schema?: ZodType): Promise<T> {
  if (!res.ok) {
    const errorBody = await res.text().catch(() => 'Unable to read error body')
    throw new Error(`HTTP ${res.status}: ${res.statusText} - ${errorBody}`)
  }
  const data = await res.json() as T
  return validateResponse(data, schema)
}

function isZodType(value: unknown): value is ZodType {
  return value != null && typeof (value as ZodType).safeParse === 'function'
}

export const fetchClient = {
  async get<T>(url: string, paramsOrSchema?: RequestParams | ZodType, schema?: ZodType): Promise<T> {
    let params: RequestParams = {}
    let validationSchema: ZodType | undefined

    if (isZodType(paramsOrSchema)) {
      validationSchema = paramsOrSchema
    }
    else if (paramsOrSchema) {
      params = paramsOrSchema
      validationSchema = schema
    }

    const res = await fetch(`${url}${buildQueryString(params)}`)
    return handleResponse<T>(res, validationSchema)
  },

  async post<T>(url: string, body: RequestBody = {}, schema?: ZodType): Promise<T> {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return handleResponse<T>(res, schema)
  },

  async delete<T>(url: string, paramsOrSchema?: RequestParams | ZodType, schema?: ZodType): Promise<T> {
    let params: RequestParams = {}
    let validationSchema: ZodType | undefined

    if (isZodType(paramsOrSchema)) {
      validationSchema = paramsOrSchema
    }
    else if (paramsOrSchema) {
      params = paramsOrSchema
      validationSchema = schema
    }

    const res = await fetch(`${url}${buildQueryString(params)}`, {
      method: 'DELETE',
    })
    return handleResponse<T>(res, validationSchema)
  },
}
