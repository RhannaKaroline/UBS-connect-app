import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../../../components/shared";
import { useAuthStore } from "../../../src/stores/auth-store";
import {
  agendarConsulta,
  getHorariosDisponiveis,
  getMedicos,
} from "../../../src/lib/api-consultas";

const mesesNome = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function AgendarConsulta() {
  const user = useAuthStore((s) => s.user);
  const pacienteId = user?.id;

  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState("");
  const [mesSelecionado, setMesSelecionado] = useState(0);
  const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  const { data: medicos, isLoading: loadingMedicos } = useQuery({
    queryKey: ["medicos", pacienteId],
    queryFn: () => getMedicos(pacienteId),
    enabled: !!pacienteId,
    retry: false,
  });

  const especialidades = useMemo(() => {
    if (!medicos) return [];
    const unique = [...new Set(medicos.map((m) => m.especialidade))];
    return unique;
  }, [medicos]);

  const medicosFiltrados = useMemo(() => {
    if (!medicos || !especialidadeSelecionada) return [];
    return medicos.filter((m) => m.especialidade === especialidadeSelecionada);
  }, [medicos, especialidadeSelecionada]);

  const meses = useMemo(() => {
    const agora = new Date();
    const lista: { index: number; nome: string; ano: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const d = new Date(agora.getFullYear(), agora.getMonth() + i, 1);
      lista.push({ index: i, nome: mesesNome[d.getMonth()], ano: d.getFullYear() });
    }
    return lista;
  }, []);

  const dias = useMemo(() => {
    if (!meses[mesSelecionado]) return [];
    const { index, ano } = meses[mesSelecionado];
    const agora = new Date();
    const mesAtual = new Date(ano, (new Date().getMonth() + index) % 12, 1);
    const anoInt = mesAtual.getFullYear();
    const mesInt = mesAtual.getMonth();
    const primeiroDia = index === 0 ? agora.getDate() : 1;
    const ultimoDia = new Date(anoInt, mesInt + 1, 0).getDate();
    const lista: { dia: number; nome: string }[] = [];
    for (let d = primeiroDia; d <= ultimoDia; d++) {
      const data = new Date(anoInt, mesInt, d);
      lista.push({ dia: d, nome: diasSemana[data.getDay()] });
    }
    return lista;
  }, [mesSelecionado, meses]);

  const dataFormatada = useMemo(() => {
    if (!diaSelecionado || !meses[mesSelecionado]) return "";
    const { index, ano } = meses[mesSelecionado];
    const mes = (new Date().getMonth() + index) % 12;
    return `${ano}-${pad(mes + 1)}-${pad(diaSelecionado)}`;
  }, [diaSelecionado, mesSelecionado, meses]);

  const { data: horariosData, isLoading: loadingHorarios } = useQuery({
    queryKey: ["horarios-disponiveis", dataFormatada],
    queryFn: () => getHorariosDisponiveis(dataFormatada),
    enabled: !!dataFormatada,
    retry: false,
  });

  const horariosDisponiveis = horariosData?.horarios || [];

  const handleConfirmar = async () => {
    if (!especialidadeSelecionada) {
      Alert.alert("Atenção", "Selecione uma especialidade");
      return;
    }
    if (!diaSelecionado) {
      Alert.alert("Atenção", "Selecione uma data");
      return;
    }
    if (!horarioSelecionado) {
      Alert.alert("Atenção", "Selecione um horário");
      return;
    }
    if (!pacienteId) {
      Alert.alert("Erro", "Usuário não identificado. Faça login novamente.");
      return;
    }

    try {
      const data_hora = `${dataFormatada} ${horarioSelecionado}`;
      const medico = medicosFiltrados.length > 0 ? medicosFiltrados[0] : undefined;

      const consulta = await agendarConsulta({
        paciente_id: pacienteId,
        data_hora,
        especialidade: especialidadeSelecionada,
        medico_id: medico?.id,
      });

      router.replace({
        pathname: "/sucesso",
        params: {
          id: consulta.id,
          especialidade: consulta.especialidade,
          data: consulta.data,
          hora: consulta.hora,
          medicoNome: consulta.medicoNome,
          ubsNome: consulta.ubsNome,
        },
      });
    } catch (error: any) {
      const mensagem =
        error?.response?.data?.erro || "Erro ao agendar consulta. Tente novamente.";
      Alert.alert("Erro", mensagem);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Consultas"
        titleColor="#2b7bb9"
        onBack={() => router.back()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Agendar uma consulta?</Text>
        <Text style={styles.subtitle}>Escolha uma especialidade</Text>

        {loadingMedicos ? (
          <ActivityIndicator size="small" color="#2b7bb9" style={{ margin: 16 }} />
        ) : (
          <View style={styles.especialidadesGrid}>
            {especialidades.map((esp, index) => (
              <TouchableOpacity
                key={esp}
                style={[
                  styles.especialidadeCard,
                  especialidadeSelecionada === esp && styles.especialidadeAtiva,
                ]}
                onPress={() => {
                  setEspecialidadeSelecionada(esp);
                  setHorarioSelecionado("");
                }}
              >
                <Ionicons
                  name="medical"
                  size={28}
                  color={especialidadeSelecionada === esp ? "#fff" : "#2b7bb9"}
                />
                <Text
                  style={[
                    styles.especialidadeText,
                    especialidadeSelecionada === esp && styles.especialidadeTextAtiva,
                  ]}
                >
                 {esp}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>Data e Horários disponíveis</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mesesScroll}>
          {meses.map((mes, index) => (
            <TouchableOpacity
              key={`${mes.nome}-${mes.ano}`}
              style={[
                styles.mesButton,
                mesSelecionado === index && styles.mesAtivo,
              ]}
              onPress={() => {
                setMesSelecionado(index);
                setDiaSelecionado(null);
                setHorarioSelecionado("");
              }}
            >
              <Text
                style={[
                  styles.mesText,
                  mesSelecionado === index && styles.mesTextAtivo,
                ]}
              >
                {mes.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasScroll}>
          {dias.map((d) => (
            <TouchableOpacity
              key={`${d.dia}-${mesSelecionado}`}
              style={[
                styles.diaButton,
                diaSelecionado === d.dia && styles.diaAtivo,
              ]}
              onPress={() => {
                setDiaSelecionado(d.dia);
                setHorarioSelecionado("");
              }}
            >
              <Text
                style={[
                  styles.diaNumero,
                  diaSelecionado === d.dia && styles.diaNumeroAtivo,
                ]}
              >
                {d.dia}
              </Text>
              <Text
                style={[
                  styles.diaNome,
                  diaSelecionado === d.dia && styles.diaNomeAtivo,
                ]}
              >
                {d.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Selecione um Horário</Text>

        {dataFormatada && loadingHorarios ? (
          <ActivityIndicator size="small" color="#2b7bb9" style={{ margin: 16 }} />
        ) : horariosDisponiveis.length > 0 ? (
          <View style={styles.horariosGrid}>
            {horariosDisponiveis.map((hora) => (
              <TouchableOpacity
                key={hora}
                style={[
                  styles.horarioButton,
                  horarioSelecionado === hora && styles.horarioAtivo,
                ]}
                onPress={() => setHorarioSelecionado(hora)}
              >
                <Text
                  style={[
                    styles.horarioText,
                    horarioSelecionado === hora && styles.horarioTextAtivo,
                  ]}
                >
                  {hora}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : dataFormatada ? (
          <Text style={styles.semHorarios}>Nenhum horário disponível nesta data.</Text>
        ) : (
          <Text style={styles.semHorarios}>Selecione uma data para ver os horários.</Text>
        )}

        {diaSelecionado && horarioSelecionado && (
          <View style={styles.resumoCard}>
            <Text style={styles.resumoTitle}>
              {dias.find((d) => d.dia === diaSelecionado)?.nome}-Feira
            </Text>
            <Text style={styles.resumoData}>
              {diaSelecionado} de {meses[mesSelecionado]?.nome} de {meses[mesSelecionado]?.ano}
            </Text>
            <Text style={styles.resumoHora}>
              Horário às {horarioSelecionado}
            </Text>
            {medicosFiltrados.length > 0 && (
              <>
                <Text style={styles.resumoMedico}>
                  Dr(a). {medicosFiltrados[0].nome}
                </Text>
                {medicosFiltrados[0].ubsNome && (
                  <Text style={styles.resumoUbs}>
                    {medicosFiltrados[0].ubsNome}
                  </Text>
                )}
              </>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.confirmarButton} onPress={handleConfirmar}>
          <Text style={styles.confirmarText}>Confirmar Agendamento</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f4f7" },
  sectionTitle: {
    fontSize: 16, fontWeight: "600", color: "#333",
    marginHorizontal: 16, marginTop: 16, marginBottom: 4, textDecorationLine: "underline",
  },
  subtitle: { fontSize: 14, color: "#666", marginHorizontal: 16, marginBottom: 12 },
  especialidadesGrid: {
    flexDirection: "row", flexWrap: "wrap",
    justifyContent: "flex-start", paddingHorizontal: 16, gap: 10,
  },
  especialidadeCard: {
   justifyContent: "center",  minWidth: "22%", maxWidth: '26%', backgroundColor: "#fff", padding: 12, borderRadius: 12,
    alignItems: "center", gap: 6, elevation: 2, borderWidth: 2, borderColor: "transparent",
  },
  especialidadeAtiva: { backgroundColor: "#2b7bb9", borderColor: "#2b7bb9" },
  especialidadeText: { fontSize: 11, color: "#333", textAlign: "center", fontWeight: "500" },
  especialidadeTextAtiva: { color: "#fff" },
  mesesScroll: { paddingHorizontal: 16, marginBottom: 12 },
  mesButton: { paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, borderRadius: 20 },
  mesAtivo: { backgroundColor: "#2b7bb9" },
  mesText: { fontSize: 14, color: "#666", fontWeight: "500" },
  mesTextAtivo: { color: "#fff" },
  diasScroll: { paddingHorizontal: 16, marginBottom: 12 },
  diaButton: {
    width: 60, height: 70, backgroundColor: "#fff",
    borderRadius: 12, justifyContent: "center", alignItems: "center",
    marginRight: 8, elevation: 2,
  },
  diaAtivo: { backgroundColor: "#2b7bb9" },
  diaNumero: { fontSize: 20, fontWeight: "600", color: "#333" },
  diaNumeroAtivo: { color: "#fff" },
  diaNome: { fontSize: 12, color: "#666", marginTop: 4 },
  diaNomeAtivo: { color: "#fff" },
  horariosGrid: {
    flexDirection: "row", flexWrap: "wrap",
    paddingHorizontal: 16, gap: 8, marginBottom: 16,
  },
  horarioButton: {
    paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: "#fff", borderRadius: 8, borderWidth: 1, borderColor: "#ddd",
  },
  horarioAtivo: { backgroundColor: "#2b7bb9", borderColor: "#2b7bb9" },
  horarioText: { fontSize: 14, color: "#333" },
  horarioTextAtivo: { color: "#fff" },
  semHorarios: { fontSize: 14, color: "#999", marginHorizontal: 16, marginBottom: 16, fontStyle: "italic" },
  resumoCard: {
    backgroundColor: "#fff", marginHorizontal: 16, marginBottom: 12,
    padding: 16, borderRadius: 12, elevation: 2,
  },
  resumoTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  resumoData: { fontSize: 15, color: "#333", marginTop: 4 },
  resumoHora: { fontSize: 14, color: "#666", marginTop: 4 },
  resumoMedico: { fontSize: 14, color: "#2b7bb9", marginTop: 4, fontWeight: "500" },
  resumoUbs: { fontSize: 13, color: "#666", marginTop: 2 },
  confirmarButton: {
    backgroundColor: "#2b7bb9", marginHorizontal: 16, marginBottom: 32,
    padding: 16, borderRadius: 12, alignItems: "center", elevation: 3,
  },
  confirmarText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
