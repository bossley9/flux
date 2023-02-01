import { Button, StyleSheet, Text } from 'react-native'
import { CardContainer } from '@/components/CardContainer'
import { useNavigation } from '@react-navigation/native'
import type { Entry } from '@/services/types'
import { RootScreen, RootScreenNavigationProp } from '@/navigation'

type Props = { entry: Entry }

export function EntryCard({ entry }: Props) {
  const navigation = useNavigation<RootScreenNavigationProp<RootScreen.Main>>()

  const handleOpenEntry = () => {
    navigation.navigate(RootScreen.Entry, { entry })
  }

  return (
    <CardContainer>
      <Text style={styles.title}>{entry.title}</Text>
      <Text>by {entry.feed?.title || entry.author}</Text>
      <Button title="open entry" onPress={handleOpenEntry} />
    </CardContainer>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
})
