import { RefreshControl, StyleSheet, ScrollView } from 'react-native'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { tokens } from '@/styles'

type Props = {
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

export function ScreenContainer({
  style,
  children,
  refreshEnabled,
  refreshing,
  onRefresh,
}: Props) {
  useEffect(() => {
    setupNavigationBar()
  }, [])
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
    >
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40 + tokens.space, // phone notification/camera offset
    backgroundColor: tokens.backgroundColor,
  },
})
