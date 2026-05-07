import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Login() {
  const router = useRouter();

  // 🔥 estados adicionados
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  // 🔥 função de login
  const handleLogin = () => {
    let tipoUsuario = "";

    if (usuario === "paciente") tipoUsuario = "paciente";
    else if (usuario === "medico") tipoUsuario = "medico";
    else if (usuario === "acs") tipoUsuario = "acs";
    else if (usuario === "farmaceutico") tipoUsuario = "farmaceutico";

    if (tipoUsuario === "paciente") {
      router.replace("/(paciente)/(tabs)");
    } else if (tipoUsuario === "medico") {
      router.replace("/(medico)/(tabs)");
    } else if (tipoUsuario === "acs") {
      router.replace("/(agente)/(tabs)");
    } else if (tipoUsuario === "farmaceutico") {
      router.replace("/(farmaceutico)/(tabs)");
    } else {
      alert("Usuário inválido");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo-ubs.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>UBS Connect</Text>
      </View>

      {/* Input Usuário */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#555" />
        <TextInput
          placeholder="Usuário"
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />
      </View>

      {/* Input Senha */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      {/* Botão */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Ajuda */}
      <Text style={styles.helpText}>
        Esqueceu seus dados de login?{" "}
        <Text style={styles.link}>Obtenha ajuda para entrar</Text>
      </Text>

      {/* Criar conta */}
      <Text style={styles.registerText}>
        Não possui uma conta?{" "}
        <Text
          style={styles.link}
          onPress={() => router.replace("/(auth)/register")}
        >
          Criar conta
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
    padding: 30,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 250,
    height: 250,
    marginBottom: -70,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: -10,
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

  helpText: {
    marginTop: 15,
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },

  registerText: {
    marginTop: 100,
    fontSize: 12,
    color: "#555",
  },

  link: {
    color: "#2e6eb5",
    fontWeight: "bold",
  },
});