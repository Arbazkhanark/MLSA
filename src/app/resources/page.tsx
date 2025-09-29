"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Code, Video, FileText, ExternalLink, Search } from "lucide-react"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"

const resources = [
  {
    id: 1,
    title: "Azure Fundamentals Guide",
    description: "Complete guide to getting started with Microsoft Azure cloud services",
    category: "Cloud",
    type: "Guide",
    level: "Beginner",
    url: "#",
    tags: ["Azure", "Cloud", "Fundamentals"],
    icon: BookOpen,
  },
  {
    id: 2,
    title: "React Development Masterclass",
    description: "Advanced React concepts and best practices for modern web development",
    category: "Web Development",
    type: "Video",
    level: "Advanced",
    url: "#",
    tags: ["React", "JavaScript", "Frontend"],
    icon: Video,
  },
  {
    id: 3,
    title: "Machine Learning with Python",
    description: "Hands-on tutorial for building ML models using Python and scikit-learn",
    category: "AI/ML",
    type: "Tutorial",
    level: "Intermediate",
    url: "#",
    tags: ["Python", "ML", "Data Science"],
    icon: Code,
  },
  {
    id: 4,
    title: "DevOps Best Practices",
    description: "Essential DevOps practices for modern software development teams",
    category: "DevOps",
    type: "Article",
    level: "Intermediate",
    url: "#",
    tags: ["DevOps", "CI/CD", "Docker"],
    icon: FileText,
  },
  {
    id: 5,
    title: "Power Platform Workshop",
    description: "Build business applications without code using Microsoft Power Platform",
    category: "Low-Code",
    type: "Workshop",
    level: "Beginner",
    url: "#",
    tags: ["Power Apps", "Power BI", "No-Code"],
    icon: BookOpen,
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals",
    description: "Essential cybersecurity concepts every developer should know",
    category: "Security",
    type: "Course",
    level: "Beginner",
    url: "#",
    tags: ["Security", "Encryption", "Best Practices"],
    icon: Video,
  },
]

const categories = ["All", "Cloud", "Web Development", "AI/ML", "DevOps", "Low-Code", "Security"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || resource.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <Navigation />
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Learning Resources
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
              Curated collection of tutorials, guides, and tools to accelerate your tech journey
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-md border border-border bg-background"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 rounded-md border border-border bg-background"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const IconComponent = resource.icon
              return (
                <Card
                  key={resource.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-border/50 hover:border-primary/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">{resource.title}</CardTitle>
                    <CardDescription className="text-sm">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            resource.level === "Beginner"
                              ? "default"
                              : resource.level === "Intermediate"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {resource.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{resource.category}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Essential Developer Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recommended tools and platforms to boost your productivity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Visual Studio Code", description: "Powerful code editor", category: "Editor" },
              { name: "GitHub", description: "Version control platform", category: "Version Control" },
              { name: "Figma", description: "Design collaboration tool", category: "Design" },
              { name: "Postman", description: "API development platform", category: "API Testing" },
            ].map((tool, index) => (
              <Card
                key={tool.name}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{tool.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
