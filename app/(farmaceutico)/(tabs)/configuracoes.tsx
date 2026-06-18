import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ConfiguracoesFarmaceutico() {
  const handleLogout = () => {
    // TODO: limpar autenticação
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Configurações</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Card do Farmacêutico */}
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={30} color="#F59E0B" />
        </View>
        <View style={styles.info}>
          <Text style={styles.nome}>Farmacêutico (nome)</Text>
          <Text style={styles.crf}>CRF 000- 000. AM</Text>
        </View>
      </View>

      {/* Sair da Conta */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <View style={styles.logoutLeft}>
          <Ionicons name="log-out-outline" size={22} color="#ef4444" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F59E0B",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#FEF3C7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  crf: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  logoutLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    color: "#ef4444",
    fontWeight: "500",
  },
});