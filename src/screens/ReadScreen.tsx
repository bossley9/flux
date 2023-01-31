import { StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { tokens } from '@/styles'

export function ReadScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <Text>test text</Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
  },
})
