import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import api from "../../../src/lib/api";

interface MedicamentoUBS {
  ubs_id: number;
  ubs_nome: string;
  quantidade: number;
  status: string;
}

interface Medicamento {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  apresentacao: string;
  status: string;
  estoque_atual: number;
  ubs: MedicamentoUBS[];
}

async function listarMedicamentos(busca?: string) {
  const params = busca ? { busca } : {};
  const response = await api.get("/medicamentos", { params });
  return response.data as Medicamento[];
}

function statusCor(status: string) {
  switch (status) {
    case "Disponível":
      return "#22c55e";
    case "Estoque Baixo":
      return "#f59e0b";
    case "Indisponível":
      return "#ef4444";
    default:
      return "#666";
  }
}

export default function Medicamentos() {
  const [busca, setBusca] = useState("");

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["medicamentos", busca],
    queryFn: () => listarMedicamentos(busca || undefined),
    retry: false,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medicamentos</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar medicamento..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />
        {busca ? (
          <TouchableOpacity onPress={() => setBusca("")}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4a90c2" style={{ marginTop: 40 }} />
      ) : (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        >
          {data?.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum medicamento encontrado.</Text>
          ) : (
            data?.map((med) => (
              <View key={med.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleRow}>
                    <Ionicons name="medkit" size={22} color="#4a90c2" />
                    <Text style={styles.cardTitle}>{med.nome}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusCor(med.status) + "20" }]}>
                    <Text style={[styles.statusText, { color: statusCor(med.status) }]}>
                      {med.status}
                    </Text>
                  </View>
                </View>

                {med.apresentacao ? (
                  <Text style={styles.apresentacao}>{med.apresentacao}</Text>
                ) : null}
                {med.descricao ? (
                  <Text style={styles.descricao}>{med.descricao}</Text>
                ) : null}

                {med.ubs.length > 0 ? (
                  <View style={styles.ubsList}>
                    <Text style={styles.ubsTitle}>Disponível nas UBS:</Text>
                    {med.ubs.map((u) => (
                      <View key={u.ubs_id} style={styles.ubsRow}>
                        <Ionicons name="business" size={16} color="#666" />
                        <Text style={styles.ubsNome}>{u.ubs_nome}</Text>
                        <View style={[styles.ubsStatus, { backgroundColor: statusCor(u.status) + "20" }]}>
                          <Text style={[styles.ubsStatusText, { color: statusCor(u.status) }]}>
                            {u.status}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.semEstoque}>Sem estoque cadastrado</Text>
                )}
              </View>
            ))
          )}
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a90c2",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 15,
    color: "#999",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  apresentacao: {
    fontSize: 13,
    color: "#666",
    marginTop: 8,
  },
  descricao: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },
  ubsList: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  ubsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  ubsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  ubsNome: {
    fontSize: 13,
    color: "#555",
    flex: 1,
  },
  ubsStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ubsStatusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  semEstoque: {
    fontSize: 13,
    color: "#999",
    marginTop: 8,
    fontStyle: "italic",
  },
});
