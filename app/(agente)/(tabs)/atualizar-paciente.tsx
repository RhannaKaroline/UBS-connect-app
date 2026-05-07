import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useApp } from "./context";

export default function Atualizar() {
  const { pacientes, updatePaciente } = useApp();
  const [selecionado, setSelecionado] = useState<any>(null);
  const [novoNome, setNovoNome] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <Text>Selecione um paciente:</Text>

      {pacientes.map((p: any) => (
        <Text key={p.id} onPress={() => setSelecionado(p)}>
          {p.nome}
        </Text>
      ))}

      {selecionado && (
        <>
          <TextInput
            placeholder="Novo nome"
            value={novoNome}
            onChangeText={setNovoNome}
          />
          <Button
            title="Atualizar"
            onPress={() => updatePaciente(selecionado.id, novoNome)}
          />
        </>
      )}
    </View>
  );
}