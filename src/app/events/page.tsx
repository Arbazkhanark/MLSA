"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, ExternalLink, Star, Trophy, Code, Presentation } from "lucide-react"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  capacity: number
  registered: number
  image: string
  registrationUrl: string
  tags: string[]
  featured?: boolean
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "AI/ML Workshop: Building Your First Neural Network",
    description:
      "Learn the fundamentals of neural networks and build your first AI model using Python and TensorFlow. Perfect for beginners!",
    date: "March 15, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Tech Hub, Room 301",
    type: "Workshop",
    capacity: 50,
    registered: 32,
    image: "/ai-ml-workshop-students-coding-neural-networks.jpg",
    registrationUrl: "https://forms.google.com/ai-ml-workshop",
    tags: ["AI/ML", "Python", "Beginner-Friendly"],
    featured: true,
  },
  {
    id: 2,
    title: "Microsoft Azure Cloud Fundamentals",
    description: "Get hands-on experience with Azure services and learn how to deploy applications to the cloud.",
    date: "March 22, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual Event",
    type: "Training",
    capacity: 100,
    registered: 67,
    image: "/microsoft-azure-cloud-training-session.jpg",
    registrationUrl: "https://forms.google.com/azure-fundamentals",
    tags: ["Azure", "Cloud", "Microsoft"],
    featured: true,
  },
  {
    id: 3,
    title: "Tech Career Panel: Industry Insights",
    description:
      "Join industry professionals as they share insights about tech careers, interview tips, and industry trends.",
    date: "March 28, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Main Auditorium",
    type: "Panel",
    capacity: 200,
    registered: 145,
    image: "/tech-career-panel-industry-professionals.jpg",
    registrationUrl: "https://forms.google.com/career-panel",
    tags: ["Career", "Networking", "Industry"],
  },
  {
    id: 4,
    title: "Hackathon 2025: Build for Good",
    description:
      "48-hour hackathon focused on creating solutions for social good. Prizes, mentorship, and networking opportunities!",
    date: "April 5-7, 2025",
    time: "Friday 6 PM - Sunday 6 PM",
    location: "Innovation Center",
    type: "Hackathon",
    capacity: 150,
    registered: 89,
    image: "/hackathon-2025-students-coding-together.jpg",
    registrationUrl: "https://forms.google.com/hackathon-2025",
    tags: ["Hackathon", "Competition", "Social Impact"],
    featured: true,
  },
]

const pastEvents: Event[] = [
  {
    id: 5,
    title: "Web Development Bootcamp",
    description: "Intensive 3-day bootcamp covering HTML, CSS, JavaScript, and React fundamentals.",
    date: "February 10-12, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Computer Lab A",
    type: "Bootcamp",
    capacity: 40,
    registered: 40,
    image: "/web-development-bootcamp-students-learning.jpg",
    registrationUrl: "",
    tags: ["Web Dev", "React", "JavaScript"],
  },
  {
    id: 6,
    title: "GitHub Workshop: Version Control Mastery",
    description: "Learn Git and GitHub from basics to advanced workflows. Collaborative coding made easy!",
    date: "January 25, 2025",
    time: "3:00 PM - 6:00 PM",
    location: "Tech Hub, Room 205",
    type: "Workshop",
    capacity: 60,
    registered: 55,
    image: "/github-workshop-version-control-coding.jpg",
    registrationUrl: "",
    tags: ["Git", "GitHub", "Version Control"],
  },
]

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const getEventTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "workshop":
        return <Code className="w-4 h-4" />
      case "hackathon":
        return <Trophy className="w-4 h-4" />
      case "panel":
        return <Presentation className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getRegistrationStatus = (capacity: number, registered: number) => {
    const percentage = (registered / capacity) * 100
    if (percentage >= 90) return { status: "Almost Full", color: "bg-red-500" }
    if (percentage >= 70) return { status: "Filling Fast", color: "bg-yellow-500" }
    return { status: "Available", color: "bg-green-500" }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Workshops</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our exciting events, workshops, and hackathons to learn, network, and grow your tech skills
          </p>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              {/* Featured Events */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-2" />
                  Featured Events
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {upcomingEvents
                    .filter((event) => event.featured)
                    .map((event) => (
                      <Card
                        key={event.id}
                        className="overflow-hidden group hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-yellow-500 text-yellow-50">Featured</Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="flex items-center">
                              {getEventTypeIcon(event.type)}
                              <span className="ml-1">{event.type}</span>
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed">{event.description}</p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-2" />
                              {event.date}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-2" />
                              {event.time}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-2" />
                              {event.location}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-sm">
                              <Users className="w-4 h-4 mr-2" />
                              {event.registered}/{event.capacity} registered
                            </div>
                            <div className="flex items-center">
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${getRegistrationStatus(event.capacity, event.registered).color}`}
                              />
                              <span className="text-sm">
                                {getRegistrationStatus(event.capacity, event.registered).status}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {event.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <Button className="w-full">
                            <a
                              href={event.registrationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              Register Now
                              <ExternalLink className="ml-2 w-4 h-4" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* All Upcoming Events */}
              <div>
                <h2 className="text-2xl font-bold mb-6">All Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs flex items-center">
                            {getEventTypeIcon(event.type)}
                            <span className="ml-1">{event.type}</span>
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>

                        <div className="space-y-1 mb-3 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="text-xs">
                            {event.registered}/{event.capacity} spots
                          </div>
                          <div
                            className={`w-2 h-2 rounded-full ${getRegistrationStatus(event.capacity, event.registered).color}`}
                          />
                        </div>

                        <Button size="sm" className="w-full">
                          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                            Register
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Past Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden opacity-75">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            Completed
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{event.description}</p>

                        <div className="space-y-1 mb-3 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {event.date}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {event.registered} attendees
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {event.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
