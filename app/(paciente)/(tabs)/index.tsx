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
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="chevron-back" size={24} color="#333" />
          <View style={styles.userInfo}>
            <Ionicons name="person-circle-outline" size={50} color="#9db4c0" />
            <Text style={styles.hello}>Olá, paciente</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Welcome */}
        <Text style={styles.welcome}>
          Bem-vindo ao <Text style={{ color: "#2b7bb9", fontWeight: "bold" }}>UBS Connect</Text> 🏠📱
        </Text>

        {/* Serviços */}
        <Text style={styles.sectionTitle}>Serviços</Text>

        <View style={styles.grid}>
          <ServiceCard
            icon={<FontAwesome5 name="calendar-check" size={22} color="#ff4d6d" />}
            number="1"
            title="Consultas Agendadas"
            onPress={() => router.push("/consultas")}
          />

          <ServiceCard
            icon={<MaterialIcons name="local-pharmacy" size={24} color="#ff7a00" />}
            number="35"
            title="Medicações Disponíveis"
            onPress={() => router.push("/medicamentos")}
          />

          <ServiceCard
            icon={<Ionicons name="document-text-outline" size={24} color="#7c3aed" />}
            number="3"
            title="Históricos"
            onPress={() => router.push("/historico")}
          />

          <ServiceCard
            icon={<Ionicons name="location-outline" size={24} color="#22c55e" />}
            number="6"
            title="Localização de UBS's"
            onPress={() => router.push("/localizar-ubs")}
          />
        </View>

        {/* Ações Rápidas */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <View style={styles.quickActions}>
          <QuickAction
            icon={<FontAwesome5 name="calendar-check" size={20} color="#ff4d6d" />}
            title="Agendar Consulta"
            onPress={() => router.push("/consultas")}
          />

          <QuickAction
            icon={<MaterialIcons name="local-pharmacy" size={20} color="#ff7a00" />}
            title="Medicamentos Disponíveis"
            onPress={() => router.push("/medicamentos")}
          />

          <QuickAction
            icon={<Ionicons name="document-text-outline" size={20} color="#7c3aed" />}
            title="Visualizar Históricos"
            onPress={() => router.push("/historico")}
          />

          <QuickAction
            icon={<Ionicons name="location-outline" size={20} color="#22c55e" />}
            title="Localizar UBS próxima"
            onPress={() => router.push("/localizar-ubs")}
          />
        </View>

      </ScrollView>
    </View>
  );
}

/* CARD DE SERVIÇOS COM NAVEGAÇÃO */
function ServiceCard({ icon, number, title, onPress }: any) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon}
      <Text style={styles.cardNumber}>{number}</Text>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

/* AÇÕES RÁPIDAS */
function QuickAction({ icon, title, onPress }: any) {
  return (
    <TouchableOpacity
      style={styles.quickAction}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.quickActionLeft}>
        {icon}
        <Text style={styles.quickActionText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
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
    flex: 1,
  },

  headerIcons: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },

  hello: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  welcome: {
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
    color: "#333",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    textDecorationLine: "underline",
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

  cardNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },

  cardText: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },

  quickActions: {
    marginHorizontal: 16,
  },

  quickAction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
  },

  quickActionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  quickActionText: {
    fontSize: 15,
    color: "#333",
  },
});