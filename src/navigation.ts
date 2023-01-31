import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import type { Entry } from '@/services/types'

export enum RootScreen {
  AppInitLoading = 'AppInitLoading',
  Login = 'Login',
  Main = 'Main',
  Entry = 'Entry',
}

export type RootStackParamList = {
  [RootScreen.AppInitLoading]: undefined
  [RootScreen.Login]: undefined
  [RootScreen.Main]: undefined
  [RootScreen.Entry]: { entry: Entry }
}

export type RootScreenProps<T extends RootScreen> = NativeStackScreenProps<
  RootStackParamList,
  T
>

export type RootScreenNavigationProp<T extends RootScreen> =
  NativeStackNavigationProp<RootStackParamList, T>

export enum MainScreen {
  Feeds = 'Feeds',
  Starred = 'Starred',
  Unread = 'Unread',
  History = 'History',
  Settings = 'Settings',
}

export type MainTabParamList = {
  [MainScreen.Feeds]: undefined
  [MainScreen.Starred]: undefined
  [MainScreen.Unread]: undefined
  [MainScreen.History]: undefined
  [MainScreen.Settings]: undefined
}
