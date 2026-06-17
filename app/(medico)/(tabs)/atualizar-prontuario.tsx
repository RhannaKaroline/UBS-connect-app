import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AtualizarProntuario() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>
        Atualizar Prontuário
      </Text>

      <View style={styles.paciente}>
        <Text style={styles.nome}>
          João da Silva
        </Text>

        <Text>32 anos</Text>
        <Text>Prontuário: 0286.05.0001</Text>
      </View>

      <Text style={styles.label}>
        Queixa Principal
      </Text>

      <TextInput style={styles.input} />

      <Text style={styles.label}>
        Histórico da Doença Atual
      </Text>

      <TextInput style={styles.input} />

      <Text style={styles.label}>
        Diagnóstico
      </Text>

      <TextInput style={styles.input} />

      <Text style={styles.label}>
        Conduta / Plano
      </Text>

      <TextInput
        multiline
        style={styles.textarea}
      />

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>
          Salvar Prontuário
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    padding:20,
  },

  titulo:{
    marginTop:50,
    fontSize:24,
    fontWeight:"bold",
    color:"#16A34A",
    marginBottom:20,
  },

  paciente:{
    backgroundColor:"#F3F4F6",
    padding:15,
    borderRadius:10,
    marginBottom:20,
  },

  nome:{
    fontWeight:"bold",
    fontSize:16,
  },

  label:{
    fontWeight:"600",
    marginBottom:8,
  },

  input:{
    borderWidth:1,
    borderColor:"#D1D5DB",
    borderRadius:10,
    padding:12,
    marginBottom:15,
  },

  textarea:{
    borderWidth:1,
    borderColor:"#D1D5DB",
    borderRadius:10,
    padding:12,
    height:120,
    textAlignVertical:"top",
    marginBottom:20,
  },

  botao:{
    backgroundColor:"#16A34A",
    padding:15,
    borderRadius:10,
    alignItems:"center",
    marginBottom:30,
  },

  botaoTexto:{
    color:"#fff",
    fontWeight:"bold",
  },
});