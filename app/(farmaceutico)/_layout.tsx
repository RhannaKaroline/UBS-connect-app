import { Stack } from "expo-router"

export default function FarmaceuticoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="detalhes-medicamento" />
      <Stack.Screen name="configuracoes" />
    </Stack>
  )
}
