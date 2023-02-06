import { CardContainer } from '@/components/CardContainer'
import { useNavigation } from '@react-navigation/native'
import { Heading, P } from '@/html'
import { formatPubDate } from '@/utils'
import { RootScreen, RootScreenNavigationProp } from '@/navigation'
import { tokens } from '@/tokens'
import type { Feed } from '@/services/types'

type Props = { feed: Feed }

export function FeedCard({ feed }: Props) {
  const navigation = useNavigation<RootScreenNavigationProp<RootScreen.Feed>>()

  function handleOpenFeed() {
    navigation.navigate(RootScreen.Feed, { feed })
  }

  return (
    <CardContainer onPress={handleOpenFeed}>
      <Heading
        level={3}
        marginBottom={0}
        color={feed.disabled ? tokens.errorColor : undefined}
      >
        {feed.title}
      </Heading>
      <P marginBottom={0}>{feed.site_url}</P>
      {feed.checked_at && (
        <P marginBottom={0}>Last updated {formatPubDate(feed.checked_at)}</P>
      )}
    </CardContainer>
  )
}
