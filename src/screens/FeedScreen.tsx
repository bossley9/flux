import { StyleSheet, View } from 'react-native'
import { ScrollScreenContainer } from '@/components/ScrollScreenContainer'
import { HeadingLink, MainButton } from '@/html'
import { useInfiniteQueryFeedEntries } from '@/services/queries'
import { RootScreen, RootScreenProps } from '@/navigation'
import { tokens } from '@/tokens'
import { EntryCard } from '@/components/EntryCard'
import { useMutationRefreshFeed } from '@/services/mutations'
import { flattenEntryLists } from '@/utils'

type Props = RootScreenProps<RootScreen.Feed>

export function FeedScreen({ route }: Props) {
  const { feed } = route.params
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQueryFeedEntries({ feedId: feed.id })
  const { mutate: refreshFeed, isLoading } = useMutationRefreshFeed()

  function handleRefetchFeed() {
    refreshFeed(feed.id)
  }

  const entryList = flattenEntryLists(data?.pages ?? [])

  const unreadCount = entryList.entries.filter(
    (entry) => entry.status === 'unread'
  ).length

  return (
    <ScrollScreenContainer
      style={styles.container}
      refreshEnabled
      refreshing={isFetchingNextPage || isLoading}
      onRefresh={handleRefetchFeed}
    >
      <HeadingLink
        href={feed.site_url}
        color={feed.disabled ? tokens.errorColor : undefined}
      >
        {feed.title}{' '}
        {Boolean(entryList.total) && (
          <>
            ({unreadCount}/{entryList.total})
          </>
        )}
      </HeadingLink>
      <View style={styles.buttonWrapper}>
        <MainButton onPress={handleRefetchFeed} horizontalMargin={0}>
          Refetch feed
        </MainButton>
      </View>
      {entryList.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} displayStatus />
      ))}
      {hasNextPage && (
        <MainButton
          onPress={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </MainButton>
      )}
      <View style={{ height: tokens.space * (hasNextPage ? 2 : 4) }} />
    </ScrollScreenContainer>
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
