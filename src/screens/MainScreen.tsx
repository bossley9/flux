import { FeedsScreen } from '@/screens/FeedsScreen'
import { ReadScreen } from '@/screens/ReadScreen'
import { UnreadScreen } from '@/screens/UnreadScreen'
import { HistoryScreen } from '@/screens/HistoryScreen'
import { SettingsScreen } from '@/screens/SettingsScreen'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tokens } from '@/styles'
import { MainScreen as MainScreenType } from '@/navigation'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type {
  DefaultNavigatorOptions,
  EventMapBase,
} from '@react-navigation/core'
import type { NavigationState } from '@react-navigation/routers'
import type { MainTabParamList } from '@/navigation'

type ScreenOptions = DefaultNavigatorOptions<
  MainTabParamList,
  NavigationState,
  BottomTabNavigationOptions,
  EventMapBase
>['screenOptions']

const Tab = createBottomTabNavigator<MainTabParamList>()

export function MainScreen() {
  const screenOptions: ScreenOptions = ({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      backgroundColor: tokens.backgroundColor,
      elevation: 0,
    },
    tabBarIcon: ({ color, size }) => {
      let iconName: string
      switch (route.name) {
        case MainScreenType.Feeds:
          iconName = 'rss-feed'
          break
        case MainScreenType.Read:
          iconName = 'mail'
          break
        case MainScreenType.Unread:
          iconName = 'mark-email-unread'
          break
        case MainScreenType.History:
          iconName = 'history'
          break
        case MainScreenType.Settings:
        default:
          iconName = 'settings'
      }
      return <Icon name={iconName} size={size} color={color} />
    },
  })
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
