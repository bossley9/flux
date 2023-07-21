import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  View,
  ViewStyle,
} from 'react-native'
import { useState } from 'react'
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
  useMutationUpdateFeed,
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
  const { mutateAsync: updateFeed, isLoading: isUpdatingFeed } =
    useMutationUpdateFeed()
  const [isDisabled, setIsDisabled] = useState(feed.disabled)

  function handleRefresh() {
    refreshFeed(feed.id)
  }

  function handleMarkAllRead() {
    markAllRead(feed.id)
  }

  async function handleToggleFeed() {
    await updateFeed({ id: feed.id, disabled: !isDisabled })
    setIsDisabled(!isDisabled)
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
  const toggleFeedText = `${isDisabled ? 'Enable' : 'Disable'} feed`

  return (
    <View style={ListContainerOuterStyles}>
      <View style={ListContainerHeaderStyles}>
        <HeadingLink
          href={feed.site_url}
          color={isDisabled ? tokens.errorColor : undefined}
          marginBottom={tokens.space}
        >
          {title}
        </HeadingLink>
      </View>
      <View style={ButtonContainerStyles}>
        <ActionButton
          icon="mail-outline"
          onPress={handleMarkAllRead}
          disabled={isMarkingAllRead || isUpdatingFeed}
        >
          Mark all as read
        </ActionButton>
        <ActionButton
          icon={isDisabled ? 'check-circle-outline' : 'block'}
          onPress={handleToggleFeed}
          disabled={isUpdatingFeed}
        >
          {toggleFeedText}
        </ActionButton>
      </View>
      <FlatList
        style={styles}
        data={entryList.entries}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={
              isFetching || isLoading || isMarkingAllRead || isUpdatingFeed
            }
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
