import { Button, StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { EntryCard } from '@/components/EntryCard'
import { useQueryReadEntries } from '@/services/queries'
import { tokens } from '@/styles'

export function HistoryScreen() {
  const { data, isLoading, refetch, error } = useQueryReadEntries()

  function handleRefresh() {
    refetch()
  }

  return (
    <ScreenContainer style={styles.container}>
      <Button title="refresh" onPress={handleRefresh} />
      {isLoading && <Text>loading...</Text>}
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
      {Boolean(error) && <Text>{JSON.stringify(error)}</Text>}
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
  },
})
