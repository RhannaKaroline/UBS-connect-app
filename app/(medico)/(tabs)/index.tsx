import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MedicoHome() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.ola}>Olá, Dr.!</Text>
      <Text style={styles.sub}>Médico</Text>

      <View style={styles.agendaHoje}>
        <Text style={styles.agendaTitulo}>Agenda de Hoje</Text>
        <Text>08:00 - 18:00</Text>
        <Text>7 consultas agendadas</Text>
      </View>

      <Text style={styles.titulo}>Acesso Rápido</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("../medico/agenda")}
        >
          <Text style={styles.icon}>📅</Text>
          <Text>Agenda de Atendimentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("../medico/atualizar-prontuario")}
        >
          <Text style={styles.icon}>📋</Text>
          <Text>Atualizar Prontuário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.icon}>🧪</Text>
          <Text>Exames</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.icon}>📁</Text>
          <Text>Histórico do Paciente</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Próximos Atendimentos</Text>

      <TouchableOpacity style={styles.item}>
        <Text>Agenda de Atendimentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text>Atualizar Prontuário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text>Solicitar Exames</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text>Consultar Histórico</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20,backgroundColor:"#fff"},
  ola:{fontSize:24,fontWeight:"bold",marginTop:40},
  sub:{color:"#16A34A",marginBottom:20},
  agendaHoje:{
    backgroundColor:"#6BC48F",
    padding:15,
    borderRadius:10,
    marginBottom:20,
  },
  agendaTitulo:{
    color:"#fff",
    fontWeight:"bold",
    marginBottom:5,
  },
  titulo:{
    fontSize:18,
    fontWeight:"bold",
    marginBottom:15,
  },
  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
  },
  card:{
    width:"48%",
    backgroundColor:"#fff",
    padding:20,
    borderRadius:12,
    elevation:3,
    marginBottom:15,
    alignItems:"center",
  },
  icon:{
    fontSize:35,
    marginBottom:10,
  },
  item:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    marginBottom:10,
    elevation:2,
  },
});