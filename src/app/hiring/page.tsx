"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Users, CheckCircle, ArrowRight, Calendar, Briefcase } from "lucide-react"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"

interface Position {
  id: number
  title: string
  department: string
  type: string
  location: string
  deadline: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  formUrl: string
}

const openPositions: Position[] = [
  {
    id: 1,
    title: "Technical Content Creator",
    department: "Content Team",
    type: "Part-time",
    location: "Remote",
    deadline: "March 15, 2025",
    description:
      "Join our content team to create engaging technical tutorials, blog posts, and educational materials for our community.",
    requirements: [
      "Strong technical writing skills",
      "Experience with web technologies (HTML, CSS, JavaScript)",
      "Familiarity with Microsoft technologies",
      "Portfolio of technical content",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Create technical tutorials and blog posts",
      "Develop educational content for workshops",
      "Collaborate with the technical team on documentation",
      "Engage with community members through content",
      "Maintain content calendar and publishing schedule",
    ],
    benefits: [
      "Flexible working hours",
      "Microsoft certification opportunities",
      "Networking with industry professionals",
      "Portfolio building opportunities",
      "Leadership development",
    ],
    formUrl: "https://forms.google.com/sample-form-1",
  },
  {
    id: 2,
    title: "Event Coordinator",
    department: "Events Team",
    type: "Volunteer",
    location: "Hybrid",
    deadline: "March 20, 2025",
    description: "Help organize and coordinate amazing events, workshops, and hackathons for our growing community.",
    requirements: [
      "Event planning experience (preferred)",
      "Strong organizational skills",
      "Excellent interpersonal communication",
      "Ability to work in a team environment",
      "Passion for community building",
    ],
    responsibilities: [
      "Plan and coordinate community events",
      "Manage event logistics and vendor relationships",
      "Coordinate with speakers and sponsors",
      "Ensure smooth event execution",
      "Gather feedback and improve future events",
    ],
    benefits: [
      "Event management experience",
      "Professional networking opportunities",
      "Certificate of participation",
      "Skill development workshops",
      "Recognition and awards",
    ],
    formUrl: "https://forms.google.com/sample-form-2",
  },
  {
    id: 3,
    title: "Social Media Manager",
    department: "Marketing Team",
    type: "Part-time",
    location: "Remote",
    deadline: "March 25, 2025",
    description:
      "Lead our social media presence and help grow our community through engaging content and strategic campaigns.",
    requirements: [
      "Social media marketing experience",
      "Content creation skills (graphics, videos)",
      "Understanding of social media analytics",
      "Creative mindset and attention to detail",
      "Knowledge of design tools (Canva, Figma, etc.)",
    ],
    responsibilities: [
      "Manage social media accounts and content calendar",
      "Create engaging posts and visual content",
      "Monitor social media metrics and engagement",
      "Collaborate with content team on campaigns",
      "Engage with community members online",
    ],
    benefits: [
      "Digital marketing experience",
      "Creative portfolio development",
      "Access to design tools and resources",
      "Marketing certification opportunities",
      "Professional references",
    ],
    formUrl: "https://forms.google.com/sample-form-3",
  },
]

export default function HiringPage() {
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
              {openPositions.length} Open Positions
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

          <div className="space-y-8">
            {openPositions.map((position) => (
              <Card key={position.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">{position.department}</Badge>
                        <Badge variant="outline">{position.type}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {position.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Apply by {position.deadline}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <p className="text-muted-foreground mb-6 leading-relaxed">{position.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Requirements</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, index) => (
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
                        {position.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <ArrowRight className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-chart-3">Benefits</h4>
                      <ul className="space-y-2">
                        {position.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-chart-3 mr-2 mt-0.5 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <Button size="lg" className="w-full md:w-auto">
                      <a
                        href={position.formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
              <p className="text-sm text-muted-foreground">Fill out the Google Form for your chosen position</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-accent-foreground font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Initial Review</h3>
              <p className="text-sm text-muted-foreground">Our team reviews your application and portfolio</p>
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
