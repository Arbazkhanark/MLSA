"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Code,
  Users,
  Calendar,
  BookOpen,
  Zap,
  Globe,
  Award,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/public/navigation";
import { Footer } from "@/components/public/footer";

// Predefined positions and values to avoid hydration mismatches
const PREDEFINED_ASTEROIDS = [
  { left: 10, top: 20, size: 4, delay: 2, duration: 25, rotation: 45 },
  { left: 80, top: 60, size: 6, delay: 5, duration: 30, rotation: 120 },
  { left: 30, top: 80, size: 3, delay: 8, duration: 35, rotation: 270 },
  { left: 70, top: 30, size: 5, delay: 12, duration: 28, rotation: 180 },
  { left: 50, top: 50, size: 7, delay: 15, duration: 32, rotation: 90 },
  { left: 20, top: 40, size: 4, delay: 18, duration: 26, rotation: 315 },
  { left: 90, top: 70, size: 5, delay: 22, duration: 29, rotation: 200 },
  { left: 40, top: 10, size: 6, delay: 25, duration: 31, rotation: 150 },

  { left: 5, top: 90, size: 4, delay: 2, duration: 25, rotation: 45 },
  { left: 30, top: 10, size: 6, delay: 0.5, duration: 30, rotation: 120 },
  { left: 60, top: 20, size: 3, delay: 0.8, duration: 35, rotation: 270 },
  { left: 55, top: 70, size: 5, delay: 12, duration: 28, rotation: 180 },
  { left: 89, top: 56, size: 7, delay: 1, duration: 32, rotation: 90 },
  { left: 20, top: 48, size: 4, delay: 18, duration: 26, rotation: 315 },
  { left: 92, top: 77, size: 5, delay: 4, duration: 29, rotation: 200 },
  { left: 16, top: 1, size: 6, delay: 5, duration: 31, rotation: 150 },
];

const PREDEFINED_LARGE_ASTEROIDS = [
  {
    left: 15,
    top: 25,
    size: 20,
    delay: 3,
    duration: 40,
    rotation: 60,
    scale: 0.8,
  },
  {
    left: 75,
    top: 65,
    size: 25,
    delay: 7,
    duration: 45,
    rotation: 150,
    scale: 1.1,
  },
  {
    left: 35,
    top: 85,
    size: 18,
    delay: 10,
    duration: 50,
    rotation: 300,
    scale: 0.9,
  },
  {
    left: 85,
    top: 35,
    size: 22,
    delay: 14,
    duration: 42,
    rotation: 210,
    scale: 1.2,
  },
  {
    left: 55,
    top: 55,
    size: 28,
    delay: 17,
    duration: 48,
    rotation: 120,
    scale: 0.7,
  },
  {
    left: 25,
    top: 45,
    size: 19,
    delay: 21,
    duration: 44,
    rotation: 330,
    scale: 1.0,
  },

  {
    left: 10,
    top: 30,
    size: 20,
    delay: 3,
    duration: 40,
    rotation: 60,
    scale: 0.8,
  },
  {
    left: 50,
    top: 20,
    size: 25,
    delay: 7,
    duration: 45,
    rotation: 150,
    scale: 1.1,
  },
  {
    left: 40,
    top: 85,
    size: 18,
    delay: 10,
    duration: 50,
    rotation: 300,
    scale: 0.9,
  },
  {
    left: 95,
    top: 15,
    size: 22,
    delay: 14,
    duration: 42,
    rotation: 210,
    scale: 1.2,
  },
  {
    left: 36,
    top: 56,
    size: 28,
    delay: 17,
    duration: 48,
    rotation: 120,
    scale: 0.7,
  },
  {
    left: 25,
    top: 45,
    size: 19,
    delay: 21,
    duration: 44,
    rotation: 330,
    scale: 1.0,
  },

  {
    left: 6,
    top: 3,
    size: 20,
    delay: 3,
    duration: 40,
    rotation: 60,
    scale: 0.8,
  },
  {
    left: 24,
    top: 28,
    size: 25,
    delay: 7,
    duration: 45,
    rotation: 150,
    scale: 1.1,
  },
  {
    left: 46,
    top: 85,
    size: 18,
    delay: 10,
    duration: 50,
    rotation: 300,
    scale: 0.9,
  },
  {
    left: 9,
    top: 5,
    size: 22,
    delay: 14,
    duration: 42,
    rotation: 210,
    scale: 1.2,
  },
  {
    left: 36,
    top: 76,
    size: 28,
    delay: 17,
    duration: 48,
    rotation: 120,
    scale: 0.7,
  },
  {
    left: 58,
    top: 45,
    size: 19,
    delay: 21,
    duration: 44,
    rotation: 330,
    scale: 1.0,
  },
];

const PREDEFINED_GALAXIES = [
  { left: 20, top: 30, width: 200, height: 180, delay: 2, duration: 20 },
  { left: 70, top: 60, width: 180, height: 220, delay: 6, duration: 25 },
  { left: 40, top: 80, width: 220, height: 190, delay: 10, duration: 22 },
  { left: 80, top: 20, width: 190, height: 210, delay: 14, duration: 28 },
  { left: 30, top: 50, width: 210, height: 200, delay: 18, duration: 24 },
];

const PREDEFINED_BLACK_HOLES = [
  { left: 25, top: 35, size: 250, delay: 3 },
  { left: 65, top: 65, size: 300, delay: 8 },
  { left: 45, top: 15, size: 280, delay: 13 },
];

const PREDEFINED_NEBULAS = [
  { left: 60, top: 40, width: 400, height: 380, delay: 5, duration: 25 },
  { left: 20, top: 70, width: 350, height: 420, delay: 12, duration: 30 },
  { left: 80, top: 30, width: 380, height: 360, delay: 18, duration: 28 },
  { left: 50, top: 80, width: 380, height: 360, delay: 18, duration: 28 },
  { left: 70, top: 90, width: 380, height: 360, delay: 18, duration: 28 },
  { left: 90, top: 20, width: 380, height: 360, delay: 18, duration: 28 },
  { left: 10, top: 10, width: 380, height: 360, delay: 18, duration: 28 },
  { left: 30, top: 50, width: 380, height: 360, delay: 18, duration: 28 },
  { left: 40, top: 50, width: 380, height: 360, delay: 18, duration: 28 },
];

const PREDEFINED_SHOOTING_STARS = [
  { left: 10, top: 20, delay: 2, duration: 1.5 },
  { left: 30, top: 40, delay: 8, duration: 2.0 },
  { left: 50, top: 60, delay: 15, duration: 1.8 },
  { left: 70, top: 80, delay: 22, duration: 2.2 },
  { left: 90, top: 10, delay: 28, duration: 1.6 },

  { left: 5, top: 10, delay: 2, duration: 1.0 },
  { left: 20, top: 20, delay: 8, duration: 1.8 },
  { left: 30, top: 50, delay: 15, duration: 3.8 },
  { left: 40, top: 70, delay: 22, duration: 1.2 },
  { left: 50, top: 60, delay: 28, duration: 4.6 },
];

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navigation />

      {/* Space-themed Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Galaxy Clusters */}
        <div className="absolute inset-0">
          {PREDEFINED_GALAXIES.map((galaxy, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse-slow"
              style={{
                left: `${galaxy.left}%`,
                top: `${galaxy.top}%`,
                width: `${galaxy.width}px`,
                height: `${galaxy.height}px`,
                background: `radial-gradient(circle, 
                  rgba(101, 163, 255, 0.1) 0%,
                  rgba(101, 163, 255, 0.05) 30%,
                  transparent 70%)`,
                animationDelay: `${galaxy.delay}s`,
                animationDuration: `${galaxy.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Black Holes */}
        <div className="absolute inset-0">
          {PREDEFINED_BLACK_HOLES.map((hole, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-rotate-slow"
              style={{
                left: `${hole.left}%`,
                top: `${hole.top}%`,
                width: `${hole.size}px`,
                height: `${hole.size}px`,
                background: `radial-gradient(circle, 
                  rgba(0, 0, 0, 0.8) 0%,
                  rgba(101, 163, 255, 0.3) 20%,
                  rgba(101, 163, 255, 0.1) 40%,
                  transparent 70%)`,
                animationDelay: `${hole.delay}s`,
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>

        {/* Floating Asteroids */}
        <div className="absolute inset-0">
          {PREDEFINED_ASTEROIDS.map((asteroid, i) => (
            <div
              key={i}
              className="absolute animate-float-3d"
              style={{
                left: `${asteroid.left}%`,
                top: `${asteroid.top}%`,
                width: `${asteroid.size}px`,
                height: `${asteroid.size}px`,
                background: `linear-gradient(45deg, 
                  rgba(200, 200, 200, 0.5),
                  rgba(150, 150, 150, 0.3))`,
                borderRadius: "50%",
                boxShadow: `0 0 8px rgba(101, 163, 255, 0.5)`,
                animationDelay: `${asteroid.delay}s`,
                animationDuration: `${asteroid.duration}s`,
                transform: `rotate(${asteroid.rotation}deg)`,
                filter: `blur(0.3px)`,
              }}
            />
          ))}
        </div>

        {/* Large Asteroids */}
        <div className="absolute inset-0">
          {PREDEFINED_LARGE_ASTEROIDS.map((asteroid, i) => (
            <div
              key={i}
              className="absolute animate-float-3d-slow"
              style={{
                left: `${asteroid.left}%`,
                top: `${asteroid.top}%`,
                width: `${asteroid.size}px`,
                height: `${asteroid.size}px`,
                background: `linear-gradient(45deg, 
                  rgba(180, 180, 200, 0.5),
                  rgba(120, 120, 140, 0.3))`,
                borderRadius: "30%",
                boxShadow: `
                  0 0 15px rgba(101, 163, 255, 0.6),
                  inset 0 0 8px rgba(255, 255, 255, 0.1)
                `,
                animationDelay: `${asteroid.delay}s`,
                animationDuration: `${asteroid.duration}s`,
                transform: `rotate(${asteroid.rotation}deg) scale(${asteroid.scale})`,
                filter: `blur(0.5px)`,
              }}
            />
          ))}
        </div>

        {/* Shooting Stars - Only render on client to avoid hydration issues */}
        {isClient && (
          <div className="absolute inset-0">
            {PREDEFINED_SHOOTING_STARS.map((star, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                  boxShadow: `0 0 10px 2px rgba(101, 163, 255, 0.8)`,
                }}
              />
            ))}
          </div>
        )}

        {/* Nebula Clouds */}
        <div className="absolute inset-0">
          {PREDEFINED_NEBULAS.map((nebula, i) => (
            <div
              key={i}
              className="absolute animate-pulse-very-slow"
              style={{
                left: `${nebula.left}%`,
                top: `${nebula.top}%`,
                width: `${nebula.width}px`,
                height: `${nebula.height}px`,
                background: `radial-gradient(circle, 
                  rgba(101, 163, 255, 0.05) 0%,
                  rgba(120, 180, 255, 0.03) 30%,
                  transparent 70%)`,
                animationDelay: `${nebula.delay}s`,
                animationDuration: `${nebula.duration}s`,
                filter: "blur(20px)",
              }}
            />
          ))}
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Space Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(101,163,255,0.15),transparent_50%)]" />

        {/* Starfield Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* MLSA x AUH Badge with enhanced animation */}
            <div className="mb-8 animate-bounce-gentle">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-primary/30 bg-primary/10 backdrop-blur-sm hover:bg-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-x">
                  MLSA
                </span>
                <span className="text-lg text-muted-foreground">×</span>
                <span className="text-lg font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                  AUH
                </span>
              </div>
            </div>

            {/* Main Title with enhanced animation */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-gradient-x">
              Microsoft Learn <br />
              <span className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-primary pr-1">
                Student Ambassadors
              </span>
            </h1>

            {/* Subtitle with enhanced animation */}
            <div className="mb-8">
              <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
                Empowering the next generation of tech leaders at{" "}
                <span className="font-semibold text-primary ml-2 relative inline-block">
                  <span className="relative z-10">
                    Amity University Haryana
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-primary/20 -rotate-1 animate-pulse-slow" />
                </span>
              </p>
            </div>

            {/* CTA Buttons with enhanced animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="hover:scale-105 hover:shadow-md transition-transform duration-300 "
              >
                <Link href="/join-community" className="flex items-center">
                  Join Our Community
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:scale-105 transition-all duration-300 hover:shadow-md"
              >
                <Link href="/events" className="flex items-center">
                  Explore Events
                  <Calendar className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 animate-float-slow">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 hover:scale-110 transition-transform duration-300">
            <Code className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>
        <div
          className="absolute top-32 right-16 animate-float-medium"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-accent/30 hover:scale-110 transition-transform duration-300">
            <Users className="w-6 h-6 text-accent animate-pulse" />
          </div>
        </div>
        <div
          className="absolute bottom-32 left-20 animate-float-slow"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-14 h-14 bg-chart-3/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-chart-3/30 hover:scale-110 transition-transform duration-300">
            <Globe className="w-7 h-7 text-chart-3 animate-pulse" />
          </div>
        </div>
        <div
          className="absolute bottom-40 right-32 animate-float-medium"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="w-10 h-10 bg-chart-4/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-chart-4/30 hover:scale-110 transition-transform duration-300">
            <Zap className="w-5 h-5 text-chart-4 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground animate-pulse">
            Scroll Down
          </span>
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>

      {/* Rest of your existing sections remain the same */}
      <section className="py-20 bg-card/50 relative overflow-hidden">
        {/* Section Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
              Our Mission at AUH
            </h2>
            <p
              className="text-xl text-muted-foreground max-w-3xl mx-auto animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Building Amity University Haryana&apos;s most vibrant tech
              community where students learn, innovate, and lead together
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Learn & Grow",
                description:
                  "Access cutting-edge resources, workshops, and mentorship to accelerate your tech journey at AUH",
                color: "primary",
              },
              {
                icon: Users,
                title: "Build Community",
                description:
                  "Connect with AUH's brightest minds, collaborate on projects, and build lasting professional relationships",
                color: "accent",
              },
              {
                icon: Zap,
                title: "Drive Innovation",
                description:
                  "Lead initiatives, organize events, and make a real impact in AUH's tech ecosystem",
                color: "chart-3",
              },
            ].map((item, index) => (
              <Card
                key={item.title}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div
                    className={`w-16 h-16 bg-${item.color}/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-${item.color}/20 transition-all duration-300 group-hover:scale-110 relative z-10`}
                  >
                    <item.icon
                      className={`w-8 h-8 text-${item.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground relative z-10">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Active Members", color: "primary" },
              { number: "50+", label: "Events Hosted", color: "accent" },
              { number: "25+", label: "Projects Built", color: "chart-3" },
              { number: "100%", label: "Fun Guaranteed", color: "chart-4" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`text-4xl md:text-5xl font-bold text-${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300 animate-count-up`}
                >
                  {stat.number}
                </div>
                <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
              What We Offer at AUH
            </h2>
            <p
              className="text-xl text-muted-foreground animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Discover the exclusive opportunities for Amity University Haryana
              students
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: "Tech Events",
                description:
                  "Regular workshops, hackathons, and tech talks at AUH campus",
                color: "primary",
              },
              {
                icon: BookOpen,
                title: "Learning Resources",
                description:
                  "Curated content, tutorials, and study materials for AUH students",
                color: "accent",
              },
              {
                icon: Users,
                title: "Mentorship",
                description:
                  "Connect with industry professionals and senior AUH students",
                color: "chart-3",
              },
              {
                icon: Award,
                title: "Recognition",
                description:
                  "Certificates, badges, and career opportunities for AUH members",
                color: "chart-4",
              },
            ].map((item, index) => (
              <Card
                key={item.title}
                className="group hover:shadow-xl transition-all duration-500 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500" />
                  <item.icon
                    className={`w-8 h-8 text-${item.color} mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <h3 className="font-semibold mb-2 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground relative z-10">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-gradient-shift" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">
            Ready to Join MLSA AUH?
          </h2>
          <p
            className="text-xl text-muted-foreground mb-8 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Take the first step towards an exciting tech journey with Microsoft
            Learn Student Ambassadors at Amity University Haryana
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="animate-glow hover:scale-105 transition-transform duration-300"
            >
              <Link href="/hiring" className="flex items-center">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover:scale-105 transition-all duration-300 hover:shadow-md"
            >
              <Link href="/contact" className="flex items-center">
                Get in Touch
                <Users className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
