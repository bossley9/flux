import { Text, TextStyle } from 'react-native'
import { tokens } from '@/tokens'

type Props = {
  children?: React.ReactNode
  align?: TextStyle['textAlign']
  color?: TextStyle['color']
  margin?: TextStyle['margin']
  marginTop?: TextStyle['margin']
  marginBottom?: TextStyle['margin']
  style?: TextStyle
}

export function P({
  children,
  align = 'left',
  color = tokens.foregroundColor,
  margin = tokens.space,
  marginTop,
  marginBottom,
  style: overrideStyles,
}: Props) {
  const style: TextStyle = {
    fontSize: tokens.fontSize.base,
    color,
    textAlign: align,
    marginTop: marginTop ?? margin,
    marginBottom: marginBottom ?? margin,
    ...overrideStyles,
  }
  return <Text style={style}>{children}</Text>
}
