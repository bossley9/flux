import { Linking, Pressable, StyleSheet, Text, TextStyle } from 'react-native'
import { Heading } from './Heading'
import { tokens } from '@/tokens'

type LinkProps = {
  href: string
  children?: React.ReactNode
}

type HeadingLinkProps = LinkProps & {
  color?: TextStyle['color']
  marginBottom?: TextStyle['margin']
}

export function HeadingLink({
  href,
  color,
  marginBottom,
  children,
}: HeadingLinkProps) {
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
  function handlePress() {
    onPress()
  }
  return (
    <Pressable onPress={handlePress}>
      <Text style={textButtonStyles.text}>{children}</Text>
    </Pressable>
  )
}

const textButtonStyles = StyleSheet.create({
  text: {
    color: tokens.linkColor,
    textDecorationLine: 'underline',
  },
})
