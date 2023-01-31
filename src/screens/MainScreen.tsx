import { FeedsScreen } from '@/screens/FeedsScreen'
import { ReadScreen } from '@/screens/ReadScreen'
import { UnreadScreen } from '@/screens/UnreadScreen'
import { HistoryScreen } from '@/screens/HistoryScreen'
import { SettingsScreen } from '@/screens/SettingsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tokens } from '@/styles'
import { MainScreen as MainScreenType } from '@/navigation'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type { MainTabParamList } from '@/navigation'

const Tab = createBottomTabNavigator<MainTabParamList>()

export function MainScreen() {
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: tokens.backgroundColor,
      elevation: 0,
    },
  }
  return (
    <Tab.Navigator
      initialRouteName={MainScreenType.Unread}
      screenOptions={screenOptions}
    >
      <Tab.Screen name={MainScreenType.Feeds} component={FeedsScreen} />
      <Tab.Screen name={MainScreenType.Read} component={ReadScreen} />
      <Tab.Screen name={MainScreenType.Unread} component={UnreadScreen} />
      <Tab.Screen name={MainScreenType.History} component={HistoryScreen} />
      <Tab.Screen name={MainScreenType.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  )
}
