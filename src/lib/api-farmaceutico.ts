import api from "./api";

export interface Medicamento {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  apresentacao: string;
  validadeMedia: string;
  registroAnvisa: string;
  dataCadastro: string;
  estoqueInicial: number;
  estoqueAtual: number;
  status: "Disponível" | "Estoque Baixo" | "Indisponível";
  ubs: Array<{
    id: string;
    nome: string;
    unidades: number;
    status: "Disponível" | "Indisponível";
  }>;
}

export interface EstatisticasFarmacia {
  totalMedicamentos: number;
  itensEmEstoque: number;
  estoqueBaixo: number;
  indisponiveis: number;
}

function transformarMedicamento(item: any): Medicamento {
  return {
    id: String(item.id),
    nome: item.nome,
    descricao: item.descricao || "",
    categoria: item.categoria || "",
    apresentacao: item.apresentacao || "",
    validadeMedia: item.validade_media || "",
    registroAnvisa: item.registro_anvisa || "",
    dataCadastro: item.data_cadastro || "",
    estoqueInicial: item.estoque_inicial ?? 0,
    estoqueAtual: item.estoque_atual ?? 0,
    status: item.status,
    ubs: (item.ubs || []).map((u: any) => ({
      id: String(u.ubs_id || u.id),
      nome: u.ubs_nome || u.nome || "",
      unidades: u.quantidade || 0,
      status: u.status || "Indisponível",
    })),
  };
}

export async function getEstatisticas(): Promise<EstatisticasFarmacia> {
  const response = await api.get("/farmaceutico/estatisticas");
  return response.data;
}

export async function getMedicamentos(filtros?: {
  busca?: string;
  status?: string;
}): Promise<Medicamento[]> {
  const response = await api.get("/farmaceutico/medicamentos", {
    params: filtros,
  });
  return (response.data || []).map(transformarMedicamento);
}

export async function getMedicamentoPorId(
  id: string
): Promise<Medicamento> {
  const response = await api.get(`/farmaceutico/medicamentos/${id}`);
  return transformarMedicamento(response.data);
}

export async function criarMedicamento(dados: {
  nome: string;
  descricao: string;
  categoria: string;
  apresentacao: string;
  validadeMedia: string;
  registroAnvisa: string;
  estoqueInicial: number;
  status: string;
}): Promise<Medicamento> {
  const response = await api.post("/farmaceutico/medicamentos", dados);
  return transformarMedicamento(response.data.medicamento);
}

export async function atualizarMedicamento(
  id: string,
  dados: Partial<Medicamento>
): Promise<Medicamento> {
  const response = await api.put(
    `/farmaceutico/medicamentos/${id}`,
    dados
  );
  return transformarMedicamento(response.data.medicamento);
}

export async function removerMedicamento(id: string): Promise<void> {
  await api.delete(`/farmaceutico/medicamentos/${id}`);
}
