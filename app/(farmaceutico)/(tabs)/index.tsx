import { FontAwesome5, Ionicons } from "@expo/vector-icons";
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
import { getEstatisticas } from "@/src/lib/api-farmaceutico";

export default function HomeFarmaceutico() {
  const { data: stats, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["estatisticas-farmacia"],
    queryFn: getEstatisticas,
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
              <Text style={styles.hello}>Olá, Farmacêutico!</Text>
              <Text style={styles.role}>Farmacêutico</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => router.push("/configuracoes")}>
              <Ionicons name="settings-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Visão Geral</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#F59E0B" style={{ margin: 32 }} />
        ) : (
          <View style={styles.grid}>
            <StatCard
              icon={<FontAwesome5 name="box-open" size={22} color="#F59E0B" />}
              number={String(stats?.totalMedicamentos ?? 0)}
              title="Medicamentos cadastrados"
            />
            <StatCard
              icon={<Ionicons name="clipboard-outline" size={24} color="#22c55e" />}
              number={String(stats?.itensEmEstoque ?? 0)}
              title="Itens em estoque"
            />
            <StatCard
              icon={<Ionicons name="warning-outline" size={24} color="#3b82f6" />}
              number={String(stats?.estoqueBaixo ?? 0)}
              title="Estoque Baixo"
            />
            <StatCard
              icon={<Ionicons name="ban-outline" size={24} color="#ef4444" />}
              number={String(stats?.indisponiveis ?? 0)}
              title="Indisponíveis"
            />
          </View>
        )}

        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <View style={styles.quickActions}>
          <QuickAction
            icon={<FontAwesome5 name="box" size={20} color="#F59E0B" />}
            title="Visualizar Estoque"
            onPress={() => router.push("/estoque")}
          />
          <QuickAction
            icon={<Ionicons name="add-circle-outline" size={20} color="#22c55e" />}
            title="Adicionar Medicamento"
            onPress={() => router.push("/adiconar")}
          />
          <QuickAction
            icon={<Ionicons name="create-outline" size={20} color="#3b82f6" />}
            title="Atualizar Medicamento"
            onPress={() => router.push("/estoque")}
          />
          <QuickAction
            icon={<Ionicons name="trash-outline" size={20} color="#ef4444" />}
            title="Remover Medicamento"
            onPress={() => router.push("/estoque")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({ icon, number, title }: any) {
  return (
    <View style={styles.card}>
      {icon}
      <Text style={styles.cardNumber}>{number}</Text>
      <Text style={styles.cardText}>{title}</Text>
    </View>
  );
}

function QuickAction({ icon, title, onPress }: any) {
  return (
    <TouchableOpacity
      style={styles.quickAction}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.quickActionLeft}>
        {icon}
        <Text style={styles.quickActionText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
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
    flex: 1,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  hello: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  role: {
    fontSize: 14,
    color: "#F59E0B",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  cardNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  cardText: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  quickActions: {
    marginHorizontal: 16,
  },
  quickAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
  },
  quickActionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quickActionText: {
    fontSize: 15,
    color: "#333",
  },
});