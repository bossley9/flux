import { Text, TextStyle } from 'react-native'
import { tokens } from '@/tokens'

type Props = {
  children?: React.ReactNode
  align?: TextStyle['textAlign']
  color?: TextStyle['color']
  margin?: string | number
  marginTop?: string | number
  marginBottom?: string | number
  style?: TextStyle
}

export function getParagraphStyles(
  color: TextStyle['color'] = tokens.foregroundColor,
  marginTop: string | number = tokens.space,
  marginBottom: string | number = tokens.space
) {
  return {
    fontSize: tokens.fontSize.base,
    color,
    marginTop,
    marginBottom,
  }
}

export function P({
  children,
  align = 'left',
  color = tokens.foregroundColor,
  margin = tokens.space,
  marginTop: marginTopInput,
  marginBottom: marginBottomInput,
  style: overrideStyles,
}: Props) {
  const { marginBottom, marginTop, ...restStyles } = getParagraphStyles(
    color,
    marginTopInput ?? margin,
    marginBottomInput ?? margin
  )
  const style = {
    marginBottom: marginBottom,
    marginTop: marginTop,
    ...restStyles,
    textAlign: align,
    ...overrideStyles,
  } as TextStyle
  return <Text style={style}>{children}</Text>
}
