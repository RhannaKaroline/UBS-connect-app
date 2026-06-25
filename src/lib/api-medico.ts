import api from "./api";

export interface PacienteAtendido {
  id: number;
  nome: string;
  cpf: string;
}

export async function getPacientesAtendidos(
  medicoId: number,
  busca?: string
): Promise<PacienteAtendido[]> {
  const response = await api.get(`/medico/${medicoId}/pacientes`, {
    params: { busca },
  });
  return response.data;
}

export async function getConsultasPacienteMedico(
  medicoId: number,
  pacienteId: number
): Promise<any[]> {
  const response = await api.get(
    `/medico/${medicoId}/pacientes/${pacienteId}/consultas`
  );
  return response.data;
}
