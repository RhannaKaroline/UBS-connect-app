import { Header } from "@/components/shared";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { criarPaciente } from "../../src/lib/api-agente";

function formatarCPF(valor: string) {
  const digits = valor.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatarTelefone(valor: string) {
  const digits = valor.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10)
    return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

function formatarData(valor: string) {
  const digits = valor.replace(/\D/g, "").slice(0, 8);
  return digits
    .replace(/^(\d{2})(\d)/, "$1/$2")
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
}

function formatarCEP(valor: string) {
  const digits = valor.replace(/\D/g, "").slice(0, 8);
  return digits.replace(/^(\d{5})(\d)/, "$1-$2");
}

function validarCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(digits[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(digits[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(digits[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  return resto === parseInt(digits[10]);
}

function validarData(valor: string): boolean {
  const match = valor.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return false;
  const dia = parseInt(match[1]);
  const mes = parseInt(match[2]);
  const ano = parseInt(match[3]);
  if (mes < 1 || mes > 12) return false;
  const diasNoMes = new Date(ano, mes, 0).getDate();
  if (dia < 1 || dia > diasNoMes) return false;
  return ano >= 1900 && ano <= 2100;
}

export default function CadastrarPaciente() {
  const queryClient = useQueryClient();
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [ubs, setUbs] = useState("");
  const [condicoes, setCondicoes] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarUbs, setMostrarUbs] = useState(false);

  const { mutate: salvar, isPending } = useMutation({
    mutationFn: () =>
      criarPaciente({
        nome,
        cpf: cpf.replace(/\D/g, ""),
        senha,
        dataNascimento,
        telefone: telefone.replace(/\D/g, ""),
        endereco: rua,
        bairro,
        cidade,
        estado,
        cep: cep.replace(/\D/g, ""),
        ubsReferencia: ubs,
        condicoesSaude: condicoes,
        observacoes: "",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estatisticas-agente"] });
      Alert.alert("Sucesso", "Paciente cadastrado com sucesso!");
      router.back();
    },
    onError: (err: any) => {
      const mensagem =
        err?.response?.data?.erro || "Erro ao cadastrar paciente.";
      Alert.alert("Erro", mensagem);
    },
  });

  const handleSalvar = () => {
    if (!nome.trim()) {
      Alert.alert("Atenção", "O nome do paciente é obrigatório.");
      return;
    }

    const cpfDigits = cpf.replace(/\D/g, "");
    if (cpfDigits.length !== 11) {
      Alert.alert("Atenção", "O CPF deve ter 11 dígitos.");
      return;
    }
    if (!validarCPF(cpf)) {
      Alert.alert("Atenção", "CPF inválido. Verifique os dígitos.");
      return;
    }

    if (!senha.trim() || senha.length < 6) {
      Alert.alert("Atenção", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (dataNascimento && !validarData(dataNascimento)) {
      Alert.alert("Atenção", "Data de nascimento inválida. Use o formato dd/mm/aaaa.");
      return;
    }

    salvar();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Cadastrar Paciente"
        onBack={() => router.back()}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Informações Pessoais</Text>

        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          placeholder="Digite o nome completo"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Data de Nascimento</Text>
        <View style={styles.inputIcon}>
          <TextInput
            placeholder="dd/mm/aaaa"
            placeholderTextColor="#B0B0B0"
            style={styles.inputFlex}
            value={dataNascimento}
            onChangeText={(v) => setDataNascimento(formatarData(v))}
            keyboardType="numeric"
            maxLength={10}
          />
          <Ionicons name="calendar-outline" size={20} color="#888" />
        </View>

        <Text style={styles.label}>CPF</Text>
        <TextInput
          placeholder="000.000.000-00"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={cpf}
          onChangeText={(v) => setCpf(formatarCPF(v))}
          keyboardType="numeric"
          maxLength={14}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Mínimo 6 caracteres"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          placeholder="(00) 00000-0000"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={telefone}
          onChangeText={(v) => setTelefone(formatarTelefone(v))}
          keyboardType="numeric"
          maxLength={15}
        />

        <Text style={styles.sectionTitle}>Endereço</Text>

        <TextInput
          placeholder="Rua, Número (Complemento)"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={rua}
          onChangeText={setRua}
        />

        <TextInput
          placeholder="Bairro"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={bairro}
          onChangeText={setBairro}
        />

        <View style={styles.row}>
          <TextInput
            placeholder="Cidade"
            placeholderTextColor="#B0B0B0"
            style={[styles.input, styles.inputSmall]}
            value={cidade}
            onChangeText={setCidade}
          />
          <TextInput
            placeholder="UF"
            placeholderTextColor="#B0B0B0"
            style={[styles.input, styles.inputSmall]}
            value={estado}
            onChangeText={(v) => setEstado(v.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase())}
            maxLength={2}
            autoCapitalize="characters"
          />
          <TextInput
            placeholder="CEP"
            placeholderTextColor="#B0B0B0"
            style={[styles.input, styles.inputSmall]}
            value={cep}
            onChangeText={(v) => setCep(formatarCEP(v))}
            keyboardType="numeric"
            maxLength={9}
          />
        </View>

        <Text style={styles.label}>UBS de Referência</Text>
        <TouchableOpacity
          style={styles.selectInput}
          onPress={() => setMostrarUbs(!mostrarUbs)}
        >
          <Text style={[styles.placeholder, !ubs && styles.placeholderText]}>
            {ubs || "Selecione a UBS"}
          </Text>
          <Ionicons
            name={mostrarUbs ? "chevron-up" : "chevron-down"}
            size={18}
            color="#888"
          />
        </TouchableOpacity>

        {mostrarUbs && (
          <View style={styles.selectOptions}>
            {["UBS Central", "UBS São José", "UBS Vila Nova", "UBS Nicolau"].map(
              (opcao) => (
                <TouchableOpacity
                  key={opcao}
                  style={[
                    styles.selectOption,
                    ubs === opcao && styles.selectOptionAtivo,
                  ]}
                  onPress={() => {
                    setUbs(opcao);
                    setMostrarUbs(false);
                  }}
                >
                  <Text
                    style={[
                      styles.selectOptionText,
                      ubs === opcao && styles.selectOptionTextAtivo,
                    ]}
                  >
                    {opcao}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}

        <Text style={styles.sectionTitle}>Outras Informações</Text>

        <Text style={styles.label}>Condições de Saúde</Text>
        <TextInput
          placeholder="Informe condições relevantes (opcional)"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={condicoes}
          onChangeText={setCondicoes}
        />

        <TouchableOpacity
          style={[styles.button, isPending && styles.buttonDisabled]}
          onPress={handleSalvar}
          disabled={isPending}
        >
          <Text style={styles.buttonText}>
            {isPending ? "Salvando..." : "Salvar Paciente"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
    marginHorizontal: 16,
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  inputIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  inputFlex: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  inputSmall: {
    flex: 1,
    marginHorizontal: 0,
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
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  placeholder: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  placeholderText: {
    color: "#333",
  },
  selectOptions: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    padding: 8,
  },
  selectOption: {
    padding: 12,
    borderRadius: 8,
  },
  selectOptionAtivo: {
    backgroundColor: "#8B5CF6",
  },
  selectOptionText: {
    fontSize: 14,
    color: "#333",
  },
  selectOptionTextAtivo: {
    color: "#fff",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#8B5CF6",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
