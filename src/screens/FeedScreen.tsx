import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  View,
  ViewStyle,
} from 'react-native'
import {
  ListContainerOuterStyles,
  ListContainerHeaderStyles,
  ListEmptyPlaceholder,
  ListFooter,
} from '@/components/ListContainer'
import { ActionButton } from '@/components/ActionButton'
import { HeadingLink } from '@/html'
import { useInfiniteQueryFeedEntries } from '@/services/queries'
import { RootScreen, RootScreenProps } from '@/navigation'
import { tokens } from '@/tokens'
import { EntryCard } from '@/components/EntryCard'
import {
  useMutationRefreshFeed,
  useMutationMarkAllRead,
} from '@/services/mutations'
import { flattenEntryLists } from '@/utils'
import type { Entry } from '@/services/types'

type Props = RootScreenProps<RootScreen.Feed>

export function FeedScreen({ route }: Props) {
  const { feed } = route.params
  const { data, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQueryFeedEntries({ feedId: feed.id })
  const { mutate: refreshFeed, isLoading } = useMutationRefreshFeed()
  const { mutate: markAllRead, isLoading: isMarkingAllRead } =
    useMutationMarkAllRead()

  function handleRefresh() {
    refreshFeed(feed.id)
  }

  function handleMarkAllRead() {
    markAllRead(feed.id)
  }

  function handleOnEndReached() {
    fetchNextPage()
  }

  function renderItem({
    item: entry,
  }: ListRenderItemInfo<Entry>): React.ReactElement {
    return <EntryCard key={entry.id} entry={entry} displayStatus />
  }

  const entryList = flattenEntryLists(data?.pages ?? [])
  const unreadCount = entryList.entries.filter(
    (entry) => entry.status === 'unread'
  ).length
  const title = `${feed.title} (${unreadCount}/${entryList.total})`

  return (
    <View style={ListContainerOuterStyles}>
      <View style={ListContainerHeaderStyles}>
        <HeadingLink
          href={feed.site_url}
          color={feed.disabled ? tokens.errorColor : undefined}
          marginBottom={tokens.space}
        >
          {title}
        </HeadingLink>
      </View>
      <View style={ButtonContainerStyles}>
        <ActionButton onPress={handleMarkAllRead} disabled={isMarkingAllRead}>
          Mark all as read
        </ActionButton>
      </View>
      <FlatList
        style={styles}
        data={entryList.entries}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isFetching || isLoading || isMarkingAllRead}
            onRefresh={handleRefresh}
            progressBackgroundColor={tokens.backgroundColor}
            colors={[tokens.lightColor]}
          />
        }
        ListEmptyComponent={
          <ListEmptyPlaceholder
            isLoading={isFetching}
            message="This feed has no entries."
          />
        }
        onEndReached={handleOnEndReached}
        ListFooterComponent={
          <>
            <ListFooter showSkeleton={Boolean(hasNextPage)} />
            <View style={{ height: tokens.space * 2 }} />
          </>
        }
      />
    </View>
  )
}

const styles: ViewStyle = { padding: tokens.space }

const ButtonContainerStyles: ViewStyle = {
  flexDirection: 'row',
  paddingLeft: tokens.space,
  paddingRight: tokens.space,
  paddingBottom: tokens.space,
}
