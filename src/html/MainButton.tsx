import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native'
import { P } from './P'
import { tokens } from '@/tokens'

type Props = {
  onPress: PressableProps['onPress']
  disabled?: PressableProps['disabled']
  horizontalMargin?: ViewStyle['margin']
  children: string
}

export function MainButton({
  onPress,
  disabled,
  horizontalMargin,
  children,
}: Props) {
  const styles = makeStyles({ horizontalMargin })
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_disableSound={true}
      style={styles.container}
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

type StyleProps = {
  horizontalMargin?: ViewStyle['margin']
}
const makeStyles = ({ horizontalMargin }: StyleProps) => {
  const margin = horizontalMargin ?? tokens.space * 4
  return StyleSheet.create({
    container: {
      backgroundColor: tokens.primaryColor,
      padding: tokens.space,
      borderRadius: tokens.radius,
      marginTop: tokens.space,
      marginBottom: tokens.space,
      marginLeft: margin,
      marginRight: margin,
    },
  })
}
