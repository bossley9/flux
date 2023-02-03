import { ReactNode } from 'react'
import { View, Linking, Text } from 'react-native'
import { P } from './P'
import { linkStyles } from './Link'
import { parse, Node, NodeType } from 'node-html-parser'
import { tokens } from '@/tokens'

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
    <Text key={index} onPress={handlePress} style={linkStyles}>
      {node.childNodes.map(renderNode)}
    </Text>
  )
}

function renderElementNode(node: Node, index: number): ReactNode {
  if (node.childNodes.length === 0) {
    return null
  }

  const src = node.toString()
  // < is index 0, element starts at index 1
  const tagMeta = src.substring(1, src.indexOf('>'))

  let tagName = tagMeta
  if (tagMeta.indexOf(' ') > 0) {
    tagName = tagMeta.substring(0, tagMeta.indexOf(' '))
  }

  switch (tagName) {
    case 'p':
      return <P key={index}>{node.childNodes.map(renderNode)}</P>
    case 'a':
      return renderLinkNode(node, index)
    case 'strong':
      return (
        <P key={index} style={{ fontWeight: 'bold' }}>
          {node.childNodes.map(renderNode)}
        </P>
      )
    default:
      return (
        <P key={index} color={tokens.errorColor}>
          unimplemented tag &lt;{tagName}&gt;
        </P>
      )
  }
}

function renderTextNode(node: Node, index: number): ReactNode {
  if (node.text.trim().length === 0) {
    return null
  }
  // sanity check - we shouldn't need a wrapper but sometimes
  // special elements such as iframes break the rendering
  return <P key={index}>{node.text}</P>
}

function renderNode(node: Node, index: number): ReactNode {
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
