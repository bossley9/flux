import { View, ViewStyle } from 'react-native'
import { ScrollScreenContainer } from '@/components/ScrollScreenContainer'
import { Heading, MainButton } from '@/html'
import { useQueryClient } from '@tanstack/react-query'
import { useInfiniteQueryEntries, useUserId } from '@/services/queries'
import * as keys from '@/services/keys'
import { tokens } from '@/tokens'
import { EntryCard } from '@/components/EntryCard'
import { flattenEntryLists } from '@/utils'
import type { FetchEntriesOptions } from '@/services/keys'

export function StarredScreen() {
  const entryOptions: FetchEntriesOptions = {
    starred: 'true',
  }
  const { data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQueryEntries(entryOptions)
  const queryClient = useQueryClient()
  const userId = useUserId()

  function handleRefresh() {
    queryClient.invalidateQueries(
      keys.getEntriesInfiniteQueryKey({ userId, ...entryOptions })
    )
  }

  const entryList = flattenEntryLists(data?.pages ?? [])

  return (
    <ScrollScreenContainer
      style={styles}
      refreshEnabled
      refreshing={isFetching}
      onRefresh={handleRefresh}
    >
      <Heading level={1}>Starred ({entryList.total})</Heading>
      {entryList.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
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

const styles: ViewStyle = {
  flex: 1,
  paddingLeft: tokens.space,
  paddingRight: tokens.space,
}
