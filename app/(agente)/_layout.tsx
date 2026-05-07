import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="cadastrar" />
      <Tabs.Screen name="atualizar" />
      <Tabs.Screen name="campanhas" />
    </Tabs>
  );
}