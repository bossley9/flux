import { Pressable, StyleSheet, ViewStyle } from 'react-native'
import { useTheme, type Theme } from '@/theme'

type Props = {
  onPress?: () => void
  style?: ViewStyle
  children?: React.ReactNode
}

export function CardContainer({
  onPress,
  style: overrideStyles,
  children,
}: Props) {
  const styles = makeStyles({ tokens: useTheme() })
  function handlePress() {
    onPress?.()
  }
  return (
    <Pressable
      onPress={handlePress}
      style={{ ...styles.container, ...overrideStyles }}
    >
      {children}
    </Pressable>
  )
}

type StyleProps = {
  tokens: Theme
}
const makeStyles = ({ tokens }: StyleProps) =>
  StyleSheet.create({
    container: {
      minHeight: 120,
      padding: tokens.space,
      marginBottom: tokens.space * 2,
      borderRadius: tokens.radius,
      borderWidth: 1,
      backgroundColor: tokens.backgroundColor,
      borderColor: tokens.lightColor,
    },
  })
