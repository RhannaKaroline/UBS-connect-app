import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeFarmaceutico() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.ola}>Olá, Farmacêutico!</Text>
      <Text style={styles.sub}>Farmacêutico</Text>

      <Text style={styles.titulo}>Visão Geral</Text>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.numero}>152</Text>
          <Text>Medicamentos cadastrados</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.numero}>100</Text>
          <Text>Itens em estoque</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.numero}>12</Text>
          <Text>Estoque Baixo</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.numero}>3</Text>
          <Text>Indisponíveis</Text>
        </View>
      </View>

      <Text style={styles.titulo}>Ações Rápidas</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("../farmaceutico/estoque")}
      >
        <Text>Visualizar Estoque</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("../farmaceutico/adicionar")}
      >
        <Text>Adicionar Medicamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Text>Atualizar Medicamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Text>Remover Medicamento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20,backgroundColor:"#fff"},
  ola:{fontSize:22,fontWeight:"bold",marginTop:40},
  sub:{color:"#F59E0B",marginBottom:20},
  titulo:{fontSize:18,fontWeight:"bold",marginVertical:15},
  grid:{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between"},
  card:{
    width:"48%",
    backgroundColor:"#fff",
    padding:20,
    borderRadius:12,
    marginBottom:12,
    elevation:3,
  },
  numero:{fontSize:24,fontWeight:"bold"},
  botao:{
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    marginBottom:10,
    elevation:2,
  },
});