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

export type StackParamList = {
  [RootScreen.AppInitLoading]: undefined
  [RootScreen.Login]: undefined
  [RootScreen.Main]: undefined
  [RootScreen.Entry]: { entry: Entry }
}

export type ScreenProps<T extends RootScreen> = NativeStackScreenProps<
  StackParamList,
  T
>

export type ScreenNavigationProp<T extends RootScreen> =
  NativeStackNavigationProp<StackParamList, T>
