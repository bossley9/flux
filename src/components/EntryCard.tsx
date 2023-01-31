import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { tokens } from '@/styles'
import type { Entry } from '@/services/types'
import { RootScreen, RootScreenNavigationProp } from '@/navigation'

type Props = { entry: Entry }

export function EntryCard({ entry }: Props) {
  const navigation = useNavigation<RootScreenNavigationProp<RootScreen.Main>>()

  const handleOpenEntry = () => {
    navigation.navigate(RootScreen.Entry, { entry })
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
