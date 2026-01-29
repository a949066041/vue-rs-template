import { setupFetch } from './fetch.setup'

export * from './auth.setup'

function setupApp() {
  setupFetch()
}

setupApp()
