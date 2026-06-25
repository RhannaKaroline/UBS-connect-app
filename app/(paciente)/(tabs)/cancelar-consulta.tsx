import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../../components/shared";
import { cancelarConsulta, getConsultaPorId } from "../../../src/lib/api-consultas";

export default function CancelarConsulta() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: consulta, isLoading } = useQuery({
    queryKey: ["consulta", id],
    queryFn: () => getConsultaPorId(Number(id)),
    enabled: !!id,
  });

  const handleCancelar = async () => {
    try {
      await cancelarConsulta(Number(id));
      queryClient.invalidateQueries({ queryKey: ["consultas-paciente"] });
      Alert.alert("Sucesso", "Consulta cancelada com sucesso!", [
        { text: "OK", onPress: () => router.replace("/(paciente)/(tabs)/historico") },
      ]);
    } catch (error: any) {
      const mensagem = error?.response?.data?.erro || "Erro ao cancelar consulta.";
      Alert.alert("Erro", mensagem);
    }
  };

  const confirmarCancelamento = () => {
    Alert.alert(
      "Confirmar cancelamento",
      "Tem certeza que deseja cancelar esta consulta?",
      [
        { text: "Não", style: "cancel" },
        { text: "Sim, cancelar", style: "destructive", onPress: handleCancelar },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="Cancelar Consulta" titleColor="#ef4444" onBack={() => router.back()} />
        <ActivityIndicator size="large" color="#ef4444" style={{ marginTop: 40 }} />
      </View>
    );
  }

  if (!consulta) {
    return (
      <View style={styles.container}>
        <Header title="Cancelar Consulta" titleColor="#ef4444" onBack={() => router.back()} />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Consulta não encontrada.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Cancelar Consulta" titleColor="#ef4444" onBack={() => router.back()} />

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar" size={40} color="#ef4444" />
        </View>
        <Text style={styles.cardTitle}>Você está cancelando a consulta:</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Data</Text>
          <Text style={styles.value}>{consulta.data}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Horário</Text>
          <Text style={styles.value}>{consulta.hora}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Especialidade</Text>
          <Text style={styles.value}>{consulta.especialidade || "---"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Médico</Text>
          <Text style={styles.value}>{consulta.medicoNome || "---"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>UBS</Text>
          <Text style={styles.value}>{consulta.ubsNome || "---"}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cancelarButton} onPress={confirmarCancelamento}>
        <Ionicons name="close-circle-outline" size={20} color="#fff" />
        <Text style={styles.cancelarText}>Cancelar Consulta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f4f7" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 15, color: "#999" },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: { fontSize: 14, color: "#999" },
  value: { fontSize: 14, fontWeight: "600", color: "#333" },
  cancelarButton: {
    flexDirection: "row",
    backgroundColor: "#ef4444",
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 3,
  },
  cancelarText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
