import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import {useQuery} from '@tanstack/react-query'
import {fetchUser, fetchFeeds} from '../networking/fetchers'
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackParamList} from '../../_app'

export function DataComponent({navigation}: NativeStackScreenProps<StackParamList, 'Profile'>) {
  const {data: userData, isLoading: isUserLoading, refetch: refetchUser} = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  })

  const {data: feedData, isLoading: isFeedsLoading, refetch: refetchFeeds} = useQuery({
    queryKey: ['feeds'],
    queryFn: fetchFeeds,
  })

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
      <Button title="fetch again" onPress={handleRefetch} />
      <Button title="logout" onPress={handleLogout} />
      {isUserLoading || isFeedsLoading ? <Text>fetching data...</Text> : (
        <View>
          <Text>user is {JSON.stringify(userData)}</Text>
          <View>
            {feedData?.map(feed => {
              return (
                <View key={feed.id}>
                  <Text>feed title is {feed.title} {feed.disabled ? '(disabled)' : ''}</Text>
                  {feed.keeplist_rules && <Text>this feed is kept with "{feed.keeplist_rules}"</Text>}
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
});
