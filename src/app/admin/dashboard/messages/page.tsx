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
import { Eye, Reply, Trash2, Mail, Phone, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  category: "general" | "technical" | "event" | "partnership" | "feedback" | "complaint"
  priority: "low" | "medium" | "high" | "urgent"
  status: "unread" | "read" | "replied" | "resolved" | "archived"
  receivedDate: string
  repliedDate?: string
  reply?: string
  repliedBy?: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    name: "Jessica Williams",
    email: "jessica.williams@student.edu",
    phone: "+1 (555) 234-5678",
    subject: "Question about upcoming AI Workshop",
    message:
      "Hi! I'm really interested in the upcoming AI/ML workshop. Could you please provide more details about the prerequisites and what we'll be covering? Also, is there a registration fee?",
    category: "event",
    priority: "medium",
    status: "unread",
    receivedDate: "2024-01-22T10:30:00Z",
  },
  {
    id: "2",
    name: "David Chen",
    email: "david.chen@company.com",
    subject: "Partnership Opportunity",
    message:
      "Hello MLSA team, I represent TechCorp and we're interested in partnering with your organization for upcoming events. We'd like to discuss sponsorship opportunities and potential collaboration on workshops. Please let me know the best way to proceed.",
    category: "partnership",
    priority: "high",
    status: "read",
    receivedDate: "2024-01-21T14:15:00Z",
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@university.edu",
    phone: "+1 (555) 987-1234",
    subject: "Great Azure Workshop!",
    message:
      "I wanted to thank you for the excellent Azure workshop last week. The content was very well structured and the hands-on exercises were really helpful. Looking forward to more workshops like this!",
    category: "feedback",
    priority: "low",
    status: "replied",
    receivedDate: "2024-01-20T16:45:00Z",
    repliedDate: "2024-01-21T09:00:00Z",
    reply:
      "Thank you so much for your positive feedback, Maria! We're thrilled that you found the Azure workshop helpful. We have more workshops planned for the coming months. Stay tuned to our events page for updates!",
    repliedBy: "Sarah Chen",
  },
]

export default function MessagesManagementPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [replyText, setReplyText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  const handleStatusChange = (messageId: string, newStatus: Message["status"]) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, status: newStatus } : msg)))
  }

  const handleReply = (message: Message) => {
    setReplyingTo(message)
    setReplyText("")
  }

  const handleSendReply = () => {
    if (!replyingTo || !replyText.trim()) return

    const updatedMessage: Message = {
      ...replyingTo,
      status: "replied",
      reply: replyText,
      repliedDate: new Date().toISOString(),
      repliedBy: "Admin",
    }

    setMessages(messages.map((msg) => (msg.id === replyingTo.id ? updatedMessage : msg)))
    setReplyingTo(null)
    setReplyText("")
  }

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id))
  }

  const markAsRead = (messageId: string) => {
    setMessages(
      messages.map((msg) => (msg.id === messageId && msg.status === "unread" ? { ...msg, status: "read" } : msg)),
    )
  }

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || msg.status === filterStatus
    const matchesCategory = filterCategory === "all" || msg.category === filterCategory
    const matchesPriority = filterPriority === "all" || msg.priority === filterPriority
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })

  const getStatusColor = (status: Message["status"]) => {
    switch (status) {
      case "unread":
        return "default"
      case "read":
        return "secondary"
      case "replied":
        return "outline"
      case "resolved":
        return "default"
      case "archived":
        return "secondary"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: Message["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: Message["category"]) => {
    switch (category) {
      case "general":
        return "bg-blue-100 text-blue-800"
      case "technical":
        return "bg-purple-100 text-purple-800"
      case "event":
        return "bg-green-100 text-green-800"
      case "partnership":
        return "bg-orange-100 text-orange-800"
      case "feedback":
        return "bg-pink-100 text-pink-800"
      case "complaint":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "unread":
        return <AlertCircle className="h-4 w-4" />
      case "read":
        return <Eye className="h-4 w-4" />
      case "replied":
        return <Reply className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "archived":
        return <Clock className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Messages Management</h1>
          <p className="text-muted-foreground">Manage contact messages and inquiries</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{messages.length} Total Messages</Badge>
          <Badge variant="default">{messages.filter((m) => m.status === "unread").length} Unread</Badge>
          <Badge variant="secondary">{messages.filter((m) => m.status === "replied").length} Replied</Badge>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search messages..."
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
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="event">Event</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
            <SelectItem value="feedback">Feedback</SelectItem>
            <SelectItem value="complaint">Complaint</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredMessages.map((message) => (
          <Card key={message.id} className={message.status === "unread" ? "border-primary" : ""}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{message.subject}</h3>
                    <Badge variant={getStatusColor(message.status)} className="flex items-center gap-1">
                      {getStatusIcon(message.status)}
                      {message.status}
                    </Badge>
                    <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                    <Badge className={getCategoryColor(message.category)}>{message.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {message.name} ({message.email})
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {message.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(message.receivedDate).toLocaleDateString()} at{" "}
                      {new Date(message.receivedDate).toLocaleTimeString()}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{message.message}</p>
                  {message.reply && (
                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Reply className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Reply from {message.repliedBy}</span>
                        <span className="text-xs text-muted-foreground">
                          {message.repliedDate && new Date(message.repliedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{message.reply}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedMessage(message)
                          markAsRead(message.id)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{message.subject}</DialogTitle>
                        <DialogDescription>Message from {message.name}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>From:</strong> {message.name}
                          </div>
                          <div>
                            <strong>Email:</strong> {message.email}
                          </div>
                          {message.phone && (
                            <div>
                              <strong>Phone:</strong> {message.phone}
                            </div>
                          )}
                          <div>
                            <strong>Category:</strong> {message.category}
                          </div>
                          <div>
                            <strong>Priority:</strong> {message.priority}
                          </div>
                          <div>
                            <strong>Status:</strong> {message.status}
                          </div>
                          <div>
                            <strong>Received:</strong> {new Date(message.receivedDate).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <strong>Message:</strong>
                          <p className="mt-2 p-3 bg-muted rounded-lg">{message.message}</p>
                        </div>
                        {message.reply && (
                          <div>
                            <strong>Reply:</strong>
                            <p className="mt-2 p-3 bg-primary/10 rounded-lg">{message.reply}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Replied by {message.repliedBy} on{" "}
                              {message.repliedDate && new Date(message.repliedDate).toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReply(message)}
                    disabled={message.status === "replied"}
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Select
                    value={message.status}
                    onValueChange={(value: Message["status"]) => handleStatusChange(message.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteMessage(message.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Dialog */}
      <Dialog open={!!replyingTo} onOpenChange={() => setReplyingTo(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>
              Replying to {replyingTo?.name} - {replyingTo?.subject}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Original Message:</strong>
              </p>
              <p className="text-sm mt-1">{replyingTo?.message}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reply">Your Reply</Label>
              <Textarea
                id="reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyingTo(null)}>
              Cancel
            </Button>
            <Button onClick={handleSendReply} disabled={!replyText.trim()}>
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
