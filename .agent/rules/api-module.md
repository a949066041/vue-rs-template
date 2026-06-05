# API Module Rules

## File Structure
Each domain module in `src/api/module/` has two files:
- `<domain>.type.ts` — Pure TypeScript interfaces (no runtime code)
- `<domain>.api.ts` — Fetch functions + query option factories

## Type File (`*.type.ts`)
- Export interfaces with `I` prefix: `IUserEntity`, `ILoginUserParams`
- Use `type` for union/intersection types: `type LoginRes = ILogRes & IUserEntity`
- Keep types flat — avoid deeply nested generics

## API File (`*.api.ts`)
Three layers in one file:

### 1. Raw fetch functions
- Call `fetchClient.get<T>()`, `fetchClient.post<T>()`, `fetchClient.delete<T>()`
- Always provide the response type generic: `fetchClient.get<IUserList>(url)`
- Use a module-level `baseUrl` constant

### 2. TanStack Vue Query option factories
- Use `queryOptions()` for single queries
- Use `infiniteQueryOptions()` for paginated queries
- Export as `const` for static options, `function` for parameterized options
- Naming: `<domain>Query<List|Detail|Pager>Options`

### 3. Pinia Colada query option factories
- Use `defineQueryOptions()` with hierarchical key patterns
- Define query keys as `const` objects with `as const`
- Naming: `<domain>ByIdQuery`, `<domain>ListQuery`

## Query Key Conventions
- TanStack: `['domain-list']`, `['domain-detail', { id }]`
- Pinia Colada: `{ root: ['domain'] as const, byId: (id) => [...root, id] as const }`
