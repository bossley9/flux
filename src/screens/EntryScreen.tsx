import { Pressable, StyleSheet, View } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeadingLink, P, TextButton } from '@/html'
import { RootScreen, RootScreenProps } from '@/navigation'
import { formatPubDate } from '@/utils'
import { tokens } from '@/styles'

type Props = RootScreenProps<RootScreen.Entry>

export function EntryScreen({ route, navigation }: Props) {
  const { entry } = route.params

  function handleOpenFeed() {
    if (entry.feed) {
      navigation.navigate(RootScreen.Feed, { feed: entry.feed })
    } else {
      navigation.navigate(RootScreen.Main)
    }
  }

  function handleToggleRead() {
    console.log('toggle read')
  }

  function handleToggleStar() {
    console.log('toggle star')
  }

  return (
    <ScreenContainer style={styles.container}>
      <HeadingLink href={entry.url} marginBottom={0}>
        {entry.title}
      </HeadingLink>
      <View style={styles.meta}>
        <P>by </P>
        <TextButton onPress={handleOpenFeed}>
          {entry.author} ({formatPubDate(entry.published_at)})
        </TextButton>
      </View>

      <View style={styles.actionBar}>
        <Pressable style={styles.iconTextPair} onPress={handleToggleStar}>
          <Icon
            style={{ marginRight: tokens.space / 4 }}
            name={entry.starred ? 'star' : 'star-outline'}
            size={32}
            color={tokens.primaryColor}
          />
          <P color={tokens.primaryColor}>{entry.starred ? 'Unstar' : 'Star'}</P>
        </Pressable>
        <Pressable style={styles.iconTextPair} onPress={handleToggleRead}>
          <Icon
            style={{ marginRight: tokens.space / 2 }}
            name={entry.status === 'read' ? 'mail-outline' : 'mail'}
            size={32}
            color={tokens.primaryColor}
          />
          <P color={tokens.primaryColor}>
            Mark {entry.status === 'read' ? 'unread' : 'read'}
          </P>
        </Pressable>
      </View>

      <P>{entry.content}</P>
    </ScreenContainer>
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
