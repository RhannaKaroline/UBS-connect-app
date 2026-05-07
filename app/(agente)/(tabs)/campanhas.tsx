import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useApp } from "./context";

export default function Campanhas() {
  const { campanhas, addCampanha } = useApp();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const salvar = () => {
    if (!titulo) return;

    addCampanha({
      id: Date.now(),
      titulo,
      descricao,
    });

    setTitulo("");
    setDescricao("");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nova Campanha</Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Button title="Adicionar Campanha" onPress={salvar} />

      <Text style={{ marginTop: 20 }}>Campanhas:</Text>

      {campanhas.map((c: any) => (
        <Text key={c.id}>{c.titulo}</Text>
      ))}
    </View>
  );
}