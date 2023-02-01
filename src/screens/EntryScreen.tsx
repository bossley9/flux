import { Button, Linking, StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { RootScreen, RootScreenProps } from '@/navigation'
import { tokens } from '@/styles'

type Props = RootScreenProps<RootScreen.Entry>

export function EntryScreen({ route }: Props) {
  const { entry } = route.params

  function handleToggleRead() {
    console.log('toggle read')
  }

  function handleToggleStar() {
    console.log('toggle star')
  }

  function handleOpenExternal() {
    Linking.openURL(entry.url)
  }

  return (
    <ScreenContainer style={styles.container}>
      <Text>This is entry {entry.id}</Text>
      <Text>entry title is {entry.title}</Text>
      <Button title="toggle star" onPress={handleToggleStar} />
      <Button title="toggle read" onPress={handleToggleRead} />
      <Button title="external link" onPress={handleOpenExternal} />
      <Text>published {new Date(entry.published_at).toISOString()}</Text>
      <Text>entry content is {entry.content}</Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: tokens.space,
  },
})
