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

type Props = RootScreenProps<RootScreen.Entry>

export function EntryScreen({ route, navigation }: Props) {
  const { entry } = route.params
  const feed = entry.feed ?? null

  const [starred, setStarred] = useState(entry.starred)
  const { mutate: starEntry } = useMutationToggleStar()

  const [read, setRead] = useState(true)
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
      newStatus: entry.status === 'unread' ? 'read' : 'unread',
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
      <RenderHtml source={entry.content} />
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
