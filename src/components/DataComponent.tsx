import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { fetchUser, fetchFeeds } from '../networking/fetchers'
import { useQueryEntries } from '../networking/queries'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { StackParamList } from '../_app'

export function DataComponent({
  navigation,
}: NativeStackScreenProps<StackParamList, 'Profile'>) {
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  })

  const {
    data: feedData,
    isLoading: isFeedsLoading,
    refetch: refetchFeeds,
  } = useQuery({
    queryKey: ['feeds'],
    queryFn: fetchFeeds,
  })

  const { data: feedEntries, isLoading: isEntriesLoading } = useQueryEntries(
    feedData?.[0] ?? null
  )

  function handleRefetch() {
    refetchUser()
    refetchFeeds()
  }

  function handleLogout() {
    // TODO clear async storage items
    navigation.navigate('Login')
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Button title="refresh" onPress={handleRefetch} />
      <Button title="logout" onPress={handleLogout} />
      {isEntriesLoading ? (
        <Text>loading...</Text>
      ) : (
        <Text style={styles.entry}>
          {JSON.stringify(feedEntries?.entries?.[0])}
        </Text>
      )}
      {isUserLoading || isFeedsLoading ? (
        <Text>fetching data...</Text>
      ) : (
        <View>
          <Text>user is {JSON.stringify(userData)}</Text>
          <View>
            {feedData?.map((feed) => {
              return (
                <View key={feed.id}>
                  <Text>
                    feed title is {feed.title}{' '}
                    {feed.disabled ? '(disabled)' : ''}
                  </Text>
                  {feed.keeplist_rules && (
                    <Text>this feed is kept with {feed.keeplist_rules}</Text>
                  )}
                </View>
              )
            })}
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  entry: {
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: 'pink',
  },
})
