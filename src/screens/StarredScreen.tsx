import { Fragment } from 'react'
import { ViewStyle, Button } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { Heading } from '@/html'
import { useQueryClient } from '@tanstack/react-query'
import { useInfiniteQueryEntries, useUserId } from '@/services/queries'
import * as keys from '@/services/keys'
import { tokens } from '@/tokens'
import { EntryCard } from '@/components/EntryCard'
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

  return (
    <ScreenContainer
      style={styles}
      refreshEnabled
      refreshing={isFetching}
      onRefresh={handleRefresh}
    >
      <Heading level={1}>
        Starred {data?.pages?.[0].total ? `(${data.pages[0].total})` : ''}
      </Heading>
      {data?.pages?.map((page, i) => (
        <Fragment key={i}>
          {page.entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </Fragment>
      ))}
      {hasNextPage && (
        <Button
          onPress={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          title={isFetchingNextPage ? 'Loading...' : 'Load more'}
        />
      )}
    </ScreenContainer>
  )
}

const styles: ViewStyle = {
  flex: 1,
  paddingLeft: tokens.space,
  paddingRight: tokens.space,
}
