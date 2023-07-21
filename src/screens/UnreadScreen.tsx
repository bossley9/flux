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
import { EntryCardUnderlay } from '@/components/EntryCardUnderlay'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useQueryClient } from '@tanstack/react-query'
import { useMutationSetEntryRead } from '@/services/mutations'
import {
  useQueryUser,
  useInfiniteQueryEntries,
  useUserId,
} from '@/services/queries'
import { useEffect } from 'react'
import { useAppFocusEffect } from '@/useAppFocusEffect'
import { useMutationLogout } from '@/services/auth'
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
  const { isError } = useQueryUser()
  const { mutate: logout } = useMutationLogout()
  const queryClient = useQueryClient()
  const { mutate: setEntryRead } = useMutationSetEntryRead()
  const userId = useUserId()

  useEffect(() => {
    if (isError) {
      logout()
    }
  }, [isError])

  useAppFocusEffect(() => {
    queryClient.invalidateQueries(keys.getUserQueryKey())
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
    function handleSwipeableOpen() {
      setEntryRead({ entry, newStatus: 'read' })
    }

    return (
      <Swipeable
        renderRightActions={() => (
          <EntryCardUnderlay icon="mail" text="Mark as read" />
        )}
        onSwipeableWillOpen={handleSwipeableOpen}
      >
        <EntryCard key={entry.id} entry={entry} />
      </Swipeable>
    )
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
            message="You have no unread entries."
          />
        }
        onEndReached={handleOnEndReached}
        ListFooterComponent={<ListFooter showSkeleton={Boolean(hasNextPage)} />}
      />
    </ListContainer>
  )
}

const styles: ViewStyle = { padding: tokens.space }
