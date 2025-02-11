/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...path]': RouteRecordInfo<'/[...path]', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    '/about/': RouteRecordInfo<'/about/', '/about', Record<never, never>, Record<never, never>>,
    '/about/[id]': RouteRecordInfo<'/about/[id]', '/about/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/about/[value]/': RouteRecordInfo<'/about/[value]/', '/about/:value', { value: ParamValue<true> }, { value: ParamValue<false> }>,
    '/about/[value]/create': RouteRecordInfo<'/about/[value]/create', '/about/:value/create', { value: ParamValue<true> }, { value: ParamValue<false> }>,
    '/about/name/': RouteRecordInfo<'/about/name/', '/about/name', Record<never, never>, Record<never, never>>,
    '/about/name/[name]': RouteRecordInfo<'/about/name/[name]', '/about/name/:name', { name: ParamValue<true> }, { name: ParamValue<false> }>,
    '/auth': RouteRecordInfo<'/auth', '/auth', Record<never, never>, Record<never, never>>,
    '/n': RouteRecordInfo<'/n', '/n', Record<never, never>, Record<never, never>>,
    '/n/': RouteRecordInfo<'/n/', '/n', Record<never, never>, Record<never, never>>,
    '/n/value-[[more]]+/': RouteRecordInfo<'/n/value-[[more]]+/', '/n/value-:more*', { more?: ParamValueZeroOrMore<true> }, { more?: ParamValueZeroOrMore<false> }>,
    '/nesting': RouteRecordInfo<'/nesting', '/nesting', Record<never, never>, Record<never, never>>,
    '/nesting/': RouteRecordInfo<'/nesting/', '/nesting', Record<never, never>, Record<never, never>>,
    '/nesting/nesting2': RouteRecordInfo<'/nesting/nesting2', '/nesting/nesting2', Record<never, never>, Record<never, never>>,
    '/nesting/nesting2/test2': RouteRecordInfo<'/nesting/nesting2/test2', '/nesting/nesting2/test2', Record<never, never>, Record<never, never>>,
    '/nesting/nesting2/test3': RouteRecordInfo<'/nesting/nesting2/test3', '/nesting/nesting2/test3', Record<never, never>, Record<never, never>>,
    '/store': RouteRecordInfo<'/store', '/store', Record<never, never>, Record<never, never>>,
    '/user': RouteRecordInfo<'/user', '/user', Record<never, never>, Record<never, never>>,
    '/user/': RouteRecordInfo<'/user/', '/user', Record<never, never>, Record<never, never>>,
    '/user/[id]': RouteRecordInfo<'/user/[id]', '/user/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/user/create.[id]': RouteRecordInfo<'/user/create.[id]', '/user/create/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
  }
}
