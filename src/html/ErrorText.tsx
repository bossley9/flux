import { P } from './P'
import { StyleSheet, Text } from 'react-native'
import { tokens } from '@/tokens'

type Props = { children?: React.ReactNode }

export function ErrorText({ children }: Props) {
  return (
    <P color={tokens.errorColor} align="center">
      <Text style={styles.text}>{children}</Text>
    </P>
  )
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
})
