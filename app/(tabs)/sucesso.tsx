import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Sucesso() {
  const router = useRouter();
  const { date, time, specialty } = useLocalSearchParams();

  return (
    <View style={styles.container}>

      {/* Voltar */}
      <TouchableOpacity onPress={() => router.back()}
        style={{ marginTop: 20}}
 >
        <Ionicons name="arrow-back-outline" size={24} />
      </TouchableOpacity>

      {/* Ícone */}
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark" size={60} color="#fff" />
      </View>

      {/* Título */}
      <Text style={styles.title}>Sucesso</Text>
      <Text style={styles.subtitle}>Consulta Agendada</Text>

      {/* Informações */}
      <Text style={styles.section}>Informações</Text>

      <View style={styles.grid}>
        <Info label="Nome" value="Paciente" />
        <Info label="Data" value={date} />

        <Info label="Horário" value={formatTime(time)} />
        <Info label="Profissional" value="Dr. Rodrigo" />

        <Info label="Tipo de consulta" value={formatSpecialty(specialty)} />
        <Info label="Local" value="UBS Nicolas" />
      </View>

      {/* Orientação */}
      <View style={{ marginTop: 20 }}>
        <Text style={[styles.section, {textAlign: "left"}]}>Orientação</Text>
        <Text style={styles.text}>
          Chegar 15 minutos antes para realizar a triagem
        </Text>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo-ubs.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>UBS Connect</Text>
      </View>

    </View>
  );
}

function Info({ label, value }: any) {
  return (
    <View style={{ width: "45%", marginBottom: 30, paddingLeft: 20}}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function formatTime(time: any) {
  if (!time) return "";
  if (time.includes("AM")) return time.replace("AM", "da manhã");
  if (time.includes("PM")) return time.replace("PM", "da tarde");
  return time;
}

function formatSpecialty(spec: any) {
  switch (spec) {
    case "clinica":
      return "Clínica - Geral";
    case "odonto":
      return "Odontologia";
    case "vacina":
      return "Vacinação";
    case "pediatria":
      return "Pediatria";
    default:
      return spec;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 10,
    backgroundColor: "#f2f4f7",
  },

  iconContainer: {
    backgroundColor: "#4a90c2",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },

  title: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    fontSize:15,
  },

  section: {
    textAlign: "center",
    marginBottom: 5,
    color: "#555",
    fontSize: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  label: {
    color: "#777",
  },

  value: {
    fontWeight: "bold",
  },

  text: {
    color: "#555",
    marginTop: -10,
  },

  logoContainer: {
    marginTop: -5,
    alignItems: "center",
  },

  logo: {
    width: 200,
    height: 125,
  },

  appName: {
    fontWeight: "bold",
    marginTop: -30,
  },
});