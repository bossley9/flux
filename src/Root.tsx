import { AppInitLoadingScreen } from '@/screens/AppInitLoadingScreen'
import { LoginScreen } from '@/screens/LoginScreen'
import { MainScreen } from '@/screens/MainScreen'
import { EntryScreen } from '@/screens/EntryScreen'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootScreen } from '@/navigation'
import { tokens } from '@/styles'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { StackParamList } from '@/navigation'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
})
const Stack = createNativeStackNavigator<StackParamList>()

export function Root() {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    headerStyle: {
      backgroundColor: tokens.backgroundColor,
    },
    statusBarColor: tokens.backgroundColor,
    statusBarStyle: 'dark',
  }
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator
          initialRouteName={RootScreen.AppInitLoading}
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name={RootScreen.AppInitLoading}
            component={AppInitLoadingScreen}
          />
          <Stack.Screen name={RootScreen.Login} component={LoginScreen} />
          <Stack.Screen name={RootScreen.Main} component={MainScreen} />
          <Stack.Screen name={RootScreen.Entry} component={EntryScreen} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  )
}
