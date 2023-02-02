import { Pressable, PressableProps, ViewStyle } from 'react-native'
import { P } from './P'
import { tokens } from '@/styles'

type Props = {
  onPress: PressableProps['onPress']
  disabled?: PressableProps['disabled']
  horizontalMargin?: ViewStyle['margin']
  children: string
}

export function MainButton({
  onPress,
  disabled,
  horizontalMargin = tokens.space * 4,
  children,
}: Props) {
  const buttonStyles: ViewStyle = {
    backgroundColor: tokens.primaryColor,
    padding: tokens.space,
    borderRadius: tokens.radius,
    marginTop: tokens.space,
    marginBottom: tokens.space,
    marginLeft: horizontalMargin,
    marginRight: horizontalMargin,
  }
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
