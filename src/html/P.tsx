import { StyleSheet, Text, TextStyle } from 'react-native'
import { useTheme, type Theme } from '@/theme'

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
  color,
  margin,
  marginTop: marginTopInput,
  marginBottom: marginBottomInput,
  style: overrideStyles,
}: Props) {
  const tokens = useTheme()
  const baseMargin = margin ?? tokens.space
  const { marginBottom, marginTop, ...restStyles } = makeStyles({
    tokens,
    color,
    marginTop: marginTopInput ?? baseMargin,
    marginBottom: marginBottomInput ?? baseMargin,
  }).text
  const style = {
    marginBottom: marginBottom,
    marginTop: marginTop,
    ...restStyles,
    textAlign: align,
    ...overrideStyles,
  }
  return <Text style={style}>{children}</Text>
}

type StyleProps = {
  tokens: Theme
  color?: TextStyle['color']
  marginTop?: TextStyle['margin']
  marginBottom?: TextStyle['margin']
}
export const makeStyles = ({
  tokens,
  color,
  marginTop,
  marginBottom,
}: StyleProps) => {
  return StyleSheet.create({
    text: {
      fontSize: tokens.fontSize.base,
      color: color ?? tokens.foregroundColor,
      marginTop: marginTop ?? tokens.space,
      marginBottom: marginBottom ?? tokens.space,
    },
  })
}
