import { Header, SearchInput } from "@/components/shared";
import { atualizarPaciente, getPacientePorId, getPacientes } from "@/src/lib/api-agente";
import { getUBS } from "@/src/lib/api-ubs";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";


export default function AtualizarPaciente() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (id) {
    return <EditarPaciente key={id} id={id} />;
  }

  return <SelecionarPaciente />;
}

function SelecionarPaciente() {
  const [busca, setBusca] = React.useState("");

  const { data: pacientes, isLoading } = useQuery({
    queryKey: ["pacientes", busca],
    queryFn: () => getPacientes({ busca: busca || undefined }),
  });

  return (
    <View style={styles.container}>
      <Header title="Selecionar Paciente" onBack={() => router.back()} />

      <SearchInput
        placeholder="Buscar paciente por nome..."
        value={busca}
        onChangeText={setBusca}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#8B5CF6" style={{ margin: 32 }} />
      ) : (
        <FlatList
          data={pacientes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.patientCard}
              onPress={() => router.push(`/atualizar?id=${item.id}`)}
            >
              <View style={styles.patientAvatar}>
                <Ionicons name="person" size={24} color="#8B5CF6" />
              </View>
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{item.nome}</Text>
                <Text style={styles.patientCpf}>CPF: {item.cpf || "-"}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum paciente encontrado.</Text>
          }
        />
      )}
    </View>
  );
}

function EditarPaciente({ id }: { id: string }) {
  const { data: paciente, isLoading } = useQuery({
    queryKey: ["paciente", id],
    queryFn: () => getPacientePorId(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="Atualizar Paciente" onBack={() => router.back()} />
        <ActivityIndicator size="large" color="#8B5CF6" style={{ margin: 32 }} />
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.container}>
        <Header title="Atualizar Paciente" onBack={() => router.back()} />
        <Text style={styles.empty}>Paciente não encontrado.</Text>
      </View>
    );
  }

  return <FormularioPaciente key={paciente.id} paciente={paciente} id={id} />;
}

function FormularioPaciente({ paciente, id }: { paciente: any; id: string }) {
  const queryClient = useQueryClient();
  const { data: ubsList } = useQuery({
    queryKey: ["ubs"],
    queryFn: () => getUBS(),
  });

  const [form, setForm] = React.useState({
    telefone: paciente.telefone || "",
    endereco: paciente.endereco || "",
    bairro: paciente.bairro || "",
    cidade: paciente.cidade || "",
    estado: paciente.estado || "",
    cep: paciente.cep || "",
    ubs: paciente.ubsReferencia || "",
    condicoes: paciente.condicoesSaude || "",
    observacoes: paciente.observacoes || "",
  });
  const [mostrarUbs, setMostrarUbs] = React.useState(false);

  const atualizarCampo = (campo: string, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const { mutate: salvar, isPending } = useMutation({
    mutationFn: () =>
      atualizarPaciente(id, {
        telefone: form.telefone,
        endereco: form.endereco,
        bairro: form.bairro,
        cidade: form.cidade,
        estado: form.estado,
        cep: form.cep,
        ubsReferencia: form.ubs,
        condicoesSaude: form.condicoes,
        observacoes: form.observacoes,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paciente", id] });
      queryClient.invalidateQueries({ queryKey: ["estatisticas-agente"] });
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
      Alert.alert("Sucesso", "Paciente atualizado com sucesso!");
      router.back();
    },
    onError: (err: any) => {
      const mensagem =
        err?.response?.data?.erro || "Erro ao atualizar paciente.";
      Alert.alert("Erro", mensagem);
    },
  });

  return (
    <View style={styles.container}>
      <Header
        title="Atualizar Paciente"
        onBack={() => router.back()}
      />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.patientCard}>
          <View style={styles.patientAvatar}>
            <Ionicons name="person" size={30} color="#8B5CF6" />
          </View>
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{paciente.nome || "Paciente"}</Text>
            <Text style={styles.patientCpf}>CPF: {paciente.cpf || "-"}</Text>
            <Text style={styles.patientDate}>
              Data de nascimento: {paciente.dataNascimento || "-"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Informações Pessoais</Text>

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          placeholder="(00) 00000-0000"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={form.telefone}
          onChangeText={(v) => atualizarCampo("telefone", v)}
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          placeholder="Digite o endereço"
          placeholderTextColor="#B0B0B0"
          style={styles.textarea}
          multiline
          value={form.endereco}
          onChangeText={(v) => atualizarCampo("endereco", v)}
        />

        <Text style={styles.label}>Bairro</Text>
        <TextInput
          placeholder="Digite o bairro"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={form.bairro}
          onChangeText={(v) => atualizarCampo("bairro", v)}
        />

        <View style={styles.row}>
          <TextInput
            placeholder="Cidade"
            placeholderTextColor="#B0B0B0"
            style={[styles.input, styles.inputSmall]}
            value={form.cidade}
            onChangeText={(v) => atualizarCampo("cidade", v)}
          />
          <TextInput
            placeholder="Estado"
            placeholderTextColor="#B0B0B0"
            style={[styles.input, styles.inputSmall]}
            value={form.estado}
            onChangeText={(v) => atualizarCampo("estado", v)}
          />
          <TextInput
            placeholder="CEP"
            placeholderTextColor="#B0B0B0"
            style={[styles.input, styles.inputSmall]}
            value={form.cep}
            onChangeText={(v) => atualizarCampo("cep", v)}
          />
        </View>

        <Text style={styles.label}>UBS de Referência</Text>
        <TouchableOpacity
          style={styles.selectInput}
          onPress={() => setMostrarUbs(!mostrarUbs)}
        >
          <Text style={[styles.placeholder, !form.ubs && styles.placeholderText]}>
            {form.ubs || "Selecione a UBS"}
          </Text>
          <Ionicons
            name={mostrarUbs ? "chevron-up" : "chevron-down"}
            size={18}
            color="#888"
          />
        </TouchableOpacity>

        {mostrarUbs && (
          <View style={styles.selectOptions}>
            {(ubsList ?? []).map(
              (item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.selectOption,
                    form.ubs === item.nome && styles.selectOptionAtivo,
                  ]}
                  onPress={() => {
                    atualizarCampo("ubs", item.nome);
                    setMostrarUbs(false);
                  }}
                >
                  <Text
                    style={[
                      styles.selectOptionText,
                      form.ubs === item.nome && styles.selectOptionTextAtivo,
                    ]}
                  >
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}

        <Text style={styles.label}>Condições de Saúde</Text>
        <TextInput
          placeholder="Condições de saúde"
          placeholderTextColor="#B0B0B0"
          style={styles.input}
          value={form.condicoes}
          onChangeText={(v) => atualizarCampo("condicoes", v)}
        />

        <Text style={styles.label}>Observações</Text>
        <TextInput
          placeholder="Observações"
          placeholderTextColor="#B0B0B0"
          style={styles.textarea}
          multiline
          value={form.observacoes}
          onChangeText={(v) => atualizarCampo("observacoes", v)}
        />

        <TouchableOpacity
          style={[styles.button, isPending && styles.buttonDisabled]}
          onPress={() => salvar()}
          disabled={isPending}
        >
          <Text style={styles.buttonText}>
            {isPending ? "Salvando..." : "Salvar Alterações"}
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
  patientCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    elevation: 2,
  },
  patientAvatar: {
    width: 50,
    height: 50,
    backgroundColor: "#F3E8FF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  patientCpf: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  patientDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 16,
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
  inputSmall: {
    flex: 1,
    marginHorizontal: 0,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
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
  empty: {
    textAlign: "center",
    color: "#999",
    marginTop: 32,
    fontSize: 14,
  },
});
