import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AdicionarMedicamento() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Adicionar Medicamento
      </Text>

      <Text style={styles.label}>
        Nome do Medicamento
      </Text>

      <TextInput
        placeholder="Digite o nome"
        style={styles.input}
      />

      <Text style={styles.label}>
        Descrição
      </Text>

      <TextInput
        placeholder="Digite uma descrição"
        multiline
        style={styles.textarea}
      />

      <Text style={styles.label}>
        Estoque Inicial
      </Text>

      <TextInput
        placeholder="Digite a quantidade"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>
        Status
      </Text>

      <TextInput
        placeholder="Disponível"
        style={styles.input}
      />

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>
          Salvar Medicamento
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:"#fff",
  },

  titulo:{
    marginTop:50,
    fontSize:24,
    fontWeight:"bold",
    color:"#F59E0B",
    marginBottom:20,
  },

  label:{
    marginBottom:8,
    fontWeight:"600",
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:10,
    padding:12,
    marginBottom:15,
  },

  textarea:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:10,
    height:120,
    textAlignVertical:"top",
    padding:12,
    marginBottom:15,
  },

  botao:{
    backgroundColor:"#F59E0B",
    padding:15,
    borderRadius:10,
    marginTop:20,
    alignItems:"center",
  },

  textoBotao:{
    color:"#fff",
    fontWeight:"bold",
  },
});