import { StyleSheet } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useQueryEntries } from '@/services/queries'
import { tokens } from '@/styles'
import { EntryCard } from '@/components/EntryCard'
import type { FetchEntriesOptions } from '@/services/keys'

export function HistoryScreen() {
  const entryOptions: FetchEntriesOptions = {
    status: 'read',
  }
  // TODO find a way to sort entries by last read
  const { data, isFetching, refetch } = useQueryEntries(entryOptions)

  return (
    <ScreenContainer
      style={styles.container}
      refreshEnabled
      refreshing={isFetching}
      onRefresh={refetch}
    >
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
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
