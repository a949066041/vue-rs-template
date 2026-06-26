import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ThemeMode from './ThemeMode.vue'

describe('themeMode', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('点击按钮切换深色模式并同步 html.dark 类', async () => {
    const wrapper = mount(ThemeMode)
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    await wrapper.get('button').trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    await wrapper.get('button').trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
