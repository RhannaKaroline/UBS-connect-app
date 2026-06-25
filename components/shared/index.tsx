import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  title: string;
  titleColor?: string;
  onBack?: () => void;
  rightIcon?: React.ReactNode;
}

export function Header({ title, titleColor = "#8B5CF6", onBack, rightIcon }: HeaderProps) {
  return (
    <View style={headerStyles.container}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="chevron-back" size={24} color={titleColor} />
      </TouchableOpacity>
      <Text style={[headerStyles.title, { color: titleColor }]}>{title}</Text>
      {rightIcon || <View style={{ width: 24 }} />}
    </View>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});


interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  title: string;
  onPress?: () => void;
}

export function StatCard({ icon, number, title, onPress }: StatCardProps) {
  const content = (
    <>
      {icon}
      <Text style={statCardStyles.number}>{number}</Text>
      <Text style={statCardStyles.title}>{title}</Text>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={statCardStyles.card} onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={statCardStyles.card}>{content}</View>;
}

const statCardStyles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  number: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  title: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
});


interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

export function QuickAction({ icon, title, onPress }: QuickActionProps) {
  return (
    <TouchableOpacity
      style={quickActionStyles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={quickActionStyles.left}>
        {icon}
        <Text style={quickActionStyles.text}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const quickActionStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  text: {
    fontSize: 15,
    color: "#333",
  },
});


interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export function SearchInput({
  placeholder = "Buscar...",
  value,
  onChangeText,
}: SearchInputProps) {
  return (
    <View style={searchStyles.container}>
      <Ionicons name="search-outline" size={20} color="#999" />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={searchStyles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

import { TextInput } from "react-native";

const searchStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
    fontSize: 15,
    color: "#333",
  },
});


interface SectionTitleProps {
  title: string;
}

export function SectionTitle({ title }: SectionTitleProps) {
  return <Text style={sectionStyles.title}>{title}</Text>;
}

const sectionStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
    textDecorationLine: "underline",
  },
});


interface ListCardProps {
  leftIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

export function ListCard({
  leftIcon,
  title,
  subtitle,
  rightElement,
  onPress,
}: ListCardProps) {
  return (
    <TouchableOpacity
      style={listCardStyles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={listCardStyles.left}>
        {leftIcon}
        <View>
          <Text style={listCardStyles.title}>{title}</Text>
          {subtitle && <Text style={listCardStyles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement}
    </TouchableOpacity>
  );
}

const listCardStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});


interface StatusBadgeProps {
  status: "Disponível" | "Estoque Baixo" | "Indisponível" | "Em andamento" | "Encerrada";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyle = () => {
    switch (status) {
      case "Disponível":
        return { bg: "#DCFCE7", color: "#16A34A" };
      case "Estoque Baixo":
        return { bg: "#FEF3C7", color: "#D97706" };
      case "Indisponível":
        return { bg: "#FEE2E2", color: "#DC2626" };
      case "Em andamento":
        return { bg: "#DBEAFE", color: "#2563EB" };
      case "Encerrada":
        return { bg: "#F3F4F6", color: "#6B7280" };
      default:
        return { bg: "#F3F4F6", color: "#6B7280" };
    }
  };

  const { bg, color } = getStatusStyle();

  return (
    <View style={[badgeStyles.badge, { backgroundColor: bg }]}>
      <Text style={[badgeStyles.text, { color }]}>{status}</Text>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
