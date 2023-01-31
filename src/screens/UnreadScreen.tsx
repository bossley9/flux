import { Button, StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useQueryClient } from '@tanstack/react-query'
import { useUserId, useQueryFeeds } from '@/services/queries'
import { useQueryUnreadEntries } from '@/services/hooks'
import { tokens } from '@/styles'
import { EntryCard } from '@/components/EntryCard'

export function UnreadScreen() {
  const queryClient = useQueryClient()

  const userId = useUserId()
  const { data: entries, isLoading, isFetching } = useQueryUnreadEntries()

  function handleRefresh() {
    queryClient.invalidateQueries(useQueryFeeds.getKey({ userId }))
  }

  return (
    <ScreenContainer style={styles.container}>
      <Button title="refresh" onPress={handleRefresh} />
      {isFetching && (
        <Text style={styles.loadingText}>is fetching in background...</Text>
      )}
      {isLoading && <Text style={styles.loadingText}>loading...</Text>}
      {entries?.map((entry) => (
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
  loadingText: {
    fontWeight: 'bold',
  },
  entryList: {
    flex: 1,
    padding: tokens.space * 2,
  },
})
