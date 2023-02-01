import { StyleSheet, View } from 'react-native'
import { tokens } from '@/styles'

type Props = { children?: React.ReactNode }

export function CardContainer({ children }: Props) {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    padding: tokens.space,
    marginBottom: tokens.space,
    borderRadius: tokens.radius,
    backgroundColor: tokens.primaryColor,
  },
})
