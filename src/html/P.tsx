import { StyleSheet, Text, TextStyle } from 'react-native'
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
  color,
  margin = tokens.space,
  marginTop: marginTopInput,
  marginBottom: marginBottomInput,
  style: overrideStyles,
}: Props) {
  const { marginBottom, marginTop, ...restStyles } = makeStyles({
    color,
    marginTop: marginTopInput ?? margin,
    marginBottom: marginBottomInput ?? margin,
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
  color?: TextStyle['color']
  marginTop?: TextStyle['margin']
  marginBottom?: TextStyle['margin']
}
export const makeStyles = ({ color, marginTop, marginBottom }: StyleProps) => {
  return StyleSheet.create({
    text: {
      fontSize: tokens.fontSize.base,
      color: color ?? tokens.foregroundColor,
      marginTop: marginTop ?? tokens.space,
      marginBottom: marginBottom ?? tokens.space,
    },
  })
}
