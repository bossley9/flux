import { Text, TextStyle } from 'react-native'
import { tokens } from '@/styles'

type Props = {
  children?: React.ReactNode
  align?: TextStyle['textAlign']
  color?: TextStyle['color']
}

export function P({
  children,
  align = 'left',
  color = tokens.foregroundColor,
}: Props) {
  const style: TextStyle = {
    fontSize: 14,
    color,
    textAlign: align,
  }
  return <Text style={style}>{children}</Text>
}
