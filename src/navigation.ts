import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import type { Entry } from '@/services/types'

export enum Screen {
  AppInitLoading = 'AppInitLoading',
  Login = 'Login',
  Unread = 'Unread',
  Entry = 'Entry',
}

export type StackParamList = {
  [Screen.AppInitLoading]: undefined
  [Screen.Login]: undefined
  [Screen.Unread]: undefined
  [Screen.Entry]: { entry: Entry }
}

export type ScreenProps<T extends Screen> = NativeStackScreenProps<
  StackParamList,
  T
>

export type ScreenNavigationProp<T extends Screen> = NativeStackNavigationProp<
  StackParamList,
  T
>
