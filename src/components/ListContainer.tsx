import { StyleSheet, View } from 'react-native'
import { CardContainer } from '@/components/CardContainer'
import { Heading, HeadingLink, P } from '@/html'
import { useTheme, type Theme } from '@/theme'

type Props = {
  title: string
  href?: string
  isDisabled?: boolean
  children: React.ReactNode
}

export function ListContainer({ title, href, isDisabled, children }: Props) {
  const tokens = useTheme()
  const styles = makeListStyles({ tokens })
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
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

type ListStyleProps = {
  tokens: Theme
}
const makeListStyles = ({ tokens }: ListStyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 40 + tokens.space, // phone notification/camera offset
      backgroundColor: tokens.backgroundColor,
    },
    containerHeader: {
      paddingLeft: tokens.space,
      paddingRight: tokens.space,
    },
  })

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
  const styles = makeFooterStyles({ tokens: useTheme() })
  return showSkeleton ? (
    <CardContainer style={styles.container} />
  ) : (
    <View style={styles.footerSpace} />
  )
}

type FooterStyleProps = {
  tokens: Theme
}
const makeFooterStyles = ({ tokens }: FooterStyleProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: tokens.darkColor,
      borderColor: tokens.darkColor,
    },
    footerSpace: { height: tokens.space * 2 },
  })
