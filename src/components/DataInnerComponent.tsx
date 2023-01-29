import { StyleSheet, Text } from 'react-native'
import { useQueryFeedEntries } from '../networking/queries'
import type { Feed } from '../networking/types'

type Props = {
  feed: Feed
}

export function DataInnerComponent({ feed }: Props) {
  const { data: feedEntries, isLoading: isEntriesLoading } =
    useQueryFeedEntries(feed)

  return isEntriesLoading ? (
    <Text>loading...</Text>
  ) : (
    <Text style={styles.entry}>
      {JSON.stringify(feedEntries?.entries?.[0])}
    </Text>
  )
}

const styles = StyleSheet.create({
  entry: {
    fontWeight: 'bold',
  },
})
