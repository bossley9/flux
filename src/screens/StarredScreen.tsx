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
import { useInfiniteQueryEntries, useUserId } from '@/services/queries'
import * as keys from '@/services/keys'
import { useTheme, type Theme } from '@/theme'
import { EntryCard } from '@/components/EntryCard'
import { flattenEntryLists } from '@/utils'
import type { FetchEntriesOptions } from '@/services/keys'
import type { Entry } from '@/services/types'

export function StarredScreen() {
  const entryOptions: FetchEntriesOptions = {
    starred: 'true',
  }
  const { data, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQueryEntries(entryOptions)
  const queryClient = useQueryClient()
  const userId = useUserId()
  const tokens = useTheme()
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
    return <EntryCard key={entry.id} entry={entry} />
  }

  const entryList = flattenEntryLists(data?.pages ?? [])
  const title = `Starred (${entryList.total})`

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
            message="You have no starred entries."
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
