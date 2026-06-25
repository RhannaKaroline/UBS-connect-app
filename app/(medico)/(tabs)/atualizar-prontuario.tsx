import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Header } from "@/components/shared";
import { getConsultaPorId } from "@/src/lib/api-consultas";
import { getProntuario, salvarProntuario } from "@/src/lib/api-prontuario";

export default function AtualizarProntuario() {
  const { consultaId } = useLocalSearchParams<{ consultaId: string }>();
  const queryClient = useQueryClient();

  const { data: consulta, isLoading: loadingConsulta } = useQuery({
    queryKey: ["consulta", consultaId],
    queryFn: () => getConsultaPorId(Number(consultaId)),
    enabled: !!consultaId,
  });

  const { data: prontuario, isLoading: loadingProntuario } = useQuery({
    queryKey: ["prontuario", consultaId],
    queryFn: () => getProntuario(Number(consultaId)),
    enabled: !!consultaId,
  });

  const [queixaPrincipal, setQueixaPrincipal] = useState("");
  const [historicoDoencaAtual, setHistoricoDoencaAtual] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [condutaPlano, setCondutaPlano] = useState("");

  const [dadosCarregados, setDadosCarregados] = useState(false);

  if (prontuario && !dadosCarregados) {
    setQueixaPrincipal(prontuario.queixaPrincipal || "");
    setHistoricoDoencaAtual(prontuario.historicoDoencaAtual || "");
    setDiagnostico(prontuario.diagnostico || "");
    setCondutaPlano(prontuario.condutaPlano || "");
    setDadosCarregados(true);
  }

  const { mutate: salvar, isPending } = useMutation({
    mutationFn: () =>
      salvarProntuario(Number(consultaId), {
        queixaPrincipal,
        historicoDoencaAtual,
        diagnostico,
        condutaPlano,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prontuario", consultaId] });
      Alert.alert("Sucesso", "Prontuário salvo com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    },
    onError: (err: any) => {
      const mensagem =
        err?.response?.data?.erro || "Erro ao salvar prontuário.";
      Alert.alert("Erro", mensagem);
    },
  });

  if (!consultaId) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Nenhuma consulta selecionada.</Text>
        <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
          <Text style={styles.botaoTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loadingConsulta || loadingProntuario) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#16A34A" style={{ marginTop: 60 }} />
      </View>
    );
  }

  if (!consulta) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Consulta não encontrada.</Text>
        <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
          <Text style={styles.botaoTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Header title="Atualizar Prontuário" titleColor="#16A34A" onBack={() => router.back()} />

      <View style={styles.paciente}>
        <View style={styles.pacienteRow}>
          <Ionicons name="person-circle-outline" size={40} color="#16A34A" />
          <View style={styles.pacienteInfo}>
            <Text style={styles.nome}>{consulta.pacienteNome}</Text>
            <Text style={styles.detalhes}>
              {consulta.data} às {consulta.hora} • {consulta.especialidade}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.label}>Queixa Principal</Text>
      <TextInput
        style={styles.input}
        value={queixaPrincipal}
        onChangeText={setQueixaPrincipal}
        placeholder="Descreva a queixa principal do paciente"
        placeholderTextColor="#B0B0B0"
      />

      <Text style={styles.label}>Histórico da Doença Atual</Text>
      <TextInput
        style={styles.textarea}
        value={historicoDoencaAtual}
        onChangeText={setHistoricoDoencaAtual}
        placeholder="Histórico detalhado da doença atual"
        placeholderTextColor="#B0B0B0"
        multiline
      />

      <Text style={styles.label}>Diagnóstico</Text>
      <TextInput
        style={styles.input}
        value={diagnostico}
        onChangeText={setDiagnostico}
        placeholder="Diagnóstico (CID se disponível)"
        placeholderTextColor="#B0B0B0"
      />

      <Text style={styles.label}>Conduta / Plano</Text>
      <TextInput
        style={styles.textarea}
        value={condutaPlano}
        onChangeText={setCondutaPlano}
        placeholder="Conduta e plano terapêutico"
        placeholderTextColor="#B0B0B0"
        multiline
      />

      <TouchableOpacity
        style={[styles.botao, isPending && styles.botaoDisabled]}
        onPress={() => salvar()}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>Salvar Prontuário</Text>
        )}
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  paciente: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  pacienteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pacienteInfo: {
    flex: 1,
  },
  nome: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#333",
  },
  detalhes: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
    color: "#333",
    fontSize: 14,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 18,
    color: "#333",
    fontSize: 14,
  },
  botao: {
    backgroundColor: "#16A34A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  botaoDisabled: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    color: "#999",
  },
});
