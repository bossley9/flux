import { ViewStyle } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { Heading } from '@/html'
import { useQueryClient } from '@tanstack/react-query'
import { useQueryEntries, useUserId } from '@/services/queries'
import * as keys from '@/services/keys'
import { tokens } from '@/styles'
import { EntryCard } from '@/components/EntryCard'
import type { FetchEntriesOptions } from '@/services/keys'

export function UnreadScreen() {
  const entryOptions: FetchEntriesOptions = {
    status: 'unread',
  }
  const { data, isFetching } = useQueryEntries(entryOptions)
  const queryClient = useQueryClient()
  const userId = useUserId()

  function handleRefresh() {
    queryClient.invalidateQueries(
      keys.getEntriesQueryKey({ userId, ...entryOptions })
    )
  }

  return (
    <ScreenContainer
      style={styles}
      refreshEnabled
      refreshing={isFetching}
      onRefresh={handleRefresh}
    >
      <Heading level={1}>Unread {data?.total ? `(${data.total})` : ''}</Heading>
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </ScreenContainer>
  )
}

const styles: ViewStyle = {
  flex: 1,
  paddingLeft: tokens.space,
  paddingRight: tokens.space,
}
