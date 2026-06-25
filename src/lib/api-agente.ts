import api from "./api";

export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  senha?: string;
  dataNascimento: string;
  telefone: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  ubsReferencia: string;
  condicoesSaude: string;
  observacoes: string;
}

export interface AgenteSaude {
  id: string;
  nome: string;
  area: string;
}

export interface Campanha {
  id: string;
  nome: string;
  descricao: string;
  status: "Em andamento" | "Encerrada";
  periodo: string;
  icone: string;
  cor: string;
}

export interface Visita {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  endereco: string;
  dataHora: string;
  status: string;
}

export interface EstatisticasAgente {
  totalPacientes: number;
  visitasHoje: number;
  acompanhamentos: number;
  campanhasAtivas: number;
}

export async function getEstatisticas(): Promise<EstatisticasAgente> {
  const response = await api.get("/agente/estatisticas");
  return response.data;
}

export async function getPacientes(filtros?: {
  busca?: string;
}): Promise<Paciente[]> {
  const response = await api.get("/agente/pacientes", { params: filtros });
  return response.data;
}

export async function getPacientePorId(id: string): Promise<Paciente> {
  const response = await api.get(`/agente/pacientes/${id}`);
  return response.data;
}

export async function criarPaciente(dados: Omit<Paciente, "id">): Promise<Paciente> {
  const response = await api.post("/agente/pacientes", dados);
  return response.data;
}

export async function atualizarPaciente(
  id: string,
  dados: Partial<Paciente>
): Promise<Paciente> {
  const response = await api.put(`/agente/pacientes/${id}`, dados);
  return response.data;
}

export async function getEquipeACS(filtros?: {
  busca?: string;
}): Promise<AgenteSaude[]> {
  const response = await api.get("/agente/equipe", { params: filtros });
  return response.data;
}

export async function getCampanhas(): Promise<Campanha[]> {
  const response = await api.get("/agente/campanhas");
  return response.data;
}

export async function getCampanhasAtivas(): Promise<Campanha[]> {
  const response = await api.get("/agente/campanhas/ativas");
  return response.data;
}

export async function getProximasVisitas(): Promise<Visita[]> {
  const response = await api.get("/agente/visitas");
  return response.data;
}
