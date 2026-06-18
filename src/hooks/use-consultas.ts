import { useMutation } from "@tanstack/react-query"
import api from "@/src/lib/api"

interface AgendarData {
  paciente_id: number
  data_hora: string
}

export function useAgendarConsulta() {
  return useMutation({
    mutationFn: async (data: AgendarData) => {
      const response = await api.post("/consultas/agendar", data)
      return response.data
    },
  })
}

export function useCancelarConsulta() {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.put(`/consultas/${id}/cancelar`)
      return response.data
    },
  })
}
