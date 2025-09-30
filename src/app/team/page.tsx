"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter, Mail, MapPin, Calendar } from "lucide-react"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  skills: string[]
  social: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
  joinDate: string
  location: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Lead Ambassador",
    bio: "Passionate about AI/ML and community building. Leading our chapter with 3+ years of experience in tech leadership.",
    image: "/professional-headshot-of-young-asian-tech-leader.jpg",
    skills: ["Python", "Machine Learning", "Leadership", "Public Speaking"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "alex@mlsa.com",
    },
    joinDate: "Jan 2022",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Technical Lead",
    bio: "Full-stack developer with expertise in cloud technologies. Organizing technical workshops and hackathons.",
    image: "/professional-headshot-of-young-woman-software-engi.jpg",
    skills: ["React", "Node.js", "Azure", "DevOps"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    joinDate: "Mar 2022",
    location: "Seattle, WA",
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    role: "Community Manager",
    bio: "Building bridges between students and industry. Focused on creating inclusive spaces for learning and growth.",
    image: "/professional-headshot-of-young-hispanic-community-.jpg",
    skills: ["Community Building", "Event Planning", "Marketing", "Design"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "marcus@mlsa.com",
    },
    joinDate: "Jun 2022",
    location: "Austin, TX",
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Content Creator",
    bio: "Creating educational content and tutorials. Passionate about making tech accessible to everyone.",
    image: "/professional-headshot-of-young-indian-woman-conten.jpg",
    skills: ["Technical Writing", "Video Production", "UI/UX", "JavaScript"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    joinDate: "Aug 2022",
    location: "New York, NY",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Event Coordinator",
    bio: "Organizing amazing events and workshops. Bringing the community together through memorable experiences.",
    image: "/professional-headshot-of-young-korean-event-coordi.jpg",
    skills: ["Event Management", "Project Management", "Networking", "Logistics"],
    social: {
      linkedin: "https://linkedin.com",
      email: "david@mlsa.com",
    },
    joinDate: "Oct 2022",
    location: "Los Angeles, CA",
  },
  {
    id: 6,
    name: "Emma Thompson",
    role: "Outreach Lead",
    bio: "Connecting with other universities and organizations. Building partnerships to expand our impact.",
    image: "/professional-headshot-of-young-woman-outreach-coor.jpg",
    skills: ["Partnership Development", "Communication", "Strategy", "Networking"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "emma@mlsa.com",
    },
    joinDate: "Dec 2022",
    location: "Boston, MA",
  },
]

export default function TeamPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

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
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Social Links Overlay */}
                  <div
                    className={`absolute bottom-4 left-4 right-4 flex justify-center space-x-3 transition-all duration-300 ${
                      hoveredMember === member.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
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
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.bio}</p>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {member.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Joined {member.joinDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
