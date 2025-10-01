"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar, Loader2 } from "lucide-react"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"
import Image from "next/image"

interface TeamMember {
  _id: string
  name: string
  role: string
  position: string
  email: string
  bio: string
  avatar: string
  skills: string[]
  location: string
  joinDate: string
  status: "active" | "inactive"
  social: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  success: boolean
  data: TeamMember[]
  total: number
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch("/api/admin/team", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data: ApiResponse = await response.json()

      if (data.success && data.data) {
        // Filter only active members and transform data for frontend
        const activeMembers = data.data
          .filter(member => member.status === "active")
          .map(member => ({
            ...member,
            id: member._id,
            image: member.avatar || "/placeholder.svg",
            social: {
              ...member.social,
              email: member.email
            }
          }))
        
        setTeamMembers(activeMembers)
      } else {
        setError("Failed to load team members")
      }
    } catch (err) {
      console.error("Error fetching team members:", err)
      setError("Failed to load team members. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                <p className="text-muted-foreground">Loading our amazing team...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="py-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold">Unable to load team</h3>
                <p className="text-muted-foreground">{error}</p>
                <Button 
                  onClick={fetchTeamMembers}
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            </div>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The passionate individuals driving our community forward and making a difference in the tech world
          </p>
          <div className="mt-4">
            <Badge variant="secondary" className="text-sm">
              {teamMembers.length} Active Members
            </Badge>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Team Members Yet</h3>
              <p className="text-muted-foreground mb-6">
                Our team is currently being assembled. Check back soon to meet our amazing members!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card
                  key={member._id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  onMouseEnter={() => setHoveredMember(member._id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="relative">
                    <Image
                      src={member.avatar || "https://images.pexels.com/photos/7605935/pexels-photo-7605935.jpeg"}
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      width={100}
                      height={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Social Links Overlay */}
                    <div
                      className={`absolute bottom-4 left-4 right-4 flex justify-center space-x-3 transition-all duration-300 ${
                        hoveredMember === member._id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      {member.position && (
                        <p className="text-sm text-muted-foreground mt-1">{member.position}</p>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>

                    {/* Skills */}
                    {member.skills && member.skills.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {member.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {member.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {member.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Joined {formatJoinDate(member.joinDate)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Join Our Team?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We&#39;re always looking for passionate individuals to help grow our community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/hiring"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              View Open Positions
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Add the missing Button component
function Button({ onClick, children, className = "" }: { onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium ${className}`}
    >
      {children}
    </button>
  )
}

// Add the missing Users icon component
function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}