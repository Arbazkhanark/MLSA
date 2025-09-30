"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Users, Calendar, BookOpen, Zap, Globe, Award, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(101,163,255,0.1),transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* MLSA x AUH Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-primary/30 bg-primary/10 backdrop-blur-sm">
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  MLSA
                </span>
                <span className="text-lg text-muted-foreground">×</span>
                <span className="text-lg font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  AUH
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Microsoft Learn
              <br />
              Student Ambassadors
            </h1>
            
            {/* Subtitle with AUH emphasis */}
            <div className="mb-8">
              <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
                Empowering the next generation of tech leaders at 
                <span className="font-semibold text-primary ml-2">Amity University Haryana</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="animate-glow">
                <Link href="/team" className="flex items-center">
                  Join Our Community
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Code className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: "1s" }}>
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: "2s" }}>
            <div className="w-14 h-14 bg-chart-3/20 rounded-full flex items-center justify-center">
              <Globe className="w-7 h-7 text-chart-3" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission at AUH</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Building Amity University Haryana&apos;s most vibrant tech community where students learn, innovate, and lead together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Code className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Learn & Grow</h3>
                <p className="text-muted-foreground">
                  Access cutting-edge resources, workshops, and mentorship to accelerate your tech journey at AUH
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Build Community</h3>
                <p className="text-muted-foreground">
                  Connect with AUH&apos;s brightest minds, collaborate on projects, and build lasting professional relationships
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-chart-3/20 transition-colors">
                  <Zap className="w-8 h-8 text-chart-3" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Drive Innovation</h3>
                <p className="text-muted-foreground">
                  Lead initiatives, organize events, and make a real impact in AUH&apos;s tech ecosystem
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-chart-3 mb-2">25+</div>
              <div className="text-muted-foreground">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-chart-4 mb-2">100%</div>
              <div className="text-muted-foreground">Fun Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer at AUH</h2>
            <p className="text-xl text-muted-foreground">Discover the exclusive opportunities for Amity University Haryana students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <Calendar className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Tech Events</h3>
                <p className="text-sm text-muted-foreground">Regular workshops, hackathons, and tech talks at AUH campus</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <BookOpen className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold mb-2">Learning Resources</h3>
                <p className="text-sm text-muted-foreground">Curated content, tutorials, and study materials for AUH students</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-chart-3 mb-4" />
                <h3 className="font-semibold mb-2">Mentorship</h3>
                <p className="text-sm text-muted-foreground">Connect with industry professionals and senior AUH students</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <Award className="w-8 h-8 text-chart-4 mb-4" />
                <h3 className="font-semibold mb-2">Recognition</h3>
                <p className="text-sm text-muted-foreground">Certificates, badges, and career opportunities for AUH members</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join MLSA AUH?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Take the first step towards an exciting tech journey with Microsoft Learn Student Ambassadors at Amity University Haryana
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="animate-glow">
              <Link href="/hiring" className="flex items-center">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}