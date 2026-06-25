import { Stack } from "expo-router"

export default function AgenteLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="cadastrar" />
      <Stack.Screen name="atualizar" />
      <Stack.Screen name="minha-equipe" />
      <Stack.Screen name="campanhas" />
      <Stack.Screen name="configuracoes" />
    </Stack>
  )
}
