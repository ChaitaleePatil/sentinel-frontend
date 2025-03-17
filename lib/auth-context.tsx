"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api"

type User = {
  id: string
  name: string
  email: string
  role: "customer" | "shopkeeper"
  shopName?: string
  token: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  error: string | null
  customerLogin: (email: string, password: string) => Promise<void>
  customerSignup: (name: string, email: string, password: string) => Promise<void>
  shopkeeperLogin: (email: string, password: string) => Promise<void>
  shopkeeperSignup: (data: {
    name: string
    email: string
    password: string
    shopName: string
    address?: string
    services?: string[]
    location?: number[]
  }) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const customerLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.customerLogin({ email, password })

      if (response.error) {
        setError(response.error)
        return
      }

      const userData = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: "customer",
        token: response.token
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      router.push("/dashboard/customer")
    } catch (err) {
      setError("Failed to login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const customerSignup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await authApi.customerSignup({ name, email, password });
  
      if (response.data.error) {
        setError(response.data.error);
        return;
      }
  
      console.log("Signup successful:", response.data);
  
      const userData = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        role: "customer",
        token: response.data.token,
      };
  
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard/customer");
    } catch (err: any) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const shopkeeperLogin = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.shopkeeperLogin({ email, password })

      if (response.error) {
        setError(response.error)
        return
      }

      const userData = {
        id: response.id,
        name: response.name,
        email: response.email,
        role: "shopkeeper",
        shopName: response.shopName,
        token: response.token,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      router.push("/dashboard/shopkeeper")
    } catch (err) {
      setError("Failed to login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const shopkeeperSignup = async (data: {
    name: string
    email: string
    password: string
    shopName: string
    address?: string
    services?: string[]
    location?: number[]
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authApi.shopkeeperSignup(data)

      if (response.error) {
        setError(response.error)
        return
      }

      // const userData = {
      //   id: response.id,
      //   name: response.name,
      //   email: response.email,
      //   role: "shopkeeper",
      //   shopName: response.shopName,
      //   token: response.token,
      // }

      // setUser(userData)
      // localStorage.setItem("user", JSON.stringify(userData))
      router.push("/login")
    } catch (err) {
      setError("Failed to sign up. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        customerLogin,
        customerSignup,
        shopkeeperLogin,
        shopkeeperSignup,
        logout,
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

export function usePrintRequest() {
  const context = useContext();
  if (context === undefined) {
    throw new Error("usePrintRequest must be used within an printRequestProvider");
  }
  return context
}
