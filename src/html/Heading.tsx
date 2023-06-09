import { P } from './P'
import { Text, TextStyle } from 'react-native'
import { tokens } from '@/tokens'

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  align?: TextStyle['textAlign']
  color?: TextStyle['color']
  marginBottom?: TextStyle['margin']
  children?: React.ReactNode
}

export function Heading({
  level = 1,
  align,
  color,
  marginBottom = tokens.space * 2,
  children,
}: Props) {
  let fontSize: number
  switch (level) {
    case 6:
      fontSize = tokens.fontSize.base0
      break
    case 5:
      fontSize = tokens.fontSize.base
      break
    case 4:
      fontSize = tokens.fontSize.base1
      break
    case 3:
      fontSize = tokens.fontSize.base2
      break
    case 2:
      fontSize = tokens.fontSize.base3
      break
    case 1:
    default:
      fontSize = tokens.fontSize.base4
  }
  const styles: TextStyle = {
    fontWeight: 'bold',
    fontSize,
  }
  return (
    <P align={align} color={color} marginTop={0} marginBottom={marginBottom}>
      <Text style={styles}>{children}</Text>
    </P>
  )
}
