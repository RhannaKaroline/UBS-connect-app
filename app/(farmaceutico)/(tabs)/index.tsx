import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";

export default function HomeFarmaceutico() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color="#fff" />
            </View>

            <View>
              <Text style={styles.hello}>Olá, Farmacêutico!</Text>
              <Text style={styles.role}>Farmacêutico</Text>
            </View>
          </View>

          <View style={styles.notification}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#333"
            />

            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
        </View>

        {/* VISÃO GERAL */}
        <Text style={styles.sectionTitle}>Visão Geral</Text>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Ionicons
              name="cube-outline"
              size={28}
              color="#0F766E"
            />

            <Text style={styles.cardNumber}>128</Text>

            <Text style={styles.cardLabel}>
              Medicamentos{"\n"}Cadastrados
            </Text>
          </View>

          <View style={styles.card}>
            <Ionicons
              name="clipboard-outline"
              size={28}
              color="#22C55E"
            />

            <Text style={styles.cardNumber}>85</Text>

            <Text style={styles.cardLabel}>
              Itens em Estoque
            </Text>
          </View>

          <View style={styles.card}>
            <Feather
              name="alert-triangle"
              size={26}
              color="#F97316"
            />

            <Text style={styles.cardNumber}>12</Text>

            <Text style={styles.cardLabel}>
              Estoque Baixo
            </Text>
          </View>

          <View style={styles.card}>
            <Ionicons
              name="close-circle-outline"
              size={28}
              color="#EF4444"
            />

            <Text style={styles.cardNumber}>8</Text>

            <Text style={styles.cardLabel}>
              Indisponíveis
            </Text>
          </View>
        </View>

        {/* AÇÕES */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <ActionItem
          icon="cube-outline"
          title="Visualizar Estoque"
          color="#0F766E"
        />

        <ActionItem
          icon="add-circle-outline"
          title="Adicionar Medicamento"
          color="#22C55E"
        />

        <ActionItem
          icon="create-outline"
          title="Atualizar Medicamento"
          color="#0EA5E9"
        />

        <ActionItem
          icon="trash-outline"
          title="Remover Medicamento"
          color="#EF4444"
        />

        {/* ESTOQUE */}
        <Text style={styles.sectionTitle}>Estoque Baixo</Text>

        <TouchableOpacity style={styles.stockCard}>
          <View>
            <Text style={styles.stockTitle}>
              Amoxicilina 500mg
            </Text>

            <Text style={styles.stockAlert}>
              Estoque: 5 unidades
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </ScrollView>

      {/* MENU */}
      <View style={styles.bottomTab}>
        <TabItem icon="home" label="Início" active />
        <TabItem icon="cube-outline" label="Estoque" />
        <TabItem icon="medkit-outline" label="Medicamentos" />
        <TabItem icon="stats-chart-outline" label="Relatórios" />
        <TabItem icon="person-outline" label="Perfil" />
      </View>
    </SafeAreaView>
  );
}

function ActionItem({
  icon,
  title,
  color,
}: {
  icon: any;
  title: string;
  color: string;
}) {
  return (
    <TouchableOpacity style={styles.actionItem}>
      <View style={styles.actionLeft}>
        <Ionicons name={icon} size={22} color={color} />

        <Text style={styles.actionText}>{title}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#999"
      />
    </TouchableOpacity>
  );
}

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
        color={active ? "#0F766E" : "#888"}
      />

      <Text
        style={[
          styles.tabLabel,
          active && {
            color: "#0F766E",
            fontWeight: "700",
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
    paddingTop: 14,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#0F766E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  hello: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  role: {
    color: "#0F766E",
    fontWeight: "600",
    marginTop: 2,
  },

  notification: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    right: -4,
    top: -3,
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
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 16,
    marginTop: 6,
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },

  cardNumber: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 12,
    color: "#222",
  },

  cardLabel: {
    color: "#777",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
  },

  actionItem: {
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
  },

  stockCard: {
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 100,
  },

  stockTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  stockAlert: {
    color: "#EF4444",
    marginTop: 4,
    fontWeight: "600",
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
    borderColor: "#ECECEC",
    paddingVertical: 10,
    paddingBottom: 20,
  },

  tabItem: {
    alignItems: "center",
  },

  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    color: "#888",
  },
});