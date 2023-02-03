import { Linking, Pressable, Text, TextStyle } from 'react-native'
import { Heading } from './Heading'
import { tokens } from '@/styles'

const styles: TextStyle = {
  color: tokens.linkColor,
  textDecorationLine: 'underline',
}

type LinkProps = {
  href: string
  children?: React.ReactNode
}

type HeadingLinkProps = LinkProps & {
  marginBottom?: TextStyle['margin']
}

export function HeadingLink({
  href,
  marginBottom,
  children,
}: HeadingLinkProps) {
  function handlePress() {
    Linking.openURL(href)
  }
  return (
    <Pressable onPress={handlePress}>
      <Heading color={tokens.linkColor} marginBottom={marginBottom}>
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
      <Text style={styles}>{children}</Text>
    </Pressable>
  )
}
