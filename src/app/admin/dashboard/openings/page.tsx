"use client"

import useSWR from "swr"
import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Search, X, Calendar, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

type Opening = {
  _id: string
  title: string
  description: string
  requirements: string[]
  responsibilities: string[]
  qualifications: string[]
  skills: string[]
  type: "full-time" | "part-time" | "internship" | "volunteer"
  category: "technical" | "non-technical" | "leadership" | "creative"
  location: string
  deadline: string
  status: "active" | "inactive" | "draft"
  maxApplications: number
  currentApplications: number
  createdAt: string
  updatedAt: string
}

const fetcher = (url: string) => fetch(url, {
  credentials: "include"
}).then((r) => r.json())

export default function AdminOpeningsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Opening | null>(null)
  const [requirementsInput, setRequirementsInput] = useState("")
  const [responsibilitiesInput, setResponsibilitiesInput] = useState("")
  const [qualificationsInput, setQualificationsInput] = useState("")
  const [skillsInput, setSkillsInput] = useState("")

  // Build query parameters for API call
  const buildQueryParams = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (filterStatus !== 'all') params.append('status', filterStatus)
    if (filterType !== 'all') params.append('type', filterType)
    if (filterCategory !== 'all') params.append('category', filterCategory)
    return params.toString()
  }

  const { data, mutate, isLoading } = useSWR<{ data: Opening[], total: number }>(
    `/api/admin/opening?${buildQueryParams()}`,
    fetcher
  )

  const filteredOpenings = data?.data || []

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setEditing(null)
      setRequirementsInput("")
      setResponsibilitiesInput("")
      setQualificationsInput("")
      setSkillsInput("")
    }
  }, [open])

  const openEdit = (opening?: Opening) => {
    setEditing(opening || null)
    if (opening) {
      setRequirementsInput(opening.requirements?.join("\n") || "")
      setResponsibilitiesInput(opening.responsibilities?.join("\n") || "")
      setQualificationsInput(opening.qualifications?.join("\n") || "")
      setSkillsInput(opening.skills?.join(", ") || "")
    }
    setOpen(true)
  }

  async function handleSave(form: FormData) {
    const payload = {
      title: form.get("title") as string,
      description: form.get("description") as string,
      requirements: requirementsInput.split("\n").filter(line => line.trim()),
      responsibilities: responsibilitiesInput.split("\n").filter(line => line.trim()),
      qualifications: qualificationsInput.split("\n").filter(line => line.trim()),
      skills: skillsInput.split(",").map(skill => skill.trim()).filter(skill => skill),
      type: form.get("type") as Opening["type"],
      category: form.get("category") as Opening["category"],
      location: form.get("location") as string,
      deadline: form.get("deadline") as string,
      status: form.get("status") as Opening["status"],
      maxApplications: parseInt(form.get("maxApplications") as string) || 50,
    }

    try {
      if (editing) {
        const res = await fetch(`/api/admin/opening/${editing._id}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        })

        const result = await res.json()
        if (!res.ok) throw new Error(result.message || "Failed to update opening")
        toast.success("Opening updated successfully")
      } else {
        const res = await fetch("/api/admin/opening", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        })

        const result = await res.json()
        if (!res.ok) throw new Error(result.message || "Failed to create opening")
        toast.success("Opening created successfully")
      }
      
      await mutate()
      setOpen(false)
    } catch (e: any) {
      toast.error(e.message || "An error occurred")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this opening?")) return
    
    try {
      const res = await fetch(`/api/admin/opening/${id}`, { 
        method: "DELETE",
        credentials: "include"
      })
      
      if (!res.ok) {
        throw new Error("Delete failed")
      }
      
      toast.success("Opening deleted successfully")
      mutate()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete opening")
    }
  }

  const getStatusColor = (status: Opening["status"]) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "draft":
        return "outline"
      default:
        return "default"
    }
  }

  const getTypeColor = (type: Opening["type"]) => {
    switch (type) {
      case "full-time":
        return "bg-blue-100 text-blue-800"
      case "part-time":
        return "bg-green-100 text-green-800"
      case "internship":
        return "bg-purple-100 text-purple-800"
      case "volunteer":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: Opening["category"]) => {
    switch (category) {
      case "technical":
        return "bg-red-100 text-red-800"
      case "non-technical":
        return "bg-green-100 text-green-800"
      case "leadership":
        return "bg-blue-100 text-blue-800"
      case "creative":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Openings Management</CardTitle>
            <CardDescription>Manage job and volunteer openings for MLSA community</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openEdit(undefined)}>
                <Plus className="h-4 w-4 mr-2" /> New Opening
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Opening" : "Create New Opening"}</DialogTitle>
              </DialogHeader>
              <form
                id="opening-form"
                action={async (fd) => handleSave(fd)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="col-span-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    defaultValue={editing?.title || ""} 
                    required 
                    placeholder="e.g., Technical Lead"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editing?.description || ""}
                    required
                    rows={4}
                    placeholder="Detailed description of the opening..."
                  />
                </div>

                <div className="col-span-1">
                  <Label>Type *</Label>
                  <Select name="type" defaultValue={editing?.type || "part-time"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label>Category *</Label>
                  <Select name="category" defaultValue={editing?.category || "technical"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="non-technical">Non-technical</SelectItem>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label htmlFor="location">Location *</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    defaultValue={editing?.location || ""} 
                    required 
                    placeholder="e.g., Remote, Hybrid, On-site"
                  />
                </div>

                <div className="col-span-1">
                  <Label htmlFor="deadline">Deadline *</Label>
                  <Input 
                    type="date" 
                    id="deadline" 
                    name="deadline" 
                    defaultValue={editing?.deadline || ""} 
                    required 
                  />
                </div>

                <div className="col-span-1">
                  <Label>Status *</Label>
                  <Select name="status" defaultValue={editing?.status || "active"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1">
                  <Label htmlFor="maxApplications">Max Applications *</Label>
                  <Input 
                    type="number" 
                    id="maxApplications" 
                    name="maxApplications" 
                    defaultValue={editing?.maxApplications || 50} 
                    required 
                    min="1"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="requirements">Requirements (one per line) *</Label>
                  <Textarea
                    id="requirements"
                    value={requirementsInput}
                    onChange={(e) => setRequirementsInput(e.target.value)}
                    rows={4}
                    placeholder="Enter each requirement on a new line..."
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="responsibilities">Responsibilities (one per line) *</Label>
                  <Textarea
                    id="responsibilities"
                    value={responsibilitiesInput}
                    onChange={(e) => setResponsibilitiesInput(e.target.value)}
                    rows={4}
                    placeholder="Enter each responsibility on a new line..."
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="qualifications">Qualifications (one per line) *</Label>
                  <Textarea
                    id="qualifications"
                    value={qualificationsInput}
                    onChange={(e) => setQualificationsInput(e.target.value)}
                    rows={4}
                    placeholder="Enter each qualification on a new line..."
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="skills">Skills (comma separated) *</Label>
                  <Input
                    id="skills"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    placeholder="React, Node.js, Leadership, Communication..."
                  />
                </div>
              </form>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button form="opening-form" type="submit">
                  {editing ? "Update Opening" : "Create Opening"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" />
              <Input
                className="pl-8"
                placeholder="Search openings by title, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="non-technical">Non-technical</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>

            {(searchTerm || filterStatus !== 'all' || filterType !== 'all' || filterCategory !== 'all') && (
              <Button variant="outline" onClick={() => {
                setSearchTerm("")
                setFilterStatus("all")
                setFilterType("all")
                setFilterCategory("all")
              }}>
                <X className="h-4 w-4 mr-2" /> Clear
              </Button>
            )}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading openings...
                    </TableCell>
                  </TableRow>
                )}
                
                {!isLoading && filteredOpenings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      {searchTerm || filterStatus !== 'all' || filterType !== 'all' || filterCategory !== 'all' 
                        ? "No openings match your filters." 
                        : "No openings found. Create your first opening!"}
                    </TableCell>
                  </TableRow>
                )}
                
                {filteredOpenings.map((opening) => (
                  <TableRow key={opening._id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{opening.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {opening.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(opening.type)}>
                        {opening.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(opening.category)}>
                        {opening.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {opening.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {opening.currentApplications} / {opening.maxApplications}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(opening.deadline).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(opening.status)}>
                        {opening.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(opening)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(opening._id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {!isLoading && data?.total && (
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredOpenings.length} of {data.total} openings
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}