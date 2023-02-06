import { StyleSheet, View } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { HeadingLink, MainButton } from '@/html'
import { useInfiniteQueryFeedEntries } from '@/services/queries'
import { RootScreen, RootScreenProps } from '@/navigation'
import { tokens } from '@/tokens'
import { EntryCard } from '@/components/EntryCard'
import { useMutationRefreshFeed } from '@/services/mutations'
import type { Entry } from '@/services/types'

type Props = RootScreenProps<RootScreen.Feed>

export function FeedScreen({ route }: Props) {
  const { feed } = route.params
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQueryFeedEntries({ feedId: feed.id })
  const { mutate: refreshFeed, isLoading } = useMutationRefreshFeed()

  function handleRefetchFeed() {
    refreshFeed(feed.id)
  }

  const total = data?.pages?.[0].total ?? 0
  const entries =
    data?.pages?.reduce<Entry[]>((acc, val) => [...acc, ...val.entries], []) ??
    []
  const unreadCount = entries.filter(
    (entry) => entry.status === 'unread'
  ).length

  return (
    <ScreenContainer
      style={styles.container}
      refreshEnabled
      refreshing={isFetchingNextPage || isLoading}
      onRefresh={handleRefetchFeed}
    >
      <HeadingLink href={feed.site_url}>
        {feed.title}{' '}
        {Boolean(total) && (
          <>
            ({unreadCount}/{total})
          </>
        )}
      </HeadingLink>
      <View style={styles.buttonWrapper}>
        <MainButton onPress={handleRefetchFeed} horizontalMargin={0}>
          Refetch feed
        </MainButton>
      </View>
      {entries.map((entry) => (
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
