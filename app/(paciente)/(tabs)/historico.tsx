import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getConsultasPaciente, Consulta } from "../../../src/lib/api-consultas";
import { useAuthStore } from "../../../src/stores/auth-store";

type Filtro = "todas" | "agendada" | "realizada" | "cancelada";

const STATUS_MAP: Record<string, { label: string; bg: string; color: string }> = {
  agendada: { label: "Confirmada", bg: "#DCFCE7", color: "#16A34A" },
  realizada: { label: "Realizada", bg: "#DBEAFE", color: "#2563EB" },
  cancelada: { label: "Cancelada", bg: "#FEE2E2", color: "#DC2626" },
};

export default function HistoricoConsultas() {
  const user = useAuthStore((s) => s.user);
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const { data: consultas, isLoading } = useQuery({
    queryKey: ["consultas-paciente", user?.id],
    queryFn: () => getConsultasPaciente(user!.id!),
    enabled: !!user?.id,
  });

  const filtradas = consultas?.filter((c) => filtro === "todas" || c.status === filtro) || [];

  const tabs: { key: Filtro; label: string }[] = [
    { key: "todas", label: "Todas" },
    { key: "agendada", label: "Confirmadas" },
    { key: "realizada", label: "Realizadas" },
    { key: "cancelada", label: "Canceladas" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Minhas Consultas</Text>
      </View>

      <View style={styles.tabs}>
        {tabs.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tabButton, filtro === t.key && styles.tabAtiva]}
            onPress={() => setFiltro(t.key)}
          >
            <Text style={[styles.tabText, filtro === t.key && styles.tabTextAtiva]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#2b7bb9" style={{ marginTop: 40 }} />
      ) : filtradas.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="calendar-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Nenhuma consulta encontrada</Text>
        </View>
      ) : (
        <FlatList
          data={filtradas}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          renderItem={({ item }) => {
            const status = STATUS_MAP[item.status] || { label: item.status, bg: "#F3F4F6", color: "#6B7280" };
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.data}>{item.data}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.row}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.rowText}>{item.hora}</Text>
                  </View>
                  <View style={styles.row}>
                    <Ionicons name="medical-outline" size={16} color="#666" />
                    <Text style={styles.rowText}>{item.especialidade || "---"}</Text>
                  </View>
                  <View style={styles.row}>
                    <Ionicons name="person-outline" size={16} color="#666" />
                    <Text style={styles.rowText}>{item.medicoNome || "---"}</Text>
                  </View>
                  <View style={styles.row}>
                    <Ionicons name="location-outline" size={16} color="#666" />
                    <Text style={styles.rowText}>{item.ubsNome || "---"}</Text>
                  </View>
                </View>

                {item.status === "agendada" && (
                  <TouchableOpacity
                    style={styles.cancelarButton}
                    onPress={() => router.push({ pathname: "/cancelar-consulta", params: { id: item.id } })}
                  >
                    <Text style={styles.cancelarText}>Cancelar consulta</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f4f7" },
  header: { padding: 16 },
  titulo: { fontSize: 20, fontWeight: "bold", color: "#2b7bb9" },
  tabs: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  tabAtiva: { backgroundColor: "#2b7bb9" },
  tabText: { fontSize: 13, fontWeight: "500", color: "#666" },
  tabTextAtiva: { color: "#fff" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  emptyText: { fontSize: 15, color: "#999" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  data: { fontSize: 15, fontWeight: "600", color: "#333" },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: "600" },
  cardBody: { gap: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowText: { fontSize: 14, color: "#555" },
  cancelarButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ef4444",
    alignItems: "center",
  },
  cancelarText: { fontSize: 14, fontWeight: "600", color: "#ef4444" },
});
