import { AppInitLoadingScreen } from '@/screens/AppInitLoadingScreen'
import { LoginScreen } from '@/screens/LoginScreen'
import { UnreadScreen } from '@/screens/UnreadScreen'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Screen } from '@/navigation'
import type { StackParamList } from '@/navigation'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
    },
  },
})
const Stack = createNativeStackNavigator<StackParamList>()

export function Index() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
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
