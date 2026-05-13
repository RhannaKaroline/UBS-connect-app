import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Consultas() {
  const router = useRouter();

  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times = [
    "7:30 AM","08:00 AM","08:30 AM","09:00 AM",
    "09:30 AM","10:00 AM","10:30 AM","11:30 AM",
    "13:00 PM","13:30 PM","14:00 PM","14:30 PM",
    "15:00 PM","15:30 PM","16:00 PM","16:30 PM",
    "17:00 PM","17:30 PM"
  ];

  // 🔥 LIMPA TUDO AO SAIR DA TELA
  useFocusEffect(
    useCallback(() => {
      return () => {
        setSelectedSpecialty(null);
        setSelectedDate(null);
        setSelectedTime(null);
      };
    }, [])
  );

  const generateDates = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      days.push({
        fullDate: date,
        day: date.getDate(),
        week: date.toLocaleDateString("pt-BR", { weekday: "short" }),
      });
    }

    return days;
  };

  const dates = generateDates();

  const currentMonth =
    selectedDate?.fullDate.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    }) ||
    new Date().toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });

  function handleConfirm() {
    if (!selectedSpecialty || !selectedDate || !selectedTime) return;

    router.push({
      pathname: "/sucesso",
      params: {
        date: selectedDate.fullDate.toLocaleDateString("pt-BR"),
        time: selectedTime,
        specialty: selectedSpecialty,
      },
    });
  }

  return (
    <ScrollView style={styles.container}>

      {/* HEADER COM VOLTAR FUNCIONANDO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Ionicons name="arrow-back-outline" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Consultas</Text>
      </View>

      {/* ESPECIALIDADES */}
      <Text style={styles.subtitle}>Agendar uma consulta?</Text>
      <Text style={styles.label}>Escolha uma especialidade</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Specialty
          icon="stethoscope"
          title="Clínica Geral"
          selected={selectedSpecialty === "clinica"}
          onPress={() =>
            setSelectedSpecialty(
              selectedSpecialty === "clinica" ? null : "clinica"
            )
          }
        />

        <Specialty
          icon="tooth-outline"
          title="Odontologia"
          selected={selectedSpecialty === "odonto"}
          onPress={() =>
            setSelectedSpecialty(
              selectedSpecialty === "odonto" ? null : "odonto"
            )
          }
        />

        <Specialty
          icon="needle"
          title="Vacinação"
          selected={selectedSpecialty === "vacina"}
          onPress={() =>
            setSelectedSpecialty(
              selectedSpecialty === "vacina" ? null : "vacina"
            )
          }
        />

        <Specialty
          icon="baby-face-outline"
          title="Pediatria"
          selected={selectedSpecialty === "pediatria"}
          onPress={() =>
            setSelectedSpecialty(
              selectedSpecialty === "pediatria" ? null : "pediatria"
            )
          }
        />
      </ScrollView>

      {!selectedSpecialty && (
        <Text style={styles.warning}>
          Selecione uma especialidade para continuar
        </Text>
      )}

      {/* CALENDÁRIO */}
      {selectedSpecialty && (
        <>
          <Text style={styles.section}>{currentMonth}</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((item, index) => {
              const isSelected =
                selectedDate?.fullDate.toDateString() ===
                item.fullDate.toDateString();

              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dateBox, isSelected && styles.selectedDate]}
                  onPress={() => setSelectedDate(item)}
                >
                  <Text style={styles.weekText}>{item.week}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* HORÁRIOS */}
          <Text style={styles.section}>Selecione um Horário</Text>

          <View style={styles.timeContainer}>
            {times.map((time) => {
              const isSelected = selectedTime === time;

              return (
                <TouchableOpacity
                  key={time}
                  style={[styles.timeBox, isSelected && styles.selectedTime]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={{ color: isSelected ? "#fff" : "#000" }}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}

      {/* INFO */}
      {selectedDate && selectedTime && (
        <View style={styles.infoBox}>
          <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {selectedDate.fullDate.toLocaleDateString("pt-BR", {
              weekday: "long",
            })}
          </Text>
          <Text>{selectedDate.fullDate.toLocaleDateString("pt-BR")}</Text>
          <Text>Horário disponível às {selectedTime}</Text>
        </View>
      )}

      {/* BOTÃO */}
      {selectedDate && selectedTime && (
        <>
          <Text style={styles.patient}>Paciente</Text>
          <Text>CPF 000.000.000-00</Text>

          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirmar Agendamento</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

/* COMPONENTE ESPECIALIDADE */
function Specialty({ icon, title, selected, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.specialty, selected && styles.selectedSpecialty]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon}
        size={26}
        color={selected ? "#fff" : "#000"}
      />

      <Text
        style={{
          fontSize: 12,
          marginTop: 6,
          textAlign: "center",
          color: selected ? "#fff" : "#000",
        }}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3a7ca5",
  },

  subtitle: {
    marginTop: 10,
    fontWeight: "bold",
  },

  label: {
    marginBottom: 10,
    color: "#555",
  },

  warning: {
    color: "red",
    marginTop: 10,
  },

  specialty: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 130,
  },

  selectedSpecialty: {
    backgroundColor: "#4a90c2",
  },

  section: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textTransform: "capitalize",
  },

  dateBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    width: 70,
  },

  selectedDate: {
    backgroundColor: "#4a90c2",
  },

  weekText: {
    fontSize: 12,
    color: "#555",
  },

  dayText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  timeBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "31%",
    alignItems: "center",
  },

  selectedTime: {
    backgroundColor: "#4a90c2",
  },

  infoBox: {
    backgroundColor: "#e6e6e6",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },

  patient: {
    marginTop: 15,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#4a90c2",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});