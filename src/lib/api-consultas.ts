import api from "./api";

export interface Consulta {
  id: number;
  pacienteId: number;
  pacienteNome: string;
  medicoId: number;
  medicoNome: string;
  ubsId: number;
  ubsNome: string;
  dataHora: string;
  data: string;
  hora: string;
  especialidade: string;
  tipoConsulta: string;
  status: string;
  observacoes: string;
}

export interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  ubsNome?: string;
}

export interface HorariosResponse {
  data: string;
  horarios: string[];
}

export async function agendarConsulta(dados: {
  paciente_id: number;
  medico_id?: number;
  ubs_id?: number;
  data_hora: string;
  especialidade?: string;
  tipoConsulta?: string;
}): Promise<Consulta> {
  const response = await api.post("/consultas/agendar", dados);
  return response.data.consulta;
}

export async function getConsultasPaciente(
  pacienteId: number,
  status?: string
): Promise<Consulta[]> {
  const response = await api.get(`/consultas/paciente/${pacienteId}`, {
    params: { status },
  });
  return response.data;
}

export async function getConsultasMedico(
  medicoId: number,
  data?: string,
  status?: string
): Promise<Consulta[]> {
  const response = await api.get(`/consultas/medico/${medicoId}`, {
    params: { data, status },
  });
  return response.data;
}

export async function getConsultaPorId(id: number): Promise<Consulta> {
  const response = await api.get(`/consultas/${id}`);
  return response.data;
}

export async function cancelarConsulta(id: number): Promise<void> {
  await api.put(`/consultas/${id}/cancelar`);
}

export async function getHorariosDisponiveis(
  data: string,
  medicoId?: number
): Promise<HorariosResponse> {
  const response = await api.get("/consultas/horarios-disponiveis", {
    params: { data, medico_id: medicoId },
  });
  return response.data;
}

export async function getMedicos(pacienteId?: number): Promise<Medico[]> {
  const response = await api.get("/consultas/medicos", {
    params: { paciente_id: pacienteId },
  });
  return response.data;
}