/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  /** API 基础地址，未设置时回退到 https://dummyjson.com */
  readonly PUBLIC_API_BASE_URL?: string
}
