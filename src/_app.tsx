import { LoginScreen } from '@components/LoginScreen'
import { DataComponent } from '@components/DataComponent'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type StackParamList = {
  Login: undefined
  Profile: undefined
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
    },
  },
})
const Stack = createNativeStackNavigator<StackParamList>()

export function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={DataComponent} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  )
}
