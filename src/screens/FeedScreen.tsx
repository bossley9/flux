import { StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { RootScreen, RootScreenProps } from '@/navigation'
import { tokens } from '@/styles'

type Props = RootScreenProps<RootScreen.Feed>

export function FeedScreen({ route }: Props) {
  const { feed } = route.params
  return (
    <ScreenContainer style={styles.container}>
      <Text>{feed.title}</Text>
      <Text>This is entry {feed.id}</Text>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: tokens.space,
  },
})
