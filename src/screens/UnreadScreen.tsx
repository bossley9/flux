import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { FeedCard } from '@/components/FeedCard'
import { useQueryClient } from '@tanstack/react-query'
import { useUserId, useQueryFeeds } from '@/services/queries'
import { useMutationLogout } from '@/services/mutations'
import { tokens } from '@/styles'
import { Screen, ScreenProps } from '@/navigation'

export function UnreadScreen({ navigation }: ScreenProps<Screen.Unread>) {
  const queryClient = useQueryClient()

  const userId = useUserId()
  const { data, isLoading, isFetching } = useQueryFeeds()

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
        {data?.map((feed) => (
          <FeedCard key={feed.id} feed={feed} />
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
