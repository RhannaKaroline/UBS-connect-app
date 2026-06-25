import api from "./api";

export interface Ubs {
  id: number;
  nome: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  latitude: number;
  longitude: number;
  horarioFuncionamento: string;
  servicos: string;
  imagemUrl: string;
  ativa: boolean;
}

export async function getUBS(filtros?: {
  busca?: string;
}): Promise<Ubs[]> {
  const response = await api.get("/ubs", { params: filtros });
  return response.data;
}

export async function getUBSPorId(id: number): Promise<Ubs> {
  const response = await api.get(`/ubs/${id}`);
  return response.data;
}

export async function criarUBS(dados: Omit<Ubs, "id" | "ativa">): Promise<Ubs> {
  const response = await api.post("/ubs", dados);
  return response.data;
}

export async function atualizarUBS(
  id: number,
  dados: Partial<Ubs>
): Promise<Ubs> {
  const response = await api.put(`/ubs/${id}`, dados);
  return response.data;
}

export async function removerUBS(id: number): Promise<void> {
  await api.delete(`/ubs/${id}`);
}