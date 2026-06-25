import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../../components/shared";
import { useAuthStore } from "../../../src/stores/auth-store";

export default function SucessoConsulta() {
  const user = useAuthStore((s) => s.user);
  const { especialidade, data, hora, medicoNome, ubsNome } = useLocalSearchParams<{
    especialidade: string;
    data: string;
    hora: string;
    medicoNome: string;
    ubsNome: string;
  }>();

  return (
    <View style={styles.container}>
      <Header
        title=""
        onBack={() => router.back()}
      />

      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={60} color="#fff" />
        </View>

        <Text style={styles.title}>Sucesso</Text>
        <Text style={styles.subtitle}>Consulta Agendada</Text>

        <Text style={styles.infoLabel}>Informações</Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Nome</Text>
            <Text style={styles.infoValue}>{user?.nome || "Paciente"}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Data</Text>
            <Text style={styles.infoValue}>{data || "08 de Abril"}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Horário</Text>
            <Text style={styles.infoValue}>{hora || "10:30"}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Profissional</Text>
            <Text style={styles.infoValue}>{medicoNome || "Dr. Rodrigo"}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Tipo de consulta</Text>
            <Text style={styles.infoValue}>{especialidade || "Clínica-Geral"}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Local</Text>
            <Text style={styles.infoValue}>{ubsNome || "UBS Nicolau"}</Text>
          </View>
        </View>

        <View style={styles.orientacaoCard}>
          <Text style={styles.orientacaoTitle}>Orientação</Text>
          <Text style={styles.orientacaoText}>
            Chegar 15 minutos antes para realizar a triagem
          </Text>
        </View>

        <View style={styles.logoContainer}>
          <Ionicons name="medical" size={30} color="#2b7bb9" />
          <Text style={styles.logoText}>UBS Connect</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(paciente)/(tabs)/historico")}
        >
          <Text style={styles.buttonText}>Minhas Consultas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4a90c2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 13,
    color: "#999",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  orientacaoCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    elevation: 2,
  },
  orientacaoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  orientacaoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 32,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2b7bb9",
  },
  button: {
    backgroundColor: "#2b7bb9",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 24,
    width: "100%",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});