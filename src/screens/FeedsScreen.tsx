import { ViewStyle } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { Heading } from '@/html'
import { useQueryClient } from '@tanstack/react-query'
import { useQueryFeeds, useUserId } from '@/services/queries'
import * as keys from '@/services/keys'
import { tokens } from '@/styles'
import { FeedCard } from '@/components/FeedCard'

export function FeedsScreen() {
  const { data, isFetching } = useQueryFeeds()
  const queryClient = useQueryClient()
  const userId = useUserId()

  function handleRefresh() {
    queryClient.invalidateQueries(keys.getFeedsQueryKey({ userId }))
  }

  return (
    <ScreenContainer
      style={styles}
      refreshEnabled
      refreshing={isFetching}
      onRefresh={handleRefresh}
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
