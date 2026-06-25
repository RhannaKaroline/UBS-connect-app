import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header, SearchInput } from "../../../components/shared";
import { getUBS } from "../../../src/lib/api-ubs";

export default function LocalizarUBS() {
  const [busca, setBusca] = useState("");

  const { data: ubsData, isLoading } = useQuery({
    queryKey: ["ubs", busca],
    queryFn: () => getUBS({ busca: busca || undefined }),
  });

  const ubsFiltrada = ubsData ?? [];

  return (
    <View style={styles.container}>
      <Header
        title="Localizar UBS"
        titleColor="#2b7bb9"
        onBack={() => router.back()}
      />

      <SearchInput
        placeholder="Buscar UBS ou endereço..."
        value={busca}
        onChangeText={setBusca}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#2b7bb9" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={ubsFiltrada}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.ubsCard}
              onPress={() =>
                router.push({
                  pathname: "/detalhes-ubs",
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.ubsIcon}>
                <Ionicons name="medical" size={24} color="#2b7bb9" />
              </View>
              <View style={styles.ubsInfo}>
                <Text style={styles.ubsNome}>{item.nome}</Text>
                <Text style={styles.ubsEndereco}>{item.endereco}</Text>
                <Text style={styles.ubsBairro}>{item.bairro}</Text>
                <View style={styles.ubsHorario}>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.horarioText}>{item.horarioFuncionamento}</Text>
                  <Text
                    style={[
                      styles.statusText,
                      item.ativa ? styles.aberta : styles.fechada,
                    ]}
                  >
                    {item.ativa ? "Aberta" : "Fechada"}
                  </Text>
                </View>
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
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2b7bb9",
    borderStyle: "dashed",
  },
  locationText: {
    color: "#2b7bb9",
    fontSize: 14,
    fontWeight: "500",
  },
  ubsCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 2,
  },
  ubsIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#e0f2fe",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  ubsInfo: {
    flex: 1,
  },
  ubsNome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  ubsEndereco: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  ubsBairro: {
    fontSize: 13,
    color: "#999",
  },
  ubsHorario: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  horarioText: {
    fontSize: 12,
    color: "#666",
    flex: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  aberta: {
    color: "#16A34A",
  },
  fechada: {
    color: "#DC2626",
  },
});