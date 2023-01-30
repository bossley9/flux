import { UnreadScreen } from '@/screens/UnreadScreen'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tokens } from '@/styles'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

function HomeScreen() {
  return (
    <View>
      <Text>home</Text>
    </View>
  )
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  )
}

export function MainScreen() {
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: tokens.backgroundColor,
      elevation: 0,
    },
  }
  return (
    <Tab.Navigator initialRouteName="Unread" screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Unread" component={UnreadScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}
