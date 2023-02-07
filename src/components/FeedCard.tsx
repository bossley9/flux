import { ViewStyle } from 'react-native'
import { CardContainer } from '@/components/CardContainer'
import { useNavigation } from '@react-navigation/native'
import { Heading, P } from '@/html'
import { formatPubDate } from '@/utils'
import { RootScreen, RootScreenNavigationProp } from '@/navigation'
import { tokens } from '@/tokens'
import type { Feed } from '@/services/types'

type Props = {
  feed: Feed
  unreadCount: number
}

export function FeedCard({ feed, unreadCount }: Props) {
  const navigation = useNavigation<RootScreenNavigationProp<RootScreen.Feed>>()

  function handleOpenFeed() {
    navigation.navigate(RootScreen.Feed, { feed })
  }

  let readStyles: ViewStyle | undefined
  if (unreadCount === 0) {
    readStyles = {
      backgroundColor: tokens.darkColor,
      borderColor: tokens.darkColor,
    }
  }

  return (
    <CardContainer onPress={handleOpenFeed} style={readStyles}>
      <Heading
        level={3}
        marginBottom={0}
        color={feed.disabled ? tokens.errorColor : undefined}
      >
        {feed.title} {unreadCount > 0 && '(' + unreadCount + ')'}
      </Heading>
      <P marginBottom={0}>{feed.site_url}</P>
      {feed.checked_at && (
        <P marginBottom={0}>Last updated {formatPubDate(feed.checked_at)}</P>
      )}
    </CardContainer>
  )
}
