import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function Register() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo-ubs.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>Criar Conta</Text>

      {/* Nome */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#555" />
        <TextInput
          placeholder="Nome completo"
          style={styles.input}
        />
      </View>

      {/* CPF */}
      <View style={styles.inputContainer}>
        <Ionicons name="card-outline" size={20} color="#555" />
        <TextInput
          placeholder="CPF"
          style={styles.input}
        />
      </View>

      {/* Senha */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
        />
      </View>

      {/* Confirmar senha */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" />
        <TextInput
          placeholder="Confirmar senha"
          secureTextEntry
          style={styles.input}
        />
      </View>

      {/* Botão */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/login")} // volta pro login
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Voltar pro login */}
      <Text style={styles.registerText}>
        Já possui uma conta?{" "}
        <Text style={styles.link} onPress={() => router.replace("/login")}>
          Entrar
        </Text>
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    padding: 30,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: -10,
  },

  logo: {
    width: 250,
    height: 250,
    marginBottom: -70,
  },
  appName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 5,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
    height: 50,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#4a90c2",
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  registerText: {
    marginTop: 30,
    fontSize: 12,
    color: "#555",
  },

  link: {
    color: "#2e6eb5",
    fontWeight: "bold",
  },
});