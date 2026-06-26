import type { ServerResponse } from 'node:http'
import { exec } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import process from 'node:process'

// 独立的「图标画廊」开发工具：
// 读取项目根目录 svgs/ 下的全部自定义图标，启动一个独立服务并自动打开浏览器，
// 左侧展示填充色版本（CSS mask），右侧展示原始 SVG，支持搜索与点击复制 class。
// 与主项目完全分离，不会被打包进生产产物。运行：pnpm icons

const svgsDir = resolve(process.cwd(), 'svgs')

interface IconItem {
  name: string
  uri: string
}

function loadIcons(): IconItem[] {
  return readdirSync(svgsDir)
    .filter(file => file.endsWith('.svg'))
    .map((file) => {
      const name = file.replace(/\.svg$/, '')
      const svg = readFileSync(resolve(svgsDir, file), 'utf-8')
      const uri = `data:image/svg+xml,${encodeURIComponent(svg)}`
      return { name, uri }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

function renderHtml(): string {
  const icons = loadIcons()
  const data = JSON.stringify(icons)

  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Icon Gallery</title>
<style>
:root { --fill: #3b82f6; color-scheme: light dark; }
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; background: #fff; color: #111827; }
.wrap { max-width: 1100px; margin: 0 auto; padding: 24px 20px 48px; }
h1 { font-size: 20px; margin: 0 0 4px; }
.sub { color: #6b7280; font-size: 13px; margin: 0 0 20px; }
.bar { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: 8px; }
#search { width: 260px; max-width: 100%; padding: 8px 12px; font-size: 14px; border: 1px solid #d1d5db; border-radius: 8px; background: transparent; color: inherit; outline: none; }
#search:focus { border-color: #60a5fa; }
.swatches { display: flex; gap: 8px; align-items: center; }
.swatches span { font-size: 12px; color: #6b7280; }
.swatch { width: 22px; height: 22px; border-radius: 50%; border: 1px solid #d1d5db; cursor: pointer; padding: 0; transition: transform .15s; }
.swatch:hover { transform: scale(1.12); }
.swatch.active { outline: 2px solid #60a5fa; outline-offset: 2px; }
#count { color: #9ca3af; font-size: 12px; margin: 8px 0 16px; }
#grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
.card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; transition: border-color .15s; }
.card:hover { border-color: #93c5fd; }
.preview { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 8px 0; }
.cell { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.cell span { font-size: 10px; color: #9ca3af; }
.divider { width: 1px; height: 40px; background: #e5e7eb; }
.filled { width: 40px; height: 40px; background-color: var(--fill); -webkit-mask-size: contain; mask-size: contain; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-position: center; mask-position: center; }
.cell img { width: 40px; height: 40px; object-fit: contain; }
.copy { margin-top: 8px; width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 6px 8px; border: 1px solid #e5e7eb; border-radius: 8px; background: transparent; color: inherit; cursor: pointer; font: inherit; text-align: left; }
.copy:hover { background: #f9fafb; }
.copy code { font-size: 12px; color: #374151; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tag { font-size: 11px; color: #9ca3af; flex: none; }
.tag.ok { color: #22c55e; }
.empty { text-align: center; color: #9ca3af; padding: 40px 0; }
@media (prefers-color-scheme: dark) {
  body { background: #0f172a; color: #e5e7eb; }
  #search, .card, .copy, .divider, .swatch { border-color: #334155; }
  .copy:hover { background: #1e293b; }
  .copy code { color: #cbd5e1; }
}
</style>
</head>
<body>
<div class="wrap">
  <h1>自定义图标画廊</h1>
  <p class="sub">读取 svgs/ 目录的全部图标 · 左=填充色 / 右=原图 · 点击卡片复制 class · 修改 svgs/ 后刷新本页即可更新</p>
  <div class="bar">
    <input id="search" type="text" placeholder="搜索图标...">
    <div class="swatches">
      <span>填充色</span>
      <button class="swatch active" data-color="#3b82f6" style="background:#3b82f6"></button>
      <button class="swatch" data-color="#ef4444" style="background:#ef4444"></button>
      <button class="swatch" data-color="#22c55e" style="background:#22c55e"></button>
      <button class="swatch" data-color="#f59e0b" style="background:#f59e0b"></button>
      <button class="swatch" data-color="#a855f7" style="background:#a855f7"></button>
      <button class="swatch" data-color="#111827" style="background:#111827"></button>
    </div>
  </div>
  <p id="count"></p>
  <div id="grid"></div>
</div>
<script>
const ICONS = ${data};
const grid = document.getElementById('grid');
const search = document.getElementById('search');
const count = document.getElementById('count');

function render(list) {
  if (!list.length) { grid.innerHTML = '<p class="empty">没有匹配的图标</p>'; return; }
  grid.innerHTML = list.map(function (it) {
    return '<div class="card" data-name="' + it.name + '">'
      + '<div class="preview">'
      +   '<div class="cell"><div class="filled" style="-webkit-mask-image:url(\\'' + it.uri + '\\');mask-image:url(\\'' + it.uri + '\\')"></div><span>填充</span></div>'
      +   '<div class="divider"></div>'
      +   '<div class="cell"><img src="' + it.uri + '" alt="' + it.name + '"><span>原图</span></div>'
      + '</div>'
      + '<button class="copy" data-copy="icon-[custom--' + it.name + ']" title="icon-[custom--' + it.name + ']">'
      +   '<code>' + it.name + '</code><span class="tag">copy</span>'
      + '</button>'
      + '</div>';
  }).join('');
}

search.addEventListener('input', function () {
  const kw = search.value.trim().toLowerCase();
  const list = ICONS.filter(function (it) { return it.name.toLowerCase().includes(kw); });
  count.textContent = list.length + ' icons';
  render(list);
});

grid.addEventListener('click', function (e) {
  const btn = e.target.closest('.copy');
  if (!btn) return;
  const text = btn.getAttribute('data-copy');
  navigator.clipboard.writeText(text).then(function () {
    const tag = btn.querySelector('.tag');
    const old = tag.textContent;
    tag.textContent = '已复制';
    tag.classList.add('ok');
    setTimeout(function () { tag.textContent = old; tag.classList.remove('ok'); }, 1200);
  });
});

document.querySelectorAll('.swatch').forEach(function (s) {
  s.addEventListener('click', function () {
    document.documentElement.style.setProperty('--fill', s.dataset.color);
    document.querySelectorAll('.swatch').forEach(function (x) { x.classList.remove('active'); });
    s.classList.add('active');
  });
});

count.textContent = ICONS.length + ' icons';
render(ICONS);
</script>
</body>
</html>`
}

function openBrowser(url: string) {
  const command = process.platform === 'win32'
    ? `start "" "${url}"`
    : process.platform === 'darwin'
      ? `open "${url}"`
      : `xdg-open "${url}"`
  exec(command)
}

const server = createServer((_req, res: ServerResponse) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(renderHtml())
})

function listen(port: number, attemptsLeft = 10) {
  server.once('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      listen(port + 1, attemptsLeft - 1)
    }
    else {
      console.error(err)
      process.exit(1)
    }
  })
  server.listen(port, () => {
    const url = `http://localhost:${port}`
    console.log(`\n  🎨 Icon Gallery: ${url}`)
    console.log(`  共 ${loadIcons().length} 个图标，按 Ctrl+C 退出\n`)
    openBrowser(url)
  })
}

listen(5180)
