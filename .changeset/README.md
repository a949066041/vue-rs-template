# Changesets

本仓库使用 Changesets 管理 `@yy-web/create-vue-template` 的版本与变更说明。

常用命令：

```bash
pnpm changeset
pnpm version-packages
pnpm release:cli
```

- 开发完成后运行 `pnpm changeset`，为发布包写一条变更说明。
- 合并到 `main` 后，GitHub Actions 会自动创建/更新版本 PR。
- 版本 PR 合并后，工作流会自动发布到 npm（OIDC Trusted Publishing）。
