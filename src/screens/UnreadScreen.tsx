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
import { CardContainer } from '@/components/CardContainer'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { P } from '@/html'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useMutationLogout } from '@/services/auth'
import { useMutationSetEntryRead } from '@/services/mutations'
import { useInfiniteQueryEntries, useUserId } from '@/services/queries'
import { useAppFocusEffect } from '@/useAppFocusEffect'
import * as keys from '@/services/keys'
import { tokens } from '@/tokens'
import { EntryCard } from '@/components/EntryCard'
import { flattenEntryLists } from '@/utils'
import { createInfiniteEntryDelete } from '@/services/mutationUtils'
import type { FetchEntriesOptions } from '@/services/keys'
import type { InfiniteData } from '@tanstack/react-query'
import type { Entry, EntryList } from '@/services/types'

function MarkReadContainer() {
  return (
    <CardContainer
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: tokens.darkColor,
        borderColor: tokens.darkColor,
      }}
    >
      <Icon
        style={{ marginRight: tokens.space / 2 }}
        name="mail"
        size={32}
        color={tokens.foregroundColor}
      />
      <P color={tokens.foregroundColor}>Mark as read</P>
    </CardContainer>
  )
}

export function UnreadScreen() {
  const entryOptions: FetchEntriesOptions = {
    status: 'unread',
  }
  const { data, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQueryEntries(entryOptions)
  const queryClient = useQueryClient()
  const { mutate: logout } = useMutationLogout()
  const { mutate: setEntryRead } = useMutationSetEntryRead()
  const userId = useUserId()

  // we need to logout the user if LS gets wiped
  useEffect(() => {
    if (userId === null) {
      logout()
    }
  }, [userId])

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
    function handleSwipeableOpen() {
      queryClient.setQueryData<InfiniteData<EntryList>>(
        keys.getEntriesInfiniteQueryKey({ userId, ...entryOptions }),
        createInfiniteEntryDelete(entry.id)
      )
      setEntryRead({ entry, newStatus: 'read' })
    }

    return (
      <Swipeable
        renderRightActions={MarkReadContainer}
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
