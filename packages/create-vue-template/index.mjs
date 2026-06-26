#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const templateDir = join(__dirname, 'template')

const c = {
  reset: s => `\x1B[0m${s}\x1B[0m`,
  bold: s => `\x1B[1m${s}\x1B[0m`,
  cyan: s => `\x1B[36m${s}\x1B[0m`,
  green: s => `\x1B[32m${s}\x1B[0m`,
  dim: s => `\x1B[2m${s}\x1B[0m`,
  red: s => `\x1B[31m${s}\x1B[0m`,
}

function isValidName(name) {
  return /^[a-z0-9][\w.-]*$/i.test(name)
}

function isEmptyDir(dir) {
  if (!existsSync(dir))
    return true
  const files = readdirSync(dir).filter(f => f !== '.git')
  return files.length === 0
}

async function main() {
  if (!existsSync(templateDir)) {
    console.error(c.red('未找到模板目录 template/，请先在该包内执行 `node build.mjs`。'))
    process.exit(1)
  }

  console.log(c.bold(c.cyan('\n  @yy-web/vue-template\n')))

  // 非交互（管道 / CI）时跳过提问，使用 argv 与默认值
  const interactive = Boolean(process.stdin.isTTY)
  const rl = interactive ? createInterface({ input: process.stdin, output: process.stdout }) : null
  const ask = async (q, fallback) => (interactive ? (await rl.question(q)).trim() : fallback)

  const argName = process.argv[2]

  let projectName = argName && isValidName(argName) ? argName : ''
  while (!projectName) {
    const input = (await ask(`  项目名称 ${c.dim('(vue-rs-app)')}: `, argName || 'vue-rs-app')) || 'vue-rs-app'
    if (isValidName(input))
      projectName = input
    else
      console.log(c.red('  名称无效，只能包含字母、数字、- _ .'))
  }

  const targetDir = resolve(process.cwd(), projectName)

  if (!isEmptyDir(targetDir)) {
    const ans = (await ask(`  目录 ${c.cyan(projectName)} 非空，覆盖? ${c.dim('(y/N)')}: `, 'n')).toLowerCase()
    if (ans !== 'y' && ans !== 'yes') {
      console.log(c.dim('  已取消'))
      rl?.close()
      process.exit(0)
    }
  }

  const pmAns = (await ask(`  包管理器 ${c.dim('(pnpm/npm/yarn, 默认 pnpm)')}: `, 'pnpm')).toLowerCase()
  const pm = ['npm', 'yarn', 'pnpm'].includes(pmAns) ? pmAns : 'pnpm'

  const installAns = (await ask(`  立即安装依赖? ${c.dim('(y/N)')}: `, 'n')).toLowerCase()
  const doInstall = installAns === 'y' || installAns === 'yes'

  const gitAns = (await ask(`  初始化 git 仓库? ${c.dim('(Y/n)')}: `, 'y')).toLowerCase()
  const doGit = gitAns !== 'n' && gitAns !== 'no'

  rl?.close()

  // 复制模板
  cpSync(templateDir, targetDir, { recursive: true })

  // 还原 _gitignore -> .gitignore（规避 npm 发布吞掉 .gitignore）
  const ignoreSrc = join(targetDir, '_gitignore')
  if (existsSync(ignoreSrc))
    renameSync(ignoreSrc, join(targetDir, '.gitignore'))

  // 改写 package.json
  const pkgPath = join(targetDir, 'package.json')
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    pkg.name = projectName
    pkg.version = '0.0.0'
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
  }

  if (doGit)
    spawnSync('git init', { cwd: targetDir, stdio: 'ignore', shell: true })

  if (doInstall) {
    console.log(c.dim(`\n  正在用 ${pm} 安装依赖...`))
    spawnSync(`${pm} install`, { cwd: targetDir, stdio: 'inherit', shell: true })
  }

  console.log(c.green(`\n  ✔ 项目已创建于 ${projectName}\n`))
  console.log('  接下来:')
  console.log(c.cyan(`    cd ${projectName}`))
  if (!doInstall)
    console.log(c.cyan(`    ${pm} install`))
  console.log(c.cyan(`    ${pm === 'npm' ? 'npm run dev' : `${pm} dev`}\n`))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
