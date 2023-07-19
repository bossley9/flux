import { Pressable, PressableProps, ViewStyle } from 'react-native'
import { P } from '@/html/P'
import { tokens } from '@/tokens'

type Props = {
  onPress: PressableProps['onPress']
  disabled?: PressableProps['disabled']
  children: string
}

export function ActionButton({ onPress, disabled, children }: Props) {
  const buttonStyles: ViewStyle = {
    borderColor: tokens.foregroundColor,
    borderWidth: 1.5,
    padding: tokens.space / 2,
    borderRadius: tokens.radius,
    marginRight: tokens.space,
  }
  const activeStyles: ViewStyle = {
    backgroundColor: tokens.lightColor,
  }
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_disableSound={true}
      style={({ pressed }) => ({
        ...buttonStyles,
        ...(pressed && activeStyles),
      })}
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
