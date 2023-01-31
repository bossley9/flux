import { Button, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { tokens } from '@/styles'
import { RootScreen, RootScreenNavigationProp } from '@/navigation'
import type { Feed } from '@/services/types'

type Props = { feed: Feed }

export function FeedCard({ feed }: Props) {
  const navigation = useNavigation<RootScreenNavigationProp<RootScreen.Feed>>()

  function handleOpenFeed() {
    navigation.navigate(RootScreen.Feed, { feed })
  }

  return (
    <View style={styles.container}>
      <Text>{feed.title}</Text>
      <Button title="open feed" onPress={handleOpenFeed} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    padding: tokens.space,
    marginBottom: 30,
  },
})
