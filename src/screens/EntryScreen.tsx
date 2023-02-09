import { Pressable, StyleSheet, View } from 'react-native'
import { ScrollScreenContainer } from '@/components/ScrollScreenContainer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeadingLink, P, TextButton, RenderHtml } from '@/html'
import { useState } from 'react'
import {
  useMutationSetEntryRead,
  useMutationToggleStar,
} from '@/services/mutations'
import { RootScreen, RootScreenProps } from '@/navigation'
import { formatPubDate } from '@/utils'
import { tokens } from '@/tokens'
import type { Entry } from '@/services/types'

type Props = RootScreenProps<RootScreen.Entry>

export function EntryScreen({ route, navigation }: Props) {
  const { entry: originalEntry } = route.params
  const [starred, setStarred] = useState(originalEntry.starred)
  const [read, setRead] = useState(true)

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
      <View style={styles.actionBar}>
        <Pressable style={styles.iconTextPair} onPress={handleToggleStar}>
          <Icon
            style={{ marginRight: tokens.space / 4 }}
            name={starred ? 'star' : 'star-outline'}
            size={32}
            color={tokens.primaryColor}
          />
          <P color={tokens.primaryColor}>{starred ? 'Unstar' : 'Star'}</P>
        </Pressable>
        <Pressable style={styles.iconTextPair} onPress={handleToggleRead}>
          <Icon
            style={{ marginRight: tokens.space / 2 }}
            name={read ? 'mail' : 'mail-outline'}
            size={32}
            color={tokens.primaryColor}
          />
          <P color={tokens.primaryColor}>Mark {read ? 'unread' : 'read'}</P>
        </Pressable>
      </View>
      <View>
        <RenderHtml source={entry.content} />
      </View>
    </ScrollScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBar: {
    flexDirection: 'row',
  },
  iconTextPair: {
    marginRight: tokens.space * 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
