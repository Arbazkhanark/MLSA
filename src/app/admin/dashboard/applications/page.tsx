"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Eye, CheckCircle, XCircle, Clock, Mail, Phone, Calendar, GraduationCap, FileText } from "lucide-react"

interface Application {
  id: string
  name: string
  email: string
  phone: string
  university: string
  major: string
  year: string
  gpa: string
  position: string
  experience: string
  skills: string[]
  motivation: string
  availability: string
  portfolio: string
  resume: string
  status: "pending" | "shortlisted" | "interviewed" | "accepted" | "rejected"
  appliedDate: string
  notes: string
  interviewDate?: string
  interviewScore?: number
}

const initialApplications: Application[] = [
  {
    id: "1",
    name: "Emily Johnson",
    email: "emily.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    university: "Stanford University",
    major: "Computer Science",
    year: "Junior",
    gpa: "3.8",
    position: "Technical Lead",
    experience: "2 years of web development, internship at Google",
    skills: ["React", "Python", "Machine Learning", "Azure"],
    motivation: "I'm passionate about AI/ML and want to help build a strong tech community on campus.",
    availability: "15-20 hours per week",
    portfolio: "https://emilyj.dev",
    resume: "emily_johnson_resume.pdf",
    status: "pending",
    appliedDate: "2024-01-15",
    notes: "",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@university.edu",
    phone: "+1 (555) 987-6543",
    university: "MIT",
    major: "Data Science",
    year: "Senior",
    gpa: "3.9",
    position: "Content Creator",
    experience: "Technical writing, YouTube channel with 10K subscribers",
    skills: ["Python", "Data Analysis", "Technical Writing", "Video Editing"],
    motivation: "I love explaining complex technical concepts in simple terms and want to create educational content.",
    availability: "10-15 hours per week",
    portfolio: "https://michaelchen.blog",
    resume: "michael_chen_resume.pdf",
    status: "shortlisted",
    appliedDate: "2024-01-12",
    notes: "Strong technical writing background, good communication skills",
    interviewDate: "2024-01-25",
    interviewScore: 8.5,
  },
]

export default function ApplicationsManagementPage() {
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPosition, setFilterPosition] = useState<string>("all")

  const handleStatusChange = (applicationId: string, newStatus: Application["status"]) => {
    setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app)))
  }

  const handleAddNotes = (applicationId: string, notes: string) => {
    setApplications(applications.map((app) => (app.id === applicationId ? { ...app, notes } : app)))
  }

  const handleScheduleInterview = (applicationId: string, interviewDate: string) => {
    setApplications(
      applications.map((app) => (app.id === applicationId ? { ...app, interviewDate, status: "interviewed" } : app)),
    )
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || app.status === filterStatus
    const matchesPosition = filterPosition === "all" || app.position === filterPosition
    return matchesSearch && matchesStatus && matchesPosition
  })

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return "default"
      case "shortlisted":
        return "secondary"
      case "interviewed":
        return "outline"
      case "accepted":
        return "default"
      case "rejected":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "shortlisted":
        return <Eye className="h-4 w-4" />
      case "interviewed":
        return <FileText className="h-4 w-4" />
      case "accepted":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const positions = [...new Set(applications.map((app) => app.position))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Applications Management</h1>
          <p className="text-muted-foreground">Review and manage MLSA team applications</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{applications.length} Total Applications</Badge>
          <Badge variant="default">{applications.filter((a) => a.status === "pending").length} Pending</Badge>
          <Badge variant="secondary">{applications.filter((a) => a.status === "shortlisted").length} Shortlisted</Badge>
        </div>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="interviewed">Interviewed</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPosition} onValueChange={setFilterPosition}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            {positions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredApplications.map((application) => (
          <Card key={application.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{application.name}</h3>
                    <Badge variant={getStatusColor(application.status)} className="flex items-center gap-1">
                      {getStatusIcon(application.status)}
                      {application.status}
                    </Badge>
                  </div>
                  <p className="text-primary font-medium mb-1">Applied for: {application.position}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {application.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {application.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {application.university}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Applied {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {application.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {application.major} • {application.year} • GPA: {application.gpa}
                  </p>
                  {application.notes && (
                    <div className="bg-muted p-3 rounded-lg mb-4">
                      <p className="text-sm">
                        <strong>Notes:</strong> {application.notes}
                      </p>
                    </div>
                  )}
                  {application.interviewDate && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <p className="text-sm">
                        <strong>Interview:</strong> {new Date(application.interviewDate).toLocaleDateString()}
                      </p>
                      {application.interviewScore && (
                        <p className="text-sm">
                          <strong>Score:</strong> {application.interviewScore}/10
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{application.name} - Application Details</DialogTitle>
                        <DialogDescription>Complete application information and review</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Personal Information</h4>
                            <div className="space-y-2 text-sm">
                              <p>
                                <strong>Name:</strong> {application.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {application.email}
                              </p>
                              <p>
                                <strong>Phone:</strong> {application.phone}
                              </p>
                              <p>
                                <strong>University:</strong> {application.university}
                              </p>
                              <p>
                                <strong>Major:</strong> {application.major}
                              </p>
                              <p>
                                <strong>Year:</strong> {application.year}
                              </p>
                              <p>
                                <strong>GPA:</strong> {application.gpa}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Application Details</h4>
                            <div className="space-y-2 text-sm">
                              <p>
                                <strong>Position:</strong> {application.position}
                              </p>
                              <p>
                                <strong>Availability:</strong> {application.availability}
                              </p>
                              <p>
                                <strong>Applied Date:</strong> {new Date(application.appliedDate).toLocaleDateString()}
                              </p>
                              <p>
                                <strong>Portfolio:</strong>
                                <a
                                  href={application.portfolio}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline ml-1"
                                >
                                  View Portfolio
                                </a>
                              </p>
                              <p>
                                <strong>Resume:</strong> {application.resume}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {application.skills.map((skill) => (
                              <Badge key={skill} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Experience</h4>
                          <p className="text-sm">{application.experience}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Motivation</h4>
                          <p className="text-sm">{application.motivation}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Select
                    value={application.status}
                    onValueChange={(value: Application["status"]) => handleStatusChange(application.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interviewed">Interviewed</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Add Notes
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Notes</DialogTitle>
                        <DialogDescription>Add internal notes about this application</DialogDescription>
                      </DialogHeader>
                      <Textarea
                        placeholder="Enter notes about the candidate..."
                        defaultValue={application.notes}
                        onChange={(e) => {
                          const notes = e.target.value
                          handleAddNotes(application.id, notes)
                        }}
                      />
                      <DialogFooter>
                        <Button>Save Notes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
