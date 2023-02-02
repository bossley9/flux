import { Linking, Pressable, Text, TextStyle } from 'react-native'
import { Heading } from './Heading'
import { tokens } from '@/styles'

type Props = {
  href: string
  children?: React.ReactNode
}

export function Link({ href, children }: Props) {
  function handlePress() {
    Linking.openURL(href)
  }
  return (
    <Pressable onPress={handlePress}>
      <Text style={styles}>{children}</Text>
    </Pressable>
  )
}

const styles: TextStyle = {
  color: tokens.linkColor,
  textDecorationLine: 'underline',
}

export function HeadingLink({ href, children }: Props) {
  function handlePress() {
    Linking.openURL(href)
  }
  return (
    <Pressable onPress={handlePress}>
      <Heading color={tokens.linkColor}>{children}</Heading>
    </Pressable>
  )
}
