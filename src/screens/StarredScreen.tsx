import { ViewStyle } from 'react-native'
import { ScreenContainer } from '@/components/ScreenContainer'
import { useQueryEntries } from '@/services/queries'
import { Heading } from '@/html'
import { tokens } from '@/styles'
import { EntryCard } from '@/components/EntryCard'
import type { FetchEntriesOptions } from '@/services/keys'

export function StarredScreen() {
  const entryOptions: FetchEntriesOptions = {
    starred: 'true',
  }
  const { data, isFetching, refetch } = useQueryEntries(entryOptions)

  return (
    <ScreenContainer
      style={styles}
      refreshEnabled
      refreshing={isFetching}
      onRefresh={refetch}
    >
      <Heading level={1}>
        Starred {data?.total ? `(${data.total})` : ''}
      </Heading>
      {data?.entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </ScreenContainer>
  )
}

const styles: ViewStyle = {
  flex: 1,
  paddingLeft: tokens.space,
  paddingRight: tokens.space,
}
