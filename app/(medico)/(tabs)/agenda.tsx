import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../../components/shared";
import { getConsultasMedico, Consulta } from "../../../src/lib/api-consultas";
import { useAuthStore } from "../../../src/stores/auth-store";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export default function AgendaAtendimentos() {
  const user = useAuthStore((s) => s.user);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());

  const dataStr = `${dataSelecionada.getFullYear()}-${String(dataSelecionada.getMonth() + 1).padStart(2, "0")}-${String(dataSelecionada.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    getConsultasMedico(user.id, dataStr)
      .then(setConsultas)
      .catch(() => setConsultas([]))
      .finally(() => setLoading(false));
  }, [user?.id, dataStr]);

  const changeDay = (offset: number) => {
    const nova = new Date(dataSelecionada);
    nova.setDate(nova.getDate() + offset);
    setDataSelecionada(nova);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "agendada":
        return { bg: "#DCFCE7", color: "#16A34A", label: "Confirmado" };
      case "cancelada":
        return { bg: "#FEE2E2", color: "#DC2626", label: "Cancelado" };
      case "realizada":
        return { bg: "#DBEAFE", color: "#2563EB", label: "Realizado" };
      default:
        return { bg: "#F3F4F6", color: "#6B7280", label: status };
    }
  };

  const formatDate = (date: Date) => {
    const diaSemana = WEEKDAYS[date.getDay()];
    const dia = date.getDate();
    const mes = MONTHS[date.getMonth()];
    const ano = date.getFullYear();
    return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
  };

  const isToday = (date: Date) => {
    const hoje = new Date();
    return date.toDateString() === hoje.toDateString();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Agenda de Atendimentos"
        titleColor="#16A34A"
        onBack={() => router.back()}
      />

      <View style={styles.dateSelector}>
        <TouchableOpacity onPress={() => changeDay(-1)}>
          <Ionicons name="chevron-back" size={22} color="#16A34A" />
        </TouchableOpacity>
        <View style={styles.dateCenter}>
          <Ionicons name="calendar-outline" size={20} color="#16A34A" />
          <Text style={styles.dateText}>{formatDate(dataSelecionada)}</Text>
          {isToday(dataSelecionada) && (
            <View style={styles.todayBadge}>
              <Text style={styles.todayText}>Hoje</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => changeDay(1)}>
          <Ionicons name="chevron-forward" size={22} color="#16A34A" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#16A34A" style={{ marginTop: 40 }} />
      ) : consultas.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="calendar-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Nenhuma consulta neste dia</Text>
        </View>
      ) : (
        <FlatList
          data={consultas}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            const statusStyle = getStatusStyle(item.status);
            return (
              <TouchableOpacity style={styles.card}>
                <View style={styles.cardLeft}>
                  <Text style={styles.horario}>{item.hora}</Text>
                  <View style={styles.pacienteIcon}>
                    <Ionicons name="person" size={16} color="#16A34A" />
                  </View>
                  <View style={styles.pacienteInfo}>
                    <Text style={styles.pacienteNome}>{item.pacienteNome}</Text>
                    <Text style={styles.pacienteTipo}>{item.tipoConsulta}</Text>
                  </View>
                </View>
                <View style={styles.cardRight}>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.statusText, { color: statusStyle.color }]}>
                      {statusStyle.label}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color="#999" />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 12,
    elevation: 2,
  },
  dateCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  todayBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  todayText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#16A34A",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: "#999",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  horario: {
    fontSize: 16,
    fontWeight: "600",
    color: "#16A34A",
    width: 50,
  },
  pacienteIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
  },
  pacienteInfo: {
    flex: 1,
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
  cardRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
