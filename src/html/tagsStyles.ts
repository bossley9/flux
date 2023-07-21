import { getHeadingStyles } from '@/html/Heading'
import { getParagraphStyles } from '@/html/P'
import { tokens } from '@/tokens'
import { type MixedStyleDeclaration } from 'react-native-render-html'

function getHeadingStylesWrapped(level: number) {
  const styles = getHeadingStyles(level)
  return {
    ...styles,
    marginTop: Number(styles.marginTop) / 4,
    marginBottom: Number(styles.marginBottom) / 4,
    color: tokens.foregroundColor,
  }
}

export const tagsStyles: Record<string, MixedStyleDeclaration> = {
  h1: getHeadingStylesWrapped(1),
  h2: getHeadingStylesWrapped(2),
  h3: getHeadingStylesWrapped(3),
  h4: getHeadingStylesWrapped(4),
  h5: getHeadingStylesWrapped(5),
  h6: getHeadingStylesWrapped(6),
  p: getParagraphStyles(),
  a: { color: tokens.linkColor },
  blockquote: {
    borderLeftColor: tokens.darkColor,
    borderLeftWidth: tokens.space / 2,
    paddingLeft: tokens.space,
    margin: 0,
  },
  li: {
    ...getParagraphStyles(),
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
}
