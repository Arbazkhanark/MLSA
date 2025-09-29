"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Plus, Edit, Trash2, Heart, Calendar, MapPin, Users, Star } from "lucide-react"

interface Moment {
  id: string
  title: string
  description: string
  date: string
  location: string
  category: "workshop" | "hackathon" | "meetup" | "celebration" | "achievement" | "community"
  image: string
  participants: string[]
  likes: number
  featured: boolean
  tags: string[]
  addedBy: string
  addedDate: string
}

const initialMoments: Moment[] = [
  {
    id: "1",
    title: "Hackathon Victory Celebration",
    description: "Our team won first place at the university hackathon! Amazing teamwork and innovative solutions.",
    date: "2024-01-20",
    location: "University Tech Hub",
    category: "achievement",
    image: "/students-celebrating-hackathon-victory-with-trophy.jpg",
    participants: ["Sarah Chen", "Alex Rodriguez", "Emily Johnson", "Michael Chen"],
    likes: 45,
    featured: true,
    tags: ["hackathon", "victory", "teamwork", "innovation"],
    addedBy: "Sarah Chen",
    addedDate: "2024-01-21",
  },
  {
    id: "2",
    title: "Azure Workshop Success",
    description:
      "Great turnout for our Azure fundamentals workshop. Students learned cloud deployment and got hands-on experience.",
    date: "2024-01-15",
    location: "Computer Lab 201",
    category: "workshop",
    image: "/students-learning-in-computer-lab-azure-workshop.jpg",
    participants: ["Alex Rodriguez", "Workshop Attendees"],
    likes: 32,
    featured: true,
    tags: ["azure", "cloud", "learning", "workshop"],
    addedBy: "Alex Rodriguez",
    addedDate: "2024-01-16",
  },
  {
    id: "3",
    title: "Late Night Coding Session",
    description:
      "Pizza-fueled coding session working on our open source project. Great collaboration and problem-solving!",
    date: "2024-01-10",
    location: "MLSA Study Room",
    category: "community",
    image: "/students-coding-together-at-night-with-pizza.jpg",
    participants: ["Team Members"],
    likes: 28,
    featured: false,
    tags: ["coding", "collaboration", "opensource", "community"],
    addedBy: "Emily Johnson",
    addedDate: "2024-01-11",
  },
]

export default function MomentsManagementPage() {
  const [moments, setMoments] = useState<Moment[]>(initialMoments)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingMoment, setEditingMoment] = useState<Moment | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "community" as Moment["category"],
    participants: "",
    tags: "",
    featured: false,
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      category: "community",
      participants: "",
      tags: "",
      featured: false,
    })
  }

  const handleAddMoment = () => {
    const newMoment: Moment = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      category: formData.category,
      image: "/placeholder.svg?height=300&width=400",
      participants: formData.participants.split(",").map((p) => p.trim()),
      likes: 0,
      featured: formData.featured,
      tags: formData.tags.split(",").map((t) => t.trim()),
      addedBy: "Admin",
      addedDate: new Date().toISOString().split("T")[0],
    }

    setMoments([...moments, newMoment])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditMoment = (moment: Moment) => {
    setEditingMoment(moment)
    setFormData({
      title: moment.title,
      description: moment.description,
      date: moment.date,
      location: moment.location,
      category: moment.category,
      participants: moment.participants.join(", "),
      tags: moment.tags.join(", "),
      featured: moment.featured,
    })
  }

  const handleUpdateMoment = () => {
    if (!editingMoment) return

    const updatedMoment: Moment = {
      ...editingMoment,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      category: formData.category,
      participants: formData.participants.split(",").map((p) => p.trim()),
      tags: formData.tags.split(",").map((t) => t.trim()),
      featured: formData.featured,
    }

    setMoments(moments.map((moment) => (moment.id === editingMoment.id ? updatedMoment : moment)))
    setEditingMoment(null)
    resetForm()
  }

  const handleDeleteMoment = (id: string) => {
    setMoments(moments.filter((moment) => moment.id !== id))
  }

  const toggleFeatured = (id: string) => {
    setMoments(moments.map((moment) => (moment.id === id ? { ...moment, featured: !moment.featured } : moment)))
  }

  const filteredMoments = moments.filter((moment) => {
    const matchesSearch =
      moment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moment.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "all" || moment.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: Moment["category"]) => {
    switch (category) {
      case "workshop":
        return "bg-blue-100 text-blue-800"
      case "hackathon":
        return "bg-purple-100 text-purple-800"
      case "meetup":
        return "bg-green-100 text-green-800"
      case "celebration":
        return "bg-yellow-100 text-yellow-800"
      case "achievement":
        return "bg-red-100 text-red-800"
      case "community":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Happy Moments Management</h1>
          <p className="text-muted-foreground">Manage and showcase MLSA community memories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Moment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Happy Moment</DialogTitle>
              <DialogDescription>Share a memorable moment from the MLSA community.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Moment title"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this happy moment"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Event location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: Moment["category"]) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="meetup">Meetup</SelectItem>
                    <SelectItem value="celebration">Celebration</SelectItem>
                    <SelectItem value="achievement">Achievement</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">Participants (comma-separated)</Label>
                <Input
                  id="participants"
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                  placeholder="Sarah Chen, Alex Rodriguez"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="hackathon, teamwork, victory"
                />
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="featured">Featured Moment</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMoment}>Add Moment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search moments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
            <SelectItem value="hackathon">Hackathon</SelectItem>
            <SelectItem value="meetup">Meetup</SelectItem>
            <SelectItem value="celebration">Celebration</SelectItem>
            <SelectItem value="achievement">Achievement</SelectItem>
            <SelectItem value="community">Community</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMoments.map((moment) => (
          <Card key={moment.id} className="overflow-hidden">
            <div className="relative">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${moment.image})` }} />
              {moment.featured && (
                <Badge className="absolute top-2 right-2 flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-2">{moment.title}</h3>
                <div className="flex gap-1 ml-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditMoment(moment)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteMoment(moment.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{moment.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(moment.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {moment.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {moment.participants.length} participants
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <Badge className={getCategoryColor(moment.category)}>{moment.category}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4 text-red-500" />
                  {moment.likes}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {moment.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {moment.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{moment.tags.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Added by {moment.addedBy}</span>
                <Button
                  variant={moment.featured ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFeatured(moment.id)}
                >
                  <Star className="h-3 w-3 mr-1" />
                  {moment.featured ? "Featured" : "Feature"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingMoment} onOpenChange={() => setEditingMoment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Happy Moment</DialogTitle>
            <DialogDescription>Update moment details and information.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: Moment["category"]) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="meetup">Meetup</SelectItem>
                  <SelectItem value="celebration">Celebration</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-participants">Participants (comma-separated)</Label>
              <Input
                id="edit-participants"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
              <Input
                id="edit-tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
            <div className="col-span-2 flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="edit-featured">Featured Moment</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingMoment(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMoment}>Update Moment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
