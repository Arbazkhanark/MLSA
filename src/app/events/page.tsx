"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, ExternalLink, Star, Trophy, Code, Presentation } from "lucide-react"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"
import useSWR from "swr"

interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: "workshop" | "hackathon" | "training" | "panel" | "bootcamp" | "seminar"
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  maxAttendees: number
  currentAttendees: number
  image: string
  registrationUrl: string
  tags: string[]
  organizer: string
  featured?: boolean
  createdAt: string
  updatedAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])

  // Fetch upcoming events
  const { data: upcomingData, error: upcomingError, isLoading: upcomingLoading } = useSWR<{ data: Event[], total: number }>(
    '/api/admin/event?status=upcoming',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  // Fetch past events (completed)
  const { data: pastData, error: pastError, isLoading: pastLoading } = useSWR<{ data: Event[], total: number }>(
    '/api/admin/event?status=completed',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  useEffect(() => {
    if (upcomingData?.data) {
      const events = upcomingData.data
      setUpcomingEvents(events)
      
      // Mark events as featured based on certain criteria (e.g., high attendance, recent, etc.)
      const featured = events
        .filter(event => 
          event.currentAttendees > event.maxAttendees * 0.7 || 
          event.tags.includes('AI') || 
          event.tags.includes('Hackathon') ||
          event.type === 'hackathon'
        )
        .slice(0, 3) // Limit to 3 featured events
      
      setFeaturedEvents(featured)
    }

    if (pastData?.data) {
      setPastEvents(pastData.data)
    }
  }, [upcomingData, pastData])

  const getEventTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "workshop":
        return <Code className="w-4 h-4" />
      case "hackathon":
        return <Trophy className="w-4 h-4" />
      case "panel":
        return <Presentation className="w-4 h-4" />
      case "training":
        return <Users className="w-4 h-4" />
      case "bootcamp":
        return <Code className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getEventTypeDisplayName = (type: string) => {
    switch (type.toLowerCase()) {
      case "workshop": return "Workshop"
      case "hackathon": return "Hackathon"
      case "panel": return "Panel"
      case "training": return "Training"
      case "bootcamp": return "Bootcamp"
      case "seminar": return "Seminar"
      default: return type
    }
  }

  const getRegistrationStatus = (maxAttendees: number, currentAttendees: number) => {
    const percentage = (currentAttendees / maxAttendees) * 100
    if (percentage >= 90) return { status: "Almost Full", color: "bg-red-500" }
    if (percentage >= 70) return { status: "Filling Fast", color: "bg-yellow-500" }
    return { status: "Available", color: "bg-green-500" }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    // Assuming time is in HH:MM format
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const isEventSoon = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays >= 0
  }

  if (upcomingError || pastError) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-8">
              Unable to load events at the moment. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
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
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground mt-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {upcomingLoading ? "Loading..." : `${upcomingEvents.length} Upcoming Events`}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              {pastLoading ? "Loading..." : `${pastEvents.length} Past Events`}
            </div>
          </div>
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
              {featuredEvents.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Star className="w-6 h-6 text-yellow-500 mr-2" />
                    Featured Events
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredEvents.map((event) => (
                      <Card
                        key={event._id}
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
                              <span className="ml-1">{getEventTypeDisplayName(event.type)}</span>
                            </Badge>
                          </div>
                          {isEventSoon(event.date) && (
                            <div className="absolute bottom-4 left-4">
                              <Badge variant="destructive" className="animate-pulse">
                                Coming Soon
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed">{event.description}</p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-2" />
                              {formatDate(event.date)}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-2" />
                              {formatTime(event.time)}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-2" />
                              {event.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="w-4 h-4 mr-2" />
                              Organized by {event.organizer}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center text-sm">
                              <Users className="w-4 h-4 mr-2" />
                              {event.currentAttendees}/{event.maxAttendees} registered
                            </div>
                            <div className="flex items-center">
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${getRegistrationStatus(event.maxAttendees, event.currentAttendees).color}`}
                              />
                              <span className="text-sm">
                                {getRegistrationStatus(event.maxAttendees, event.currentAttendees).status}
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
              )}

              {/* All Upcoming Events */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  All Upcoming Events {upcomingLoading && "(Loading...)"}
                </h2>
                
                {upcomingLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading events...</p>
                  </div>
                ) : upcomingEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
                    <p className="text-muted-foreground">
                      Check back later for new events and workshops.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event) => (
                      <Card key={event._id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="relative">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="text-xs flex items-center">
                              {getEventTypeIcon(event.type)}
                              <span className="ml-1">{getEventTypeDisplayName(event.type)}</span>
                            </Badge>
                          </div>
                          {isEventSoon(event.date) && (
                            <div className="absolute top-2 left-2">
                              <Badge variant="destructive" className="text-xs animate-pulse">
                                Soon
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-2">{event.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>

                          <div className="space-y-1 mb-3 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(event.date)}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {event.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {event.organizer}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <div className="text-xs">
                              {event.currentAttendees}/{event.maxAttendees} spots
                            </div>
                            <div
                              className={`w-2 h-2 rounded-full ${getRegistrationStatus(event.maxAttendees, event.currentAttendees).color}`}
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
                )}
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Past Events {pastLoading && "(Loading...)"}
                </h2>
                
                {pastLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading past events...</p>
                  </div>
                ) : pastEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Past Events</h3>
                    <p className="text-muted-foreground">
                      No past events to display yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((event) => (
                      <Card key={event._id} className="overflow-hidden opacity-75">
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
                              {formatDate(event.date)}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {event.currentAttendees} attendees
                            </div>
                            <div className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {event.organizer}
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
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}