import { StyleSheet, Text, View } from "react-native";
import { useApp } from "../context/app-context";

export default function Home() {
  const { pacientes, campanhas } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, Agente 👋</Text>

      <View style={styles.card}>
        <Text>Pacientes cadastrados</Text>
        <Text style={styles.number}>{pacientes.length}</Text>
      </View>

      <View style={styles.card}>
        <Text>Campanhas ativas</Text>
        <Text style={styles.number}>{campanhas.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  number: { fontSize: 20, fontWeight: "bold", color: "#7B61FF" },
});