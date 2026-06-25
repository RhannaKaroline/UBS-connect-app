import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatCard, QuickAction, SectionTitle } from "../../../components/shared";
import { getConsultasMedico, Consulta } from "../../../src/lib/api-consultas";
import { useAuthStore } from "../../../src/stores/auth-store";

export default function MedicoHome() {
  const user = useAuthStore((s) => s.user);
  const [proximas, setProximas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const hoje = new Date();
    const dataStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
    getConsultasMedico(user.id, dataStr, "agendada")
      .then((data) => setProximas(data.slice(0, 3)))
      .catch(() => setProximas([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Ionicons name="person-circle-outline" size={50} color="#9db4c0" />
            <View>
              <Text style={styles.hello}>Olá, Dr. {user?.nome || ""}!</Text>
              <Text style={styles.role}>Médico</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push("/(medico)/(tabs)/perfil")}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <SectionTitle title="Visão Geral" />

        <View style={styles.grid}>
          <StatCard
            icon={<Ionicons name="calendar" size={24} color="#16A34A" />}
            number=""
            title="Agenda de Atendimentos"
            onPress={() => router.push("/agenda")}
          />
          <StatCard
            icon={<Ionicons name="document-text" size={24} color="#16A34A" />}
            number=""
            title="Atualizar Prontuário"
            onPress={() => router.push("/agenda")}
          />
          <StatCard
            icon={<Ionicons name="folder-open" size={24} color="#16A34A" />}
            number=""
            title="Consultar Histórico de Paciente"
            onPress={() => router.push("/historico-paciente")}
          />
        </View>

        <SectionTitle title="Ações rápidas" />

        <View style={styles.quickActions}>
          <QuickAction
            icon={<Ionicons name="calendar-outline" size={20} color="#16A34A" />}
            title="Agenda de Atendimentos"
            onPress={() => router.push("/agenda")}
          />
          <QuickAction
            icon={<Ionicons name="document-text-outline" size={20} color="#16A34A" />}
            title="Atualizar Prontuário"
            onPress={() => router.push("/agenda")}
          />
          <QuickAction
            icon={<Ionicons name="folder-outline" size={20} color="#16A34A" />}
            title="Consultar Histórico de Paciente"
            onPress={() => router.push("/historico-paciente")}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximos Atendimentos</Text>
          <TouchableOpacity onPress={() => router.push("/agenda")}>
            <Text style={styles.verAgenda}>Ver agenda completa</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color="#16A34A" style={{ marginVertical: 20 }} />
        ) : proximas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={36} color="#ccc" />
            <Text style={styles.emptyText}>Nenhum atendimento hoje</Text>
          </View>
        ) : (
          proximas.map((consulta) => (
            <TouchableOpacity
              key={consulta.id}
              style={styles.atendimentoCard}
              onPress={() => router.push({
                pathname: "/atualizar-prontuario",
                params: { consultaId: consulta.id },
              })}
            >
              <View style={styles.atendimentoLeft}>
                <Text style={styles.atendimentoHora}>{consulta.hora}</Text>
                <View style={styles.pacienteIcon}>
                  <Ionicons name="person" size={16} color="#16A34A" />
                </View>
                <View>
                  <Text style={styles.pacienteNome}>{consulta.pacienteNome}</Text>
                  <Text style={styles.pacienteTipo}>{consulta.tipoConsulta}</Text>
                </View>
              </View>
              <View style={styles.atendimentoRight}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Confirmado</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#999" />
              </View>
            </TouchableOpacity>
          ))
        )}
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
    color: "#16A34A",
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  verAgenda: {
    fontSize: 13,
    color: "#16A34A",
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  atendimentoCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  atendimentoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  atendimentoHora: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    width: 40,
  },
  pacienteIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
  },
  pacienteNome: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  pacienteTipo: {
    fontSize: 13,
    color: "#666",
  },
  atendimentoRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#16A34A",
  },
});
