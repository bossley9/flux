import { StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { RootScreen, ScreenProps } from '@/navigation'
import { tokens } from '@/styles'

type Props = ScreenProps<RootScreen.Entry>

export function EntryScreen({ route }: Props) {
  const { entry } = route.params

  return (
    <ScreenContainer style={styles.container}>
      <Text>This is entry {entry.id}</Text>
      <Text>entry title is {entry.title}</Text>
      <Text>entry content is {entry.content}</Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: tokens.space,
  },
})
