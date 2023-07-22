import { StyleSheet, View } from 'react-native'
import { ScrollScreenContainer } from '@/components/ScrollScreenContainer'
import { ActionButton } from '@/components/ActionButton'
import { HeadingLink, P, TextButton } from '@/html'
import { RenderHtml } from '@/html/RenderHtml'
import { useState } from 'react'
import {
  useMutationSetEntryRead,
  useMutationToggleStar,
} from '@/services/mutations'
import { RootScreen, RootScreenProps } from '@/navigation'
import { formatPubDate } from '@/utils'
import { useTheme, type Theme } from '@/theme'
import type { Entry } from '@/services/types'

type Props = RootScreenProps<RootScreen.Entry>

export function EntryScreen({ route, navigation }: Props) {
  const { entry: originalEntry } = route.params
  const [starred, setStarred] = useState(originalEntry.starred)
  const [read, setRead] = useState(true)
  const styles = makeStyles({ tokens: useTheme() })

  const entry: Entry = {
    ...originalEntry,
    starred,
    status: read ? 'read' : 'unread',
  }
  const feed = entry.feed ?? null

  const { mutate: starEntry } = useMutationToggleStar()
  const { mutate: setEntryRead } = useMutationSetEntryRead()

  function handleOpenFeed() {
    if (feed) {
      navigation.navigate(RootScreen.Feed, { feed })
    } else {
      navigation.navigate(RootScreen.Main)
    }
  }

  function handleToggleRead() {
    setEntryRead({
      entry,
      newStatus: read ? 'unread' : 'read',
    })
    setRead(!read)
  }

  function handleToggleStar() {
    starEntry(entry)
    setStarred(!starred)
  }

  return (
    <ScrollScreenContainer style={styles.container}>
      <HeadingLink href={entry.url} marginBottom={0}>
        {entry.title}
      </HeadingLink>
      <View style={styles.meta}>
        <P>by </P>
        <TextButton onPress={handleOpenFeed}>
          {feed?.title ?? entry.author} ({formatPubDate(entry.published_at)})
        </TextButton>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <ActionButton
          primary
          icon={starred ? 'star' : 'star-outline'}
          onPress={handleToggleStar}
        >
          {starred ? 'Unstar' : 'Star'}
        </ActionButton>
        <ActionButton
          primary
          icon={read ? 'mail' : 'mail-outline'}
          onPress={handleToggleRead}
        >
          {`Mark ${read ? 'unread' : 'read'}`}
        </ActionButton>
      </View>
      <View>
        <RenderHtml html={entry.content} />
      </View>
    </ScrollScreenContainer>
  )
}

type StyleProps = {
  tokens: Theme
}
const makeStyles = ({ tokens }: StyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: tokens.space,
      paddingRight: tokens.space,
    },
    meta: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
