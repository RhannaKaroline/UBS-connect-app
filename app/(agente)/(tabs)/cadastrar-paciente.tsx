import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { useApp } from "./context";

export default function Cadastrar() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");

  const { addPaciente } = useApp();

  const salvar = () => {
    if (!nome) return;

    addPaciente({
      id: Date.now(),
      nome,
      cpf,
    });

    setNome("");
    setCpf("");
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput placeholder="CPF" value={cpf} onChangeText={setCpf} />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}