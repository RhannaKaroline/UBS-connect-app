import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useEffect, useRef, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { useRegister } from "@/src/hooks/use-auth"
import { getUBS, Ubs } from "@/src/lib/api-ubs"

type TipoUsuario = "paciente" | "medico" | "agente_saude" | "farmaceutico"

const TIPOS: { key: TipoUsuario; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "paciente", label: "Paciente", icon: "person-outline" },
  { key: "medico", label: "Médico", icon: "medkit-outline" },
  { key: "agente_saude", label: "Agente de Saúde", icon: "people-outline" },
  { key: "farmaceutico", label: "Farmacêutico", icon: "flask-outline" },
]

const CAMPOS_TIPO: Record<TipoUsuario, { label: string; placeholder: string }> = {
  paciente: { label: "cpf", placeholder: "CPF" },
  medico: { label: "registro_profissional", placeholder: "CRM" },
  agente_saude: { label: "registro_profissional", placeholder: "ACS" },
  farmaceutico: { label: "registro_profissional", placeholder: "CRF" },
}

export default function Register() {
  const router = useRouter()

  const [tipo, setTipo] = useState<TipoUsuario>("paciente")
  const [nome, setNome] = useState("")
  const [identificador, setIdentificador] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [especialidade, setEspecialidade] = useState("")
  const [ubsId, setUbsId] = useState<number | null>(null)
  const [ubsList, setUbsList] = useState<Ubs[]>([])
  const [showUbsPicker, setShowUbsPicker] = useState(false)

  const scrollRef = useRef<ScrollView>(null)
  const inputPos = useRef<Record<string, number>>({})

  const handleFocus = (key: string) => {
    const y = inputPos.current[key]
    if (y !== undefined) {
      scrollRef.current?.scrollTo({ y: y - 100, animated: true })
    }
  }

  const { mutate: register, isPending } = useRegister()

  useEffect(() => {
    if (tipo === "medico") {
      getUBS().then(setUbsList).catch(() => setUbsList([]))
    }
  }, [tipo])

  const handleRegister = () => {
    if (!nome || !identificador || !senha) {
      Alert.alert("Erro", "Preencha todos os campos")
      return
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não conferem")
      return
    }

    const body: any = { nome, senha, tipo_usuario: tipo }
    if (tipo === "paciente") {
      body.cpf = identificador
    } else {
      body.registro_profissional = identificador
    }
    if (tipo === "medico") {
      if (especialidade) body.especialidade = especialidade
      if (ubsId) body.ubs_id = ubsId
    }

    register(body, {
      onSuccess: () => {
        Alert.alert("Sucesso", "Cadastro realizado! Faça login.", [
          { text: "OK", onPress: () => router.replace("/(auth)/login") },
        ])
      },
      onError: (error: any) => {
        if (error.response) {
          const status = error.response.status
          const msg = error.response.data?.erro || "Erro desconhecido do servidor."
          if (status === 409) {
            Alert.alert("Conflito", msg)
          } else if (status === 400) {
            Alert.alert("Dados inválidos", msg)
          } else {
            Alert.alert("Erro", msg)
          }
        } else if (error.request) {
          Alert.alert("Sem conexão", "Não foi possível conectar ao servidor. Verifique sua internet.")
        } else {
          Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.")
        }
      },
    })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
    >
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo-ubs.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Criar Conta</Text>

      <Text style={styles.label}>Tipo de usuário</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowDropdown(true)}>
        <Ionicons
          name={TIPOS.find((t) => t.key === tipo)!.icon}
          size={18}
          color="#555"
        />
        <Text style={styles.dropdownText}>{TIPOS.find((t) => t.key === tipo)!.label}</Text>
        <Ionicons name="chevron-down-outline" size={18} color="#555" />
      </TouchableOpacity>

      <View style={styles.inputContainer} onLayout={(e) => { inputPos.current["nome"] = e.nativeEvent.layout.y }}>
        <Ionicons name="person-outline" size={20} color="#555" />
        <TextInput
          placeholder="Nome completo"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          onFocus={() => handleFocus("nome")}
        />
      </View>

      <View style={styles.inputContainer} onLayout={(e) => { inputPos.current["identificador"] = e.nativeEvent.layout.y }}>
        <Ionicons name="card-outline" size={20} color="#555" />
        <TextInput
          placeholder={CAMPOS_TIPO[tipo].placeholder}
          style={styles.input}
          value={identificador}
          onChangeText={setIdentificador}
          onFocus={() => handleFocus("identificador")}
        />
      </View>

      <View style={styles.inputContainer} onLayout={(e) => { inputPos.current["senha"] = e.nativeEvent.layout.y }}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" />
        <TextInput
          placeholder="Senha"
          secureTextEntry={!mostrarSenha}
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          onFocus={() => handleFocus("senha")}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Ionicons
            name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer} onLayout={(e) => { inputPos.current["confirmarSenha"] = e.nativeEvent.layout.y }}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" />
        <TextInput
          placeholder="Confirmar senha"
          secureTextEntry={!mostrarSenha}
          style={styles.input}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          onFocus={() => handleFocus("confirmarSenha")}
        />
      </View>

      {tipo === "medico" && (
        <>
          <View style={styles.inputContainer} onLayout={(e) => { inputPos.current["especialidade"] = e.nativeEvent.layout.y }}>
            <Ionicons name="medical-outline" size={20} color="#555" />
            <TextInput
              placeholder="Especialidade (ex: Pediatria)"
              style={styles.input}
              value={especialidade}
              onChangeText={setEspecialidade}
              onFocus={() => handleFocus("especialidade")}
            />
          </View>

          <TouchableOpacity style={styles.inputContainer} onPress={() => setShowUbsPicker(true)}>
            <Ionicons name="business-outline" size={20} color="#555" />
            <Text style={[styles.input, { color: ubsId ? "#333" : "#aaa" }]}>
              {ubsId ? ubsList.find((u) => u.id === ubsId)?.nome : "Selecione a UBS"}
            </Text>
            <Ionicons name="chevron-down-outline" size={18} color="#555" />
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={isPending}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>


      <Text style={styles.registerText}>
        Já possui uma conta?{" "}
        <Text style={styles.link} onPress={() => router.navigate("/(auth)/login")}>
          Entrar
        </Text>
      </Text>

      <View style={{ height: 120 }} />

      <Modal visible={showUbsPicker} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowUbsPicker(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione a UBS</Text>
            {ubsList.map((u) => (
              <TouchableOpacity
                key={u.id}
                style={[
                  styles.modalOption,
                  ubsId === u.id && styles.modalOptionAtivo,
                ]}
                onPress={() => {
                  setUbsId(u.id)
                  setShowUbsPicker(false)
                }}
              >
                <Ionicons
                  name="business-outline"
                  size={20}
                  color={ubsId === u.id ? "#4a90c2" : "#555"}
                />
                <Text
                  style={[
                    styles.modalOptionText,
                    ubsId === u.id && styles.modalOptionTextAtivo,
                  ]}
                >
                  {u.nome}
                </Text>
                {ubsId === u.id && (
                  <Ionicons name="checkmark-outline" size={20} color="#4a90c2" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={showDropdown} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o tipo</Text>
            {TIPOS.map((t) => (
              <TouchableOpacity
                key={t.key}
                style={[
                  styles.modalOption,
                  tipo === t.key && styles.modalOptionAtivo,
                ]}
                onPress={() => {
                  setTipo(t.key)
                  setShowDropdown(false)
                }}
              >
                <Ionicons
                  name={t.icon}
                  size={20}
                  color={tipo === t.key ? "#4a90c2" : "#555"}
                />
                <Text
                  style={[
                    styles.modalOptionText,
                    tipo === t.key && styles.modalOptionTextAtivo,
                  ]}
                >
                  {t.label}
                </Text>
                {tipo === t.key && (
                  <Ionicons name="checkmark-outline" size={20} color="#4a90c2" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    paddingTop: 50,
    padding: 30,
    flexGrow: 1
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

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    alignSelf: "flex-start",
    marginBottom: 8,
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: "100%",
    height: 50,
    gap: 8,
  },

  dropdownText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    width: "80%",
  },

  modalTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },

  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  modalOptionAtivo: {
    backgroundColor: "#e8f0fe",
  },

  modalOptionText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  modalOptionTextAtivo: {
    color: "#4a90c2",
    fontWeight: "600",
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

  dismissButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: 6,
    paddingVertical: 4,
  },

  dismissText: {
    fontSize: 12,
    color: "#555",
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