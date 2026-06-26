import { afterEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { fetchClient } from './client'

function mockFetchOnce(body: unknown, init: { ok?: boolean, status?: number, statusText?: string } = {}) {
  const { ok = true, status = 200, statusText = 'OK' } = init
  const res = {
    ok,
    status,
    statusText,
    json: async () => body,
    text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
  } as Response
  const spy = vi.fn(async () => res)
  vi.stubGlobal('fetch', spy)
  return spy
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('fetchClient.get', () => {
  it('请求无参数时直接使用原始 url', async () => {
    const spy = mockFetchOnce({ id: 1 })
    const data = await fetchClient.get<{ id: number }>('https://api.test/users')
    expect(spy).toHaveBeenCalledWith('https://api.test/users')
    expect(data).toEqual({ id: 1 })
  })

  it('拼接查询字符串并编码特殊字符', async () => {
    const spy = mockFetchOnce([])
    await fetchClient.get('https://api.test/search', { q: 'a b', limit: 10 })
    expect(spy).toHaveBeenCalledWith('https://api.test/search?q=a%20b&limit=10')
  })

  it('第二个参数为 zod schema 时不会被当作查询参数', async () => {
    const spy = mockFetchOnce({ ok: true })
    await fetchClient.get('https://api.test/ping', z.object({ ok: z.boolean() }))
    expect(spy).toHaveBeenCalledWith('https://api.test/ping')
  })

  it('响应非 2xx 时抛出包含状态码的错误', async () => {
    mockFetchOnce('boom', { ok: false, status: 500, statusText: 'Server Error' })
    await expect(fetchClient.get('https://api.test/fail')).rejects.toThrow('HTTP 500')
  })
})

describe('fetchClient.post', () => {
  it('以 JSON 方式发送 body', async () => {
    const spy = mockFetchOnce({ created: true })
    await fetchClient.post('https://api.test/users', { name: 'neo' })
    expect(spy).toHaveBeenCalledWith('https://api.test/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'neo' }),
    })
  })
})
