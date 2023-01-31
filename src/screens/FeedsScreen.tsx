import { StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useQueryFeeds } from '@/services/queries'
import { tokens } from '@/styles'
import { FeedCard } from '@/components/FeedCard'

export function FeedsScreen() {
  const { data, isLoading } = useQueryFeeds()
  return (
    <ScreenContainer style={styles.container}>
      {isLoading && <Text>loading...</Text>}
      {data?.map((feed) => (
        <FeedCard key={feed.id} feed={feed} />
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
