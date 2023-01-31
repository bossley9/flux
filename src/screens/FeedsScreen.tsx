import { StyleSheet } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useQueryFeeds } from '@/services/queries'
import { tokens } from '@/styles'
import { FeedCard } from '@/components/FeedCard'

export function FeedsScreen() {
  const { data, isFetching, refetch } = useQueryFeeds()
  return (
    <ScreenContainer
      style={styles.container}
      refreshEnabled
      refreshing={isFetching}
      onRefresh={refetch}
    >
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
