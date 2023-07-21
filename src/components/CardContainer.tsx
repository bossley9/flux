import { Pressable, ViewStyle } from 'react-native'
import { tokens } from '@/tokens'

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
  function handlePress() {
    onPress?.()
  }
  return (
    <Pressable onPress={handlePress} style={{ ...styles, ...overrideStyles }}>
      {children}
    </Pressable>
  )
}

const styles: ViewStyle = {
  minHeight: 120,
  padding: tokens.space,
  marginBottom: tokens.space * 2,
  borderRadius: tokens.radius,
  borderWidth: 1,
  backgroundColor: tokens.backgroundColor,
  borderColor: tokens.lightColor,
}
