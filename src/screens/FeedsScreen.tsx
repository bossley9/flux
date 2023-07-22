import {
  FlatList,
  RefreshControl,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native'
import {
  ListContainer,
  ListEmptyPlaceholder,
  ListFooter,
} from '@/components/ListContainer'
import { useQueryClient } from '@tanstack/react-query'
import {
  useQueryFeeds,
  useUserId,
  useQueryFeedCounters,
} from '@/services/queries'
import * as keys from '@/services/keys'
import { tokens } from '@/tokens'
import { FeedCard } from '@/components/FeedCard'
import type { Feed } from '@/services/types'

function sortByTitle(a: Feed, b: Feed): number {
  return a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
}

export function FeedsScreen() {
  const { data, isFetching } = useQueryFeeds()
  const queryClient = useQueryClient()
  const userId = useUserId()
  const { data: feedCounters, isFetching: isFetchingCounters } =
    useQueryFeedCounters()

  function handleRefresh() {
    queryClient.invalidateQueries({
      queryKey: keys.getFeedsQueryKey({ userId }),
    })
    queryClient.invalidateQueries({
      queryKey: keys.getFeedCountersQueryKey({ userId }),
    })
  }

  function renderItem({
    item: feed,
  }: ListRenderItemInfo<Feed>): React.ReactElement {
    const unreadCount = feedCounters?.unreads?.[String(feed.id)] ?? 0
    return <FeedCard key={feed.id} feed={feed} unreadCount={unreadCount} />
  }

  const feeds = data?.sort(sortByTitle) ?? []
  const title = `Feeds (${data?.length ?? 0})`

  return (
    <ListContainer title={title}>
      <FlatList
        style={styles.list}
        data={feeds}
        extraData={feedCounters}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isFetching || isFetchingCounters}
            onRefresh={handleRefresh}
            progressBackgroundColor={tokens.backgroundColor}
            colors={[tokens.lightColor]}
          />
        }
        ListEmptyComponent={
          <ListEmptyPlaceholder
            isLoading={isFetching}
            message="You have no feeds!"
          />
        }
        ListFooterComponent={<ListFooter showSkeleton={false} />}
      />
    </ListContainer>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: tokens.space,
  },
})
