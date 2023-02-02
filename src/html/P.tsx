import { Text, TextStyle } from 'react-native'
import { tokens } from '@/styles'

type Props = {
  children?: React.ReactNode
  align?: TextStyle['textAlign']
  color?: TextStyle['color']
  margin?: TextStyle['margin']
  marginTop?: TextStyle['margin']
  marginBottom?: TextStyle['margin']
}

export function P({
  children,
  align = 'left',
  color = tokens.foregroundColor,
  margin = tokens.space,
  marginTop,
  marginBottom,
}: Props) {
  const style: TextStyle = {
    fontSize: 14,
    color,
    textAlign: align,
    marginTop: marginTop ?? margin,
    marginBottom: marginBottom ?? margin,
  }
  return <Text style={style}>{children}</Text>
}
