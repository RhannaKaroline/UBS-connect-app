import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { Header, SearchInput } from "../../../components/shared";
import { getEquipeACS } from "../../../src/lib/api-agente";

export default function MinhaEquipeACS() {
  const [busca, setBusca] = useState("");

  const { data: equipe, isLoading } = useQuery({
    queryKey: ["equipe-acs", busca],
    queryFn: () => getEquipeACS({ busca: busca || undefined }),
  });

  return (
    <View style={styles.container}>
      <Header
        title="Minha Equipe ACS"
        onBack={() => router.back()}
      />

      <SearchInput
        placeholder="Buscar ACS por nome..."
        value={busca}
        onChangeText={setBusca}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#8B5CF6" style={{ margin: 32 }} />
      ) : (
        <FlatList
          data={equipe}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardLeft}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={20} color="#8B5CF6" />
                </View>
                <View>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text style={styles.area}>{item.area}</Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum agente encontrado.</Text>
          }
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
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  nome: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  area: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 32,
    fontSize: 14,
  },
});
