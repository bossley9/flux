import { RefreshControl, StyleSheet, ScrollView } from 'react-native'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { tokens } from '@/tokens'

type ScrollViewProps = React.ComponentProps<typeof ScrollView>

type Props = Omit<ScrollViewProps, 'refreshControl'> & {
  style?: object
  children?: React.ReactNode
  refreshEnabled?: boolean
  refreshing?: boolean
  onRefresh?: () => void
}

function setupNavigationBar() {
  NavigationBar.setBackgroundColorAsync('#00000000')
  NavigationBar.setPositionAsync('absolute')
}

export function ScrollScreenContainer({
  style,
  children,
  refreshEnabled,
  refreshing,
  onRefresh,
  ...restProps
}: Props) {
  useEffect(() => {
    setupNavigationBar()
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 40 + tokens.space, // phone notification/camera offset
      backgroundColor: tokens.backgroundColor,
      ...style,
    },
  })

  return (
    <ScrollView
      style={styles.container}
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
