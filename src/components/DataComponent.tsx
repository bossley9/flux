import {Button, Text, View} from "react-native";
import {useQuery} from '@tanstack/react-query'
import {fetchUser} from '../networking/fetchers'
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {StackParamList} from '../../_app'

export function DataComponent({navigation}: NativeStackScreenProps<StackParamList, 'Profile'>) {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  })

  function handleRefetch() {
    refetch()
  }

  function handleLogout() {
    // clear async storage items
    navigation.navigate('Login')
  }

  return (
    <View>
      <Text>hello! here is data.</Text>
      {isLoading ? <Text>fetching data...</Text> : <Text>data is {JSON.stringify(data)}</Text>}
      <Button title="fetch again" onPress={handleRefetch} />
      <Button title="logout" onPress={handleLogout} />
    </View>
  )
}
