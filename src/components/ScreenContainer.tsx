import { StyleSheet, View } from 'react-native'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'

type Props = { children?: React.ReactNode }

function setupNavigationBar() {
  NavigationBar.setBackgroundColorAsync('#00000000')
  NavigationBar.setPositionAsync('absolute')
}

export function ScreenContainer({ children }: Props) {
  useEffect(() => {
    setupNavigationBar()
  }, [])
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40, // phone notification/camera offset
    marginBottom: 16, // navigation bar offset
  },
})
