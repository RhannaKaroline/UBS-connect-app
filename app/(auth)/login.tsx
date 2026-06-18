import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useLogin } from "@/src/hooks/use-auth"
import { useAuthStore } from "@/src/stores/auth-store"

export default function Login() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)

  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const { mutate: login, isPending } = useLogin()

  const handleLogin = () => {
    login(
      { identificador: usuario, senha },
      {
        onSuccess: (data) => {
          const tipo = data.usuario.tipo_usuario
          const rotas: Record<string, string> = {
            paciente: "/(paciente)/(tabs)",
            medico: "/(medico)/(tabs)",
            agente_saude: "/(agente)/(tabs)",
            farmaceutico: "/(farmaceutico)/(tabs)",
          }
          const destino = rotas[tipo]
          if (destino) {
            router.replace(destino as any)
          } else {
            Alert.alert("Erro", "Tipo de usuário inválido")
          }
        },
        onError: (error: any) => {
          const msg = error.response?.data?.erro || "Erro ao conectar ao servidor"
          Alert.alert("Erro", msg)
        },
      }
    )
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

      {/* Usuário */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#555" />
        <TextInput
          placeholder="Usuário"
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />
      </View>

      {/* Senha */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" />
        <TextInput
          placeholder="Senha"
          secureTextEntry={!mostrarSenha}
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Ionicons
            name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {/* Botão Login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Ajuda */}
      <Text style={styles.helpText}>
        Esqueceu seus dados de login?{" "}
        <Text style={styles.link}>Obtenha ajuda para entrar</Text>
      </Text>

      {/* Cadastro */}
      <Text style={styles.registerText}>
        Não possui uma conta?{" "}
        <Text
          style={styles.link}
          onPress={() => router.navigate("/(auth)/register")}
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