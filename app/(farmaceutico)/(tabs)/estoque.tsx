import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const medicamentos = [
  {
    id:"1",
    nome:"Paracetamol 750mg",
    estoque:120,
    status:"Disponível",
  },
  {
    id:"2",
    nome:"Amoxicilina 500mg",
    estoque:45,
    status:"Disponível",
  },
  {
    id:"3",
    nome:"Dipirona 500mg",
    estoque:8,
    status:"Estoque Baixo",
  },
  {
    id:"4",
    nome:"Losartana 50mg",
    estoque:0,
    status:"Indisponível",
  },
];

export default function EstoqueMedicamentos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Estoque de Medicamentos
      </Text>

      <TextInput
        placeholder="Buscar medicamento..."
        style={styles.input}
      />

      <FlatList
        data={medicamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text>
                Estoque: {item.estoque} unidades
              </Text>
            </View>

            <Text
              style={[
                styles.status,
                item.status === "Disponível"
                  ? styles.disponivel
                  : item.status === "Estoque Baixo"
                  ? styles.baixo
                  : styles.indisponivel,
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
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
  },

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:10,
    padding:12,
    marginVertical:15,
  },

  card:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:12,
    marginBottom:10,
    elevation:3,
    flexDirection:"row",
    justifyContent:"space-between",
  },

  nome:{
    fontWeight:"bold",
    marginBottom:5,
  },

  status:{
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:8,
    height:30,
  },

  disponivel:{
    backgroundColor:"#DCFCE7",
    color:"#16A34A",
  },

  baixo:{
    backgroundColor:"#FEF3C7",
    color:"#D97706",
  },

  indisponivel:{
    backgroundColor:"#FEE2E2",
    color:"#DC2626",
  },
});