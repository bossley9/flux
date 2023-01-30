import { StyleSheet, ScrollView } from 'react-native'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { tokens } from '@/styles'

type Props = {
  style?: object
  children?: React.ReactNode
}

function setupNavigationBar() {
  NavigationBar.setBackgroundColorAsync('#00000000')
  NavigationBar.setPositionAsync('absolute')
}

export function ScreenContainer({ style, children }: Props) {
  useEffect(() => {
    setupNavigationBar()
  }, [])
  return (
    <ScrollView style={{ ...styles.container, ...style }}>
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
