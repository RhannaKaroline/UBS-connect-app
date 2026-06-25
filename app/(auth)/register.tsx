import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [especialidade, setEspecialidade] = useState("")
  const [ubsId, setUbsId] = useState<number | null>(null)
  const [ubsList, setUbsList] = useState<Ubs[]>([])
  const [showUbsPicker, setShowUbsPicker] = useState(false)

  const { mutate: register, isPending } = useRegister()

  useEffect(() => {
    if (tipo === "medico") {
      getUBS().then(setUbsList).catch(() => setUbsList([]))
    }
  }, [tipo])

  function validarCPF(cpf: string): boolean {
    const digits = cpf.replace(/\D/g, "")
    if (digits.length !== 11) return false
    if (/^(\d)\1{10}$/.test(digits)) return false
    let soma = 0
    for (let i = 0; i < 9; i++) soma += parseInt(digits[i]) * (10 - i)
    let resto = (soma * 10) % 11
    if (resto === 10) resto = 0
    if (resto !== parseInt(digits[9])) return false
    soma = 0
    for (let i = 0; i < 10; i++) soma += parseInt(digits[i]) * (11 - i)
    resto = (soma * 10) % 11
    if (resto === 10) resto = 0
    return resto === parseInt(digits[10])
  }

  function formatarCPF(valor: string) {
    const digits = valor.replace(/\D/g, "").slice(0, 11)
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2")
  }

  function formatarCRM(valor: string) {
    const digits = valor.replace(/[^0-9a-zA-Z\-]/g, "").toUpperCase()
    const parte = digits.replace(/-.*$/, "")
    const digitos = parte.replace(/\D/g, "").slice(0, 6)
    if (digits.includes("-")) {
      const uf = digits.replace(/^[^-]*-/, "").replace(/[^A-Z]/g, "").slice(0, 2)
      return `${digitos}-${uf}`
    }
    return digitos
  }

  function formatarPrefixo(valor: string, prefixo: string) {
    const limpo = valor.replace(/[^0-9a-zA-Z\-]/g, "").toUpperCase()
    if (!limpo.startsWith(prefixo)) {
      const digitos = limpo.replace(/\D/g, "").slice(0, 8)
      return digitos ? `${prefixo}${digitos}` : prefixo
    }
    const digitos = limpo.replace(prefixo, "").replace(/\D/g, "").slice(0, 8)
    return digitos ? `${prefixo}${digitos}` : prefixo
  }

  const handleRegister = () => {
    const novosErros: Record<string, string> = {}

    if (!nome?.trim()) {
      novosErros.nome = "O nome é obrigatório."
    } else if (nome.trim().length < 3) {
      novosErros.nome = "O nome deve ter pelo menos 3 caracteres."
    }

    if (!senha) {
      novosErros.senha = "A senha é obrigatória."
    } else if (senha.length < 6) {
      novosErros.senha = "A senha deve ter no mínimo 6 caracteres."
    }

    if (!confirmarSenha) {
      novosErros.confirmarSenha = "Confirme a senha."
    } else if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não conferem."
    }

    if (!identificador?.trim()) {
      novosErros.identificador = "Este campo é obrigatório."
    } else if (tipo === "paciente") {
      const cpfDigits = identificador.replace(/\D/g, "")
      if (cpfDigits.length !== 11) {
        novosErros.identificador = "O CPF deve ter 11 dígitos."
      } else if (!validarCPF(identificador)) {
        novosErros.identificador = "CPF inválido. Verifique os dígitos."
      }
    } else if (tipo === "medico") {
      const regexCRM = /^\d{4,6}-[A-Z]{2}$/
      if (!regexCRM.test(identificador.trim())) {
        novosErros.identificador = "CRM inválido. Use o formato: 123456-UF (ex: 123456-SP)"
      }
    } else if (tipo === "agente_saude") {
      const regexACS = /^ACS-\d{4,8}$/
      if (!regexACS.test(identificador.trim())) {
        novosErros.identificador = "ACS inválido. Use o formato: ACS-XXXXX (ex: ACS-98765)"
      }
    } else if (tipo === "farmaceutico") {
      const regexCRF = /^CRF-\d{4,8}$/
      if (!regexCRF.test(identificador.trim())) {
        novosErros.identificador = "CRF inválido. Use o formato: CRF-XXXXX (ex: CRF-54321)"
      }
    }

    setErrors(novosErros)
    if (Object.keys(novosErros).length > 0) return

    const body: any = { nome: nome.trim(), senha, tipo_usuario: tipo }
    if (tipo === "paciente") {
      body.cpf = identificador.replace(/\D/g, "")
    } else {
      body.registro_profissional = identificador.trim()
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

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#555" />
        <TextInput
          placeholder="Nome completo"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={nome}
          onChangeText={(v) => { setNome(v); setErrors((e) => ({ ...e, nome: "" })) }}
        />
      </View>
      {!!errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

      <View style={styles.inputContainer}>
        <Ionicons name="card-outline" size={20} color="#555" />
        <TextInput
          placeholder={CAMPOS_TIPO[tipo].placeholder}
          style={styles.input}
          value={identificador}
          onChangeText={(v) => {
            setErrors((e) => ({ ...e, identificador: "" }))
            if (tipo === "paciente") setIdentificador(formatarCPF(v))
            else if (tipo === "medico") setIdentificador(formatarCRM(v))
            else if (tipo === "agente_saude") setIdentificador(formatarPrefixo(v, "ACS-"))
            else if (tipo === "farmaceutico") setIdentificador(formatarPrefixo(v, "CRF-"))
            else setIdentificador(v)
          }}
          keyboardType={tipo === "paciente" ? "numeric" : "default"}
          maxLength={
            tipo === "paciente" ? 14 :
            tipo === "medico" ? 9 :
            tipo === "agente_saude" ? 13 :
            tipo === "farmaceutico" ? 13 :
            undefined
          }
        />
      </View>
      {!!errors.identificador && <Text style={styles.errorText}>{errors.identificador}</Text>}

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" />
        <TextInput
          placeholder="Senha"
          secureTextEntry={!mostrarSenha}
          style={styles.input}
          value={senha}
          onChangeText={(v) => { setSenha(v); setErrors((e) => ({ ...e, senha: "" })) }}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Ionicons
            name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      </View>
      {!!errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#555" />
        <TextInput
          placeholder="Confirmar senha"
          secureTextEntry={!mostrarSenha}
          style={styles.input}
          value={confirmarSenha}
          onChangeText={(v) => { setConfirmarSenha(v); setErrors((e) => ({ ...e, confirmarSenha: "" })) }}
        />
      </View>
      {!!errors.confirmarSenha && <Text style={styles.errorText}>{errors.confirmarSenha}</Text>}

      {tipo === "medico" && (
        <>
          <View style={styles.inputContainer}>
            <Ionicons name="medical-outline" size={20} color="#555" />
            <TextInput
              placeholder="Especialidade (ex: Pediatria)"
              style={styles.input}
              value={especialidade}
              onChangeText={setEspecialidade}
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
                  setNome("")
                  setIdentificador("")
                  setSenha("")
                  setConfirmarSenha("")
                  setEspecialidade("")
                  setUbsId(null)
                  setErrors({})
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
    </KeyboardAwareScrollView>
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
    color: "#333",
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

  errorText: {
    color: "#DC2626",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 6,
    marginLeft: 4,
  },
});