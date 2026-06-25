import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
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
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { useLogin } from "@/src/hooks/use-auth"
import { useAuthStore } from "@/src/stores/auth-store"
import api from "@/src/lib/api"

export default function Login() {
  const router = useRouter()
  const { token, user, login: storeLogin } = useAuthStore()
  const [verificando, setVerificando] = useState(true)

  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const { mutate: login, isPending } = useLogin()

  useEffect(() => {
    let cancelled = false

    async function verificarToken() {
      if (!token || !user) {
        setVerificando(false)
        return
      }

      try {
        const response = await api.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        })
        if (cancelled) return

        const usuario = response.data.usuario
        storeLogin(usuario, token)

        const rotas: Record<string, string> = {
          paciente: "/(paciente)/(tabs)",
          medico: "/(medico)/(tabs)",
          agente_saude: "/(agente)/(tabs)",
          farmaceutico: "/(farmaceutico)/(tabs)",
        }
        const destino = rotas[usuario.tipo_usuario]
        if (destino) {
          router.replace(destino as any)
        }
      } catch {
        useAuthStore.getState().logout()
      } finally {
        if (!cancelled) setVerificando(false)
      }
    }

    verificarToken()

    return () => { cancelled = true }
  }, [])

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

  if (verificando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    )
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo-ubs.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>UBS Connect</Text>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#555" />
        <TextInput
          placeholder="Usuário"
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}

        />
      </View>

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

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}

      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.navigate("/(auth)/register")}
        testID="Criar conta"
      >
        <Text style={styles.registerText}>
          {"Não possui uma conta? "}
          <Text style={styles.link}>Criar conta</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
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
    color: "#333",
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
