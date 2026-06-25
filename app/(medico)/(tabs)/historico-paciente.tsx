import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header, SearchInput } from "../../../components/shared";
import {
  getPacientesAtendidos,
  getConsultasPacienteMedico,
  PacienteAtendido,
} from "../../../src/lib/api-medico";
import { useAuthStore } from "../../../src/stores/auth-store";

type Tela = "busca" | "historico";

export default function HistoricoPaciente() {
  const user = useAuthStore((s) => s.user);
  const [tela, setTela] = useState<Tela>("busca");
  const [busca, setBusca] = useState("");
  const [pacientes, setPacientes] = useState<PacienteAtendido[]>([]);
  const [loading, setLoading] = useState(true);
  const [pacienteSelecionado, setPacienteSelecionado] =
    useState<PacienteAtendido | null>(null);
  const [consultas, setConsultas] = useState<any[]>([]);
  const [loadingConsultas, setLoadingConsultas] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    getPacientesAtendidos(user.id)
      .then(setPacientes)
      .catch(() => setPacientes([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const pacientesFiltrados = useMemo(() => {
    if (!busca.trim()) return pacientes;
    const termo = busca.toLowerCase();
    return pacientes.filter((p) => p.nome.toLowerCase().includes(termo));
  }, [pacientes, busca]);

  const selecionarPaciente = async (paciente: PacienteAtendido) => {
    if (!user?.id) return;
    setPacienteSelecionado(paciente);
    setTela("historico");
    setLoadingConsultas(true);
    try {
      const data = await getConsultasPacienteMedico(user.id, paciente.id);
      setConsultas(data);
    } catch {
      setConsultas([]);
    } finally {
      setLoadingConsultas(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "agendada":
        return { bg: "#DCFCE7", color: "#16A34A", label: "Agendada" };
      case "realizada":
        return { bg: "#DBEAFE", color: "#2563EB", label: "Realizada" };
      case "cancelada":
        return { bg: "#FEE2E2", color: "#DC2626", label: "Cancelada" };
      default:
        return { bg: "#F3F4F6", color: "#6B7280", label: status };
    }
  };

  const voltarBusca = () => {
    setTela("busca");
    setPacienteSelecionado(null);
    setConsultas([]);
  };

  if (tela === "historico" && pacienteSelecionado) {
    return (
      <View style={styles.container}>
        <Header
          title="Histórico do Paciente"
          titleColor="#16A34A"
          onBack={voltarBusca}
        />

        <View style={styles.pacienteInfo}>
          <Ionicons name="person-circle-outline" size={44} color="#16A34A" />
          <View>
            <Text style={styles.pacienteNome}>{pacienteSelecionado.nome}</Text>
            {pacienteSelecionado.cpf && (
              <Text style={styles.pacienteCpf}>
                CPF: {pacienteSelecionado.cpf}
              </Text>
            )}
          </View>
        </View>

        {loadingConsultas ? (
          <ActivityIndicator
            size="large"
            color="#16A34A"
            style={{ marginTop: 40 }}
          />
        ) : consultas.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="document-text-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              Nenhuma consulta encontrada com este paciente.
            </Text>
          </View>
        ) : (
          <FlatList
            data={consultas}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => {
              const statusStyle = getStatusStyle(item.status);
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    router.push({
                      pathname: "/atualizar-prontuario",
                      params: { consultaId: item.id },
                    })
                  }
                >
                  <View style={styles.cardLeft}>
                    <View style={styles.cardDate}>
                      <Text style={styles.cardData}>{item.data}</Text>
                      <Text style={styles.cardHora}>{item.hora}</Text>
                    </View>
                    <View>
                      <Text style={styles.cardEspecialidade}>
                        {item.especialidade}
                      </Text>
                      <Text style={styles.cardTipo}>{item.tipoConsulta}</Text>
                    </View>
                  </View>
                  <View style={styles.cardRight}>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: statusStyle.bg },
                      ]}
                    >
                      <Text
                        style={[styles.statusText, { color: statusStyle.color }]}
                      >
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

  return (
    <View style={styles.container}>
      <Header
        title="Consultar Histórico"
        titleColor="#16A34A"
        onBack={() => router.back()}
      />

      <SearchInput
        placeholder="Filtrar pacientes por nome..."
        value={busca}
        onChangeText={setBusca}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#16A34A"
          style={{ marginTop: 40 }}
        />
      ) : pacientesFiltrados.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="people-outline" size={48} color="#ccc" />
          <Text style={styles.emptyText}>
            {pacientes.length === 0
              ? "Nenhum paciente atendido encontrado."
              : "Nenhum paciente encontrado para esta busca."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={pacientesFiltrados}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.pacienteCard}
              onPress={() => selecionarPaciente(item)}
            >
              <Ionicons name="person-circle-outline" size={36} color="#16A34A" />
              <View style={styles.pacienteInfoLista}>
                <Text style={styles.pacienteNomeLista}>{item.nome}</Text>
                {item.cpf && (
                  <Text style={styles.pacienteCpfLista}>CPF: {item.cpf}</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}
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
  pacienteInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 12,
    elevation: 2,
  },
  pacienteNome: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },
  pacienteCpf: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  pacienteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    elevation: 2,
    gap: 12,
  },
  pacienteInfoLista: {
    flex: 1,
  },
  pacienteNomeLista: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  pacienteCpfLista: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  cardDate: {
    alignItems: "center",
    width: 55,
  },
  cardData: {
    fontSize: 12,
    color: "#666",
  },
  cardHora: {
    fontSize: 15,
    fontWeight: "600",
    color: "#16A34A",
  },
  cardEspecialidade: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  cardTipo: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
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
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: "#999",
    textAlign: "center",
    marginHorizontal: 40,
  },
});
