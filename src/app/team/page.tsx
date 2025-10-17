"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  Loader2,
} from "lucide-react";
import { Navigation } from "@/components/public/navigation";
import { Footer } from "@/components/public/footer";
import Image from "next/image";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  position: string;
  email: string;
  bio: string;
  avatar: string;
  skills: string[];
  location: string;
  joinDate: string;
  status: "active" | "inactive";
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: TeamMember[];
  total: number;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/team", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: ApiResponse = await response.json();

      if (data.success && data.data) {
        const activeMembers = data.data
          .filter((member) => member.status === "active")
          .map((member) => ({
            ...member,
            id: member._id,
            image: member.avatar || "/placeholder.svg",
            social: {
              ...member.social,
              email: member.email,
            },
          }));

        setTeamMembers(activeMembers);
      } else {
        setError("Failed to load team members");
      }
    } catch (err) {
      console.error("Error fetching team members:", err);
      setError("Failed to load team members. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading our amazing team...</p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold">Unable to load team</h3>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={fetchTeamMembers} className="mt-4">
              Try Again
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 animate-gradient-slow" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The passionate individuals driving our community forward and making
            a difference in the tech world.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Badge variant="secondary" className="text-sm">
              {teamMembers.length} Active Members
            </Badge>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card/60 backdrop-blur"
                  onMouseEnter={() => setHoveredMember(member._id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={
                        member.avatar ||
                        "https://images.pexels.com/photos/7605935/pexels-photo-7605935.jpeg"
                      }
                      alt={member.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      width={400}
                      height={400}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Social Icons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredMember === member._id ? 1 : 0,
                        y: hoveredMember === member._id ? 0 : 20,
                      }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3"
                    >
                      {member.social.github && (
                        <SocialIcon
                          href={member.social.github}
                          icon={<Github className="w-4 h-4" />}
                        />
                      )}
                      {member.social.linkedin && (
                        <SocialIcon
                          href={member.social.linkedin}
                          icon={<Linkedin className="w-4 h-4" />}
                        />
                      )}
                      {member.social.twitter && (
                        <SocialIcon
                          href={member.social.twitter}
                          icon={<Twitter className="w-4 h-4" />}
                        />
                      )}
                      {member.social.email && (
                        <SocialIcon
                          href={`mailto:${member.social.email}`}
                          icon={<Mail className="w-4 h-4" />}
                        />
                      )}
                    </motion.div>
                  </div>

                  <CardContent className="p-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl font-semibold mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      {member.position && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {member.position}
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm mt-4 mb-4 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                      {member.skills && member.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.skills.slice(0, 4).map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {member.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                      )}
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
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 bg-card/50 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            We’re always looking for passionate individuals to help grow our
            community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/hiring"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
            >
              View Open Positions
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-all font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
    >
      {icon}
    </a>
  );
}

function Button({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium ${className}`}
    >
      {children}
    </button>
  );
}
