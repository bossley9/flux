import { FeedsScreen } from '@/screens/FeedsScreen'
import { StarredScreen } from '@/screens/StarredScreen'
import { UnreadScreen } from '@/screens/UnreadScreen'
import { HistoryScreen } from '@/screens/HistoryScreen'
import { SettingsScreen } from '@/screens/SettingsScreen'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tokens } from '@/tokens'
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
    tabBarLabel: ({ focused }) => {
      let tabName: string
      const color = focused ? tokens.primaryColor : tokens.lightColor
      switch (route.name) {
        case MainScreenType.Feeds:
          tabName = 'Feeds'
          break
        case MainScreenType.Starred:
          tabName = 'Starred'
          break
        case MainScreenType.Unread:
          tabName = 'Unread'
          break
        case MainScreenType.History:
          tabName = 'History'
          break
        case MainScreenType.Settings:
        default:
          tabName = 'Settings'
      }
      return <Text style={{ color, fontSize: 11 }}>{tabName}</Text>
    },
    tabBarIcon: ({ focused, size }) => {
      let iconName: string
      const iconColor = focused ? tokens.primaryColor : tokens.lightColor
      switch (route.name) {
        case MainScreenType.Feeds:
          iconName = 'rss-feed'
          break
        case MainScreenType.Starred:
          iconName = 'star'
          break
        case MainScreenType.Unread:
          iconName = 'mail'
          break
        case MainScreenType.History:
          iconName = 'history'
          break
        case MainScreenType.Settings:
        default:
          iconName = 'settings'
      }
      return <Icon name={iconName} size={size} color={iconColor} />
    },
  })
  return (
    <Tab.Navigator
      initialRouteName={MainScreenType.Unread}
      screenOptions={screenOptions}
    >
      <Tab.Screen name={MainScreenType.Feeds} component={FeedsScreen} />
      <Tab.Screen name={MainScreenType.Starred} component={StarredScreen} />
      <Tab.Screen name={MainScreenType.Unread} component={UnreadScreen} />
      <Tab.Screen name={MainScreenType.History} component={HistoryScreen} />
      <Tab.Screen name={MainScreenType.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  )
}
