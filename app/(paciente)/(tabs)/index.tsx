import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatCard, QuickAction, SectionTitle } from "../../../components/shared";
import { useAuthStore } from "../../../src/stores/auth-store";
import api from "../../../src/lib/api";

async function getEstatisticasPaciente() {
  const response = await api.get("/paciente/estatisticas");
  return response.data;
}

export default function HomePaciente() {
  const user = useAuthStore((s) => s.user);

  const { data: stats, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["estatisticas-paciente"],
    queryFn: getEstatisticasPaciente,
    retry: false,
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Ionicons name="person-circle-outline" size={50} color="#9db4c0" />
            <View>
              <Text style={styles.hello}>Olá, {user?.nome || "Paciente"}!</Text>
              <Text style={styles.role}>Paciente</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push("/(paciente)/(tabs)/config")}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <SectionTitle title="Visão Geral" />

        {isLoading ? (
          <ActivityIndicator size="large" color="#4a90c2" style={{ margin: 32 }} />
        ) : (
          <View style={styles.grid}>
            <StatCard
              icon={<FontAwesome5 name="calendar-check" size={22} color="#ff4d6d" />}
              number={String(stats?.consultasAgendadas ?? 0)}
              title="Consultas Agendadas"
            />
            <StatCard
              icon={<MaterialIcons name="local-pharmacy" size={24} color="#ff7a00" />}
              number={String(stats?.medicamentosDisponiveis ?? 0)}
              title="Medicações Disponíveis"
            />
            <StatCard
              icon={<Ionicons name="document-text-outline" size={24} color="#7c3aed" />}
              number={String(stats?.historicos ?? 0)}
              title="Históricos"
            />
            <StatCard
              icon={<Ionicons name="location-outline" size={24} color="#22c55e" />}
              number={String(stats?.ubsProximas ?? 0)}
              title="UBS's Próximas"
            />
          </View>
        )}

        <SectionTitle title="Ações Rápidas" />

        <View style={styles.quickActions}>
          <QuickAction
            icon={<FontAwesome5 name="calendar-check" size={20} color="#ff4d6d" />}
            title="Agendar Consulta"
            onPress={() => router.push("/consultas")}
          />
          <QuickAction
            icon={<MaterialIcons name="local-pharmacy" size={20} color="#ff7a00" />}
            title="Medicamentos Disponíveis"
            onPress={() => router.push("/medicamentos")}
          />
          <QuickAction
            icon={<Ionicons name="document-text-outline" size={20} color="#7c3aed" />}
            title="Visualizar Históricos"
            onPress={() => router.push("/historico")}
          />
          <QuickAction
            icon={<Ionicons name="location-outline" size={20} color="#22c55e" />}
            title="Localizar UBS próxima"
            onPress={() => router.push("/localizar-ubs")}
          />
        </View>
      </ScrollView>
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
    padding: 16,
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  hello: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  role: {
    fontSize: 14,
    color: "#4a90c2",
    fontWeight: "500",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  quickActions: {
    marginHorizontal: 16,
  },
});
