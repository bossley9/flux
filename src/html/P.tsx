import { Text, TextStyle } from 'react-native'
import { tokens } from '@/styles'

type Props = {
  children?: React.ReactNode
  align?: TextStyle['textAlign']
}

export function P({ children, align = 'left' }: Props) {
  const style: TextStyle = {
    color: tokens.foregroundColor,
    textAlign: align,
  }
  return <Text style={style}>{children}</Text>
}
