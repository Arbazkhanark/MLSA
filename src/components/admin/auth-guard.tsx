// "use client"

// import type React from "react"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Loader2 } from "lucide-react"

// interface AuthGuardProps {
//   children: React.ReactNode
// }

// export default function AuthGuard({ children }: AuthGuardProps) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("adminToken")
//       if (token === "authenticated") {
//         setIsAuthenticated(true)
//       } else {
//         router.push("/admin/login")
//       }
//       setIsLoading(false)
//     }

//     checkAuth()
//   }, [router])

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <Loader2 className="h-8 w-8 animate-spin mx-auto" />
//           <p className="text-muted-foreground">Verifying authentication...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return null
//   }

//   return <>{children}</>
// }


















// "use client"

// import type React from "react"
// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Loader2 } from "lucide-react"
// import { useAuth } from "@/context/use-auth"

// interface AuthGuardProps {
//   children: React.ReactNode
//   requireAdmin?: boolean
// }

// export default function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
//   const { user, loading, isAuthenticated, isAdmin, checkAuth } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!loading) {
//       if (!isAuthenticated) {
//         router.push("/admin/login")
//       } else if (requireAdmin && !isAdmin) {
//         router.push("/unauthorized")
//       }
//     }
//   }, [loading, isAuthenticated, isAdmin, requireAdmin, router])

//   // Refresh auth state on mount
//   useEffect(() => {
//     checkAuth()
//   }, [checkAuth])

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <Loader2 className="h-8 w-8 animate-spin mx-auto" />
//           <p className="text-muted-foreground">Verifying authentication...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!isAuthenticated || (requireAdmin && !isAdmin)) {
//     return null
//   }

//   return <>{children}</>
// }









"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/context/use-auth"

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const { user, loading, isAuthenticated, isAdmin, checkAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Redirect to admin login if not authenticated
        router.push("/admin/login")
      } else if (requireAdmin && !isAdmin) {
        // Redirect to unauthorized page if not admin but admin access required
        router.push("/unauthorized")
      }
    }
  }, [loading, isAuthenticated, isAdmin, requireAdmin, router])

  // Refresh auth state on component mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated or not admin when required
  if (!isAuthenticated || (requireAdmin && !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}