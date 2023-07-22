import { Linking, Pressable, StyleSheet, Text, TextStyle } from 'react-native'
import { Heading } from './Heading'
import { useTheme, type Theme } from '@/theme'

type HeadingLinkProps = {
  href: string
  children?: React.ReactNode
  color?: TextStyle['color']
  marginBottom?: TextStyle['margin']
}

export function HeadingLink({
  href,
  color,
  marginBottom,
  children,
}: HeadingLinkProps) {
  const tokens = useTheme()
  function handlePress() {
    Linking.openURL(href)
  }
  return (
    <Pressable onPress={handlePress}>
      <Heading color={color ?? tokens.linkColor} marginBottom={marginBottom}>
        {children}
      </Heading>
    </Pressable>
  )
}

type TextButtonProps = {
  onPress: () => void
  children?: React.ReactNode
}

export function TextButton({ onPress, children }: TextButtonProps) {
  const styles = makeStyles({ tokens: useTheme() })
  function handlePress() {
    onPress()
  }
  return (
    <Pressable onPress={handlePress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

type StyleProps = {
  tokens: Theme
}
const makeStyles = ({ tokens }: StyleProps) =>
  StyleSheet.create({
    text: {
      color: tokens.linkColor,
      textDecorationLine: 'underline',
    },
  })
