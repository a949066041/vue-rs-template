import type { PluginMdxOptions } from '@rsbuild/plugin-mdx'
import type { Plugin } from 'unified'
import { resolve } from 'node:path'
import fsExtra from 'fs-extra'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

// 定义配置接口
interface RemarkCodeSrcOptions {
  basePath?: string
}

// 定义 MDX JSX 节点类型（简化版，实际类型更复杂）
interface MdxJsxAttribute {
  type: 'mdxJsxAttribute'
  name: string
  value: string | null
}

function parseAttr(attributes: MdxJsxAttribute[], key: string) {
  const value = attributes.find((attr: any) => attr.name === key)
  if (!value) {
    return null
  }
  return value?.value
}

const renderNode = ['mdxJsxFlowElement', 'mdxJsxTextElement'] as const

export function remarkCodeSrc(): Plugin<[RemarkCodeSrcOptions?], any> {
  return (tree) => {
    visit(tree, (node: any) => {
      if (renderNode.includes(node.type)) {
        if (node.name === 'DemoBlock') {
          const src = parseAttr(node.attributes, 'src')

          if (src) {
            const filePath = resolve(`./src/example/${src}`)
            const code = fsExtra.readFileSync(filePath, 'utf-8')
            node.attributes.push({
              type: 'mdxJsxAttribute',
              name: 'source',
              value: code,
            })
          }
        }
      }
    })
  }
}

export const pluginDemoMdOptions = {
  mdxLoaderOptions: {
    jsxImportSource: 'vue',
    remarkPlugins: [
      [remarkCodeSrc, { basePath: '' }],
      remarkGfm,
    ],
  },
} as PluginMdxOptions
