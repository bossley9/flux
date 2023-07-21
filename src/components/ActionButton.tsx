import { Pressable, PressableProps, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { P } from '@/html/P'
import { tokens } from '@/tokens'

type Props = {
  onPress: PressableProps['onPress']
  icon?: string
  primary?: boolean
  disabled?: PressableProps['disabled']
  children: string
}

export function ActionButton({
  onPress,
  icon,
  primary = false,
  disabled,
  children,
}: Props) {
  const defaultColor = primary ? tokens.primaryColor : tokens.foregroundColor
  const buttonStyles: ViewStyle = {
    borderColor: disabled ? tokens.lightColor : defaultColor,
    borderWidth: 1.5,
    padding: tokens.space / 2,
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
    borderRadius: tokens.radius,
    marginRight: tokens.space,
    flexDirection: 'row',
  }
  const activeStyles: ViewStyle = {
    backgroundColor: tokens.darkColor,
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
      {icon && (
        <Icon
          name={icon}
          size={20}
          style={{ marginRight: tokens.space / 2 }}
          color={disabled ? tokens.lightColor : defaultColor}
        />
      )}
      <P
        align="center"
        color={disabled ? tokens.lightColor : defaultColor}
        margin={0}
      >
        {children}
      </P>
    </Pressable>
  )
}
