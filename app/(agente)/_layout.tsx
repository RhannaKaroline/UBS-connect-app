import { Stack } from "expo-router"

export default function AgenteLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="cadastrar" />
    </Stack>
  )
}
