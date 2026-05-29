---
name: create-api
description: Create API module with fetch client and Zod validation
---

# Create API Module

This skill helps you create a new API module with type-safe fetch calls and optional Zod validation.

## Usage

```
/create-api <module-name> [--with-query] [--with-mutations]
```

## Examples

```
/create-api product                    # Basic API module
/create-api order --with-query         # With Vue Query options
/create-api auth --with-mutations      # With mutation functions
```

## Steps

1. **Create type definitions** (`src/api/module/<name>.type.ts`):

```typescript
import type { z } from 'zod/v4'

// Request types
export interface GetListParams {
  page?: number
  limit?: number
  search?: string
}

// Response types
export interface Item {
  id: number
  name: string
  createdAt: string
}

export interface ListResponse {
  items: Item[]
  total: number
  page: number
  limit: number
}

// Zod schemas (optional, for validation)
export const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
})

export const ListResponseSchema = z.object({
  items: z.array(ItemSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
})
```

2. **Create API functions** (`src/api/module/<name>.api.ts`):

```typescript
import { client } from '~/api/fetch/client'
import type { GetListParams, Item, ListResponse } from './<name>.type'
import { ListResponseSchema, ItemSchema } from './<name>.type'

// Basic fetch functions
export function getList(params?: GetListParams) {
  return client.get<ListResponse>('/<name>', {
    query: params,
    schema: ListResponseSchema, // Optional Zod validation
  })
}

export function getById(id: number) {
  return client.get<Item>(`/<name>/${id}`, {
    schema: ItemSchema,
  })
}

export function create(data: Partial<Item>) {
  return client.post<Item>('/<name>', { body: data })
}

export function update(id: number, data: Partial<Item>) {
  return client.put<Item>(`/<name>/${id}`, { body: data })
}

export function remove(id: number) {
  return client.delete(`/\<name>/${id}`)
}
```

3. **Create Vue Query options** (optional, `src/api/module/<name>.query.ts`):

```typescript
import { queryOptions, infiniteQueryOptions } from '@tanstack/vue-query'
import { getList, getById } from './<name>.api'
import type { GetListParams } from './<name>.type'

export const <name>Queries = {
  list: (params?: GetListParams) =>
    queryOptions({
      queryKey: ['<name>', 'list', params],
      queryFn: () => getList(params),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: ['<name>', 'detail', id],
      queryFn: () => getById(id),
    }),

  infiniteList: (params?: Omit<GetListParams, 'page'>) =>
    infiniteQueryOptions({
      queryKey: ['<name>', 'infinite', params],
      queryFn: ({ pageParam }) => getList({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const totalPages = Math.ceil(lastPage.total / lastPage.limit)
        return lastPage.page < totalPages ? lastPage.page + 1 : undefined
      },
    }),
}
```

4. **Create Pinia Colada options** (alternative to Vue Query):

```typescript
import { defineQueryOptions } from '@pinia/colada'
import { getList, getById } from './<name>.api'

export const use<Name>ListOptions = defineQueryOptions({
  key: ['<name>', 'list'],
  query: (params?: GetListParams) => getList(params),
})

export const use<Name>DetailOptions = defineQueryOptions({
  key: (id: number) => ['<name>', 'detail', id],
  query: (id: number) => getById(id),
})
```

## File Structure

```
src/api/module/
├── <name>.type.ts      # Types and Zod schemas
├── <name>.api.ts       # Fetch functions
└── <name>.query.ts     # Vue Query options (optional)
```

## Notes

- Use `client.get/post/put/delete` from `~/api/fetch/client`
- Zod schemas are optional but recommended for dev mode validation
- Import types with `import type` for better tree-shaking
- Use DummyJSON API format: `https://dummyjson.com/<name>`
