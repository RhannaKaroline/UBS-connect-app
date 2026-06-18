import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getMedicamentoPorId, Medicamento, removerMedicamento } from "@/src/lib/api-farmaceutico";

export default function DetalhesMedicamento() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const queryClient = useQueryClient();

  const { data: medicamento, isLoading } = useQuery({
    queryKey: ["medicamento", id],
    queryFn: () => getMedicamentoPorId(id!),
    enabled: !!id,
  });

  const { mutate: remover, isPending: removendo } = useMutation({
    mutationFn: () => removerMedicamento(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicamentos"] });
      queryClient.invalidateQueries({ queryKey: ["estatisticas-farmacia"] });
      router.back();
    },
    onError: (err: any) => {
      const mensagem = err?.response?.data?.erro || "Erro ao remover medicamento.";
      Alert.alert("Erro", mensagem);
    },
  });

  const confirmarRemocao = () => {
    Alert.alert(
      "Confirmar Remoção",
      "Tem certeza que deseja remover este medicamento? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", style: "destructive", onPress: () => remover() },
      ]
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Disponível":
        return styles.disponivel;
      case "Estoque Baixo":
        return styles.baixo;
      case "Indisponível":
        return styles.indisponivel;
      default:
        return styles.disponivel;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#F59E0B" style={{ margin: 32 }} />
      </View>
    );
  }

  if (!medicamento) {
    return (
      <View style={styles.container}>
        <Text>Medicamento não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Detalhes do Medicamento</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <View style={styles.mainCardContent}>
            <View style={styles.medicamentoIcon}>
              <Ionicons name="medkit" size={40} color="#0d9488" />
            </View>
            <View style={styles.mainCardInfo}>
              <View style={styles.nomeRow}>
                <Text style={styles.nome}>{medicamento.nome}</Text>
                <View
                  style={[styles.statusBadge, getStatusStyle(medicamento.status)]}
                >
                  <Text
                    style={[styles.statusText, getStatusStyle(medicamento.status)]}
                  >
                    {medicamento.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.descricao}>{medicamento.descricao}</Text>
              <Text style={styles.estoqueLabel}>Estoque Atual</Text>
              <Text style={styles.estoqueValor}>
                {medicamento.estoqueAtual} unidades
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Gerais</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Categoria</Text>
              <Text style={styles.infoValue}>{medicamento.categoria}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Apresentação</Text>
              <Text style={styles.infoValue}>{medicamento.apresentacao}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Validade Média</Text>
              <Text style={styles.infoValue}>{medicamento.validadeMedia}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Registro ANVISA</Text>
              <Text style={styles.infoValue}>{medicamento.registroAnvisa}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Data de Cadastro</Text>
              <Text style={styles.infoValue}>{medicamento.dataCadastro}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disponível nas UBS</Text>
          {medicamento.ubs.length === 0 ? (
            <Text style={styles.semUbs}>Nenhuma UBS com estoque deste medicamento</Text>
          ) : (
            medicamento.ubs.map((ubs) => (
              <View key={ubs.id} style={styles.ubsCard}>
                <View style={styles.ubsLeft}>
                  <Ionicons name="location-outline" size={20} color="#666" />
                  <View>
                    <Text style={styles.ubsNome}>{ubs.nome}</Text>
                    <Text style={styles.ubsUnidades}>
                      {ubs.unidades} unidades
                    </Text>
                  </View>
                </View>
                <View
                  style={[styles.statusBadge, getStatusStyle(ubs.status)]}
                >
                  <Text
                    style={[styles.statusText, getStatusStyle(ubs.status)]}
                  >
                    {ubs.status}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity
          style={styles.botaoRemover}
          onPress={confirmarRemocao}
          disabled={removendo}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.textoRemover}>
            {removendo ? "Removendo..." : "Remover Medicamento"}
          </Text>
        </TouchableOpacity>
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
    alignItems: "center",
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F59E0B",
  },
  mainCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  mainCardContent: {
    flexDirection: "row",
    padding: 16,
  },
  medicamentoIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#e0f2fe",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  mainCardInfo: {
    flex: 1,
  },
  nomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  disponivel: {
    backgroundColor: "#DCFCE7",
    color: "#16A34A",
  },
  baixo: {
    backgroundColor: "#FEF3C7",
    color: "#D97706",
  },
  indisponivel: {
    backgroundColor: "#FEE2E2",
    color: "#DC2626",
  },
  descricao: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  estoqueLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 12,
  },
  estoqueValor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  descricaoCompleta: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  ubsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  ubsLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ubsNome: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  ubsUnidades: {
    fontSize: 13,
    color: "#666",
  },
  semUbs: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginVertical: 16,
  },
  botaoRemover: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#ef4444",
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  textoRemover: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});