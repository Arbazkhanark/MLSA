// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { BookOpen, Code, Video, FileText, ExternalLink, Search } from "lucide-react"
// import { Navigation } from "@/components/public/navigation"
// import { Footer } from "@/components/public/footer"

// const resources = [
//   {
//     id: 1,
//     title: "Azure Fundamentals Guide",
//     description: "Complete guide to getting started with Microsoft Azure cloud services",
//     category: "Cloud",
//     type: "Guide",
//     level: "Beginner",
//     url: "#",
//     tags: ["Azure", "Cloud", "Fundamentals"],
//     icon: BookOpen,
//   },
//   {
//     id: 2,
//     title: "React Development Masterclass",
//     description: "Advanced React concepts and best practices for modern web development",
//     category: "Web Development",
//     type: "Video",
//     level: "Advanced",
//     url: "#",
//     tags: ["React", "JavaScript", "Frontend"],
//     icon: Video,
//   },
//   {
//     id: 3,
//     title: "Machine Learning with Python",
//     description: "Hands-on tutorial for building ML models using Python and scikit-learn",
//     category: "AI/ML",
//     type: "Tutorial",
//     level: "Intermediate",
//     url: "#",
//     tags: ["Python", "ML", "Data Science"],
//     icon: Code,
//   },
//   {
//     id: 4,
//     title: "DevOps Best Practices",
//     description: "Essential DevOps practices for modern software development teams",
//     category: "DevOps",
//     type: "Article",
//     level: "Intermediate",
//     url: "#",
//     tags: ["DevOps", "CI/CD", "Docker"],
//     icon: FileText,
//   },
//   {
//     id: 5,
//     title: "Power Platform Workshop",
//     description: "Build business applications without code using Microsoft Power Platform",
//     category: "Low-Code",
//     type: "Workshop",
//     level: "Beginner",
//     url: "#",
//     tags: ["Power Apps", "Power BI", "No-Code"],
//     icon: BookOpen,
//   },
//   {
//     id: 6,
//     title: "Cybersecurity Fundamentals",
//     description: "Essential cybersecurity concepts every developer should know",
//     category: "Security",
//     type: "Course",
//     level: "Beginner",
//     url: "#",
//     tags: ["Security", "Encryption", "Best Practices"],
//     icon: Video,
//   },
// ]

// const categories = ["All", "Cloud", "Web Development", "AI/ML", "DevOps", "Low-Code", "Security"]
// const levels = ["All", "Beginner", "Intermediate", "Advanced"]

// export default function ResourcesPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("All")
//   const [selectedLevel, setSelectedLevel] = useState("All")

//   const filteredResources = resources.filter((resource) => {
//     const matchesSearch =
//       resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//     const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
//     const matchesLevel = selectedLevel === "All" || resource.level === selectedLevel

//     return matchesSearch && matchesCategory && matchesLevel
//   })

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
//       {/* Hero Section */}
//       <Navigation />
//       <section className="relative py-20 px-4 overflow-hidden">
//         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
//         <div className="container mx-auto text-center relative z-10">
//           <div className="animate-fade-in-up">
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
//               Learning Resources
//             </h1>
//             <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
//               Curated collection of tutorials, guides, and tools to accelerate your tech journey
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Search and Filters */}
//       <section className="py-8 px-4">
//         <div className="container mx-auto">
//           <div className="flex flex-col md:flex-row gap-4 mb-8">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//               <Input
//                 placeholder="Search resources..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <div className="flex gap-2">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="px-4 py-2 rounded-md border border-border bg-background"
//               >
//                 {categories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={selectedLevel}
//                 onChange={(e) => setSelectedLevel(e.target.value)}
//                 className="px-4 py-2 rounded-md border border-border bg-background"
//               >
//                 {levels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Resources Grid */}
//       <section className="py-12 px-4">
//         <div className="container mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredResources.map((resource, index) => {
//               const IconComponent = resource.icon
//               return (
//                 <Card
//                   key={resource.id}
//                   className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-border/50 hover:border-primary/50"
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
//                         <IconComponent className="h-6 w-6 text-primary" />
//                       </div>
//                       <Badge variant="secondary" className="text-xs">
//                         {resource.type}
//                       </Badge>
//                     </div>
//                     <CardTitle className="group-hover:text-primary transition-colors">{resource.title}</CardTitle>
//                     <CardDescription className="text-sm">{resource.description}</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {resource.tags.map((tag) => (
//                         <Badge key={tag} variant="outline" className="text-xs">
//                           {tag}
//                         </Badge>
//                       ))}
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <Badge
//                           variant={
//                             resource.level === "Beginner"
//                               ? "default"
//                               : resource.level === "Intermediate"
//                                 ? "secondary"
//                                 : "destructive"
//                           }
//                           className="text-xs"
//                         >
//                           {resource.level}
//                         </Badge>
//                         <span className="text-sm text-muted-foreground">{resource.category}</span>
//                       </div>
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
//                       >
//                         <ExternalLink className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Featured Tools Section */}
//       <section className="py-16 px-4 bg-muted/30">
//         <div className="container mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Essential Developer Tools</h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Recommended tools and platforms to boost your productivity
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { name: "Visual Studio Code", description: "Powerful code editor", category: "Editor" },
//               { name: "GitHub", description: "Version control platform", category: "Version Control" },
//               { name: "Figma", description: "Design collaboration tool", category: "Design" },
//               { name: "Postman", description: "API development platform", category: "API Testing" },
//             ].map((tool, index) => (
//               <Card
//                 key={tool.name}
//                 className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <CardHeader>
//                   <CardTitle className="text-lg">{tool.name}</CardTitle>
//                   <CardDescription>{tool.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Badge variant="outline">{tool.category}</Badge>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   )
// }












"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Code, Video, FileText, ExternalLink, Search, Star } from "lucide-react"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"
import useSWR from "swr"

interface Resource {
  _id: string
  title: string
  description: string
  url: string
  type: "tutorial" | "video" | "article" | "course" | "guide" | "workshop" | "documentation"
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  author: string
  dateAdded: string
  featured: boolean
  rating: number
  views: number
  createdAt: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [resources, setResources] = useState<Resource[]>([])
  const [featuredResources, setFeaturedResources] = useState<Resource[]>([])

  // Build query parameters for API call
  const buildQueryParams = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (selectedCategory !== 'All') params.append('category', selectedCategory)
    if (selectedLevel !== 'All') params.append('difficulty', selectedLevel.toLowerCase())
    params.append('featured', 'true')
    params.append('sortBy', 'views')
    params.append('sortOrder', 'desc')
    params.append('limit', '50')
    return params.toString()
  }

  const { data, error, isLoading, mutate } = useSWR<{ 
    data: Resource[], 
    featured: Resource[], 
    total: number 
  }>(
    `/api/public/resources?${buildQueryParams()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  useEffect(() => {
    if (data) {
      setResources(data.data || [])
      setFeaturedResources(data.featured || [])
    }
  }, [data])

  // Get unique categories from resources
  const categories = ["All", ...new Set(resources.map(r => r.category).filter(Boolean))]

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return Video
      case "tutorial":
        return Code
      case "article":
        return FileText
      case "course":
        return BookOpen
      case "guide":
        return BookOpen
      case "workshop":
        return Code
      case "documentation":
        return FileText
      default:
        return BookOpen
    }
  }

  const getTypeDisplayName = (type: string) => {
    switch (type.toLowerCase()) {
      case "tutorial": return "Tutorial"
      case "video": return "Video"
      case "article": return "Article"
      case "course": return "Course"
      case "guide": return "Guide"
      case "workshop": return "Workshop"
      case "documentation": return "Documentation"
      default: return type
    }
  }

  const getDifficultyDisplayName = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "Beginner"
      case "intermediate": return "Intermediate"
      case "advanced": return "Advanced"
      default: return difficulty
    }
  }

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "default"
      case "intermediate":
        return "secondary"
      case "advanced":
        return "destructive"
      default:
        return "outline"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-500 text-yellow-500" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />)
    }

    return stars
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        <div className="pt-24 pb-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-8">
              Unable to load resources at the moment. Please try again later.
            </p>
            <Button onClick={() => mutate()}>
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
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
              Learning Resources
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
              Curated collection of tutorials, guides, and tools to accelerate your tech journey
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                {isLoading ? "Loading..." : `${resources.length} Resources`}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                {featuredResources.length} Featured
              </div>
            </div>
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
                {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                Featured Resources
              </h2>
              <p className="text-muted-foreground">Hand-picked resources recommended by our community</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource, index) => {
                const IconComponent = getTypeIcon(resource.type)
                return (
                  <Card
                    key={resource._id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-2 border-yellow-200 hover:border-yellow-300 bg-yellow-50/50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-lg bg-yellow-100 group-hover:bg-yellow-200 transition-colors">
                          <IconComponent className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(resource.rating)}
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-yellow-700 transition-colors">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-sm">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs bg-yellow-100">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={getDifficultyVariant(resource.difficulty)}
                            className="text-xs"
                          >
                            {getDifficultyDisplayName(resource.difficulty)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{resource.category}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="group-hover:bg-yellow-600 group-hover:text-white transition-colors"
                          asChild
                        >
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        By {resource.author} • {formatDate(resource.dateAdded)} • {resource.views} views
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Resources Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              All Resources {isLoading && "(Loading...)"}
            </h2>
            <p className="text-muted-foreground">
              Browse our complete collection of learning materials
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading resources...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All' 
                  ? "Try adjusting your search filters." 
                  : "No resources available yet. Check back soon!"}
              </p>
              {(searchTerm || selectedCategory !== 'All' || selectedLevel !== 'All') && (
                <Button onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setSelectedLevel("All")
                }}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => {
                const IconComponent = getTypeIcon(resource.type)
                return (
                  <Card
                    key={resource._id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up border-border/50 hover:border-primary/50"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(resource.rating)}
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={getDifficultyVariant(resource.difficulty)}
                            className="text-xs"
                          >
                            {getDifficultyDisplayName(resource.difficulty)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{resource.category}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          asChild
                        >
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        By {resource.author} • {formatDate(resource.dateAdded)} • {resource.views} views
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
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
