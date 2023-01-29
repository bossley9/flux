import { StyleSheet, Text, View } from 'react-native'
import { EntryCard } from './EntryCard'
import { useQueryFeedEntries } from '@/services/queries'
import { tokens } from '@/styles'
import type { Feed } from '@/services/types'

type Props = {
  feed: Feed
}

export function FeedCard({ feed }: Props) {
  const { data, isLoading } = useQueryFeedEntries(feed)

  return (
    <View>
      {isLoading && <Text>loading...</Text>}
      {data?.entries
        .filter((entry) => entry.status === 'unread')
        .map((entry) => (
          <View key={entry.id} style={styles.entryWrapper}>
            <EntryCard entry={entry} />
          </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  entryWrapper: {
    marginBottom: tokens.space,
  },
})
