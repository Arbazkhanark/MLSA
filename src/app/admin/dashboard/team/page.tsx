"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Plus, Edit, Trash2, Mail, Linkedin, Github, MapPin, Calendar } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  position: string
  email: string
  bio: string
  skills: string[]
  location: string
  joinDate: string
  status: "active" | "inactive"
  avatar: string
  social: {
    linkedin?: string
    github?: string
  }
}

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "President",
    position: "MLSA Team Lead",
    email: "sarah.chen@university.edu",
    bio: "Passionate about AI/ML and community building. Leading our chapter towards innovation.",
    skills: ["Python", "Machine Learning", "Leadership", "Azure"],
    location: "San Francisco, CA",
    joinDate: "2023-08-15",
    status: "active",
    avatar: "/professional-headshot-of-young-asian-tech-leader.jpg",
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
    },
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    role: "Vice President",
    position: "Technical Lead",
    email: "alex.rodriguez@university.edu",
    bio: "Full-stack developer with expertise in cloud technologies and modern web frameworks.",
    skills: ["React", "Node.js", "Azure", "TypeScript"],
    location: "Austin, TX",
    joinDate: "2023-09-01",
    status: "active",
    avatar: "/professional-headshot-of-young-woman-software-engi.jpg",
    social: {
      linkedin: "https://linkedin.com/in/alexrodriguez",
      github: "https://github.com/alexrodriguez",
    },
  },
]

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    position: "",
    email: "",
    bio: "",
    skills: "",
    location: "",
    status: "active" as "active" | "inactive",
    linkedin: "",
    github: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      position: "",
      email: "",
      bio: "",
      skills: "",
      location: "",
      status: "active",
      linkedin: "",
      github: "",
    })
  }

  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: formData.name,
      role: formData.role,
      position: formData.position,
      email: formData.email,
      bio: formData.bio,
      skills: formData.skills.split(",").map((s) => s.trim()),
      location: formData.location,
      joinDate: new Date().toISOString().split("T")[0],
      status: formData.status,
      avatar: "/placeholder.svg?height=100&width=100",
      social: {
        linkedin: formData.linkedin || undefined,
        github: formData.github || undefined,
      },
    }

    setTeamMembers([...teamMembers, newMember])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      position: member.position,
      email: member.email,
      bio: member.bio,
      skills: member.skills.join(", "),
      location: member.location,
      status: member.status,
      linkedin: member.social.linkedin || "",
      github: member.social.github || "",
    })
  }

  const handleUpdateMember = () => {
    if (!editingMember) return

    const updatedMember: TeamMember = {
      ...editingMember,
      name: formData.name,
      role: formData.role,
      position: formData.position,
      email: formData.email,
      bio: formData.bio,
      skills: formData.skills.split(",").map((s) => s.trim()),
      location: formData.location,
      status: formData.status,
      social: {
        linkedin: formData.linkedin || undefined,
        github: formData.github || undefined,
      },
    }

    setTeamMembers(teamMembers.map((member) => (member.id === editingMember.id ? updatedMember : member)))
    setEditingMember(null)
    resetForm()
  }

  const handleDeleteMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">Manage MLSA team members and their roles</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Add a new member to the MLSA team with their details and role.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="President">President</SelectItem>
                    <SelectItem value="Vice President">Vice President</SelectItem>
                    <SelectItem value="Technical Lead">Technical Lead</SelectItem>
                    <SelectItem value="Community Manager">Community Manager</SelectItem>
                    <SelectItem value="Content Creator">Content Creator</SelectItem>
                    <SelectItem value="Event Coordinator">Event Coordinator</SelectItem>
                    <SelectItem value="Outreach Coordinator">Outreach Coordinator</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., MLSA Team Lead"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief bio about the team member"
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Python, React, Azure, Leadership"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge>
                      <Button variant="outline" size="sm" onClick={() => handleEditMember(member)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteMember(member.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {member.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {member.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </div>
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 hover:text-primary" />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 hover:text-primary" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>Update team member details and role information.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="President">President</SelectItem>
                  <SelectItem value="Vice President">Vice President</SelectItem>
                  <SelectItem value="Technical Lead">Technical Lead</SelectItem>
                  <SelectItem value="Community Manager">Community Manager</SelectItem>
                  <SelectItem value="Content Creator">Content Creator</SelectItem>
                  <SelectItem value="Event Coordinator">Event Coordinator</SelectItem>
                  <SelectItem value="Outreach Coordinator">Outreach Coordinator</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-position">Position</Label>
              <Input
                id="edit-position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-bio">Bio</Label>
              <Textarea
                id="edit-bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-skills">Skills (comma-separated)</Label>
              <Input
                id="edit-skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-linkedin">LinkedIn URL</Label>
              <Input
                id="edit-linkedin"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-github">GitHub URL</Label>
              <Input
                id="edit-github"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingMember(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMember}>Update Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
