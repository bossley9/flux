import { AppInitLoadingScreen } from '@/screens/AppInitLoadingScreen'
import { LoginScreen } from '@/screens/LoginScreen'
import { UnreadScreen } from '@/screens/UnreadScreen'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Screen } from '@/navigation'
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
  }
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator
          initialRouteName={Screen.AppInitLoading}
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name={Screen.AppInitLoading}
            component={AppInitLoadingScreen}
          />
          <Stack.Screen name={Screen.Login} component={LoginScreen} />
          <Stack.Screen name={Screen.Unread} component={UnreadScreen} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  )
}
