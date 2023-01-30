import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
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
    <ScreenContainer>
      <View style={styles.container}>
        <Button title="refresh" onPress={handleRefresh} />
        <Button title="logout" onPress={handleLogout} />
        {isFetching && (
          <Text style={styles.loadingText}>is fetching in background...</Text>
        )}
        {isLoading && <Text style={styles.loadingText}>loading...</Text>}
        <ScrollView style={styles.entryList}>
          {entries?.map((entry) => (
            <EntryCard key={entry.id} entry={entry} navigation={navigation} />
          ))}
        </ScrollView>
      </View>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: tokens.space,
    paddingBottom: tokens.space,
  },
  loadingText: {
    fontWeight: 'bold',
  },
  entryList: {
    flex: 1,
    padding: tokens.space * 2,
  },
})
