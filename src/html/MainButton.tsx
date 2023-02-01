import { Pressable, PressableProps, ViewStyle } from 'react-native'
import { P } from './P'
import { tokens } from '@/styles'

type Props = {
  onPress: PressableProps['onPress']
  children: string
}

export function MainButton({ onPress, children }: Props) {
  return (
    <Pressable
      onPress={onPress}
      android_disableSound={true}
      style={buttonStyles}
    >
      <P align="center">{children}</P>
    </Pressable>
  )
}

const buttonStyles: ViewStyle = {
  backgroundColor: tokens.primaryColor,
  padding: tokens.space,
  borderRadius: tokens.radius,
  marginTop: tokens.space,
  marginBottom: tokens.space,
  marginLeft: tokens.space * 4,
  marginRight: tokens.space * 4,
}
