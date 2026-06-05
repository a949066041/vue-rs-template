---
description: Create a new API module with types, fetch functions, and query option factories
---

# New API Module

Create a new domain API module in `src/api/module/` following the project's three-layer pattern.

## Arguments
- `$ARGUMENTS` — Domain name (e.g., `product`, `order`, `comment`)

## Steps

1. Create type file `src/api/module/<domain>.type.ts`:
```ts
export interface I<Domain>Entity {
  id: number
  // add fields
}

export interface I<Domain>List {
  <domain>s: I<Domain>Entity[]
  total: number
  skip: number
  limit: number
}
```

2. Create API file `src/api/module/<domain>.api.ts`:
```ts
import type { I<Domain>Entity, I<Domain>List } from './<domain>.type'
import { queryOptions } from '@tanstack/vue-query'
import { defineQueryOptions } from '@pinia/colada'
import { fetchClient } from '~/api/fetch'

const baseUrl = '/<domain>s'

// Layer 1: Raw fetch functions
export function fetch<Domain>List() {
  return fetchClient.get<I<Domain>List>(`${baseUrl}?limit=10`)
}

export function fetch<Domain>(id: I<Domain>Entity['id']) {
  return fetchClient.get<I<Domain>Entity>(`${baseUrl}/${id}`)
}

// Layer 2: TanStack Vue Query options
export const <domain>QueryListOptions = queryOptions({
  queryKey: ['<domain>-list'],
  queryFn: fetch<Domain>List,
})

export function <domain>QueryOptions(id: I<Domain>Entity['id']) {
  return queryOptions({
    queryKey: ['<domain>-detail', { id }],
    queryFn: () => fetch<Domain>(id),
  })
}

// Layer 3: Pinia Colada options
export const <DOMAIN>_QUERY_KEYS = {
  root: ['<domain>'] as const,
  byId: (id: number) => [...<DOMAIN>_QUERY_KEYS.root, id] as const,
}

export const <domain>ByIdQuery = defineQueryOptions(
  ({ id }: { id: number }) => ({
    key: <DOMAIN>_QUERY_KEYS.byId(id),
    query: () => fetch<Domain>(id),
  }),
)
```

3. Re-export from `src/api/module/index.ts`:
```ts
export * from './<domain>.api'
export * from './<domain>.type'
```

4. Run `pnpm typecheck` to verify
