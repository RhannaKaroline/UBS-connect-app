import api from "./api";

export interface Prontuario {
  id: number;
  consultaId: number;
  queixaPrincipal: string;
  historicoDoencaAtual: string;
  diagnostico: string;
  condutaPlano: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProntuarioInput {
  queixaPrincipal: string;
  historicoDoencaAtual: string;
  diagnostico: string;
  condutaPlano: string;
}

export async function getProntuario(consultaId: number): Promise<Prontuario | null> {
  try {
    const response = await api.get(`/consultas/${consultaId}/prontuario`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) return null;
    throw error;
  }
}

export async function salvarProntuario(
  consultaId: number,
  dados: ProntuarioInput
): Promise<Prontuario> {
  const response = await api.put(`/consultas/${consultaId}/prontuario`, dados);
  return response.data;
}
