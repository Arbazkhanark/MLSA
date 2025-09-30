// "use client"

// import AuthGuard from "@/components/admin/auth-guard"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Users, Calendar, FileText, BarChart3, TrendingUp, Eye, UserPlus, CalendarPlus } from "lucide-react"

// // Mock data
// const dashboardStats = {
//   totalMembers: 45,
//   activeEvents: 8,
//   pendingApplications: 23,
//   totalResources: 67,
//   monthlyGrowth: {
//     members: 12,
//     events: 3,
//     applications: 15,
//     resources: 5,
//   },
// }

// const recentApplications = [
//   { id: 1, name: "John Doe", position: "Frontend Developer", date: "2024-03-20", status: "pending" },
//   { id: 2, name: "Jane Smith", position: "UI/UX Designer", date: "2024-03-19", status: "approved" },
//   { id: 3, name: "Mike Johnson", position: "Backend Developer", date: "2024-03-18", status: "pending" },
//   { id: 4, name: "Sarah Wilson", position: "Data Scientist", date: "2024-03-17", status: "rejected" },
// ]

// const upcomingEvents = [
//   { id: 1, title: "React Workshop", date: "2024-04-15", attendees: 45, status: "published" },
//   { id: 2, title: "AI/ML Seminar", date: "2024-04-22", attendees: 32, status: "draft" },
//   { id: 3, title: "Hackathon 2024", date: "2024-05-01", attendees: 120, status: "published" },
// ]

// export default function AdminDashboard() {
//   return (
//     <AuthGuard>
//       <div className="space-y-6">
//         {/* Welcome Section */}
//         <div>
//           <h2 className="text-2xl font-bold">Welcome back, Admin!</h2>
//           <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your MLSA community today.</p>

//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card className="hover:shadow-lg transition-all duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Members</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{dashboardStats.totalMembers}</div>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{dashboardStats.monthlyGrowth.members}% from last
//                 month
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-all duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Events</CardTitle>
//               <Calendar className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{dashboardStats.activeEvents}</div>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
//                 {dashboardStats.monthlyGrowth.events} this month
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-all duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
//               <FileText className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{dashboardStats.pendingApplications}</div>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <TrendingUp className="h-3 w-3 mr-1 text-orange-500" />+{dashboardStats.monthlyGrowth.applications} new
//                 this week
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-all duration-300">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Resources</CardTitle>
//               <BarChart3 className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{dashboardStats.totalResources}</div>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{dashboardStats.monthlyGrowth.resources} this
//                 week
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Activity */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle>Recent Applications</CardTitle>
//                 <CardDescription>Latest hiring applications submitted</CardDescription>
//               </div>
//               <Button variant="outline" size="sm">
//                 <Eye className="h-4 w-4 mr-2" />
//                 View All
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentApplications.slice(0, 4).map((app) => (
//                   <div key={app.id} className="flex items-center justify-between">
//                     <div>
//                       <p className="font-medium">{app.name}</p>
//                       <p className="text-sm text-muted-foreground">{app.position}</p>
//                     </div>
//                     <Badge
//                       variant={
//                         app.status === "approved" ? "default" : app.status === "pending" ? "secondary" : "destructive"
//                       }
//                     >
//                       {app.status}
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle>Upcoming Events</CardTitle>
//                 <CardDescription>Events scheduled for this month</CardDescription>
//               </div>
//               <Button variant="outline" size="sm">
//                 <CalendarPlus className="h-4 w-4 mr-2" />
//                 Add Event
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {upcomingEvents.map((event) => (
//                   <div key={event.id} className="flex items-center justify-between">
//                     <div>
//                       <p className="font-medium">{event.title}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {event.date} • {event.attendees} attendees
//                       </p>
//                     </div>
//                     <Badge variant={event.status === "published" ? "default" : "secondary"}>{event.status}</Badge>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Quick Actions */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>Common administrative tasks</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Button className="h-20 flex-col gap-2">
//                 <UserPlus className="h-6 w-6" />
//                 Add Team Member
//               </Button>
//               <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
//                 <CalendarPlus className="h-6 w-6" />
//                 Create Event
//               </Button>
//               <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
//                 <FileText className="h-6 w-6" />
//                 Review Applications
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </AuthGuard>
//   )
// }

















"use client"

import AuthGuard from "@/components/admin/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar, FileText, BarChart3, TrendingUp, Eye, UserPlus, CalendarPlus, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface DashboardStats {
  totalMembers: number
  activeEvents: number
  pendingApplications: number
  totalResources: number
  monthlyGrowth: {
    members: number
    events: number
    applications: number
    resources: number
  }
}

interface Application {
  id: string
  name: string
  position: string
  date: string
  status: "pending" | "approved" | "rejected"
}

interface Event {
  id: string
  title: string
  date: string
  attendees: number
  status: "published" | "draft"
}

interface UserData {
  name: string
  email: string
  role: string
}

export default function AdminDashboard() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalMembers: 0,
    activeEvents: 0,
    pendingApplications: 0,
    totalResources: 0,
    monthlyGrowth: {
      members: 0,
      events: 0,
      applications: 0,
      resources: 0,
    },
  })
  const [recentApplications, setRecentApplications] = useState<Application[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem("adminUser")
    if (user) {
      setUserData(JSON.parse(user))
    }
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      // You'll need to create these API endpoints
      // For now, using mock data as placeholder
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Replace with actual API calls
      setDashboardStats({
        totalMembers: 45,
        activeEvents: 8,
        pendingApplications: 23,
        totalResources: 67,
        monthlyGrowth: {
          members: 12,
          events: 3,
          applications: 15,
          resources: 5,
        },
      })

      setRecentApplications([
        { id: "1", name: "John Doe", position: "Frontend Developer", date: "2024-03-20", status: "pending" },
        { id: "2", name: "Jane Smith", position: "UI/UX Designer", date: "2024-03-19", status: "approved" },
        { id: "3", name: "Mike Johnson", position: "Backend Developer", date: "2024-03-18", status: "pending" },
        { id: "4", name: "Sarah Wilson", position: "Data Scientist", date: "2024-03-17", status: "rejected" },
      ])

      setUpcomingEvents([
        { id: "1", title: "React Workshop", date: "2024-04-15", attendees: 45, status: "published" },
        { id: "2", title: "AI/ML Seminar", date: "2024-04-22", attendees: 32, status: "draft" },
        { id: "3", title: "Hackathon 2024", date: "2024-05-01", attendees: 120, status: "published" },
      ])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      const data = await response.json()

      if (data.success) {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminUser")
        toast.success("Logged out successfully")
        router.push("/admin/login")
      } else {
        toast.error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Logout error")
    }
  }

  return (
    <AuthGuard>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {userData?.name || "Admin"}!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your MLSA community today.
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalMembers}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{dashboardStats.monthlyGrowth.members}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.activeEvents}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                {dashboardStats.monthlyGrowth.events} this month
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.pendingApplications}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-orange-500" />
                +{dashboardStats.monthlyGrowth.applications} new this week
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resources</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalResources}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +{dashboardStats.monthlyGrowth.resources} this week
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest hiring applications submitted</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.slice(0, 4).map((app) => (
                  <div key={app.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-sm text-muted-foreground">{app.position}</p>
                    </div>
                    <Badge
                      variant={
                        app.status === "approved" ? "default" : app.status === "pending" ? "secondary" : "destructive"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Events scheduled for this month</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <CalendarPlus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date} • {event.attendees} attendees
                      </p>
                    </div>
                    <Badge variant={event.status === "published" ? "default" : "secondary"}>
                      {event.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col gap-2">
                <UserPlus className="h-6 w-6" />
                Add Team Member
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <CalendarPlus className="h-6 w-6" />
                Create Event
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <FileText className="h-6 w-6" />
                Review Applications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  )
}