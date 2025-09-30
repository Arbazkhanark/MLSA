"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Users, CheckCircle, ArrowRight, Calendar, Briefcase } from "lucide-react"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"
import useSWR from "swr"
import { useState, useEffect } from "react"

interface Opening {
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

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function HiringPage() {
  const [activeOpenings, setActiveOpenings] = useState<Opening[]>([])
  
  // Fetch only active openings for the public hiring page
  const { data, error, isLoading } = useSWR<{ data: Opening[], total: number }>(
    '/api/admin/opening?status=active',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  useEffect(() => {
    if (data?.data) {
      setActiveOpenings(data.data)
    }
  }, [data])

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Check if deadline is approaching (within 7 days)
  const isDeadlineApproaching = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays >= 0
  }

  // Get type display name
  const getTypeDisplayName = (type: Opening["type"]) => {
    switch (type) {
      case "full-time": return "Full-time"
      case "part-time": return "Part-time"
      case "internship": return "Internship"
      case "volunteer": return "Volunteer"
      default: return type
    }
  }

  // Get category display name
  const getCategoryDisplayName = (category: Opening["category"]) => {
    switch (category) {
      case "technical": return "Technical"
      case "non-technical": return "Non-technical"
      case "leadership": return "Leadership"
      case "creative": return "Creative"
      default: return category
    }
  }

  // Get badge color based on type
  const getTypeBadgeVariant = (type: Opening["type"]) => {
    switch (type) {
      case "full-time": return "default"
      case "part-time": return "secondary"
      case "internship": return "outline"
      case "volunteer": return "destructive"
      default: return "outline"
    }
  }

  // Get badge color based on category
  const getCategoryBadgeVariant = (category: Opening["category"]) => {
    switch (category) {
      case "technical": return "default"
      case "non-technical": return "secondary"
      case "leadership": return "destructive"
      case "creative": return "outline"
      default: return "outline"
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-8">
              Unable to load openings at the moment. Please try again later.
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Be part of something amazing. Help us build the future of student tech communities.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              {isLoading ? "Loading..." : `${activeOpenings.length} Open Positions`}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Remote & Hybrid Options
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Rolling Applications
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join MLSA?</h2>
            <p className="text-xl text-muted-foreground">
              Discover the benefits of being part of our amazing community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Professional Growth</h3>
                <p className="text-muted-foreground">
                  Develop leadership skills, gain real-world experience, and build your professional network
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Recognition & Certificates</h3>
                <p className="text-muted-foreground">
                  Earn certificates, badges, and recognition for your contributions to the community
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-8 h-8 text-chart-3" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Career Opportunities</h3>
                <p className="text-muted-foreground">
                  Access exclusive job opportunities, internships, and connections with industry leaders
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-muted-foreground">Find the perfect role to contribute to our community</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading openings...</p>
            </div>
          ) : activeOpenings.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Open Positions Available</h3>
              <p className="text-muted-foreground mb-6">
                Check back later for new opportunities to join our team.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {activeOpenings.map((opening) => (
                <Card key={opening._id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{opening.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant={getCategoryBadgeVariant(opening.category)}>
                            {getCategoryDisplayName(opening.category)}
                          </Badge>
                          <Badge variant={getTypeBadgeVariant(opening.type)}>
                            {getTypeDisplayName(opening.type)}
                          </Badge>
                          {isDeadlineApproaching(opening.deadline) && (
                            <Badge variant="destructive" className="animate-pulse">
                              Deadline Approaching
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {opening.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Apply by {formatDate(opening.deadline)}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {opening.currentApplications} applied • {opening.maxApplications} max
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8">
                    <p className="text-muted-foreground mb-6 leading-relaxed">{opening.description}</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Requirements</h4>
                        <ul className="space-y-2">
                          {opening.requirements.map((req, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-accent">Responsibilities</h4>
                        <ul className="space-y-2">
                          {opening.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <ArrowRight className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-chart-3">Skills & Qualifications</h4>
                        <ul className="space-y-2">
                          {opening.skills.map((skill, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <CheckCircle className="w-4 h-4 text-chart-3 mr-2 mt-0.5 flex-shrink-0" />
                              {skill}
                            </li>
                          ))}
                          {opening.qualifications.map((qual, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <CheckCircle className="w-4 h-4 text-chart-3 mr-2 mt-0.5 flex-shrink-0" />
                              {qual}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <Button size="lg" className="w-full md:w-auto">
                        <a
                          href={`/apply/${opening._id}`}
                          className="flex items-center"
                        >
                          Apply Now
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Applications close on {formatDate(opening.deadline)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Application Process</h2>
            <p className="text-xl text-muted-foreground">Simple steps to join our amazing team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Apply Online</h3>
              <p className="text-sm text-muted-foreground">Fill out the application form for your chosen position</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-accent-foreground font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Initial Review</h3>
              <p className="text-sm text-muted-foreground">Our team reviews your application and qualifications</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-chart-3 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Interview</h3>
              <p className="text-sm text-muted-foreground">Casual conversation about your interests and goals</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-chart-4 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Welcome!</h3>
              <p className="text-sm text-muted-foreground">Join our team and start making an impact</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}