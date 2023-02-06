import { Fragment } from 'react'
import { View, ViewStyle } from 'react-native'
import { ScrollScreenContainer } from '@/components/ScrollScreenContainer'
import { Heading, MainButton } from '@/html'
import { useQueryClient } from '@tanstack/react-query'
import { useInfiniteQueryEntries, useUserId } from '@/services/queries'
import * as keys from '@/services/keys'
import { tokens } from '@/tokens'
import { EntryCard } from '@/components/EntryCard'
import type { FetchEntriesOptions } from '@/services/keys'

export function HistoryScreen() {
  const entryOptions: FetchEntriesOptions = {
    status: 'read',
  }
  // TODO sort entries by last read once API allows for such a thing
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQueryEntries(entryOptions)
  const queryClient = useQueryClient()
  const userId = useUserId()

  function handleRefresh() {
    queryClient.invalidateQueries(
      keys.getEntriesInfiniteQueryKey({ userId, ...entryOptions })
    )
  }

  return (
    <ScrollScreenContainer
      style={styles}
      refreshEnabled
      refreshing={isFetchingNextPage}
      onRefresh={handleRefresh}
    >
      <Heading level={1}>
        History {data?.pages?.[0].total ? `(${data.pages[0].total})` : ''}
      </Heading>
      {data?.pages?.map((page, i) => (
        <Fragment key={i}>
          {page.entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </Fragment>
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
