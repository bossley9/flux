import { StyleSheet, Text, View } from 'react-native'
import type { Entry } from '@/services/types'

type Props = {
  entry: Entry
}

export function FeedEntry({ entry }: Props) {
  return (
    <View>
      <Text style={styles.title}>
        # {entry.title} ({entry.status})
      </Text>
      <Text>by {entry.author}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
})
