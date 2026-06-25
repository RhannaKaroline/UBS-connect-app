import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
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
import { getEstatisticas, getProximasVisitas } from "../../../src/lib/api-agente";

export default function HomeAgente() {
  const { data: stats, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["estatisticas-agente"],
    queryFn: getEstatisticas,
  });

  const { data: visitas } = useQuery({
    queryKey: ["visitas-agente"],
    queryFn: getProximasVisitas,
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
              <Text style={styles.hello}>Olá, Agente!</Text>
              <Text style={styles.role}>Agente Comunitário de Saúde</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push("/configuracoes")}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <SectionTitle title="Visão Geral" />

        {isLoading ? (
          <ActivityIndicator size="large" color="#8B5CF6" style={{ margin: 32 }} />
        ) : (
          <View style={styles.grid}>
            <StatCard
              icon={<Ionicons name="people-outline" size={24} color="#8B5CF6" />}
              number={String(stats?.totalPacientes ?? 0)}
              title="Pacientes Cadastrados"
            />
            <StatCard
              icon={<Feather name="clipboard" size={22} color="#22C55E" />}
              number={String(stats?.visitasHoje ?? 0)}
              title="Visitas hoje"
            />
            <StatCard
              icon={<MaterialIcons name="calendar-month" size={24} color="#F59E0B" />}
              number={String(stats?.acompanhamentos ?? 0)}
              title="Acompanhamento"
            />
            <StatCard
              icon={<Ionicons name="megaphone-outline" size={22} color="#3B82F6" />}
              number={String(stats?.campanhasAtivas ?? 0)}
              title="Campanhas ativas"
            />
          </View>
        )}

        <SectionTitle title="Ações Rápidas" />

        <View style={styles.quickActions}>
          <QuickAction
            icon={<Ionicons name="person-add-outline" size={20} color="#8B5CF6" />}
            title="Cadastrar Paciente"
            onPress={() => router.push("/cadastrar")}
          />
          <QuickAction
            icon={<Feather name="edit-2" size={18} color="#22C55E" />}
            title="Atualizar Cadastro"
            onPress={() => router.push("/atualizar")}
          />
          <QuickAction
            icon={<Ionicons name="people-outline" size={20} color="#3B82F6" />}
            title="Minha equipe ACS"
            onPress={() => router.push("/minha-equipe")}
          />
          <QuickAction
            icon={<Ionicons name="megaphone-outline" size={20} color="#F97316" />}
            title="Campanhas de Saúde"
            onPress={() => router.push("/campanhas")}
          />
        </View>

        <SectionTitle title="Próximas Visitas" />

        {visitas?.map((visita) => (
          <View key={visita.id} style={styles.visitCard}>
            <View>
              <Text style={styles.visitName}>{visita.pacienteNome}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#999" />
                <Text style={styles.locationText}>{visita.endereco}</Text>
              </View>
            </View>
            <View style={styles.timeBox}>
              <Text style={styles.time}>
                {visita.dataHora?.split(" ")[1]?.slice(0, 5) || "9:00"}
              </Text>
            </View>
          </View>
        ))}
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
    color: "#8B5CF6",
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
  visitCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  visitName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  timeBox: {
    backgroundColor: "#F3E8FF",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  time: {
    color: "#8B5CF6",
    fontWeight: "700",
    fontSize: 15,
  },
});
