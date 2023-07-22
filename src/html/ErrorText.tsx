import { P } from './P'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@/theme'

type Props = { children?: React.ReactNode }

export function ErrorText({ children }: Props) {
  const tokens = useTheme()
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
