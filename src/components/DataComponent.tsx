import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { DataInnerComponent } from './DataInnerComponent'
import { useQueryClient } from '@tanstack/react-query'
import { useQueryFeeds } from '../networking/queries'
import { getFeedsQueryKey } from '../networking/keys'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { StackParamList } from '../_app'

export function DataComponent({
  navigation,
}: NativeStackScreenProps<StackParamList, 'Profile'>) {
  const queryClient = useQueryClient()

  const { data: feedData, isFetching: isFeedsLoading } = useQueryFeeds()

  function handleRefetch() {
    queryClient.invalidateQueries(getFeedsQueryKey())
  }

  function handleLogout() {
    // TODO clear async storage items
    navigation.navigate('Login')
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Button title="refresh" onPress={handleRefetch} />
      <Button title="logout" onPress={handleLogout} />
      {feedData?.[0] && <DataInnerComponent feed={feedData[0]} />}
      {isFeedsLoading ? (
        <Text>fetching data...</Text>
      ) : (
        <View>
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
  scrollView: {
    backgroundColor: 'pink',
  },
})
