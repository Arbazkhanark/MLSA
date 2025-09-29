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
import { Plus, Edit, Trash2, ExternalLink, BookOpen, Video, FileText, Code, Star } from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  url: string
  type: "article" | "video" | "course" | "tool" | "documentation" | "tutorial"
  category:
    | "AI/ML"
    | "Web Development"
    | "Cloud Computing"
    | "Data Science"
    | "Mobile Development"
    | "DevOps"
    | "General"
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  author: string
  dateAdded: string
  featured: boolean
  rating: number
  views: number
}

const initialResources: Resource[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning with Python",
    description: "Comprehensive guide covering the basics of machine learning using Python and scikit-learn.",
    url: "https://example.com/ml-python-guide",
    type: "tutorial",
    category: "AI/ML",
    difficulty: "beginner",
    tags: ["Python", "Machine Learning", "scikit-learn", "Data Science"],
    author: "Sarah Chen",
    dateAdded: "2024-01-15",
    featured: true,
    rating: 4.8,
    views: 1250,
  },
  {
    id: "2",
    title: "Azure Fundamentals Learning Path",
    description: "Microsoft's official learning path for Azure cloud fundamentals certification.",
    url: "https://docs.microsoft.com/learn/paths/azure-fundamentals/",
    type: "course",
    category: "Cloud Computing",
    difficulty: "beginner",
    tags: ["Azure", "Cloud", "Certification", "Microsoft"],
    author: "Microsoft Learn",
    dateAdded: "2024-01-10",
    featured: true,
    rating: 4.9,
    views: 2100,
  },
  {
    id: "3",
    title: "React Development Tools",
    description: "Essential tools and extensions for React development productivity.",
    url: "https://example.com/react-tools",
    type: "tool",
    category: "Web Development",
    difficulty: "intermediate",
    tags: ["React", "JavaScript", "Development Tools", "Productivity"],
    author: "Alex Rodriguez",
    dateAdded: "2024-01-08",
    featured: false,
    rating: 4.6,
    views: 890,
  },
]

export default function ResourcesManagementPage() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    type: "article" as Resource["type"],
    category: "General" as Resource["category"],
    difficulty: "beginner" as Resource["difficulty"],
    tags: "",
    author: "",
    featured: false,
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      url: "",
      type: "article",
      category: "General",
      difficulty: "beginner",
      tags: "",
      author: "",
      featured: false,
    })
  }

  const handleAddResource = () => {
    const newResource: Resource = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      url: formData.url,
      type: formData.type,
      category: formData.category,
      difficulty: formData.difficulty,
      tags: formData.tags.split(",").map((t) => t.trim()),
      author: formData.author,
      dateAdded: new Date().toISOString().split("T")[0],
      featured: formData.featured,
      rating: 0,
      views: 0,
    }

    setResources([...resources, newResource])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource)
    setFormData({
      title: resource.title,
      description: resource.description,
      url: resource.url,
      type: resource.type,
      category: resource.category,
      difficulty: resource.difficulty,
      tags: resource.tags.join(", "),
      author: resource.author,
      featured: resource.featured,
    })
  }

  const handleUpdateResource = () => {
    if (!editingResource) return

    const updatedResource: Resource = {
      ...editingResource,
      title: formData.title,
      description: formData.description,
      url: formData.url,
      type: formData.type,
      category: formData.category,
      difficulty: formData.difficulty,
      tags: formData.tags.split(",").map((t) => t.trim()),
      author: formData.author,
      featured: formData.featured,
    }

    setResources(resources.map((resource) => (resource.id === editingResource.id ? updatedResource : resource)))
    setEditingResource(null)
    resetForm()
  }

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id))
  }

  const toggleFeatured = (id: string) => {
    setResources(
      resources.map((resource) => (resource.id === id ? { ...resource, featured: !resource.featured } : resource)),
    )
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "all" || resource.category === filterCategory
    const matchesType = filterType === "all" || resource.type === filterType
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeIcon = (type: Resource["type"]) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "course":
        return <BookOpen className="h-4 w-4" />
      case "tool":
        return <Code className="h-4 w-4" />
      case "documentation":
        return <FileText className="h-4 w-4" />
      case "tutorial":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: Resource["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Resources Management</h1>
          <p className="text-muted-foreground">Manage educational resources for MLSA community</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>Add a new educational resource for the community.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Resource title"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the resource"
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com/resource"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: Resource["type"]) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="tool">Tool</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: Resource["category"]) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: Resource["difficulty"]) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Resource author or creator"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Python, Machine Learning, Tutorial"
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
                <Label htmlFor="featured">Featured Resource</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddResource}>Add Resource</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search resources..."
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
            <SelectItem value="AI/ML">AI/ML</SelectItem>
            <SelectItem value="Web Development">Web Development</SelectItem>
            <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Mobile Development">Mobile Development</SelectItem>
            <SelectItem value="DevOps">DevOps</SelectItem>
            <SelectItem value="General">General</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="article">Article</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="course">Course</SelectItem>
            <SelectItem value="tool">Tool</SelectItem>
            <SelectItem value="documentation">Documentation</SelectItem>
            <SelectItem value="tutorial">Tutorial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{resource.title}</h3>
                    {resource.featured && (
                      <Badge variant="default" className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-3">{resource.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getTypeIcon(resource.type)}
                      {resource.type}
                    </Badge>
                    <Badge variant="outline">{resource.category}</Badge>
                    <Badge className={getDifficultyColor(resource.difficulty)}>{resource.difficulty}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>By {resource.author}</span>
                    <span>Added {new Date(resource.dateAdded).toLocaleDateString()}</span>
                    <span>★ {resource.rating.toFixed(1)}</span>
                    <span>{resource.views} views</span>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Resource
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant={resource.featured ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFeatured(resource.id)}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    {resource.featured ? "Featured" : "Feature"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEditResource(resource)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingResource} onOpenChange={() => setEditingResource(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
            <DialogDescription>Update resource information and details.</DialogDescription>
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
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-url">URL</Label>
              <Input
                id="edit-url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: Resource["type"]) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                  <SelectItem value="tool">Tool</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="tutorial">Tutorial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: Resource["category"]) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value: Resource["difficulty"]) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-author">Author</Label>
              <Input
                id="edit-author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
              <Label htmlFor="edit-featured">Featured Resource</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingResource(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateResource}>Update Resource</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
