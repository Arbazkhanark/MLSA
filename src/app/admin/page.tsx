"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Calendar,
  FileText,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  UserPlus,
  CalendarPlus,
  Download,
  Upload,
} from "lucide-react"

// Mock data for demonstration
const dashboardStats = {
  totalMembers: 45,
  activeEvents: 8,
  pendingApplications: 23,
  totalResources: 67,
}

const recentApplications = [
  { id: 1, name: "John Doe", position: "Frontend Developer", date: "2024-03-20", status: "pending" },
  { id: 2, name: "Jane Smith", position: "UI/UX Designer", date: "2024-03-19", status: "approved" },
  { id: 3, name: "Mike Johnson", position: "Backend Developer", date: "2024-03-18", status: "pending" },
  { id: 4, name: "Sarah Wilson", position: "Data Scientist", date: "2024-03-17", status: "rejected" },
]

const upcomingEvents = [
  { id: 1, title: "React Workshop", date: "2024-04-15", attendees: 45, status: "published" },
  { id: 2, title: "AI/ML Seminar", date: "2024-04-22", attendees: 32, status: "draft" },
  { id: 3, title: "Hackathon 2024", date: "2024-05-01", attendees: 120, status: "published" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your MLSA community</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalMembers}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.activeEvents}</div>
                  <p className="text-xs text-muted-foreground">3 this month</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.pendingApplications}</div>
                  <p className="text-xs text-muted-foreground">Needs review</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resources</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalResources}</div>
                  <p className="text-xs text-muted-foreground">+5 this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest hiring applications submitted</CardDescription>
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
                            app.status === "approved"
                              ? "default"
                              : app.status === "pending"
                                ? "secondary"
                                : "destructive"
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
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events scheduled for this month</CardDescription>
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
                        <Badge variant={event.status === "published" ? "default" : "secondary"}>{event.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Team Management Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Team Management</h2>
                <p className="text-muted-foreground">Manage team members and their roles</p>
              </div>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Current active team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Alex Chen", role: "President", email: "alex@mlsa.com", status: "active" },
                    { name: "Sarah Johnson", role: "Vice President", email: "sarah@mlsa.com", status: "active" },
                    { name: "Mike Rodriguez", role: "Technical Lead", email: "mike@mlsa.com", status: "active" },
                    { name: "Emma Davis", role: "Content Manager", email: "emma@mlsa.com", status: "inactive" },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.role} • {member.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Management Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Events Management</h2>
                <p className="text-muted-foreground">Create and manage community events</p>
              </div>
              <Button>
                <CalendarPlus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "React Workshop",
                  date: "April 15, 2024",
                  attendees: 45,
                  status: "published",
                  description: "Advanced React concepts and hooks",
                },
                {
                  title: "AI/ML Seminar",
                  date: "April 22, 2024",
                  attendees: 32,
                  status: "draft",
                  description: "Introduction to machine learning",
                },
                {
                  title: "Hackathon 2024",
                  date: "May 1-2, 2024",
                  attendees: 120,
                  status: "published",
                  description: "48-hour coding competition",
                },
              ].map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant={event.status === "published" ? "default" : "secondary"}>{event.status}</Badge>
                    </div>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">📅 {event.date}</p>
                      <p className="text-sm text-muted-foreground">👥 {event.attendees} registered</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Hiring Applications</h2>
                <p className="text-muted-foreground">Review and manage job applications</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Applications submitted in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {app.position} • Applied on {app.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            app.status === "approved"
                              ? "default"
                              : app.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {app.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                        {app.status === "pending" && (
                          <>
                            <Button size="sm" variant="default">
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Content Management</h2>
                <p className="text-muted-foreground">Manage resources, blog posts, and announcements</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Learning materials and guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">67</div>
                  <p className="text-sm text-muted-foreground mb-4">Total resources</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Manage Resources
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Happy Moments</CardTitle>
                  <CardDescription>Community memories and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">24</div>
                  <p className="text-sm text-muted-foreground mb-4">Published moments</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Add Moment
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>Important updates and news</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">12</div>
                  <p className="text-sm text-muted-foreground mb-4">Active announcements</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Create Announcement
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}





