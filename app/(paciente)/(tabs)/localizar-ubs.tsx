import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header, SearchInput } from "../../../components/shared";

const ubsData = [
  {
    id: 1,
    nome: "UBS Manoel Mendes da Silva",
    endereco: "Rua Afonço Carvalho",
    bairro: "Colônia, Itacoatiara - AM",
    horarioFuncionamento: "Seg - Sex: 07h às 17h",
    status: "Aberta",
  },
  {
    id: 2,
    nome: "UBS Paulo Gomes da Silva",
    endereco: "Rua Professora Terezinha Peixoto",
    bairro: "Colônia, Itacoatiara - AM",
    horarioFuncionamento: "Seg - Sex: 07h às 17h",
    status: "Aberta",
  },
  {
    id: 3,
    nome: "UBS Central",
    endereco: "Av. Brasil, 500",
    bairro: "Centro, Itacoatiara - AM",
    horarioFuncionamento: "Seg - Sex: 07h às 17h",
    status: "Aberta",
  },
  {
    id: 4,
    nome: "UBS São José",
    endereco: "Rua São José, 123",
    bairro: "São José, Itacoatiara - AM",
    horarioFuncionamento: "Seg - Sex: 08h às 16h",
    status: "Fechada",
  },
];

export default function LocalizarUBS() {
  const [busca, setBusca] = useState("");

  const ubsFiltrada = ubsData.filter(
    (u) =>
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.endereco.toLowerCase().includes(busca.toLowerCase()) ||
      u.bairro.toLowerCase().includes(busca.toLowerCase())
  );

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

      <TouchableOpacity style={styles.locationButton}>
        <Ionicons name="location-outline" size={20} color="#2b7bb9" />
        <Text style={styles.locationText}>Usar minha localização</Text>
      </TouchableOpacity>

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
                    item.status === "Aberta"
                      ? styles.aberta
                      : styles.fechada,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        )}
      />
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