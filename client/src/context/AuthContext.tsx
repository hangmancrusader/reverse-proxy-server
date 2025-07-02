import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type AuthContextType = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setIsAuthenticated(true)
  }, [])

  const login = () => setIsAuthenticated(true)
  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
