"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Calendar, Users, Award, Camera, Share2, Filter } from "lucide-react"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"

const moments = [
  {
    id: 1,
    title: "First Hackathon Victory!",
    description: "Our team won first place at the Inter-College Hackathon with our AI-powered study assistant app.",
    date: "2024-03-15",
    category: "Achievement",
    image: "/students-celebrating-hackathon-victory-with-trophy.jpg",
    likes: 124,
    participants: ["Alex", "Sarah", "Mike", "Emma"],
  },
  {
    id: 2,
    title: "Microsoft Azure Workshop Success",
    description: "Over 200 students attended our Azure fundamentals workshop, with 95% completion rate!",
    date: "2024-02-28",
    category: "Workshop",
    image: "/students-learning-in-computer-lab-azure-workshop.jpg",
    likes: 89,
    participants: ["Workshop Team", "200+ Students"],
  },
  {
    id: 3,
    title: "Community Coding Night",
    description: "Late-night coding session turned into an amazing collaboration with pizza and great conversations.",
    date: "2024-02-14",
    category: "Community",
    image: "/students-coding-together-at-night-with-pizza.jpg",
    likes: 156,
    participants: ["Dev Team", "Community Members"],
  },
  {
    id: 4,
    title: "Guest Speaker: Microsoft Engineer",
    description: "Inspiring talk from a Microsoft senior engineer about career paths in tech and innovation.",
    date: "2024-01-20",
    category: "Speaker Event",
    image: "/professional-speaker-presenting-to-students-in-aud.jpg",
    likes: 203,
    participants: ["Guest Speaker", "150+ Attendees"],
  },
  {
    id: 5,
    title: "Team Building Retreat",
    description: "Amazing weekend retreat where we bonded as a team and planned exciting projects for the semester.",
    date: "2024-01-10",
    category: "Team Building",
    image: "/students-team-building-activities-outdoor-retreat.jpg",
    likes: 178,
    participants: ["Core Team", "Volunteers"],
  },
  {
    id: 6,
    title: "Open Source Contribution Drive",
    description: "Successfully contributed to 15+ open source projects during our month-long contribution challenge.",
    date: "2023-12-15",
    category: "Open Source",
    image: "/students-working-on-laptops-open-source-coding.jpg",
    likes: 92,
    participants: ["Contributors", "Mentors"],
  },
]

const categories = ["All", "Achievement", "Workshop", "Community", "Speaker Event", "Team Building", "Open Source"]

export default function HappyMomentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [likedMoments, setLikedMoments] = useState<number[]>([])

  const filteredMoments = moments.filter((moment) => selectedCategory === "All" || moment.category === selectedCategory)

  const handleLike = (momentId: number) => {
    setLikedMoments((prev) => (prev.includes(momentId) ? prev.filter((id) => id !== momentId) : [...prev, momentId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <Navigation />
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Happy Moments
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
              Celebrating our journey, achievements, and the memories we've created together
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                <Filter className="h-3 w-3 mr-1" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Moments Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMoments.map((moment, index) => (
              <Card
                key={moment.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up border-border/50 hover:border-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={moment.image || "/placeholder.svg"}
                    alt={moment.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {moment.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                      onClick={() => handleLike(moment.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${likedMoments.includes(moment.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                      <span className="ml-1 text-xs">{moment.likes + (likedMoments.includes(moment.id) ? 1 : 0)}</span>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{moment.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{moment.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(moment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {moment.participants.length > 2
                        ? `${moment.participants.length}+ people`
                        : moment.participants.join(", ")}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {moment.participants.slice(0, 3).map((participant, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground border-2 border-background"
                        >
                          {participant.charAt(0)}
                        </div>
                      ))}
                      {moment.participants.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold border-2 border-background">
                          +{moment.participants.length - 3}
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey in Numbers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every moment counts in building our amazing tech community
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, label: "Achievements", value: "25+", color: "text-yellow-500" },
              { icon: Users, label: "Active Members", value: "150+", color: "text-blue-500" },
              { icon: Camera, label: "Memories Captured", value: "500+", color: "text-green-500" },
              { icon: Heart, label: "Total Likes", value: "1.2K+", color: "text-red-500" },
            ].map((stat, index) => (
              <Card
                key={stat.label}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Memory Wall */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Memory Wall</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Quick snapshots of our favorite moments</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img
                  src={`/happy-students-tech-community-moment-.jpg?height=200&width=200&query=happy students tech community moment ${i + 1}`}
                  alt={`Memory ${i + 1}`}
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
