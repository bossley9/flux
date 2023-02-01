import { P } from '@/html'
import { Text, TextStyle } from 'react-native'

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  align?: TextStyle['textAlign']
  color?: TextStyle['color']
  children?: React.ReactNode
}

export function Heading({ level = 1, align, color, children }: Props) {
  let fontSize: number
  switch (level) {
    case 6:
      fontSize = 11.2
      break
    case 5:
      fontSize = 14
      break
    case 4:
      fontSize = 17.5
      break
    case 3:
      fontSize = 21.88
      break
    case 2:
      fontSize = 27.34
      break
    case 1:
    default:
      fontSize = 34.1
  }
  const styles: TextStyle = {
    fontWeight: 'bold',
    fontSize,
  }
  return (
    <P align={align} color={color}>
      <Text style={styles}>{children}</Text>
    </P>
  )
}
