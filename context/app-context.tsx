import React, { createContext, useContext, useState } from "react";

type Paciente = {
  id: number;
  nome: string;
  cpf: string;
};

type Campanha = {
  id: number;
  titulo: string;
  descricao: string;
};

type AppContextType = {
  pacientes: Paciente[];
  campanhas: Campanha[];
  addPaciente: (p: Paciente) => void;
  updatePaciente: (id: number, nome: string) => void;
  addCampanha: (c: Campanha) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);

  const addPaciente = (p: Paciente) => {
    setPacientes((prev) => [...prev, p]);
  };

  const updatePaciente = (id: number, nome: string) => {
    setPacientes((prev) =>
      prev.map((paciente) =>
        paciente.id === id ? { ...paciente, nome } : paciente
      )
    );
  };

  const addCampanha = (c: Campanha) => {
    setCampanhas((prev) => [...prev, c]);
  };

  return (
    <AppContext.Provider
      value={{
        pacientes,
        campanhas,
        addPaciente,
        updatePaciente,
        addCampanha,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp deve ser usado dentro do AppProvider");
  }

  return context;
};