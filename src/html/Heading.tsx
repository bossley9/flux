import { P } from './P'
import { StyleSheet, Text, TextStyle } from 'react-native'
import { useTheme, Theme } from '@/theme'

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  align?: TextStyle['textAlign']
  color?: TextStyle['color']
  marginBottom?: TextStyle['margin']
  children?: React.ReactNode
  style?: TextStyle
}

export function Heading({
  level = 1,
  align,
  color,
  marginBottom: marginBottomInput,
  children,
  style,
}: Props) {
  const tokens = useTheme()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { marginTop, marginBottom, ...styles } = makeStyles({
    tokens,
    level,
    marginBottom: marginBottomInput,
  }).text
  return (
    <P
      align={align}
      color={color}
      marginTop={0}
      marginBottom={marginBottom}
      style={style}
    >
      <Text style={styles}>{children}</Text>
    </P>
  )
}

type StyleProps = {
  tokens: Theme
  level: number
  marginBottom?: TextStyle['margin']
}
export const makeStyles = ({ tokens, level, marginBottom }: StyleProps) => {
  const margin = marginBottom ?? tokens.space * 2
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
  return StyleSheet.create({
    text: {
      fontWeight: 'bold',
      fontSize,
      marginTop: margin,
      marginBottom: margin,
    },
  })
}
