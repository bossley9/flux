import { StyleSheet, Text, View } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useQueryFeeds } from '@/services/queries'
import { tokens } from '@/styles'

export function FeedsScreen() {
  const { data, isLoading } = useQueryFeeds()
  return (
    <ScreenContainer style={styles.container}>
      {isLoading && <Text>loading...</Text>}
      {data?.map((feed) => (
        <View key={feed.id}>
          <Text>feed is {feed.title}</Text>
        </View>
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
})
