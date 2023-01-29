import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

export enum Screen {
  AppInitLoading = 'AppInitLoading',
  Login = 'Login',
  Unread = 'Unread',
}

export type StackParamList = {
  [Screen.AppInitLoading]: undefined
  [Screen.Login]: undefined
  [Screen.Unread]: undefined
}

export type ScreenProps<T extends Screen> = NativeStackScreenProps<
  StackParamList,
  T
>

export type ScreenNavigationProp<T extends Screen> = NativeStackNavigationProp<
  StackParamList,
  T
>
