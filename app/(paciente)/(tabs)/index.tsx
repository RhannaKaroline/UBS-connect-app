import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Ionicons name="person-circle-outline" size={50} color="#9db4c0" />
            <View>
              <Text style={styles.hello}>Olá, paciente</Text>
              <Text style={styles.title}>
                Bem-vindo ao <Text style={{ color: "#2b7bb9" }}>UBS Connect</Text>
              </Text>
            </View>
          </View>
          <Ionicons name="search-outline" size={24} />
        </View>

        {/* Serviços */}
        <Text style={styles.sectionTitle}>Serviços</Text>

        <View style={styles.grid}>
          <ServiceCard
            icon={<FontAwesome5 name="calendar-check" size={22} color="#ff4d6d" />}
            title="Consultas"
          />
          <ServiceCard
            icon={<MaterialIcons name="local-pharmacy" size={24} color="#ff7a00" />}
            title="Medicamentos"
          />
          <ServiceCard
            icon={<Ionicons name="document-text-outline" size={24} color="#5a8dee" />}
            title="Histórico"
          />
          <ServiceCard
            icon={<Ionicons name="location-outline" size={24} color="#22c55e" />}
            title="Localizar UBS"
          />
        </View>

        {/* Campanhas */}
        <Text style={styles.sectionTitle}>Campanhas de saúde</Text>

        <CampaignCard
          bg="#cfe3f5"
          text="Promover a inclusão, o respeito e a compreensão das pessoas com Transtorno do Espectro Autista (TEA)..."
          highlight="Abril azul: Conscientização do autismo"
        />

        <CampaignCard
          bg="#c9e7d3"
          text="A prevenção de acidentes e o cuidado com a saúde no ambiente de trabalho são fundamentais..."
        />
      </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.tabBar}>
        <Ionicons name="home-outline" size={24} color="#2b7bb9" />
        <Ionicons name="notifications-outline" size={24} />
        <Ionicons name="person-outline" size={24} />
        <Ionicons name="settings-outline" size={24} />
      </View>
    </View>
  );
}

function ServiceCard({ icon, title }: any) {
  return (
    <TouchableOpacity style={styles.card}>
      {icon}
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

function CampaignCard({ bg, text, highlight }: any) {
  return (
    <View style={[styles.campaign, { backgroundColor: bg }]}>
      <Text style={styles.campaignText}>{text}</Text>

      {highlight && (
        <Text style={styles.highlight}>{highlight}</Text>
      )}

      {highlight && (
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "#fff" }}>Saiba mais</Text>
        </TouchableOpacity>
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
    padding: 16,
    alignItems: "center",
  },

  userInfo: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  hello: {
    fontSize: 14,
    color: "#555",
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },

  campaign: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },

  campaignText: {
    fontSize: 13,
    marginBottom: 10,
  },

  highlight: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 6,
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  button: {
    backgroundColor: "#2b7bb9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderColor: "#ccc",
  },
});