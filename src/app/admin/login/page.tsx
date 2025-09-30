// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Eye, EyeOff, Shield, AlertCircle } from "lucide-react"

// // Dummy credentials for demo
// const ADMIN_CREDENTIALS = {
//   username: "admin@mlsa.com",
//   password: "MLSA2024@Admin",
// }

// export default function AdminLogin() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")

//     // Simulate API call delay
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
//       // Store auth token in localStorage (in production, use secure httpOnly cookies)
//       localStorage.setItem("adminToken", "authenticated")
//       router.push("/admin/dashboard")
//     } else {
//       setError("Invalid credentials. Please check your username and password.")
//     }

//     setIsLoading(false)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
//       <div className="w-full max-w-md space-y-6">
//         {/* Header */}
//         <div className="text-center space-y-2">
//           <div className="flex justify-center">
//             <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
//               <Shield className="h-8 w-8 text-primary-foreground" />
//             </div>
//           </div>
//           <h1 className="text-2xl font-bold">Admin Login</h1>
//           <p className="text-muted-foreground">Access the MLSA admin dashboard</p>
//         </div>

//         {/* Demo Credentials Card */}
//         <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm flex items-center gap-2">
//               <AlertCircle className="h-4 w-4" />
//               Demo Credentials
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2 text-sm">
//             <div>
//               <strong>Username:</strong> admin@mlsa.com
//             </div>
//             <div>
//               <strong>Password:</strong> MLSA2024@Admin
//             </div>
//           </CardContent>
//         </Card>

//         {/* Login Form */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Sign In</CardTitle>
//             <CardDescription>Enter your credentials to access the admin panel</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleLogin} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="username">Username / Email</Label>
//                 <Input
//                   id="username"
//                   type="email"
//                   placeholder="admin@mlsa.com"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </Button>
//                 </div>
//               </div>

//               {error && (
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Signing in..." : "Sign In"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         <div className="text-center text-sm text-muted-foreground">
//           <p>Protected by MLSA Security</p>
//         </div>
//       </div>
//     </div>
//   )
// }



















"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, AlertCircle } from "lucide-react"
import { useAuth } from "@/context/use-auth"
import { toast } from "sonner"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, loading } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const result = await login(email, password)
    
    if (result.success && result.data?.role === "admin") {
      router.push("/admin/dashboard")
    } else if (result.success && result.data?.role !== "admin") {
      setError("Access denied. Admin privileges required.")
      toast.error("Access denied. Admin privileges required.")
    } else {
      setError(result.error || "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground">Access the MLSA admin dashboard</p>
        </div>

        {/* Demo Credentials Card */}
        <Card className="border-dashed border-2 border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Demo Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <strong>Email:</strong> postmanadmin@test.com
            </div>
            <div>
              <strong>Password:</strong> postman123
            </div>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="postmanadmin@test.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Protected by MLSA Security</p>
        </div>
      </div>
    </div>
  )
}