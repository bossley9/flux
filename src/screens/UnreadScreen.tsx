import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useQueryClient } from '@tanstack/react-query'
import { useUserId, useQueryFeeds } from '@/services/queries'
import { useQueryUnreadEntries } from '@/services/hooks'
import { useMutationLogout } from '@/services/mutations'
import { tokens } from '@/styles'
import { Screen, ScreenProps } from '@/navigation'
import { EntryCard } from '@/components/EntryCard'

export function UnreadScreen({ navigation }: ScreenProps<Screen.Unread>) {
  const queryClient = useQueryClient()

  const userId = useUserId()
  const { data: entries, isLoading, isFetching } = useQueryUnreadEntries()

  const { mutate } = useMutationLogout(navigation)

  function handleRefresh() {
    queryClient.invalidateQueries(useQueryFeeds.getKey({ userId }))
  }

  function handleLogout() {
    mutate()
  }

  return (
    <View>
      <Button title="refresh" onPress={handleRefresh} />
      <Button title="logout" onPress={handleLogout} />
      <ScrollView style={styles.container}>
        {isFetching && (
          <Text style={styles.loadingText}>is fetching in background...</Text>
        )}
        {isLoading && <Text style={styles.loadingText}>loading...</Text>}
        {entries?.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingText: {
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'skyblue',
    padding: tokens.space,
  },
})
