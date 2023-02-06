import { View, ViewStyle } from 'react-native'
import { CardContainer } from '@/components/CardContainer'
import { Heading, P } from '@/html'
import { tokens } from '@/tokens'

type Props = {
  title: string
  children: React.ReactNode
}

export function ListContainer({ title, children }: Props) {
  return (
    <View style={ListContainerOuterStyles}>
      <View style={ListContainerHeaderStyles}>
        <Heading level={1} marginBottom={tokens.space}>
          {title}
        </Heading>
      </View>
      {children}
    </View>
  )
}

export const ListContainerOuterStyles: ViewStyle = {
  flex: 1,
  marginTop: 40 + tokens.space, // phone notification/camera offset
  backgroundColor: tokens.backgroundColor,
}
export const ListContainerHeaderStyles: ViewStyle = {
  paddingLeft: tokens.space,
  paddingRight: tokens.space,
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
