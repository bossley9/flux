import { StyleSheet, View } from 'react-native'
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

  const styles = makeStyles({
    isInactive: Boolean(
      displayStatus && (entry.status === 'read' || entry.status === 'removed')
    ),
  })

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
    <CardContainer onPress={handleOpenEntry} style={styles.container}>
      <View style={styles.wrapper}>
        <Heading level={3} style={styles.heading}>
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

type StyleProps = {
  isInactive: boolean
}
const makeStyles = ({ isInactive }: StyleProps) => {
  return StyleSheet.create({
    container: {
      ...(isInactive && {
        backgroundColor: tokens.darkColor,
        borderColor: tokens.darkColor,
      }),
    },
    wrapper: {
      flex: 1,
      justifyContent: 'space-between',
    },
    heading: {
      minHeight: tokens.space * 5,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
}
