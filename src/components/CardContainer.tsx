import { Pressable, ViewStyle } from 'react-native'
import { tokens } from '@/styles'

type Props = {
  onPress: () => void
  children?: React.ReactNode
}

export function CardContainer({ onPress, children }: Props) {
  function handlePress() {
    onPress()
  }
  return (
    <Pressable onPress={handlePress} style={styles}>
      {children}
    </Pressable>
  )
}

const styles: ViewStyle = {
  minHeight: 100,
  padding: tokens.space,
  marginBottom: tokens.space * 2,
  borderRadius: tokens.radius,
  borderWidth: 1,
  borderColor: tokens.lightColor,
}
