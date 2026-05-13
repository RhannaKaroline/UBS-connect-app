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

export default function CadastrarPaciente() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons name="chevron-back" size={24} color="#8B5CF6" />

          <Text style={styles.headerTitle}>Cadastrar Paciente</Text>
        </View>

        {/* INFORMAÇÕES PESSOAIS */}
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>

          <TextInput
            placeholder="Digite o nome completo"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de Nascimento</Text>

          <View style={styles.inputIcon}>
            <TextInput
              placeholder="dd/mm/aaaa"
              placeholderTextColor="#B0B0B0"
              style={styles.inputFlex}
            />

            <Ionicons
              name="calendar-outline"
              size={20}
              color="#888"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CPF</Text>

          <TextInput
            placeholder="000.000.000-00"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefone</Text>

          <TextInput
            placeholder="(00) 00000-0000"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereço</Text>

          <TextInput
            placeholder="Digite o endereço completo"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>UBS de Referência</Text>

          <TouchableOpacity style={styles.selectInput}>
            <Text style={styles.placeholder}>
              Selecione a UBS
            </Text>

            <Ionicons
              name="chevron-down"
              size={18}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* OUTRAS INFORMAÇÕES */}
        <Text style={styles.sectionTitle}>Outras Informações</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Condições de Saúde</Text>

          <TextInput
            placeholder="Informe condições relevantes (opcional)"
            placeholderTextColor="#B0B0B0"
            style={styles.input}
          />
        </View>

        {/* BOTÃO */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar Paciente</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MENU INFERIOR */}
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
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#333",
  },

  inputIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
  },

  inputFlex: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  selectInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  placeholder: {
    color: "#B0B0B0",
    fontSize: 14,
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