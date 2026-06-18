import { create } from "zustand"

interface Usuario {
  id: number
  nome: string
  tipo_usuario: string
}

interface AuthState {
  user: Usuario | null
  isAuthenticated: boolean
  login: (user: Usuario) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => set({ user, isAuthenticated: true }),

  logout: () => set({ user: null, isAuthenticated: false }),
}))
