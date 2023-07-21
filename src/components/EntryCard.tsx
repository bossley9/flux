import { StyleSheet, View, ViewStyle } from 'react-native'
import { CardContainer } from '@/components/CardContainer'
import { useNavigation } from '@react-navigation/native'
import { Heading, P, TextButton } from '@/html'
import { useMutationSetEntryRead } from '@/services/mutations'
import { formatPubDate, normalizeTitle } from '@/utils'
import { tokens } from '@/tokens'
import type { Entry } from '@/services/types'
import { RootScreen, RootScreenNavigationProp } from '@/navigation'

type Props = {
  entry: Entry
  displayStatus?: boolean
}

export function EntryCard({ entry, displayStatus }: Props) {
  const navigation = useNavigation<RootScreenNavigationProp<RootScreen.Main>>()
  const { mutate: setEntryRead } = useMutationSetEntryRead()

  let displayStatusStyles: ViewStyle | undefined
  if (
    displayStatus &&
    (entry.status === 'read' || entry.status === 'removed')
  ) {
    displayStatusStyles = {
      backgroundColor: tokens.darkColor,
      borderColor: tokens.darkColor,
    }
  }

  function handleOpenEntry() {
    if (entry.status === 'unread') {
      setEntryRead({ entry, newStatus: 'read' })
    }
    navigation.navigate(RootScreen.Entry, { entry })
  }

  function handleOpenFeed() {
    if (entry.feed) {
      navigation.navigate(RootScreen.Feed, { feed: entry.feed })
    }
  }

  return (
    <CardContainer onPress={handleOpenEntry} style={displayStatusStyles}>
      <View style={styles.wrapper}>
        <Heading level={3} style={{ minHeight: tokens.space * 5 }}>
          {normalizeTitle(entry.title)}
        </Heading>
        <View style={styles.footer}>
          <TextButton onPress={handleOpenFeed}>
            <P margin={0}>{entry.feed?.title || entry.author}</P>
          </TextButton>
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
