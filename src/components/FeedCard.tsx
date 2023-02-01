import { Button, Text } from 'react-native'
import { CardContainer } from '@/components/CardContainer'
import { useNavigation } from '@react-navigation/native'
import { RootScreen, RootScreenNavigationProp } from '@/navigation'
import type { Feed } from '@/services/types'

type Props = { feed: Feed }

export function FeedCard({ feed }: Props) {
  const navigation = useNavigation<RootScreenNavigationProp<RootScreen.Feed>>()

  function handleOpenFeed() {
    navigation.navigate(RootScreen.Feed, { feed })
  }

  return (
    <CardContainer>
      <Text>{feed.title}</Text>
      <Button title="open feed" onPress={handleOpenFeed} />
    </CardContainer>
  )
}
