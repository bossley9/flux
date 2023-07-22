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
import { EntryCardUnderlay } from '@/components/EntryCardUnderlay'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useQueryClient } from '@tanstack/react-query'
import { useMutationSetEntryRead } from '@/services/mutations'
import { useInfiniteQueryEntries, useUserId } from '@/services/queries'
import * as keys from '@/services/keys'
import { useTheme, type Theme } from '@/theme'
import { EntryCard } from '@/components/EntryCard'
import { flattenEntryLists } from '@/utils'
import type { FetchEntriesOptions } from '@/services/keys'
import type { Entry } from '@/services/types'

export function HistoryScreen() {
  const tokens = useTheme()
  const entryOptions: FetchEntriesOptions = {
    status: 'read',
    order: 'changed_at',
  }
  const { data, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQueryEntries(entryOptions)
  const queryClient = useQueryClient()
  const { mutate: setEntryRead } = useMutationSetEntryRead()
  const userId = useUserId()
  const styles = makeStyles({ tokens })

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
    function handleSwipeableOpen() {
      setEntryRead({ entry, newStatus: 'unread' })
    }

    return (
      <Swipeable
        renderRightActions={() => (
          <EntryCardUnderlay icon="mail-outline" text="Mark as unread" />
        )}
        onSwipeableWillOpen={handleSwipeableOpen}
      >
        <EntryCard key={entry.id} entry={entry} />
      </Swipeable>
    )
  }

  const entryList = flattenEntryLists(data?.pages ?? [])
  const title = `History (${entryList.total})`

  return (
    <ListContainer title={title}>
      <FlatList
        style={styles.list}
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
            message="You have no read entries."
          />
        }
        onEndReached={handleOnEndReached}
        ListFooterComponent={<ListFooter showSkeleton={Boolean(hasNextPage)} />}
      />
    </ListContainer>
  )
}

type StyleProps = {
  tokens: Theme
}
const makeStyles = ({ tokens }: StyleProps) =>
  StyleSheet.create({
    list: {
      padding: tokens.space,
    },
  })
