import { Pressable, PressableProps, ViewStyle } from 'react-native'
import { P } from './P'
import { tokens } from '@/styles'

type Props = {
  onPress: PressableProps['onPress']
  disabled?: PressableProps['disabled']
  children: string
}

export function MainButton({ onPress, disabled, children }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_disableSound={true}
      style={buttonStyles}
    >
      <P
        align="center"
        color={disabled ? tokens.lightColor : undefined}
        margin={0}
      >
        {children}
      </P>
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
