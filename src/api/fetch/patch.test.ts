import { afterEach, describe, expect, it, vi } from 'vitest'
import { patchFetch } from './patch'

const originalFetch = window.fetch

afterEach(() => {
  window.fetch = originalFetch
})

function setupPatched(baseUrl?: string) {
  const origin = vi.fn(async () => ({ ok: true }) as Response)
  window.fetch = origin
  patchFetch([], [], baseUrl)
  return origin
}

describe('patchFetch buildUrl', () => {
  it('相对路径会拼接 baseUrl', async () => {
    const origin = setupPatched('https://api.test')
    await window.fetch('/users')
    expect(origin).toHaveBeenCalledWith('https://api.test/users', {})
  })

  it('缺少前导斜杠时自动补全', async () => {
    const origin = setupPatched('https://api.test')
    await window.fetch('users')
    expect(origin).toHaveBeenCalledWith('https://api.test/users', {})
  })

  it('绝对 URL 不会被拼接 baseUrl', async () => {
    const origin = setupPatched('https://api.test')
    await window.fetch('https://other.test/ping')
    expect(origin).toHaveBeenCalledWith('https://other.test/ping', {})
  })

  it('请求拦截器会修改 init', async () => {
    const origin = vi.fn(async () => ({ ok: true }) as Response)
    window.fetch = origin
    patchFetch([init => ({ ...init, headers: { Authorization: 'Bearer x' } })], [], 'https://api.test')
    await window.fetch('/me')
    expect(origin).toHaveBeenCalledWith('https://api.test/me', { headers: { Authorization: 'Bearer x' } })
  })
})
