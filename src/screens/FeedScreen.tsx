import { StyleSheet, View } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { HeadingLink, MainButton } from '@/html'
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
    console.log('refetch feed')
  }

  return (
    <ScreenContainer
      style={styles.container}
      refreshEnabled
      refreshing={isFetching}
      onRefresh={handleRefetchFeed}
    >
      <HeadingLink href={feed.site_url}>{feed.title}</HeadingLink>
      <View style={styles.buttonWrapper}>
        <MainButton onPress={handleRefetchFeed} horizontalMargin={0}>
          Refetch feed
        </MainButton>
      </View>
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
  },
  buttonWrapper: {
    marginBottom: tokens.space * 3,
  },
})
