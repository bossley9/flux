import { Button, StyleSheet, Text, View } from 'react-native'
import { tokens } from '@/styles'
import type { Entry } from '@/services/types'
import { Screen, ScreenNavigationProp } from '@/navigation'

type Props<T extends Screen> = {
  entry: Entry
  navigation: ScreenNavigationProp<T>
}

export function EntryCard<T extends Screen>({ entry, navigation }: Props<T>) {
  const handleOpenEntry = () => {
    navigation.navigate(Screen.Entry, { entry })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text>by {entry.author}</Text>
      <Button title="open entry" onPress={handleOpenEntry} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    padding: tokens.space,
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
  },
})
