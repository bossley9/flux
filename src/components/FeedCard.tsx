import { Text, View } from 'react-native'
import { FeedEntry } from './FeedEntry'
import { useQueryFeedEntries } from '@/services/queries'
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
          <FeedEntry key={entry.id} entry={entry} />
        ))}
    </View>
  )
}
