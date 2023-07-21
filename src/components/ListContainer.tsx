import { View, ViewStyle } from 'react-native'
import { CardContainer } from '@/components/CardContainer'
import { Heading, HeadingLink, P } from '@/html'
import { tokens } from '@/tokens'

type Props = {
  title: string
  href?: string
  isDisabled?: boolean
  children: React.ReactNode
}

export function ListContainer({ title, href, isDisabled, children }: Props) {
  const listContainerOuterStyles: ViewStyle = {
    flex: 1,
    marginTop: 40 + tokens.space, // phone notification/camera offset
    backgroundColor: tokens.backgroundColor,
  }
  const listContainerHeaderStyles: ViewStyle = {
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
  }

  return (
    <View style={listContainerOuterStyles}>
      <View style={listContainerHeaderStyles}>
        {href ? (
          <HeadingLink
            href={href}
            color={isDisabled ? tokens.errorColor : undefined}
            marginBottom={tokens.space}
          >
            {title}
          </HeadingLink>
        ) : (
          <Heading level={1} marginBottom={tokens.space}>
            {title}
          </Heading>
        )}
      </View>
      {children}
    </View>
  )
}

type ListEmptyPlaceholderProps = {
  isLoading: boolean
  message: string
}
export function ListEmptyPlaceholder({
  isLoading,
  message,
}: ListEmptyPlaceholderProps) {
  return <P>{isLoading ? 'Loading...' : message}</P>
}

type ListFooterProps = { showSkeleton: boolean }
export function ListFooter({ showSkeleton }: ListFooterProps) {
  return showSkeleton ? (
    <CardContainer
      style={{
        backgroundColor: tokens.darkColor,
        borderColor: tokens.darkColor,
      }}
    />
  ) : (
    <View style={{ height: tokens.space * 2 }} />
  )
}
