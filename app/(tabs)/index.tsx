import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

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
            icon={<FontAwesome5 name="calendar-check" size={40} color="#ff4d6d" />}
            title="Consultas"
            onPress={() => router.push("/(tabs)/consultas")}
          />

          <ServiceCard
            icon={<MaterialIcons name="local-pharmacy" size={40} color="#ff7a00" />}
            title="Medicamentos"
          />

          <ServiceCard
            icon={<Ionicons name="document-text-outline" size={40} color="#5a8dee" />}
            title="Histórico"
          />

          <ServiceCard
            icon={<Ionicons name="location-outline" size={40} color="#22c55e" />}
            title="Localizar UBS"
          />
        </View>
        {/* Campanhas */}
        <Text style={[styles.sectionTitle,{marginTop:10}]}>Campanhas de saúde</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <CampaignCard
            bg="#cfe0f5"
            text="Promover a inclusão, o respeito e a compreensão das pessoas com Transtorno do Espectro Autista (TEA). O diagnóstico precoce e o apoio adequado fazem toda a diferença na qualidade de vida."
            highlight="Abril azul: Conscientização do autismo"
          />

          <CampaignCard
            bg="#c9e7d3"
            text="A prevenção de acidentes e o cuidado com a saúde no ambiente de trabalho são fundamentais."
            highlight="Abril verde: Segurança no Ambiente de Trabalho"
          />

           <CampaignCard
            bg="#dff5c7"
            text="A vacinação é uma das formas mais eficazes de prevenir doenças e proteger a saúde de todos. Manter a caderneta em dia ajuda a evitar surtos e garante mais qualidade de vida para a população.."
            highlight="Abril: Camapanha de Vacinação "
          />

           <CampaignCard
            bg="#ebb6db"
            text="Cuidar da saúde da mulher é essencial em todas as fases da vida. Exames de rotina e acompanhamento médico ajudam na prevenção e no diagnóstico precoce de doenças, promovendo mais bem-estar e qualidade de vida."
            highlight="Abril: Saúde da Mulher "
        />
        </ScrollView>

      {/* Icones/Baixo */}
      <View style={styles.tabBar}>
        <Ionicons name="home-outline" size={25} color="#2b7bb9" />
        <Ionicons name="notifications-outline" size={25} />
        <Ionicons name="person-outline" size={25} />
        <Ionicons name="settings-outline" size={25} />
      </View>

    </View>
  );
}

function ServiceCard({ icon, title, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
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
        <View style={styles.highlightBox}>
          <Text style={styles.highlightText}>{highlight}</Text>
        </View>
      )}

      {highlight && (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Saiba mais  ›</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
     paddingTop: 5,
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
    marginTop: 20,
  },

  hello: {
    fontSize: 15,
    color: "#555",
    marginTop: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: -5,
    marginBottom: 5,
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
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },

  cardText: {
    fontSize: 14,
    fontWeight: "400",
  },

  campaign: {
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 20,
    borderRadius: 15,
  },

  campaignText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 15,
  },

  highlightBox: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 15,
  },

  highlightText: {
    fontSize: 13,
    fontWeight: "500",
  },

  button: {
    backgroundColor: "#3a7ca5",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    alignItems: "center",
  },

  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderColor: "#ccc",
  },
});