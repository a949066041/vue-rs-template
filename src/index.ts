import type { router } from './router'
import { bootstrap } from './bootstrap.ts'
import './style/index.css'

declare module 'vue-router' {
  export interface TypesConfig {
    Router: typeof router
  }
}

bootstrap()
