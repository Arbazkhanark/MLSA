"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Code,
  Video,
  FileText,
  ExternalLink,
  Search,
  Star,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Navigation } from "@/components/public/navigation";
import { Footer } from "@/components/public/footer";
import useSWR from "swr";

interface Resource {
  _id: string;
  title: string;
  description: string;
  url: string;
  type:
    | "tutorial"
    | "video"
    | "article"
    | "course"
    | "guide"
    | "workshop"
    | "documentation";
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  author: string;
  dateAdded: string;
  featured: boolean;
  rating: number;
  views: number;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [resources, setResources] = useState<Resource[]>([]);
  const [featuredResources, setFeaturedResources] = useState<Resource[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Build query parameters for API call
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (selectedCategory !== "All") params.append("category", selectedCategory);
    if (selectedLevel !== "All")
      params.append("difficulty", selectedLevel.toLowerCase());
    params.append("featured", "true");
    params.append("sortBy", "views");
    params.append("sortOrder", "desc");
    params.append("limit", "50");
    return params.toString();
  };

  const { data, error, isLoading, mutate } = useSWR<{
    data: Resource[];
    featured: Resource[];
    total: number;
  }>(`/api/public/resources?${buildQueryParams()}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (data) {
      setResources(data.data || []);
      setFeaturedResources(data.featured || []);
    }
  }, [data]);

  // Get unique categories from resources
  const categories = [
    "All",
    ...new Set(resources.map((r) => r.category).filter(Boolean)),
  ];

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return Video;
      case "tutorial":
        return Code;
      case "article":
        return FileText;
      case "course":
        return BookOpen;
      case "guide":
        return BookOpen;
      case "workshop":
        return Code;
      case "documentation":
        return FileText;
      default:
        return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return "from-purple-500 to-pink-500";
      case "tutorial":
        return "from-blue-500 to-cyan-500";
      case "article":
        return "from-green-500 to-emerald-500";
      case "course":
        return "from-orange-500 to-red-500";
      case "guide":
        return "from-indigo-500 to-purple-500";
      case "workshop":
        return "from-amber-500 to-yellow-500";
      case "documentation":
        return "from-slate-500 to-gray-500";
      default:
        return "from-primary to-primary/80";
    }
  };

  const getTypeDisplayName = (type: string) => {
    switch (type.toLowerCase()) {
      case "tutorial":
        return "Tutorial";
      case "video":
        return "Video";
      case "article":
        return "Article";
      case "course":
        return "Course";
      case "guide":
        return "Guide";
      case "workshop":
        return "Workshop";
      case "documentation":
        return "Documentation";
      default:
        return type;
    }
  };

  const getDifficultyDisplayName = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "Beginner";
      case "intermediate":
        return "Intermediate";
      case "advanced":
        return "Advanced";
      default:
        return difficulty;
    }
  };

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "default";
      case "intermediate":
        return "secondary";
      case "advanced":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-3 h-3 fill-yellow-500 text-yellow-500" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }

    return stars;
  };

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
            <Button onClick={() => mutate()}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background Elements */}
      {isClient && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 20}s`,
                  animationDuration: `${15 + Math.random() * 20}s`,
                }}
              />
            ))}
          </div>

          {/* Gradient orbs */}
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div
            className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          />
        </div>
      )}

      {/* Hero Section */}
      <Navigation />
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-pulse">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Curated Learning Materials
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-x">
              Learning Resources
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed">
              Discover hand-picked tutorials, guides, and tools to accelerate
              your tech journey with MLSA AUH
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div
                className="flex items-center animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {isLoading ? "Loading..." : `${resources.length} Resources`}
              </div>
              <div
                className="flex items-center animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Star className="w-4 h-4 mr-2" />
                {featuredResources.length} Featured
              </div>
              <div
                className="flex items-center animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Community Vetted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in-up">
            <div className="relative flex-1 group border-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-primary" />
              <Input
                placeholder="Search resources by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30"
              />
            </div>
            <div className="flex gap-2 border-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-md border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
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
                className="px-4 py-2 rounded-md border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              >
                {["All", "Beginner", "Intermediate", "Advanced"].map(
                  (level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-12 px-4 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-4">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">
                  Featured Picks
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                Community Favorites
              </h2>
              <p className="text-muted-foreground text-lg">
                Hand-picked resources recommended by our expert community
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.map((resource, index) => {
                const IconComponent = getTypeIcon(resource.type);
                const gradientColors = getTypeColor(resource.type);
                return (
                  <Card
                    key={resource._id}
                    className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in-up bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-sm border border-yellow-200/50 hover:border-yellow-300 shadow-lg hover:shadow-yellow-500/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient Border Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${gradientColors} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg`}
                    />

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${gradientColors} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex items-center gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-2 py-1 border">
                          {renderStars(resource.rating)}
                          <span className="text-xs text-muted-foreground ml-1">
                            {resource.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300 line-clamp-2 leading-tight">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed line-clamp-3 mt-2">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-primary/10 text-primary border-primary/20"
                          >
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
                            className="text-xs font-medium"
                          >
                            {getDifficultyDisplayName(resource.difficulty)}
                          </Badge>
                          <span className="text-sm text-muted-foreground font-medium">
                            {resource.category}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
                          asChild
                        >
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Explore
                          </a>
                        </Button>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground flex items-center justify-between">
                        <span>By {resource.author}</span>
                        <span>{formatDate(resource.dateAdded)}</span>
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {resource.views}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Resources Grid */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Complete Resource Library
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our comprehensive collection of learning materials for all
              skill levels
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground text-lg">
                Loading amazing resources...
              </p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-16 animate-fade-in-up">
              <div className="w-24 h-24 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                No Resources Found
              </h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                {searchTerm ||
                selectedCategory !== "All" ||
                selectedLevel !== "All"
                  ? "We couldn't find any resources matching your criteria."
                  : "Our resource library is being curated. Check back soon for amazing learning materials!"}
              </p>
              {(searchTerm ||
                selectedCategory !== "All" ||
                selectedLevel !== "All") && (
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedLevel("All");
                  }}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, index) => {
                const IconComponent = getTypeIcon(resource.type);
                const gradientColors = getTypeColor(resource.type);
                return (
                  <Card
                    key={resource._id}
                    className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 shadow-md hover:shadow-primary/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient Border Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${gradientColors} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg`}
                    />

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${gradientColors} text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex items-center gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-2 py-1 border">
                          {renderStars(resource.rating)}
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300 line-clamp-2 leading-tight">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed line-clamp-3 mt-2">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs bg-secondary/50 hover:bg-secondary transition-colors"
                          >
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
                            className="text-xs font-medium"
                          >
                            {getDifficultyDisplayName(resource.difficulty)}
                          </Badge>
                          <span className="text-sm text-muted-foreground font-medium">
                            {resource.category}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300"
                          asChild
                        >
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground flex items-center justify-between">
                        <span>By {resource.author}</span>
                        <span>{formatDate(resource.dateAdded)}</span>
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {resource.views}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Essential Tools Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/50 to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Essential Developer Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Boost your productivity with these recommended tools and platforms
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "VS Code",
                description: "Powerful code editor",
                category: "Editor",
                icon: "💻",
                color: "from-blue-500 to-cyan-500",
              },
              {
                name: "GitHub",
                description: "Version control platform",
                category: "Version Control",
                icon: "🐙",
                color: "from-gray-700 to-gray-900",
              },
              {
                name: "Figma",
                description: "Design collaboration",
                category: "Design",
                icon: "🎨",
                color: "from-purple-500 to-pink-500",
              },
              {
                name: "Postman",
                description: "API development",
                category: "API Testing",
                icon: "📬",
                color: "from-orange-500 to-red-500",
              },
            ].map((tool, index) => (
              <Card
                key={tool.name}
                className="text-center group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up bg-background/80 backdrop-blur-sm border-2 hover:border-primary/30 shadow-md hover:shadow-primary/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${tool.color} text-white text-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {tool.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {tool.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {tool.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// Add missing Eye icon component
function Eye(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
