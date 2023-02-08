import { ReactNode } from 'react'
import { View, Linking, ScrollView, Text } from 'react-native'
import { P } from './P'
import { linkStyles } from './Link'
import { Heading } from './Heading'
import { parse, Node, NodeType } from 'node-html-parser'
import { tokens } from '@/tokens'
import he from 'he'

function getKey(node: Node, index: number): string {
  return node.range[0] + '-' + node.range[1] + '-' + index
}

function isBlankNode(node: Node): boolean {
  const src = node.toString()
  const hasNoChildren = node.childNodes.length === 0
  const isIframe = src.indexOf('<iframe') === 0
  return hasNoChildren && !isIframe
}

function isWhitespaceTextNode(node: Node): boolean {
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

function renderHeadingNode(
  node: Node,
  index: number,
  level: 1 | 2 | 3 | 4 | 5 | 6
): ReactNode {
  return (
    <Heading key={getKey(node, index)} level={level} marginBottom={0}>
      {node.childNodes.map(renderNode)}
    </Heading>
  )
}

function renderListItemNode(node: Node, index: number): ReactNode {
  const parent = node.parentNode
  const parentType = parent.tagName.toLocaleLowerCase()
  const key = getKey(node, index)

  const listIndex =
    parent.childNodes
      // filter out whitespace values
      .filter((child) => !isWhitespaceTextNode(child))
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
        <P key={key} margin={tokens.space / 4}>
          {listIndex}. {node.childNodes.map(renderNode)}
        </P>
      )

    default:
      // sanity check - if all else fails, render a normal node
      return <Text key={key}>{node.childNodes.map(renderNode)}</Text>
  }
}

function renderPreNode(node: Node, index: number): ReactNode {
  const rawSrc = node.toString()
  let src = rawSrc.substring('<pre>'.length, rawSrc.length - '</pre>'.length)

  if (src.indexOf('<code>') === 0) {
    src = src.substring('<code>'.length, src.length - '</code>'.length)
  }

  src = src.replace(/\n$/, '')

  return (
    <View>
      <ScrollView
        key={getKey(node, index)}
        horizontal={true}
        style={{
          backgroundColor: tokens.darkColor,
          padding: tokens.space,
        }}
      >
        <P
          key={getKey(node, index)}
          margin={0}
          style={{
            paddingRight: tokens.space,
            fontFamily: tokens.fontFamily.code,
            fontSize: tokens.fontSize.code,
          }}
        >
          {he.decode(src)}
        </P>
      </ScrollView>
    </View>
  )
}

function renderElementNode(node: Node, index: number): ReactNode {
  const children = node.childNodes
  if (isBlankNode(node)) {
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
    case 'em':
      return (
        <P key={key} style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
          {children.map(renderNode)}
        </P>
      )
    case 'code':
      return (
        <P
          key={key}
          style={{
            color: tokens.secondaryColor,
            fontFamily: tokens.fontFamily.code,
            fontSize: tokens.fontSize.code,
          }}
        >
          {children.map(renderNode)}
        </P>
      )
    case 'blockquote':
      return (
        <View key={key} style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: tokens.space / 2,
              backgroundColor: tokens.darkColor,
            }}
          />
          <View style={{ paddingLeft: tokens.space / 2 }}>
            {children.map(renderNode)}
          </View>
        </View>
      )
    case 'h1':
      return renderHeadingNode(node, index, 1)
    case 'h2':
      return renderHeadingNode(node, index, 2)
    case 'h3':
      return renderHeadingNode(node, index, 3)
    case 'h4':
      return renderHeadingNode(node, index, 4)
    case 'h5':
      return renderHeadingNode(node, index, 5)
    case 'h6':
      return renderHeadingNode(node, index, 6)
    case 'ul':
    case 'ol':
      return (
        <View key={key} style={{ paddingLeft: tokens.space * 1.5 }}>
          {children.map(renderNode)}
        </View>
      )
    case 'li':
      return renderListItemNode(node, index)
    case 'pre':
      return renderPreNode(node, index)
    case 'figure':
      return (
        <P key={key} margin={0}>
          {children.map(renderNode)}
        </P>
      )
    case 'sup':
      return (
        <View key={key} style={{ flex: 1, justifyContent: 'flex-start' }}>
          <P margin={0} style={{ fontSize: tokens.fontSize.base0 }}>
            {children.map(renderNode)}
          </P>
        </View>
      )
    case 'iframe':
      return null
    case 'picture':
    case 'figcaption':
    case 'table':
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
  return (
    <Text key={getKey(node, index)}>
      {node.text.replace(/\n/g, ' ').replace(/ {2}/g, ' ')}
    </Text>
  )
}

function renderNode(node: Node, index: number): ReactNode {
  if (isWhitespaceTextNode(node)) return null

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
    <View style={{ marginBottom: tokens.space * 8 }}>
      {root.childNodes.map(renderNode)}
    </View>
  )
}
