"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "mmp" | "assessor" | "auditor" | "admin" | "consultant"
  company?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  validateRole: (requiredRole: string) => boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("gsma-user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        // Invalid stored user data, clear it
        localStorage.removeItem("gsma-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: string) => {
    // Simulate API call
    const mockUser: User = {
      id: "1",
      name: "Demo User",
      email,
      role: role as User["role"],
      company: role === "mmp" ? "Demo Provider" : undefined,
    }

    setUser(mockUser)
    localStorage.setItem("gsma-user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("gsma-user")
  }

  const validateRole = (requiredRole: string): boolean => {
    if (!user) return false
    return user.role === requiredRole
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isLoading, 
        validateRole, 
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
