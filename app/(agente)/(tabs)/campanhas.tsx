import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Header, StatusBadge } from "../../../components/shared";
import { getCampanhas } from "../../../src/lib/api-agente";

export default function CampanhasSaude() {
  const { data: campanhas, isLoading } = useQuery({
    queryKey: ["campanhas"],
    queryFn: getCampanhas,
  });

  const campanhasAtivas = campanhas?.filter((c) => c.status === "Em andamento") || [];
  const historicoCampanhas = campanhas?.filter((c) => c.status === "Encerrada") || [];

  return (
    <View style={styles.container}>
      <Header
        title="Campanhas de Saúde"
        onBack={() => router.back()}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#8B5CF6" style={{ margin: 32 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Campanhas Ativas</Text>

          {campanhasAtivas.length === 0 && (
            <Text style={styles.empty}>Nenhuma campanha ativa no momento.</Text>
          )}

          {campanhasAtivas.map((campanha) => (
            <View key={campanha.id} style={styles.campanhaCard}>
              <View style={styles.campanhaHeader}>
                <View style={[styles.campanhaIcon, { backgroundColor: campanha.cor + "20" }]}>
                  <Ionicons name={campanha.icone as any} size={24} color={campanha.cor} />
                </View>
                <View style={styles.campanhaInfo}>
                  <Text style={styles.campanhaNome}>{campanha.nome}</Text>
                  <Text style={styles.campanhaDescricao}>{campanha.descricao}</Text>
                  <StatusBadge status={campanha.status} />
                </View>
              </View>
              <Text style={styles.campanhaPeriodo}>Período: {campanha.periodo}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Histórico de Campanhas</Text>

          {historicoCampanhas.length === 0 && (
            <Text style={styles.empty}>Nenhuma campanha encerrada.</Text>
          )}

          {historicoCampanhas.map((campanha) => (
            <View key={campanha.id} style={styles.campanhaCard}>
              <View style={styles.campanhaHeader}>
                <View style={[styles.campanhaIcon, { backgroundColor: campanha.cor + "20" }]}>
                  <Ionicons name={campanha.icone as any} size={24} color={campanha.cor} />
                </View>
                <View style={styles.campanhaInfo}>
                  <Text style={styles.campanhaNome}>{campanha.nome}</Text>
                  <Text style={styles.campanhaDescricao}>{campanha.descricao}</Text>
                  <StatusBadge status={campanha.status} />
                </View>
              </View>
              <Text style={styles.campanhaPeriodo}>Período: {campanha.periodo}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  campanhaCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  campanhaHeader: {
    flexDirection: "row",
    gap: 12,
  },
  campanhaIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  campanhaInfo: {
    flex: 1,
    gap: 4,
  },
  campanhaNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  campanhaDescricao: {
    fontSize: 14,
    color: "#666",
  },
  campanhaPeriodo: {
    fontSize: 13,
    color: "#666",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 16,
    marginBottom: 16,
    fontSize: 14,
  },
});
