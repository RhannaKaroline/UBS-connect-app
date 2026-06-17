import { FlatList, StyleSheet, Text, View } from "react-native";

const consultas = [
  {
    id:"1",
    horario:"08:00",
    nome:"João da Silva",
    tipo:"Consulta de Retorno",
  },
  {
    id:"2",
    horario:"08:30",
    nome:"Maria Oliveira",
    tipo:"Consulta de Clínica",
  },
  {
    id:"3",
    horario:"09:00",
    nome:"Carlos Pereira",
    tipo:"Avaliação",
  },
  {
    id:"4",
    horario:"09:30",
    nome:"Ana Souza",
    tipo:"Consulta de Rotina",
  },
];

export default function AgendaAtendimentos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Agenda de Atendimentos
      </Text>

      <View style={styles.dataBox}>
        <Text>01 de Julho de 2026</Text>
      </View>

      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.horario}>
                {item.horario}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>
                {item.nome}
              </Text>

              <Text>{item.tipo}</Text>
            </View>

            <Text style={styles.status}>
              Disponível
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

  dataBox:{
    backgroundColor:"#F3F4F6",
    padding:15,
    borderRadius:10,
    marginBottom:20,
    alignItems:"center",
  },

  card:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    elevation:2,
    marginBottom:10,
  },

  horario:{
    color:"#16A34A",
    fontWeight:"bold",
    width:60,
  },

  nome:{
    fontWeight:"bold",
  },

  status:{
    color:"#16A34A",
    backgroundColor:"#DCFCE7",
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:8,
  },
});