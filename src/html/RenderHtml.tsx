import { ReactNode } from 'react'
import { View, Linking, Text } from 'react-native'
import { P } from './P'
import { linkStyles } from './Link'
import { parse, Node, NodeType } from 'node-html-parser'
import { tokens } from '@/tokens'

function getKey(node: Node, index: number): string {
  return node.range[0] + '-' + node.range[1] + '-' + index
}

function isWhitespaceNode(node: Node): boolean {
  return node.nodeType === NodeType.TEXT_NODE && node.text.trim().length === 0
}

function getNodeAttribute(node: Node, attr: string): string | null {
  const src = node.toString()
  const tagMeta = src.substring(1, src.indexOf('>'))

  const attrIndex = tagMeta.indexOf(attr)
  if (attrIndex < 0) {
    return null
  }

  const valueStartIndex = attrIndex + attr.length + '='.length

  if (tagMeta[valueStartIndex] !== '"') {
    // ignore numeric attribute values
    return ''
  }

  const valueEndIndex = tagMeta.indexOf('"', valueStartIndex + 1)
  const value = tagMeta.substring(valueStartIndex + 1, valueEndIndex)

  return value
}

function renderLinkNode(node: Node, index: number): ReactNode {
  const href = getNodeAttribute(node, 'href')
  const handlePress = () => {
    if (href) {
      Linking.openURL(href)
    }
  }
  return (
    <Text key={getKey(node, index)} onPress={handlePress} style={linkStyles}>
      {node.childNodes.map(renderNode)}
    </Text>
  )
}

function renderListItemNode(node: Node, index: number): ReactNode {
  const parent = node.parentNode
  const parentType = parent.tagName.toLocaleLowerCase()
  const key = getKey(node, index)

  const listIndex =
    parent.childNodes
      // filter out whitespace values
      .filter((child) => !isWhitespaceNode(child))
      .findIndex((child) => child === node) + 1

  switch (parentType) {
    case 'ul':
      return (
        <P key={key} margin={tokens.space / 4}>
          • {node.childNodes.map(renderNode)}
        </P>
      )

    case 'ol':
      return (
        <P
          key={key}
          margin={tokens.space / 4}
          style={{ backgroundColor: 'yellow' }}
        >
          {listIndex}. {node.childNodes.map(renderNode)}
        </P>
      )

    default:
      // sanity check - if all else fails, render a normal node
      return <Text key={key}>{node.childNodes.map(renderNode)}</Text>
  }
}

function renderElementNode(node: Node, index: number): ReactNode {
  const children = node.childNodes
  if (children.length === 0) {
    return null
  }
  const key = getKey(node, index)

  const src = node.toString()
  // < is index 0, element starts at index 1
  const tagMeta = src.substring(1, src.indexOf('>'))

  let tagName = tagMeta
  if (tagMeta.indexOf(' ') > 0) {
    tagName = tagMeta.substring(0, tagMeta.indexOf(' '))
  }

  switch (tagName) {
    case 'p':
      return <P key={key}>{children.map(renderNode)}</P>
    case 'a':
      return renderLinkNode(node, index)
    case 'strong':
      return (
        <P key={key} style={{ fontWeight: 'bold' }}>
          {children.map(renderNode)}
        </P>
      )
    case 'ul':
    case 'ol':
      return (
        <View key={key} style={{ paddingLeft: tokens.space }}>
          {children.map(renderNode)}
        </View>
      )
    case 'li':
      return renderListItemNode(node, index)
    default:
      return (
        <P key={key} color={tokens.errorColor}>
          unimplemented tag &lt;{tagName}&gt;
        </P>
      )
  }
}

function renderTextNode(node: Node, index: number): ReactNode {
  // sanity check - we shouldn't need a wrapper but sometimes
  // special elements such as iframes break the rendering
  return <Text key={getKey(node, index)}>{node.text}</Text>
}

function renderNode(node: Node, index: number): ReactNode {
  if (isWhitespaceNode(node)) return null

  switch (node.nodeType) {
    case NodeType.ELEMENT_NODE:
      return renderElementNode(node, index)

    case NodeType.TEXT_NODE:
      return renderTextNode(node, index)

    case NodeType.COMMENT_NODE:
    default:
      return null
  }
}

type Props = { source: string }

export function RenderHtml({ source }: Props) {
  const root = parse(source)

  return (
    <View style={{ marginBottom: tokens.space * 4 }}>
      {root.childNodes.map(renderNode)}
    </View>
  )
}
