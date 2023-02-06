import { ViewStyle } from 'react-native'
import { ScrollScreenContainer } from '@/components/ScrollScreenContainer'
import { Heading } from '@/html'
import { useQueryClient } from '@tanstack/react-query'
import { useQueryFeeds, useUserId } from '@/services/queries'
import * as keys from '@/services/keys'
import { tokens } from '@/tokens'
import { FeedCard } from '@/components/FeedCard'
import type { Feed } from '@/services/types'

function sortByTitle(a: Feed, b: Feed): number {
  return a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
}

export function FeedsScreen() {
  const { data, isFetching } = useQueryFeeds()
  const queryClient = useQueryClient()
  const userId = useUserId()

  function handleRefresh() {
    queryClient.invalidateQueries(keys.getFeedsQueryKey({ userId }))
  }

  return (
    <ScrollScreenContainer
      style={styles}
      refreshEnabled
      refreshing={isFetching}
      onRefresh={handleRefresh}
    >
      <Heading level={1}>
        Feeds {data?.length ? `(${data.length})` : ''}
      </Heading>
      {data?.sort(sortByTitle).map((feed) => (
        <FeedCard key={feed.id} feed={feed} />
      ))}
    </ScrollScreenContainer>
  )
}

const styles: ViewStyle = {
  flex: 1,
  paddingLeft: tokens.space,
  paddingRight: tokens.space,
}
