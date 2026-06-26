// 发布前执行：把仓库根目录（即模板源）拷贝进本包的 template/ 目录。
// 这样发布出去的 create- 包是自包含的，CLI 直接从 template/ 复制即可。
import { cpSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '../..')
const templateDir = join(__dirname, 'template')

// 不应进入模板的目录/文件（个人工具配置、产物、依赖、脚手架自身）
const DENY = new Set([
  'node_modules',
  'dist',
  '.git',
  '.codegraph',
  '.claude',
  '.cursor',
  'packages',
  'agent-transcripts',
  '.mcp.json',
  '.DS_Store',
])

function copyTemplate() {
  if (existsSync(templateDir))
    rmSync(templateDir, { recursive: true, force: true })

  mkdirSync(templateDir, { recursive: true })

  // 逐个拷贝顶层条目，避免 cpSync 拒绝「拷贝到自身子目录」（template 在 packages 下，而 packages 已排除）
  for (const entry of readdirSync(repoRoot)) {
    if (DENY.has(entry))
      continue
    cpSync(join(repoRoot, entry), join(templateDir, entry), { recursive: true })
  }

  // npm 发布会把 .gitignore 改名/吞掉，先存成 _gitignore，CLI 复制时再还原
  const gitignore = join(templateDir, '.gitignore')
  if (existsSync(gitignore))
    renameSync(gitignore, join(templateDir, '_gitignore'))
}

copyTemplate()
process.stdout.write(`template ready: ${templateDir}\n`)
