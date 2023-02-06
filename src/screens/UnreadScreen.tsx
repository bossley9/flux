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
import { useInfiniteQueryEntries, useUserId } from '@/services/queries'
import { useAppFocusEffect } from '@/useAppFocusEffect'
import * as keys from '@/services/keys'
import { tokens } from '@/tokens'
import { EntryCard } from '@/components/EntryCard'
import { flattenEntryLists } from '@/utils'
import type { FetchEntriesOptions } from '@/services/keys'
import type { Entry } from '@/services/types'

export function UnreadScreen() {
  const entryOptions: FetchEntriesOptions = {
    status: 'unread',
  }
  const { data, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQueryEntries(entryOptions)
  const queryClient = useQueryClient()
  const userId = useUserId()

  useAppFocusEffect(() => {
    queryClient.invalidateQueries(
      keys.getEntriesInfiniteQueryKey({ userId, ...entryOptions })
    )
  })

  function handleRefresh() {
    queryClient.invalidateQueries(
      keys.getEntriesInfiniteQueryKey({ userId, ...entryOptions })
    )
  }

  function handleOnEndReached() {
    fetchNextPage()
  }

  function renderItem({
    item: entry,
  }: ListRenderItemInfo<Entry>): React.ReactElement {
    return <EntryCard key={entry.id} entry={entry} />
  }

  const entryList = flattenEntryLists(data?.pages ?? [])
  const title = `Unread (${entryList.total})`

  return (
    <ListContainer title={title}>
      <FlatList
        style={styles}
        data={entryList.entries}
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
            message="You have no unread feeds."
          />
        }
        onEndReached={handleOnEndReached}
        ListFooterComponent={<ListFooter showSkeleton={Boolean(hasNextPage)} />}
      />
    </ListContainer>
  )
}

const styles: ViewStyle = { padding: tokens.space }
