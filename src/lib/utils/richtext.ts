import type {
  SerializedEditorState,
  SerializedLexicalNode
} from '@payloadcms/richtext-lexical/lexical'

export type HeadingLink = {
  id: string
  text: string
}

const normalizeHeadingText = (value: string) =>
  value.replace(/\s+/g, ' ').trim()

const slugifyHeading = (value: string) => {
  const normalized = normalizeHeadingText(value).toLowerCase()
  const stripped = normalized.replace(/[^a-z0-9\s-]/g, '')
  const collapsed = stripped.replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
  return collapsed || 'section'
}

const getNodeText = (node: SerializedLexicalNode): string => {
  if (node.type === 'text') {
    const value = (node as { text?: unknown }).text
    return typeof value === 'string' ? value : ''
  }

  if (node.type === 'linebreak' || node.type === 'tab') {
    return ' '
  }

  const children = (node as { children?: SerializedLexicalNode[] }).children
  if (Array.isArray(children)) {
    return children.map(getNodeText).join('')
  }

  return ''
}

const collectH2Headings = (
  nodes: SerializedLexicalNode[],
  headings: HeadingLink[],
  slugCounts: Map<string, number>
) => {
  for (const node of nodes) {
    if (node.type === 'heading' && (node as { tag?: string }).tag === 'h2') {
      const text = normalizeHeadingText(getNodeText(node))
      if (text) {
        const base = slugifyHeading(text)
        const count = (slugCounts.get(base) ?? 0) + 1
        slugCounts.set(base, count)
        const id = count === 1 ? base : `${base}-${count}`
        headings.push({ id, text })
      }
    }

    const children = (node as { children?: SerializedLexicalNode[] }).children
    if (Array.isArray(children) && children.length > 0) {
      collectH2Headings(children, headings, slugCounts)
    }
  }
}

export const extractH2Headings = (
  data?: SerializedEditorState | null
): HeadingLink[] => {
  const nodes = data?.root?.children
  if (!Array.isArray(nodes)) return []

  const headings: HeadingLink[] = []
  collectH2Headings(nodes as SerializedLexicalNode[], headings, new Map())
  return headings
}
