import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import "react-native-reanimated"

import { AppProvider } from "../context/app-context"
import { useColorScheme } from "../hooks/use-color-scheme"

const queryClient = new QueryClient()

export default function Layout() {
  const colorScheme = useColorScheme()

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(paciente)" options={{ headerShown: false }} />
              <Stack.Screen name="(medico)" options={{ headerShown: false }} />
              <Stack.Screen name="(agente)" options={{ headerShown: false }} />
              <Stack.Screen name="(farmaceutico)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
            </Stack>
          </SafeAreaView>
          <StatusBar barStyle="light-content"/>
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  )
}