import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { criarMedicamento, getUBS } from "@/src/lib/api-farmaceutico";

export default function AdicionarMedicamento() {
  const queryClient = useQueryClient();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [apresentacao, setApresentacao] = useState("");
  const [validadeMedia, setValidadeMedia] = useState("");
  const [registroAnvisa, setRegistroAnvisa] = useState("");
  const [estoqueInicial, setEstoqueInicial] = useState("");
  const [status, setStatus] = useState("");
  const [mostrarStatus, setMostrarStatus] = useState(false);
  const [ubsSelecionadas, setUbsSelecionadas] = useState<number[]>([]);
  const [mostrarUbs, setMostrarUbs] = useState(false);

  const { data: ubsList } = useQuery({
    queryKey: ["ubs"],
    queryFn: getUBS,
  });

  const toggleUbs = (id: number) => {
    setUbsSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const { mutate: salvar, isPending } = useMutation({
    mutationFn: () =>
      criarMedicamento({
        nome,
        descricao,
        categoria,
        apresentacao,
        validadeMedia,
        registroAnvisa,
        estoqueInicial: Number(estoqueInicial) || 0,
        status,
        ubsIds: ubsSelecionadas,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicamentos"] });
      queryClient.invalidateQueries({ queryKey: ["estatisticas-farmacia"] });
      Alert.alert("Sucesso", "Medicamento cadastrado com sucesso!");
      router.back();
    },
    onError: (err: any) => {
      const mensagem =
        err?.response?.data?.erro || "Erro ao cadastrar medicamento.";
      Alert.alert("Erro", mensagem);
    },
  });

  const handleSalvar = () => {
    if (!nome.trim()) {
      Alert.alert("Atenção", "O nome do medicamento é obrigatório.");
      return;
    }
    salvar();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Adicionar Medicamento</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.subtitulo}>
          Informações do Medicamento
        </Text>

        <Text style={styles.label}>Nome do Medicamento</Text>
        <TextInput
          placeholder="Digite o nome do medicamento"
          placeholderTextColor="#999"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          placeholder="Digite uma descrição"
          placeholderTextColor="#999"
          multiline
          style={styles.textarea}
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          placeholder="Ex: Analgésico, Antibiótico"
          placeholderTextColor="#999"
          style={styles.input}
          value={categoria}
          onChangeText={setCategoria}
        />

        <Text style={styles.label}>Apresentação</Text>
        <TextInput
          placeholder="Ex: Comprimido, Cápsula, Gotas"
          placeholderTextColor="#999"
          style={styles.input}
          value={apresentacao}
          onChangeText={setApresentacao}
        />

        <Text style={styles.label}>Validade Média</Text>
        <TextInput
          placeholder="Ex: 24 meses"
          placeholderTextColor="#999"
          style={styles.input}
          value={validadeMedia}
          onChangeText={setValidadeMedia}
        />

        <Text style={styles.label}>Registro ANVISA</Text>
        <TextInput
          placeholder="Número do registro na ANVISA"
          placeholderTextColor="#999"
          style={styles.input}
          value={registroAnvisa}
          onChangeText={setRegistroAnvisa}
        />

        <Text style={styles.label}>Estoque Inicial</Text>
        <TextInput
          placeholder="Digite a quantidade inicial"
          placeholderTextColor="#999"
          keyboardType="numeric"
          style={styles.input}
          value={estoqueInicial}
          onChangeText={setEstoqueInicial}
        />

        <Text style={styles.label}>Status</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setMostrarStatus(!mostrarStatus)}
        >
          <Text style={[styles.selectText, !status && styles.placeholder]}>
            {status || "Selecione o Status"}
          </Text>
          <Ionicons
            name={mostrarStatus ? "chevron-up" : "chevron-down"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        {mostrarStatus && (
          <View style={styles.selectOptions}>
            {["Disponível", "Estoque Baixo", "Indisponível"].map((opcao) => (
              <TouchableOpacity
                key={opcao}
                style={[
                  styles.selectOption,
                  status === opcao && styles.selectOptionAtivo,
                ]}
                onPress={() => {
                  setStatus(opcao);
                  setMostrarStatus(false);
                }}
              >
                <Text
                  style={[
                    styles.selectOptionText,
                    status === opcao && styles.selectOptionTextAtivo,
                  ]}
                >
                  {opcao}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>UBS de Destino</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setMostrarUbs(!mostrarUbs)}
        >
          <Text style={[styles.selectText, ubsSelecionadas.length === 0 && styles.placeholder]}>
            {ubsSelecionadas.length > 0
              ? `${ubsSelecionadas.length} UBS selecionada(s)`
              : "Selecione as UBS"}
          </Text>
          <Ionicons
            name={mostrarUbs ? "chevron-up" : "chevron-down"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>

        {mostrarUbs && (
          <View style={styles.selectOptions}>
            {ubsList?.map((ubs) => (
              <TouchableOpacity
                key={ubs.id}
                style={[
                  styles.selectOption,
                  ubsSelecionadas.includes(ubs.id) && styles.selectOptionAtivo,
                ]}
                onPress={() => toggleUbs(ubs.id)}
              >
                <Ionicons
                  name={ubsSelecionadas.includes(ubs.id) ? "checkbox" : "square-outline"}
                  size={20}
                  color={ubsSelecionadas.includes(ubs.id) ? "#F59E0B" : "#999"}
                />
                <Text
                  style={[
                    styles.selectOptionText,
                    ubsSelecionadas.includes(ubs.id) && styles.selectOptionTextAtivo,
                    { marginLeft: 8 },
                  ]}
                >
                  {ubs.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.botao, isPending && styles.botaoDisabled]}
          onPress={handleSalvar}
          disabled={isPending}
        >
          <Text style={styles.textoBotao}>
            {isPending ? "Salvando..." : "Salvar Medicamento"}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F59E0B",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 10,
    fontSize: 15,
    elevation: 2,
    color: "#333",
  },
  textarea: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 10,
    fontSize: 15,
    elevation: 2,
    height: 120,
    textAlignVertical: "top",
    color: "#333",
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 10,
    elevation: 2,
  },
  selectText: {
    fontSize: 15,
    color: "#333",
  },
  placeholder: {
    color: "#999",
  },
  selectOptions: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 2,
    padding: 8,
  },
  selectOption: {
    padding: 12,
    borderRadius: 8,
  },
  selectOptionAtivo: {
    backgroundColor: "#F59E0B",
  },
  selectOptionText: {
    fontSize: 14,
    color: "#333",
  },
  selectOptionTextAtivo: {
    color: "#fff",
    fontWeight: "600",
  },
  botao: {
    backgroundColor: "#F59E0B",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoDisabled: {
    opacity: 0.6,
  },
});