import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../../components/shared";

const ubsDetalhes: Record<number, any> = {
  1: {
    id: 1,
    nome: "UBS Manoel Mendes da Silva",
    endereco: "Rua Afonço Carvalho",
    bairro: "Colônia, Itacoatiara - AM",
    telefone: "(92) 9999-9999",
    email: "ubs.manoelmendes@saude.am.gov.br",
    horarioFuncionamento: "Seg - Sex: 07h às 17h",
    servicos: ["Clínica Geral", "Enfermagem", "Pediatria", "Vacinação", "Odontologia", "Exames Básicos"],
    imagemUrl: null,
  },
  2: {
    id: 2,
    nome: "UBS Paulo Gomes da Silva",
    endereco: "Rua Professora Terezinha Peixoto",
    bairro: "Colônia, Itacoatiara - AM",
    telefone: "(92) 8888-8888",
    email: "ubs.paulogomes@saude.am.gov.br",
    horarioFuncionamento: "Seg - Sex: 07h às 17h",
    servicos: ["Clínica Geral", "Enfermagem", "Pediatria", "Vacinação"],
    imagemUrl: null,
  },
  3: {
    id: 3,
    nome: "UBS Central",
    endereco: "Av. Brasil, 500",
    bairro: "Centro, Itacoatiara - AM",
    telefone: "(92) 7777-7777",
    email: "ubs.central@saude.am.gov.br",
    horarioFuncionamento: "Seg - Sex: 07h às 17h",
    servicos: ["Clínica Geral", "Enfermagem", "Pediatria", "Vacinação", "Odontologia", "Exames Básicos", "Urgência"],
    imagemUrl: null,
  },
};

export default function DetalhesUBS() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ubs = ubsDetalhes[Number(id)] || ubsDetalhes[1];

  return (
    <View style={styles.container}>
      <Header
        title={ubs.nome}
        titleColor="#2b7bb9"
        onBack={() => router.back()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="medical" size={60} color="#2b7bb9" />
            <Text style={styles.imageText}>{ubs.nome}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="call" size={20} color="#2b7bb9" />
            <Text style={styles.actionText}>Ligar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="map" size={20} color="#2b7bb9" />
            <Text style={styles.actionText}>Rota</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share" size={20} color="#2b7bb9" />
            <Text style={styles.actionText}>Compartilhar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={20} color="#2b7bb9" />
            <Text style={styles.actionText}>Favoritar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{ubs.endereco}</Text>
          </View>
          <Text style={styles.infoSubText}>{ubs.bairro}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{ubs.telefone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{ubs.horarioFuncionamento}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{ubs.email}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Serviços oferecidos</Text>
          <View style={styles.servicosGrid}>
            {ubs.servicos.map((servico: string, index: number) => (
              <View key={index} style={styles.servicoItem}>
                <Ionicons name="checkmark-circle" size={18} color="#2b7bb9" />
                <Text style={styles.servicoText}>{servico}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  imageContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: "#e0f2fe",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  imageText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2b7bb9",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  actionButton: {
    alignItems: "center",
    gap: 6,
    padding: 8,
  },
  actionText: {
    fontSize: 13,
    color: "#2b7bb9",
    fontWeight: "500",
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
    textDecorationLine: "underline",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
  infoSubText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 30,
    marginBottom: 12,
  },
  servicosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  servicoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: "45%",
  },
  servicoText: {
    fontSize: 14,
    color: "#333",
  },
});