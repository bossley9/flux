import { ViewStyle } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useQueryFeeds } from '@/services/queries'
import { Heading } from '@/html'
import { tokens } from '@/styles'
import { FeedCard } from '@/components/FeedCard'

export function FeedsScreen() {
  const { data, isFetching, refetch } = useQueryFeeds()

  return (
    <ScreenContainer
      style={styles}
      refreshEnabled
      refreshing={isFetching}
      // TODO replace hard refreshes with query invalidation
      onRefresh={refetch}
    >
      <Heading level={1}>
        Feeds {data?.length ? `(${data.length})` : ''}
      </Heading>
      {data?.map((feed) => (
        <FeedCard key={feed.id} feed={feed} />
      ))}
    </ScreenContainer>
  )
}

const styles: ViewStyle = {
  flex: 1,
  paddingLeft: tokens.space,
  paddingRight: tokens.space,
}
