import { useLocalStorage } from '@vueuse/core'
import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zh from './locales/zh'

export const SUPPORT_LOCALES = [
  { code: 'zh', label: '简体中文' },
  { code: 'en', label: 'English' },
] as const

export type LocaleCode = typeof SUPPORT_LOCALES[number]['code']

// 持久化当前语言到 localStorage
export const localeStorage = useLocalStorage<LocaleCode>('app-locale', 'zh')

const datetimeFormats = {
  zh: {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' },
  },
  en: {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' },
  },
} as const

const numberFormats = {
  zh: {
    currency: { style: 'currency', currency: 'CNY' },
  },
  en: {
    currency: { style: 'currency', currency: 'USD' },
  },
} as const

export const i18n = createI18n({
  legacy: false,
  locale: localeStorage.value,
  fallbackLocale: 'en',
  messages: { zh, en },
  datetimeFormats,
  numberFormats,
})

function syncHtmlLang(code: LocaleCode) {
  if (typeof document !== 'undefined')
    document.documentElement.lang = code
}

// 初始化时同步 <html lang>
syncHtmlLang(localeStorage.value)

export function setLocale(code: LocaleCode) {
  localeStorage.value = code
  i18n.global.locale.value = code
  syncHtmlLang(code)
}
