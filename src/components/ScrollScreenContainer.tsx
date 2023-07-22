import { RefreshControl, StyleSheet, ScrollView } from 'react-native'
import { useTheme, Theme } from '@/theme'

type ScrollViewProps = React.ComponentProps<typeof ScrollView>

type Props = Omit<ScrollViewProps, 'refreshControl'> & {
  style?: object
  children?: React.ReactNode
  refreshEnabled?: boolean
  refreshing?: boolean
  onRefresh?: () => void
}

export function ScrollScreenContainer({
  style,
  children,
  refreshEnabled,
  refreshing,
  onRefresh,
  ...restProps
}: Props) {
  const tokens = useTheme()
  const styles = makeStyles({ tokens })
  return (
    <ScrollView
      style={{ ...styles.container, ...style }}
      refreshControl={
        <RefreshControl
          enabled={Boolean(refreshEnabled)}
          refreshing={Boolean(refreshing)}
          onRefresh={onRefresh}
          progressBackgroundColor={tokens.backgroundColor}
          colors={[tokens.lightColor]}
        />
      }
      {...restProps}
    >
      {children}
    </ScrollView>
  )
}

type StyleProps = {
  tokens: Theme
}
const makeStyles = ({ tokens }: StyleProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 40 + tokens.space, // phone notification/camera offset
      backgroundColor: tokens.backgroundColor,
    },
  })
