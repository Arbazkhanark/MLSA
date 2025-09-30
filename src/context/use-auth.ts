// // contexts/AuthContext.tsx
// "use client"

// import type React from "react"
// import { createContext, useContext, useState, useEffect } from "react"
// import { toast } from "sonner"

// interface User {
//   id: string
//   name: string
//   email: string
//   role: "admin" | "writer" | "editor" | "user"
//   profileImage?: string
//   bio?: string
//   socialLinks?: {
//     twitter?: string
//     facebook?: string
//     instagram?: string
//     linkedin?: string
//   }
//   isActive: boolean
//   lastLogin?: Date
//   createdAt: Date
//   updatedAt: Date
// }

// interface AuthContextType {
//   user: User | null
//   token: string | null
//   login: (email: string, password: string) => Promise<boolean>
//   register: (userData: RegisterData) => Promise<boolean>
//   logout: () => Promise<void>
//   checkAuth: () => Promise<boolean>
//   isLoading: boolean
//   isAuthenticated: boolean
// }

// interface RegisterData {
//   name: string
//   email: string
//   password: string
//   role?: "admin" | "writer" | "editor" | "user"
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [token, setToken] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   // Check if user is authenticated on mount
//   useEffect(() => {
//     checkAuth()
//   }, [])

//   const checkAuth = async (): Promise<boolean> => {
//     try {
//       setIsLoading(true)
//       const response = await fetch("/api/auth/me", {
//         method: "GET",
//         credentials: "include", // Important for cookies
//       })

//       const data = await response.json()

//       if (data.success && data.data) {
//         setUser(data.data)
//         // Note: Token is stored in httpOnly cookie, not in state
//         return true
//       } else {
//         setUser(null)
//         setToken(null)
//         return false
//       }
//     } catch (error) {
//       console.error("Auth check error:", error)
//       setUser(null)
//       setToken(null)
//       return false
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const login = async (email: string, password: string): Promise<boolean> => {
//     try {
//       setIsLoading(true)
      
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // Important for cookies
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await response.json()

//       if (data.success) {
//         setUser(data.data)
//         setToken(data.data.token)
//         toast.success("Login successful!")
//         return true
//       } else {
//         toast.error(data.message || "Login failed")
//         return false
//       }
//     } catch (error) {
//       console.error("Login error:", error)
//       toast.error("An error occurred during login")
//       return false
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const register = async (userData: RegisterData): Promise<boolean> => {
//     try {
//       setIsLoading(true)
      
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // Important for cookies
//         body: JSON.stringify(userData),
//       })

//       const data = await response.json()

//       if (data.success) {
//         setUser(data.data)
//         setToken(data.data.token)
//         toast.success("Registration successful!")
//         return true
//       } else {
//         toast.error(data.message || "Registration failed")
//         return false
//       }
//     } catch (error) {
//       console.error("Registration error:", error)
//       toast.error("An error occurred during registration")
//       return false
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const logout = async (): Promise<void> => {
//     try {
//       setIsLoading(true)
      
//       await fetch("/api/auth/logout", {
//         method: "POST",
//         credentials: "include", // Important for cookies
//       })

//       setUser(null)
//       setToken(null)
//       toast.success("Logged out successfully")
//     } catch (error) {
//       console.error("Logout error:", error)
//       toast.error("An error occurred during logout")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const value: AuthContextType = {
//     user,
//     token,
//     login,
//     register,
//     logout,
//     checkAuth,
//     isLoading,
//     isAuthenticated: !!user,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }











// // hooks/useAuth.ts
// "use client"
// import { useState, useEffect } from "react"
// import { toast } from "sonner"

// interface User {
//   id: string
//   name: string
//   email: string
//   role: string
//   profileImage?: string
//   token?: string
//   bio?: string
//   socialLinks?: {
//     twitter?: string
//     facebook?: string
//     instagram?: string
//     linkedin?: string
//   }
//   isActive: boolean
//   lastLogin?: string
//   createdAt: string
//   updatedAt: string
// }

// interface AuthState {
//   user: User | null
//   loading: boolean
//   error: string | null
// }

// export function useAuth() {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     loading: true,
//     error: null,
//   })

//   useEffect(() => {
//     checkAuth()
//   }, [])

//   const checkAuth = async () => {
//     try {
//       const authToken = localStorage.getItem("auth-token")
//       const adminToken = localStorage.getItem("admin-token")
      
//       if (!authToken && !adminToken) {
//         setAuthState({ user: null, loading: false, error: null })
//         return
//       }

//       const token = adminToken || authToken
//       const response = await fetch("/api/auth/me", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (response.ok) {
//         const data = await response.json()
//         if (data.success && data.data) {
//           setAuthState({ user: data.data, loading: false, error: null })
//         } else {
//           localStorage.removeItem("auth-token")
//           localStorage.removeItem("admin-token")
//           setAuthState({ user: null, loading: false, error: null })
//         }
//       } else {
//         localStorage.removeItem("auth-token")
//         localStorage.removeItem("admin-token")
//         setAuthState({ user: null, loading: false, error: null })
//       }
//     } catch (error) {
//       localStorage.removeItem("auth-token")
//       localStorage.removeItem("admin-token")
//       setAuthState({ user: null, loading: false, error: "Failed to check authentication" })
//     }
//   }

//   const login = async (email: string, password: string, role: string = "user") => {
//     try {
//       setAuthState((prev) => ({ ...prev, loading: true, error: null }))

//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json" 
//         },
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await response.json()

//       if (response.ok && data.success) {
//         const token = data.data?.token
//         const userData = data.data
        
//         if (token) {
//           if (userData.role === "admin") {
//             localStorage.setItem("admin-token", token)
//             localStorage.setItem("adminUser", JSON.stringify(userData))
//           } else {
//             localStorage.setItem("auth-token", token)
//             localStorage.setItem("user", JSON.stringify(userData))
//           }
//         }

//         setAuthState({ user: userData, loading: false, error: null })
//         toast.success(`Welcome back, ${userData.name}!`)
//         return { success: true, data: userData }
//       } else {
//         setAuthState({ user: null, loading: false, error: data.message || "Login failed" })
//         toast.error(data.message || "Invalid credentials")
//         return { success: false, error: data.message || "Login failed" }
//       }
//     } catch (error) {
//       const errorMessage = "Login failed. Please try again."
//       setAuthState({ user: null, loading: false, error: errorMessage })
//       toast.error(errorMessage)
//       return { success: false, error: errorMessage }
//     }
//   }

//   const register = async (name: string, email: string, password: string, role: string = "writer") => {
//     try {
//       setAuthState((prev) => ({ ...prev, loading: true, error: null }))

//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, role }),
//       })

//       const data = await response.json()

//       if (response.ok && data.success) {
//         const token = data.data?.token
//         const userData = data.data
        
//         if (token) {
//           if (userData.role === "admin") {
//             localStorage.setItem("admin-token", token)
//             localStorage.setItem("adminUser", JSON.stringify(userData))
//           } else {
//             localStorage.setItem("auth-token", token)
//             localStorage.setItem("user", JSON.stringify(userData))
//           }
//         }

//         setAuthState({ user: userData, loading: false, error: null })
//         toast.success(`Welcome, ${userData.name}!`)
//         return { success: true, data: userData }
//       } else {
//         setAuthState({ user: null, loading: false, error: data.message || "Registration failed" })
//         toast.error(data.message || "Registration failed")
//         return { success: false, error: data.message || "Registration failed" }
//       }
//     } catch (error) {
//       const errorMessage = "Registration failed. Please try again."
//       setAuthState({ user: null, loading: false, error: errorMessage })
//       toast.error(errorMessage)
//       return { success: false, error: errorMessage }
//     }
//   }

//   const logout = async () => {
//     try {
//       const authToken = localStorage.getItem("auth-token")
//       const adminToken = localStorage.getItem("admin-token")
      
//       if (authToken || adminToken) {
//         await fetch("/api/auth/logout", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${adminToken || authToken}`,
//           },
//         })
//       }
      
//       // Clear all auth-related localStorage items
//       localStorage.removeItem("auth-token")
//       localStorage.removeItem("admin-token")
//       localStorage.removeItem("user")
//       localStorage.removeItem("adminUser")
      
//       setAuthState({ user: null, loading: false, error: null })
//       toast.success("You have been successfully logged out.")
//     } catch (error) {
//       console.error("Logout error:", error)
//       // Even if logout API fails, clear local state
//       localStorage.removeItem("auth-token")
//       localStorage.removeItem("admin-token")
//       localStorage.removeItem("user")
//       localStorage.removeItem("adminUser")
//       setAuthState({ user: null, loading: false, error: null })
//       toast.success("You have been successfully logged out.")
//     }
//   }

//   // Helper function to check if user is admin
//   const isAdmin = () => {
//     return authState.user?.role === "admin"
//   }

//   // Helper function to check if user is authenticated
//   const isAuthenticated = () => {
//     return !!authState.user
//   }

//   return {
//     ...authState,
//     login,
//     register,
//     logout,
//     checkAuth,
//     isAdmin: isAdmin(),
//     isAuthenticated: isAuthenticated(),
//   }
// }














// // hooks/useAuth.ts
// "use client"
// import { useState, useEffect } from "react"
// import { toast } from "sonner"

// interface User {
//   id: string
//   name: string
//   email: string
//   role: string
//   profileImage?: string
//   bio?: string
//   socialLinks?: {
//     twitter?: string
//     facebook?: string
//     instagram?: string
//     linkedin?: string
//   }
//   isActive: boolean
//   lastLogin?: string
//   createdAt: string
//   updatedAt: string
// }

// interface AuthState {
//   user: User | null
//   loading: boolean
//   error: string | null
// }

// export function useAuth() {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     loading: true,
//     error: null,
//   })

//   useEffect(() => {
//     checkAuth()
//   }, [])

//   const checkAuth = async () => {
//     try {
//       const response = await fetch("/api/auth/me", {
//         method: "GET",
//         credentials: "include", // Important for cookies
//       })

//       if (response.ok) {
//         const data = await response.json()
//         if (data.success && data.data) {
//           setAuthState({ user: data.data, loading: false, error: null })
//           // Store user data in localStorage for quick access (but not tokens)
//           localStorage.setItem("user", JSON.stringify(data.data))
//         } else {
//           localStorage.removeItem("user")
//           setAuthState({ user: null, loading: false, error: null })
//         }
//       } else {
//         localStorage.removeItem("user")
//         setAuthState({ user: null, loading: false, error: null })
//       }
//     } catch (error) {
//       localStorage.removeItem("user")
//       setAuthState({ user: null, loading: false, error: "Failed to check authentication" })
//     }
//   }

//   const login = async (email: string, password: string) => {
//     try {
//       setAuthState((prev) => ({ ...prev, loading: true, error: null }))

//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json" 
//         },
//         credentials: "include", // Important for cookies
//         body: JSON.stringify({ email, password }),
//       })

//       const data = await response.json()

//       if (response.ok && data.success) {
//         const userData = data.data
//         // Store user data in localStorage for quick access (but not tokens)
//         localStorage.setItem("user", JSON.stringify(userData))
        
//         setAuthState({ user: userData, loading: false, error: null })
//         toast.success(`Welcome back, ${userData.name}!`)
//         return { success: true, data: userData }
//       } else {
//         setAuthState({ user: null, loading: false, error: data.message || "Login failed" })
//         toast.error(data.message || "Invalid credentials")
//         return { success: false, error: data.message || "Login failed" }
//       }
//     } catch (error) {
//       const errorMessage = "Login failed. Please try again."
//       setAuthState({ user: null, loading: false, error: errorMessage })
//       toast.error(errorMessage)
//       return { success: false, error: errorMessage }
//     }
//   }

//   const register = async (name: string, email: string, password: string, role: string = "writer") => {
//     try {
//       setAuthState((prev) => ({ ...prev, loading: true, error: null }))

//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // Important for cookies
//         body: JSON.stringify({ name, email, password, role }),
//       })

//       const data = await response.json()

//       if (response.ok && data.success) {
//         const userData = data.data
//         localStorage.setItem("user", JSON.stringify(userData))
        
//         setAuthState({ user: userData, loading: false, error: null })
//         toast.success(`Welcome, ${userData.name}!`)
//         return { success: true, data: userData }
//       } else {
//         setAuthState({ user: null, loading: false, error: data.message || "Registration failed" })
//         toast.error(data.message || "Registration failed")
//         return { success: false, error: data.message || "Registration failed" }
//       }
//     } catch (error) {
//       const errorMessage = "Registration failed. Please try again."
//       setAuthState({ user: null, loading: false, error: errorMessage })
//       toast.error(errorMessage)
//       return { success: false, error: errorMessage }
//     }
//   }

//   const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", {
//         method: "POST",
//         credentials: "include", // Important for cookies
//       })
      
//       // Clear user data from localStorage
//       localStorage.removeItem("user")
//       setAuthState({ user: null, loading: false, error: null })
//       toast.success("You have been successfully logged out.")
//     } catch (error) {
//       console.error("Logout error:", error)
//       // Even if logout API fails, clear local state
//       localStorage.removeItem("user")
//       setAuthState({ user: null, loading: false, error: null })
//       toast.success("You have been successfully logged out.")
//     }
//   }

//   // Helper function to check if user is admin
//   const isAdmin = () => {
//     return authState.user?.role === "admin"
//   }

//   // Helper function to check if user is authenticated
//   const isAuthenticated = () => {
//     return !!authState.user
//   }

//   return {
//     ...authState,
//     login,
//     register,
//     logout,
//     checkAuth,
//     isAdmin: isAdmin(),
//     isAuthenticated: isAuthenticated(),
//   }
// }












// hooks/useAuth.ts
"use client"
import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  role: string
  profileImage?: string
  bio?: string
  socialLinks?: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  isActive: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  // Memoize checkAuth to prevent infinite re-renders
  const checkAuth = useCallback(async () => {
    try {
      // Check if we already have user data in localStorage to avoid unnecessary API calls
      const cachedUser = localStorage.getItem("user")
      if (cachedUser) {
        const userData = JSON.parse(cachedUser)
        setAuthState(prev => ({ ...prev, user: userData, loading: false }))
        return
      }

      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setAuthState({ user: data.data, loading: false, error: null })
          localStorage.setItem("user", JSON.stringify(data.data))
        } else {
          localStorage.removeItem("user")
          setAuthState({ user: null, loading: false, error: null })
        }
      } else {
        localStorage.removeItem("user")
        setAuthState({ user: null, loading: false, error: null })
      }
    } catch (error) {
      localStorage.removeItem("user")
      setAuthState({ user: null, loading: false, error: "Failed to check authentication" })
    }
  }, [])

  // Run checkAuth only once on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const userData = data.data
        localStorage.setItem("user", JSON.stringify(userData))
        
        setAuthState({ user: userData, loading: false, error: null })
        toast.success(`Welcome back, ${userData.name}!`)
        return { success: true, data: userData }
      } else {
        setAuthState({ user: null, loading: false, error: data.message || "Login failed" })
        toast.error(data.message || "Invalid credentials")
        return { success: false, error: data.message || "Login failed" }
      }
    } catch (error) {
      const errorMessage = "Login failed. Please try again."
      setAuthState({ user: null, loading: false, error: errorMessage })
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const register = async (name: string, email: string, password: string, role: string = "writer") => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const userData = data.data
        localStorage.setItem("user", JSON.stringify(userData))
        
        setAuthState({ user: userData, loading: false, error: null })
        toast.success(`Welcome, ${userData.name}!`)
        return { success: true, data: userData }
      } else {
        setAuthState({ user: null, loading: false, error: data.message || "Registration failed" })
        toast.error(data.message || "Registration failed")
        return { success: false, error: data.message || "Registration failed" }
      }
    } catch (error) {
      const errorMessage = "Registration failed. Please try again."
      setAuthState({ user: null, loading: false, error: errorMessage })
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Logout API error:", error)
    } finally {
      // Always clear local state even if API call fails
      localStorage.removeItem("user")
      setAuthState({ user: null, loading: false, error: null })
      toast.success("You have been successfully logged out.")
    }
  }

  const isAdmin = authState.user?.role === "admin"
  const isAuthenticated = !!authState.user

  return {
    ...authState,
    login,
    register,
    logout,
    checkAuth,
    isAdmin,
    isAuthenticated,
  }
}