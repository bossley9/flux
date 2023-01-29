import { Button, ScrollView, StyleSheet, Text } from 'react-native'
import { FeedCard } from './FeedCard'
import { useQueryClient } from '@tanstack/react-query'
import { useUserId, useQueryUser, useQueryFeeds } from '@/services/queries'
import { removeItem, StorageKey } from '@/storage'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { StackParamList } from '@/_app'

export function DataComponent({
  navigation,
}: NativeStackScreenProps<StackParamList, 'Profile'>) {
  const queryClient = useQueryClient()

  const userId = useUserId()
  const { data, isLoading, isFetching } = useQueryFeeds()

  function handleRefetch() {
    queryClient.invalidateQueries(useQueryFeeds.getKey({ userId }))
  }

  async function handleLogout() {
    queryClient.removeQueries({ queryKey: [userId] })
    queryClient.removeQueries({ queryKey: useQueryUser.getKey() })

    // TODO switch to multi remove
    await Promise.all([
      removeItem(StorageKey.serverUrl),
      removeItem(StorageKey.apiKey),
    ])

    navigation.navigate('Login')
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Button title="refresh" onPress={handleRefetch} />
      <Button title="logout" onPress={handleLogout} />
      {isFetching && (
        <Text style={styles.loadingText}>is fetching in background...</Text>
      )}
      {isLoading && <Text style={styles.loadingText}>loading...</Text>}
      {data?.map((feed) => (
        <FeedCard key={feed.id} feed={feed} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingText: {
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: 'skyblue',
  },
})
