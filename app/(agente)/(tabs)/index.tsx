import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color="#fff" />
            </View>

            <View>
              <Text style={styles.greeting}>Olá, Agente!</Text>
              <Text style={styles.role}>Agente de Saúde</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.notification}>
            <Ionicons name="notifications-outline" size={24} color="#444" />

            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* VISÃO GERAL */}
        <Text style={styles.sectionTitle}>Visão Geral</Text>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Ionicons name="people-outline" size={28} color="#8B5CF6" />
            <Text style={styles.cardNumber}>152</Text>
            <Text style={styles.cardLabel}>Pacientes{"\n"}Cadastrados</Text>
          </View>

          <View style={styles.card}>
            <Feather name="clipboard" size={26} color="#22C55E" />
            <Text style={styles.cardNumber}>28</Text>
            <Text style={styles.cardLabel}>Visitas Hoje</Text>
          </View>

          <View style={styles.card}>
            <MaterialIcons name="calendar-month" size={28} color="#F59E0B" />
            <Text style={styles.cardNumber}>12</Text>
            <Text style={styles.cardLabel}>Acompanhamentos</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="megaphone-outline" size={26} color="#3B82F6" />
            <Text style={styles.cardNumber}>3</Text>
            <Text style={styles.cardLabel}>Campanhas Ativas</Text>
          </View>
        </View>

        {/* AÇÕES RÁPIDAS */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <View style={styles.actionsContainer}>
          <ActionItem
            icon={
              <Ionicons
                name="person-add-outline"
                size={20}
                color="#8B5CF6"
              />
            }
            title="Cadastrar Paciente"
          />

          <ActionItem
            icon={<Feather name="edit-2" size={18} color="#22C55E" />}
            title="Atualizar Cadastro"
          />

          <ActionItem
            icon={<Ionicons name="people-outline" size={20} color="#3B82F6" />}
            title="Minha Equipe ACS"
          />

          <ActionItem
            icon={
              <Ionicons
                name="megaphone-outline"
                size={20}
                color="#F97316"
              />
            }
            title="Campanhas de Saúde"
          />
        </View>

        {/* PRÓXIMAS VISITAS */}
        <Text style={styles.sectionTitle}>Próximas Visitas</Text>

        <View style={styles.visitCard}>
          <View>
            <Text style={styles.visitName}>Maria Silva</Text>

            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="#999" />
              <Text style={styles.locationText}>Rua das Flores, 123</Text>
            </View>
          </View>

          <View style={styles.timeBox}>
            <Text style={styles.time}>09:00</Text>
            <Text style={styles.today}>Hoje</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM TAB */}
      <View style={styles.bottomTab}>
        <TabItem icon="home" label="Início" active />

        <TabItem icon="people-outline" label="Pacientes" />

        <TabItem icon="people-circle-outline" label="Equipe" />

        <TabItem icon="megaphone-outline" label="Campanhas" />

        <TabItem icon="person-outline" label="Perfil" />
      </View>
    </SafeAreaView>
  );
}

/* COMPONENTE DAS AÇÕES */
function ActionItem({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <TouchableOpacity style={styles.actionItem}>
      <View style={styles.actionLeft}>
        {icon}
        <Text style={styles.actionText}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#999" />
    </TouchableOpacity>
  );
}

/* COMPONENTE DAS TABS */
function TabItem({
  icon,
  label,
  active = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.tabItem}>
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#8B5CF6" : "#999"}
      />

      <Text
        style={[
          styles.tabLabel,
          active && {
            color: "#8B5CF6",
            fontWeight: "600",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#C4B5FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  greeting: {
    fontSize: 16,
    color: "#444",
  },

  role: {
    fontSize: 14,
    color: "#8B5CF6",
    fontWeight: "600",
    marginTop: 2,
  },

  notification: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -2,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 14,
    marginTop: 8,
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    padding: 16,
    marginBottom: 14,
  },

  cardNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginTop: 10,
  },

  cardLabel: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
    lineHeight: 18,
  },

  actionsContainer: {
    marginBottom: 10,
  },

  actionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },

  visitCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 14,
    padding: 16,
    marginBottom: 100,
  },

  visitName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    fontSize: 13,
    color: "#999",
    marginLeft: 4,
  },

  timeBox: {
    backgroundColor: "#F3E8FF",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  time: {
    color: "#8B5CF6",
    fontWeight: "700",
    fontSize: 15,
  },

  today: {
    color: "#666",
    fontSize: 12,
    marginTop: 2,
  },

  bottomTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#EAEAEA",
    paddingVertical: 10,
    paddingBottom: 20,
  },

  tabItem: {
    alignItems: "center",
  },

  tabLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },
});