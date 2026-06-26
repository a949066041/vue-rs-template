# vue-rs-template

基于 **Rsbuild (Rspack)** 的 Vue 3 单页应用模板，开箱即用地集成了文件路由、双数据请求方案、国际化、Tailwind v4 + Iconify、鉴权与测试。

## 特性

- ⚡️ **Rsbuild / Rspack** —— 高性能构建，非 Vite / Webpack
- 🧩 **文件路由** —— `vue-router/unplugin` 自动生成路由与类型（`src/route-map.d.ts`），支持动态段、分组、嵌套、catch-all
- 🗃️ **两套数据层并存** —— `@pinia/colada` 与 `@tanstack/vue-query`，外加 `@vueuse/core` 的 `createGlobalState` 管理轻量全局状态
- 🌐 **国际化** —— `vue-i18n`（Composition API），语言持久化到 localStorage，含示例页与切换组件
- 🎨 **Tailwind CSS v4 + Iconify** —— CSS 配置、class 化暗色模式；自定义图标直接读取 `svgs/` 目录（`icon-[custom--xxx]`），无需构建步骤
- 🔐 **鉴权** —— 基于 token 的登录、路由守卫、`fetch` 拦截器（自动注入 Bearer、处理 401）
- 🧪 **测试** —— Vitest + @vue/test-utils，含纯函数与组件示例
- 🖼️ **图标画廊** —— 独立开发者工具（`pnpm icons`），不会被打包进生产
- ✅ **质量保障** —— ESLint（@antfu/eslint-config）、vue-tsc 类型检查、GitHub Actions CI

## 环境要求

- Node >= 22
- pnpm（`packageManager: pnpm@11.9.0`）

## 快速开始

```bash
pnpm install      # 安装依赖
pnpm dev          # 启动开发服务器
```

可选：复制环境变量示例并按需修改（`.env.local` 已被忽略）。

```bash
cp .env.example .env.local
```

## 脚本命令

```bash
pnpm dev          # 开发服务器
pnpm build        # 生产构建
pnpm preview      # 本地预览生产构建
pnpm icons        # 启动独立图标画廊（查看 svgs/ 下全部自定义图标）
pnpm test         # 运行单元测试（vitest run）
pnpm test:watch   # 监听模式运行测试
pnpm typecheck    # vue-tsc 类型检查
pnpm lint         # ESLint 检查
pnpm lint:fix     # ESLint 自动修复
```

## 目录结构

```
src/
├─ api/          # fetch 封装（拦截器 + 客户端）与领域 API 模块
├─ components/   # 通用组件（语言切换、主题切换）
├─ i18n/         # vue-i18n 配置与语言包
├─ pages/        # 文件路由页面（自动生成路由）
├─ router/       # 路由实例
├─ setup/        # 启动期副作用（fetch / auth）
├─ store/        # 全局状态（createGlobalState）
├─ style/        # Tailwind 入口与暗色变体
├─ bootstrap.ts  # 应用装配
└─ index.ts      # 入口
svgs/            # 自定义图标（Iconify custom 集）
scripts/         # 独立脚本（图标画廊）
config.ts        # 应用级配置（标题等）
```

## 环境变量

仅以 `PUBLIC_` 开头的变量会注入到前端（`import.meta.env.PUBLIC_*`）。

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `PUBLIC_API_BASE_URL` | API 基础地址 | `https://dummyjson.com` |

## 示例数据

所有数据示例与登录流程使用公共接口 `https://dummyjson.com`。

更多架构与约定细节见 [`AGENTS.md`](./AGENTS.md)。
