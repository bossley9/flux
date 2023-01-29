import { StyleSheet, Text, View } from 'react-native'
import { tokens } from '@/styles'
import type { Entry } from '@/services/types'

type Props = {
  entry: Entry
}

export function EntryCard({ entry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{entry.title}</Text>
      <Text>by {entry.author}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: tokens.space,
  },
  title: {
    fontWeight: 'bold',
  },
})
