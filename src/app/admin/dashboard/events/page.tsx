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
import { Plus, Edit, Trash2, Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: "workshop" | "webinar" | "hackathon" | "meetup" | "conference"
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  maxAttendees: number
  currentAttendees: number
  registrationUrl: string
  image: string
  tags: string[]
  organizer: string
}

const initialEvents: Event[] = [
  {
    id: "1",
    title: "AI/ML Workshop: Building Neural Networks",
    description: "Hands-on workshop covering the fundamentals of neural networks using Python and TensorFlow.",
    date: "2024-02-15",
    time: "14:00",
    location: "Computer Science Building, Room 101",
    type: "workshop",
    status: "upcoming",
    maxAttendees: 50,
    currentAttendees: 32,
    registrationUrl: "https://forms.google.com/ai-ml-workshop",
    image: "/ai-ml-workshop-students-coding-neural-networks.jpg",
    tags: ["AI", "Machine Learning", "Python", "TensorFlow"],
    organizer: "Sarah Chen",
  },
  {
    id: "2",
    title: "Azure Cloud Fundamentals",
    description: "Introduction to Microsoft Azure cloud services and deployment strategies.",
    date: "2024-02-20",
    time: "18:00",
    location: "Virtual Event",
    type: "webinar",
    status: "upcoming",
    maxAttendees: 100,
    currentAttendees: 67,
    registrationUrl: "https://forms.google.com/azure-fundamentals",
    image: "/students-learning-in-computer-lab-azure-workshop.jpg",
    tags: ["Azure", "Cloud Computing", "DevOps"],
    organizer: "Alex Rodriguez",
  },
]

export default function EventsManagementPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "workshop" as Event["type"],
    status: "upcoming" as Event["status"],
    maxAttendees: "",
    registrationUrl: "",
    tags: "",
    organizer: "",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      type: "workshop",
      status: "upcoming",
      maxAttendees: "",
      registrationUrl: "",
      tags: "",
      organizer: "",
    })
  }

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      type: formData.type,
      status: formData.status,
      maxAttendees: Number.parseInt(formData.maxAttendees),
      currentAttendees: 0,
      registrationUrl: formData.registrationUrl,
      image: "/placeholder.svg?height=200&width=400",
      tags: formData.tags.split(",").map((t) => t.trim()),
      organizer: formData.organizer,
    }

    setEvents([...events, newEvent])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      status: event.status,
      maxAttendees: event.maxAttendees.toString(),
      registrationUrl: event.registrationUrl,
      tags: event.tags.join(", "),
      organizer: event.organizer,
    })
  }

  const handleUpdateEvent = () => {
    if (!editingEvent) return

    const updatedEvent: Event = {
      ...editingEvent,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      type: formData.type,
      status: formData.status,
      maxAttendees: Number.parseInt(formData.maxAttendees),
      registrationUrl: formData.registrationUrl,
      tags: formData.tags.split(",").map((t) => t.trim()),
      organizer: formData.organizer,
    }

    setEvents(events.map((event) => (event.id === editingEvent.id ? updatedEvent : event)))
    setEditingEvent(null)
    resetForm()
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "upcoming":
        return "default"
      case "ongoing":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  const getTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "workshop":
        return "bg-blue-100 text-blue-800"
      case "webinar":
        return "bg-green-100 text-green-800"
      case "hackathon":
        return "bg-purple-100 text-purple-800"
      case "meetup":
        return "bg-orange-100 text-orange-800"
      case "conference":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">Create and manage MLSA community events</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Add a new event for the MLSA community.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Event description"
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
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Event location or 'Virtual Event'"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Event Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: Event["type"]) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="meetup">Meetup</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Event["status"]) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                  placeholder="Maximum number of attendees"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizer">Organizer</Label>
                <Input
                  id="organizer"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  placeholder="Event organizer name"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="registrationUrl">Registration URL</Label>
                <Input
                  id="registrationUrl"
                  value={formData.registrationUrl}
                  onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                  placeholder="Google Form or registration link"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="AI, Machine Learning, Python"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Create Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search events..."
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
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div
                  className="w-32 h-24 bg-muted rounded-lg flex-shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(event.status)}>{event.status}</Badge>
                      <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                      <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {event.currentAttendees}/{event.maxAttendees}
                    </div>
                    <div className="flex items-center gap-1">Organizer: {event.organizer}</div>
                    {event.registrationUrl && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Registration
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
      <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>Update event details and information.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-title">Event Title</Label>
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
              <Label htmlFor="edit-time">Time</Label>
              <Input
                id="edit-time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Event Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: Event["type"]) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="meetup">Meetup</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Event["status"]) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-maxAttendees">Max Attendees</Label>
              <Input
                id="edit-maxAttendees"
                type="number"
                value={formData.maxAttendees}
                onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-organizer">Organizer</Label>
              <Input
                id="edit-organizer"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="edit-registrationUrl">Registration URL</Label>
              <Input
                id="edit-registrationUrl"
                value={formData.registrationUrl}
                onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingEvent(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateEvent}>Update Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
