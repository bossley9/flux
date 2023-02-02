import { StyleSheet, View } from 'react-native'
import { CardContainer } from '@/components/CardContainer'
import { useNavigation } from '@react-navigation/native'
import { Heading, P } from '@/html'
import { formatPubDate } from '@/utils'
import type { Entry } from '@/services/types'
import { RootScreen, RootScreenNavigationProp } from '@/navigation'

type Props = { entry: Entry }

export function EntryCard({ entry }: Props) {
  const navigation = useNavigation<RootScreenNavigationProp<RootScreen.Main>>()

  const handleOpenEntry = () => {
    // TODO mark entry as read
    navigation.navigate(RootScreen.Entry, { entry })
  }

  return (
    <CardContainer onPress={handleOpenEntry}>
      <View style={styles.wrapper}>
        <Heading level={3}>{entry.title}</Heading>
        <View style={styles.footer}>
          <P margin={0}>{entry.feed?.title || entry.author}</P>
          <P margin={0}>{formatPubDate(entry.published_at)}</P>
        </View>
      </View>
    </CardContainer>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
