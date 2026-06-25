import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getMedicamentos, Medicamento } from "@/src/lib/api-farmaceutico";

export default function EstoqueMedicamentos() {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos os Status");
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  const { data: medicamentos, isLoading } = useQuery({
    queryKey: ["medicamentos", busca, filtroStatus],
    queryFn: () =>
      getMedicamentos({
        busca: busca || undefined,
        status: filtroStatus !== "Todos os Status" ? filtroStatus : undefined,
      }),
  });

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Estoque de Medicamentos</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          placeholder="Buscar medicamento..."
          style={styles.searchInput}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      <TouchableOpacity
        style={styles.filtro}
        onPress={() => setMostrarFiltro(!mostrarFiltro)}
      >
        <Text style={styles.filtroText}>{filtroStatus}</Text>
        <Ionicons
          name={mostrarFiltro ? "chevron-up" : "chevron-down"}
          size={20}
          color="#333"
        />
      </TouchableOpacity>

      {mostrarFiltro && (
        <View style={styles.filtroOptions}>
          {["Todos os Status", "Disponível", "Estoque Baixo", "Indisponível"].map(
            (opcao) => (
              <TouchableOpacity
                key={opcao}
                style={[
                  styles.filtroOption,
                  filtroStatus === opcao && styles.filtroOptionAtivo,
                ]}
                onPress={() => {
                  setFiltroStatus(opcao);
                  setMostrarFiltro(false);
                }}
              >
                <Text
                  style={[
                    styles.filtroOptionText,
                    filtroStatus === opcao && styles.filtroOptionTextAtivo,
                  ]}
                >
                  {opcao}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#F59E0B" style={{ margin: 32 }} />
      ) : (
        <FlatList
          data={medicamentos || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Medicamento }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/detalhes-medicamento",
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.cardContent}>
                <View style={styles.cardInfo}>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.descricao}>{item.descricao}</Text>
                  <Text style={styles.estoque}>
                    Estoque: {item.estoqueAtual} unidades
                  </Text>
                </View>
                <View style={styles.cardRight}>
                  <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
                    <Text
                      style={[
                        styles.statusText,
                        getStatusStyle(item.status),
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </View>
              </View>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
    color: "#333",
  },
  filtro: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
  },
  filtroText: {
    fontSize: 15,
    color: "#333",
  },
  filtroOptions: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    padding: 8,
  },
  filtroOption: {
    padding: 12,
    borderRadius: 8,
  },
  filtroOptionAtivo: {
    backgroundColor: "#F59E0B",
  },
  filtroOptionText: {
    fontSize: 14,
    color: "#333",
  },
  filtroOptionTextAtivo: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  cardInfo: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  descricao: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  estoque: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  cardRight: {
    alignItems: "flex-end",
    gap: 8,
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
});