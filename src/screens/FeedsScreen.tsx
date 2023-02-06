import {
  FlatList,
  RefreshControl,
  ViewStyle,
  ListRenderItemInfo,
} from 'react-native'
import {
  ListContainer,
  ListEmptyPlaceholder,
  ListFooter,
} from '@/components/ListContainer'
import { useQueryClient } from '@tanstack/react-query'
import { useQueryFeeds, useUserId } from '@/services/queries'
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

  function handleRefresh() {
    queryClient.invalidateQueries(keys.getFeedsQueryKey({ userId }))
  }

  function renderItem({
    item: feed,
  }: ListRenderItemInfo<Feed>): React.ReactElement {
    return <FeedCard key={feed.id} feed={feed} />
  }

  const feeds = data?.sort(sortByTitle) ?? []
  const title = `Feeds (${data?.length ?? 0})`

  return (
    <ListContainer title={title}>
      <FlatList
        style={styles}
        data={feeds}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
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

const styles: ViewStyle = { padding: tokens.space }
