import { StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useQueryFeedEntries } from '@/services/queries'
import { RootScreen, RootScreenProps } from '@/navigation'
import { tokens } from '@/styles'
import { EntryCard } from '@/components/EntryCard'

type Props = RootScreenProps<RootScreen.Feed>

export function FeedScreen({ route }: Props) {
  const { feed } = route.params
  const { data, isFetching } = useQueryFeedEntries({ feedId: feed.id })

  function handleRefetchFeed() {
    // TODO add mutation to refetch feed, then invalidate (or update) query
  }

  return (
    <ScreenContainer style={styles.container}>
      <Text>{feed.title}</Text>
      <Button title="Refetch feed" onPress={handleRefetchFeed} />
      <Text>This is entry {feed.id}</Text>
      {isFetching && <Text>fetching...</Text>}
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: tokens.space,
  },
})
