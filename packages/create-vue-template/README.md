# @yy-web/vue-template

用 `pnpm create @yy-web/vue-template` 快速创建一个 Vue 3 + Rsbuild 项目。

> 实际发布到 npm 的包名为 `@yy-web/create-vue-template`，这是为了兼容 `npm create` / `pnpm create` 的包名约定。

## 使用

```bash
# pnpm
pnpm create @yy-web/vue-template

# npm
npm create @yy-web/vue-template@latest

# yarn
yarn create @yy-web/vue-template
```

也可直接指定项目名：

```bash
pnpm create @yy-web/vue-template my-app
```

CLI 会交互式询问项目名、包管理器、是否安装依赖、是否初始化 git。在非交互环境（管道 / CI）下会自动使用默认值。

## 工作原理

- 模板源就是仓库根目录的应用本身（单一真相）。
- 发布前 `build.mjs` 会把根目录（排除依赖、产物、个人工具配置与脚手架自身）拷贝进 `template/`，使发布包自包含。
- `.gitignore` 在包内以 `_gitignore` 存放（规避 npm 发布会吞掉 `.gitignore` 的问题），生成项目时还原。

## 本地开发

```bash
node build.mjs          # 生成 template/
node index.mjs my-app   # 本地试跑脚手架
```

## 发布（自动，无需 NPM_TOKEN）

发布由 GitHub Actions 工作流 [`release.yml`](../../.github/workflows/release.yml) + **Changesets** 完成，使用 npm **Trusted Publishing (OIDC)**，不需要任何长期密钥。

### 一次性设置

1. **首次发布需手动**（npm 要求包先存在才能配置 OIDC）：
   ```bash
   cd packages/create-vue-template
   node build.mjs
   npm publish --access public   # 本地登录后执行
   ```
2. 到 npmjs.com → 该包 → **Settings → Trusted Publisher**，绑定：
   - Owner: `a949066041`
   - Repository: `vue-rs-template`
   - Workflow filename: `release.yml`（区分大小写）
   - Package: `@yy-web/create-vue-template`

### 日常发版流程

```bash
pnpm changeset
```

提交后推到 `main`，工作流会自动创建/更新 release PR。该 PR 会：

- 更新 `@yy-web/create-vue-template` 的版本号
- 生成 / 更新 `CHANGELOG.md`
- 汇总 `.changeset/*.md` 里的发布说明

当 release PR 合并回 `main` 后，工作流会自动执行构建与 `changeset publish`，并以 OIDC 方式发布到 npm。

> 要求：GitHub 托管 runner、`id-token: write` 权限、npm CLI >= 11.5.1（工作流已用 Node 24 + `npm install -g npm@latest` 保证）。

### 最终发布清单

1. 首次发布前，先确认 npm 上还没有同名包被占用：`@yy-web/create-vue-template`
2. 本地首发一次：
   ```bash
   cd packages/create-vue-template
   node build.mjs
   npm publish --access public
   ```
3. 去 npm 后台完成 Trusted Publisher 绑定。
4. 以后每次发版只需要添加 changeset：
   ```bash
   pnpm changeset
   ```
5. 提交并合并到 `main`，等待 release PR 创建并合并，随后自动发布。
