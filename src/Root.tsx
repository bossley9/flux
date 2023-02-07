import { AppInitLoadingScreen } from '@/screens/AppInitLoadingScreen'
import { LoginScreen } from '@/screens/LoginScreen'
import { MainScreen } from '@/screens/MainScreen'
import { FeedScreen } from '@/screens/FeedScreen'
import { EntryScreen } from '@/screens/EntryScreen'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootScreen } from '@/navigation'
import { tokens } from '@/tokens'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/navigation'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 60 * 1000,
      retry: false,
      cacheTime: Infinity,
    },
  },
})

function setupNavigationBar() {
  NavigationBar.setBackgroundColorAsync('#00000000')
  NavigationBar.setPositionAsync('absolute')
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  headerStyle: {
    backgroundColor: tokens.backgroundColor,
  },
  statusBarColor: tokens.backgroundColor,
  statusBarStyle: 'dark',
  animation: 'none',
  // prevent unnecessary rerenders
  freezeOnBlur: true,
}

export function Root() {
  useEffect(() => {
    setupNavigationBar()
  }, [])

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
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
            <Stack.Screen name={RootScreen.Feed} component={FeedScreen} />
            <Stack.Screen name={RootScreen.Entry} component={EntryScreen} />
          </Stack.Navigator>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </NavigationContainer>
  )
}
