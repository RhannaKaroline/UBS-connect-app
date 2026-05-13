import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function AtualizarPaciente() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons name="chevron-back" size={24} color="#8B5CF6" />

          <Text style={styles.headerTitle}>Atualizar Paciente</Text>
        </View>

        {/* CARD PACIENTE */}
        <View style={styles.patientCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#8B5CF6" />
          </View>

          <View>
            <Text style={styles.patientName}>Maria Silva</Text>

            <Text style={styles.patientInfo}>
              CPF: 000.000.000-00
            </Text>

            <Text style={styles.patientInfo}>
              Data de Nascimento: 15/06/1985
            </Text>
          </View>
        </View>

        {/* INFORMAÇÕES */}
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>

          <TextInput
            value="(11) 99999-9999"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereço</Text>

          <TextInput
            value="Rua das Flores, 123 - Centro
São Paulo - SP"
            multiline
            style={[styles.input, styles.textArea]}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>UBS de Referência</Text>

          <TextInput
            value="UBS Nicolau"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Condições de Saúde</Text>

          <TextInput
            value="Hipertensão, Diabetes"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Observações</Text>

          <TextInput
            value="Paciente faz uso contínuo de medicação."
            multiline
            style={[styles.input, styles.obsArea]}
          />
        </View>

        {/* BOTÃO */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Salvar Alterações
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MENU */}
      <View style={styles.bottomTab}>
        <TabItem icon="home-outline" label="Início" />

        <TabItem icon="people" label="Pacientes" active />

        <TabItem icon="people-circle-outline" label="Equipe" />

        <TabItem icon="megaphone-outline" label="Campanhas" />

        <TabItem icon="person-outline" label="Perfil" />
      </View>
    </SafeAreaView>
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
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#8B5CF6",
    marginLeft: 12,
  },

  patientCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 25,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  patientName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },

  patientInfo: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 18,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: "#444",
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: "#333",
  },

  textArea: {
    height: 70,
    textAlignVertical: "top",
  },

  obsArea: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#8B5CF6",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 100,
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
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