import { Pressable, PressableProps, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { P } from '@/html/P'
import { useTheme, type Theme } from '@/theme'

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
  const tokens = useTheme()
  const defaultColor = primary ? tokens.primaryColor : tokens.foregroundColor
  const styles = makeStyles({
    tokens,
    isDisabled: Boolean(disabled),
    defaultColor,
  })
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_disableSound={true}
      style={({ pressed }) => ({
        ...styles.container,
        ...(pressed && styles.containerActive),
      })}
    >
      {icon && (
        <Icon
          name={icon}
          size={20}
          style={styles.icon}
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

type StyleProps = {
  tokens: Theme
  defaultColor: string
  isDisabled: boolean
}
const makeStyles = ({ tokens, defaultColor, isDisabled }: StyleProps) =>
  StyleSheet.create({
    container: {
      borderColor: isDisabled ? tokens.lightColor : defaultColor,
      borderWidth: 1.5,
      padding: tokens.space / 2,
      paddingLeft: tokens.space,
      paddingRight: tokens.space,
      borderRadius: tokens.radius,
      marginRight: tokens.space,
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerActive: {
      backgroundColor: tokens.darkColor,
    },
    icon: {
      marginRight: tokens.space / 2,
    },
  })
