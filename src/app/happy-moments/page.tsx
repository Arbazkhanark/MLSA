// "use client";

// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Heart,
//   Calendar,
//   Users,
//   Award,
//   Camera,
//   Share2,
//   Filter,
// } from "lucide-react";
// import { Navigation } from "@/components/public/navigation";
// import { Footer } from "@/components/public/footer";

// const moments = [
//   {
//     id: 1,
//     title: "First Hackathon Victory!",
//     description:
//       "Our team won first place at the Inter-College Hackathon with our AI-powered study assistant app.",
//     date: "2024-03-15",
//     category: "Achievement",
//     image: "/students-celebrating-hackathon-victory-with-trophy.jpg",
//     likes: 124,
//     participants: ["Alex", "Sarah", "Mike", "Emma"],
//   },
//   {
//     id: 2,
//     title: "Microsoft Azure Workshop Success",
//     description:
//       "Over 200 students attended our Azure fundamentals workshop, with 95% completion rate!",
//     date: "2024-02-28",
//     category: "Workshop",
//     image: "/students-learning-in-computer-lab-azure-workshop.jpg",
//     likes: 89,
//     participants: ["Workshop Team", "200+ Students"],
//   },
//   {
//     id: 3,
//     title: "Community Coding Night",
//     description:
//       "Late-night coding session turned into an amazing collaboration with pizza and great conversations.",
//     date: "2024-02-14",
//     category: "Community",
//     image: "/students-coding-together-at-night-with-pizza.jpg",
//     likes: 156,
//     participants: ["Dev Team", "Community Members"],
//   },
//   {
//     id: 4,
//     title: "Guest Speaker: Microsoft Engineer",
//     description:
//       "Inspiring talk from a Microsoft senior engineer about career paths in tech and innovation.",
//     date: "2024-01-20",
//     category: "Speaker Event",
//     image: "/professional-speaker-presenting-to-students-in-aud.jpg",
//     likes: 203,
//     participants: ["Guest Speaker", "150+ Attendees"],
//   },
//   {
//     id: 5,
//     title: "Team Building Retreat",
//     description:
//       "Amazing weekend retreat where we bonded as a team and planned exciting projects for the semester.",
//     date: "2024-01-10",
//     category: "Team Building",
//     image: "/students-team-building-activities-outdoor-retreat.jpg",
//     likes: 178,
//     participants: ["Core Team", "Volunteers"],
//   },
//   {
//     id: 6,
//     title: "Open Source Contribution Drive",
//     description:
//       "Successfully contributed to 15+ open source projects during our month-long contribution challenge.",
//     date: "2023-12-15",
//     category: "Open Source",
//     image: "/students-working-on-laptops-open-source-coding.jpg",
//     likes: 92,
//     participants: ["Contributors", "Mentors"],
//   },
// ];

// const categories = [
//   "All",
//   "Achievement",
//   "Workshop",
//   "Community",
//   "Speaker Event",
//   "Team Building",
//   "Open Source",
// ];

// export default function HappyMomentsPage() {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [likedMoments, setLikedMoments] = useState<number[]>([]);

//   const filteredMoments = moments.filter(
//     (moment) =>
//       selectedCategory === "All" || moment.category === selectedCategory
//   );

//   const handleLike = (momentId: number) => {
//     setLikedMoments((prev) =>
//       prev.includes(momentId)
//         ? prev.filter((id) => id !== momentId)
//         : [...prev, momentId]
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
//       {/* Hero Section */}
//       <Navigation />
//       <section className="relative py-20 px-4 overflow-hidden">
//         <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
//         <div className="container mx-auto text-center relative z-10">
//           <div className="animate-fade-in-up">
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
//               Happy Moments
//             </h1>
//             <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
//               Celebrating our journey, achievements, and the memories we&#39;ve
//               created together
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Filter Section */}
//       <section className="py-8 px-4">
//         <div className="container mx-auto">
//           <div className="flex flex-wrap justify-center gap-2 mb-8">
//             {categories.map((category) => (
//               <Button
//                 key={category}
//                 variant={selectedCategory === category ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setSelectedCategory(category)}
//                 className="transition-all duration-300"
//               >
//                 <Filter className="h-3 w-3 mr-1" />
//                 {category}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Moments Grid */}
//       <section className="py-12 px-4">
//         <div className="container mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredMoments.map((moment, index) => (
//               <Card
//                 key={moment.id}
//                 className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up border-border/50 hover:border-primary/50"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={moment.image || "/placeholder.svg"}
//                     alt={moment.title}
//                     className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute top-4 left-4">
//                     <Badge
//                       variant="secondary"
//                       className="bg-background/80 backdrop-blur-sm"
//                     >
//                       {moment.category}
//                     </Badge>
//                   </div>
//                   <div className="absolute top-4 right-4">
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
//                       onClick={() => handleLike(moment.id)}
//                     >
//                       <Heart
//                         className={`h-4 w-4 ${
//                           likedMoments.includes(moment.id)
//                             ? "fill-red-500 text-red-500"
//                             : ""
//                         }`}
//                       />
//                       <span className="ml-1 text-xs">
//                         {moment.likes +
//                           (likedMoments.includes(moment.id) ? 1 : 0)}
//                       </span>
//                     </Button>
//                   </div>
//                 </div>
//                 <CardContent className="p-6">
//                   <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
//                     {moment.title}
//                   </h3>
//                   <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
//                     {moment.description}
//                   </p>
//                   <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="h-3 w-3" />
//                       {new Date(moment.date).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Users className="h-3 w-3" />
//                       {moment.participants.length > 2
//                         ? `${moment.participants.length}+ people`
//                         : moment.participants.join(", ")}
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex -space-x-2">
//                       {moment.participants
//                         .slice(0, 3)
//                         .map((participant, idx) => (
//                           <div
//                             key={idx}
//                             className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground border-2 border-background"
//                           >
//                             {participant.charAt(0)}
//                           </div>
//                         ))}
//                       {moment.participants.length > 3 && (
//                         <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold border-2 border-background">
//                           +{moment.participants.length - 3}
//                         </div>
//                       )}
//                     </div>
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       className="opacity-0 group-hover:opacity-100 transition-opacity"
//                     >
//                       <Share2 className="h-3 w-3 mr-1" />
//                       Share
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 px-4 bg-muted/30">
//         <div className="container mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Our Journey in Numbers
//             </h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Every moment counts in building our amazing tech community
//             </p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: Award,
//                 label: "Achievements",
//                 value: "25+",
//                 color: "text-yellow-500",
//               },
//               {
//                 icon: Users,
//                 label: "Active Members",
//                 value: "150+",
//                 color: "text-blue-500",
//               },
//               {
//                 icon: Camera,
//                 label: "Memories Captured",
//                 value: "500+",
//                 color: "text-green-500",
//               },
//               {
//                 icon: Heart,
//                 label: "Total Likes",
//                 value: "1.2K+",
//                 color: "text-red-500",
//               },
//             ].map((stat, index) => (
//               <Card
//                 key={stat.label}
//                 className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <CardContent className="p-6">
//                   <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
//                   <div className="text-2xl font-bold mb-1">{stat.value}</div>
//                   <div className="text-sm text-muted-foreground">
//                     {stat.label}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Memory Wall */}
//       <section className="py-16 px-4">
//         <div className="container mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Memory Wall</h2>
//             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//               Quick snapshots of our favorite moments
//             </p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//             {Array.from({ length: 12 }, (_, i) => (
//               <div
//                 key={i}
//                 className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 animate-fade-in-up"
//                 style={{ animationDelay: `${i * 50}ms` }}
//               >
//                 <img
//                   src={`/happy-students-tech-community-moment-.jpg?height=200&width=200&query=happy students tech community moment ${
//                     i + 1
//                   }`}
//                   alt={`Memory ${i + 1}`}
//                   className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// }








"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  Users,
  Award,
  Camera,
  Share2,
  Filter,
  Star,
} from "lucide-react";
import { Navigation } from "@/components/public/navigation";
import { Footer } from "@/components/public/footer";
import useSWR from "swr";

interface Moment {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: "achievement" | "workshop" | "community" | "speaker" | "team" | "opensource";
  image: string;
  participants: string[];
  likes: number;
  featured: boolean;
  tags: string[];
  addedBy: string;
  addedDate: string;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function HappyMomentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedMoments, setLikedMoments] = useState<string[]>([]);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [featuredMoments, setFeaturedMoments] = useState<Moment[]>([]);

  // Build query parameters for API call
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.append('category', selectedCategory.toLowerCase());
    return params.toString();
  };

  const { data, error, isLoading, mutate } = useSWR<{ 
    data: Moment[], 
    featured: Moment[], 
    total: number 
  }>(
    `/api/admin/moment?${buildQueryParams()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (data) {
      setMoments(data.data || []);
      setFeaturedMoments(data.featured || []);
    }
  }, [data]);

  const filteredMoments = selectedCategory === "All" 
    ? moments 
    : moments.filter(moment => moment.category === selectedCategory.toLowerCase());

  // Get unique categories from moments
  const categories = ["All", ...new Set(moments.map(moment => 
    moment.category.charAt(0).toUpperCase() + moment.category.slice(1)
  ))];

  const handleLike = async (momentId: string) => {
    try {
      // Optimistically update the UI
      const previousMoments = [...moments];
      const updatedMoments = moments.map(moment =>
        moment._id === momentId
          ? { ...moment, likes: moment.likes + (likedMoments.includes(momentId) ? -1 : 1) }
          : moment
      );
      setMoments(updatedMoments);

      const previousLiked = [...likedMoments];
      setLikedMoments(prev =>
        prev.includes(momentId)
          ? prev.filter((id) => id !== momentId)
          : [...prev, momentId]
      );

      // Make API call
      const response = await fetch(`/api/admin/moment/${momentId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to like moment");
      }

      // Revalidate data to get actual count
      await mutate();
    } catch (error) {
      console.error("Error liking moment:", error);
      // Revert optimistic update on error
      setMoments(moments);
      setLikedMoments(likedMoments);
    }
  };

  const getCategoryDisplayName = (category: string) => {
    switch (category.toLowerCase()) {
      case "achievement": return "Achievement";
      case "workshop": return "Workshop";
      case "community": return "Community";
      case "speaker": return "Speaker Event";
      case "team": return "Team Building";
      case "opensource": return "Open Source";
      default: return category;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part.charAt(0)).join('').toUpperCase();
  };

  // Calculate stats from actual data
  const totalAchievements = moments.filter(m => m.category === 'achievement').length;
  const totalParticipants = moments.reduce((sum, moment) => sum + moment.participants.length, 0);
  const totalLikes = moments.reduce((sum, moment) => sum + moment.likes, 0);
  const totalMemories = moments.length;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Navigation />
        <div className="pt-24 pb-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-8">
              Unable to load moments at the moment. Please try again later.
            </p>
            <Button onClick={() => mutate()}>
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
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
              Celebrating our journey, achievements, and the memories we&#39;ve
              created together
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                {isLoading ? "Loading..." : `${totalMemories} Memories`}
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                {totalLikes} Total Likes
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                {totalParticipants} Participants
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Moments */}
      {featuredMoments.length > 0 && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                Featured Moments
              </h2>
              <p className="text-muted-foreground">Special highlights from our community journey</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMoments.map((moment, index) => (
                <Card
                  key={moment._id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up border-2 border-yellow-200 hover:border-yellow-300 bg-yellow-50/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={moment.image || "/placeholder.svg"}
                      alt={moment.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-yellow-50">
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className="bg-background/80 backdrop-blur-sm"
                      >
                        {getCategoryDisplayName(moment.category)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-700 transition-colors">
                      {moment.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {moment.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(moment.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {moment.participants.length}+ people
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                        onClick={() => handleLike(moment._id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedMoments.includes(moment._id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                        <span className="ml-1 text-xs">{moment.likes}</span>
                      </Button>
                      <div className="text-xs text-muted-foreground">
                        {moment.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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
          <h2 className="text-3xl font-bold mb-8 text-center">
            All Moments {isLoading && "(Loading...)"}
          </h2>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading moments...</p>
            </div>
          ) : filteredMoments.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Moments Found</h3>
              <p className="text-muted-foreground mb-6">
                {selectedCategory !== 'All' 
                  ? `No ${selectedCategory.toLowerCase()} moments found.` 
                  : "No moments available yet. Check back soon!"}
              </p>
              {selectedCategory !== 'All' && (
                <Button onClick={() => setSelectedCategory("All")}>
                  Show All Moments
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMoments.map((moment, index) => (
                <Card
                  key={moment._id}
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
                      <Badge
                        variant="secondary"
                        className="bg-background/80 backdrop-blur-sm"
                      >
                        {getCategoryDisplayName(moment.category)}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        onClick={() => handleLike(moment._id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            likedMoments.includes(moment._id)
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                        <span className="ml-1 text-xs">{moment.likes}</span>
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {moment.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {moment.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(moment.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {moment.participants.length}+ people
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {moment.participants
                          .slice(0, 3)
                          .map((participant, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground border-2 border-background"
                            >
                              {getInitials(participant)}
                            </div>
                          ))}
                        {moment.participants.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold border-2 border-background">
                            +{moment.participants.length - 3}
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                    {moment.tags && moment.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {moment.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Journey in Numbers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every moment counts in building our amazing tech community
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                label: "Achievements",
                value: `${totalAchievements}+`,
                color: "text-yellow-500",
              },
              {
                icon: Users,
                label: "Participants",
                value: `${totalParticipants}+`,
                color: "text-blue-500",
              },
              {
                icon: Camera,
                label: "Memories",
                value: `${totalMemories}+`,
                color: "text-green-500",
              },
              {
                icon: Heart,
                label: "Total Likes",
                value: `${totalLikes}+`,
                color: "text-red-500",
              },
            ].map((stat, index) => (
              <Card
                key={stat.label}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick snapshots of our favorite moments
            </p>
          </div>
          {moments.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {moments.slice(0, 12).map((moment, i) => (
                <div
                  key={moment._id}
                  className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <img
                    src={moment.image || "/placeholder.svg"}
                    alt={moment.title}
                    className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No moments to display yet.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}