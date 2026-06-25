import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/src/stores/auth-store"
import api from "@/src/lib/api"

interface LoginData {
  identificador: string
  senha: string
}

interface RegisterData {
  nome: string
  senha: string
  tipo_usuario: string
  cpf?: string
  registro_profissional?: string
  especialidade?: string
  ubs_id?: number
}

export function useLogin() {
  const storeLogin = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await api.post("/login", data)
      return response.data
    },
    onSuccess: (data) => {
      if (data.token && data.usuario) {
        storeLogin(data.usuario, data.token)
      }
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await api.post("/usuarios", data)
      return response.data
    },
  })
}
