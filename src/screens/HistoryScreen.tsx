import { Button, StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useQueryClient } from '@tanstack/react-query'
import { useUserId, useQueryEntries } from '@/services/queries'
import { tokens } from '@/styles'
import { EntryCard } from '@/components/EntryCard'
import type { FetchEntriesOptions } from '@/services/keys'

export function HistoryScreen() {
  const queryClient = useQueryClient()
  const userId = useUserId()
  const entryOptions: FetchEntriesOptions = {
    status: 'read',
  }
  const { data, isFetching } = useQueryEntries(entryOptions)

  function handleRefresh() {
    queryClient.invalidateQueries(
      useQueryEntries.getKey({ userId, ...entryOptions })
    )
  }

  return (
    <ScreenContainer style={styles.container}>
      <Button title="refresh" onPress={handleRefresh} />
      {isFetching && <Text>fetching...</Text>}
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
  },
})
