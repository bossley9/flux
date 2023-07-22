import { useWindowDimensions } from 'react-native'
import { makeStyles as makeHeadingStyles } from '@/html/Heading'
import { makeStyles as makeParagraphStyles } from '@/html/P'
import { useTheme, type Theme } from '@/theme'
import Renderer, { type MixedStyleDeclaration } from 'react-native-render-html'

function getHeadingStylesWrapped(level: number, tokens: Theme) {
  const styles = makeHeadingStyles({ tokens, level }).text
  return {
    ...styles,
    marginTop: Number(styles.marginTop) / 4,
    marginBottom: Number(styles.marginBottom) / 4,
    color: tokens.foregroundColor,
  }
}

function getParagraphStylesWrapped(tokens: Theme) {
  const styles = makeParagraphStyles({ tokens }).text
  return {
    ...styles,
    marginTop: String(styles.marginTop),
    marginBottom: String(styles.marginBottom),
  }
}

type StyleProps = {
  tokens: Theme
}
const makeStyles = ({
  tokens,
}: StyleProps): Record<string, MixedStyleDeclaration> => ({
  h1: getHeadingStylesWrapped(1, tokens),
  h2: getHeadingStylesWrapped(2, tokens),
  h3: getHeadingStylesWrapped(3, tokens),
  h4: getHeadingStylesWrapped(4, tokens),
  h5: getHeadingStylesWrapped(5, tokens),
  h6: getHeadingStylesWrapped(6, tokens),
  p: getParagraphStylesWrapped(tokens),
  a: { color: tokens.linkColor },
  blockquote: {
    borderLeftColor: tokens.darkColor,
    borderLeftWidth: tokens.space / 2,
    paddingLeft: tokens.space,
    margin: 0,
  },
  li: {
    ...getParagraphStylesWrapped(tokens),
    margin: 0,
    top: -3,
    paddingLeft: tokens.space,
  },
  pre: {
    backgroundColor: tokens.darkColor,
    borderRadius: tokens.radius,
    padding: tokens.space,
    paddingBottom: 0,
  },
  code: {
    backgroundColor: tokens.darkColor,
    fontFamily: tokens.fontFamily.code,
  },
})

type Props = {
  html: string
}
export function RenderHtml({ html }: Props) {
  const tokens = useTheme()
  const contentWidth = useWindowDimensions().width - tokens.space * 2
  return (
    <Renderer
      contentWidth={contentWidth}
      source={{ html }}
      tagsStyles={makeStyles({ tokens })}
      baseStyle={{
        marginTop: tokens.space * 2,
        marginBottom: tokens.space * 8,
      }}
    />
  )
}
