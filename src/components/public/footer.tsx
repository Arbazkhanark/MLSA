import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Code, Instagram, Heart } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/mlsaxauh",
      icon: <Instagram className="w-5 h-5" />,
      color: "hover:text-pink-500"
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/MLSAxAUH",
      icon: <Twitter className="w-5 h-5" />,
      color: "hover:text-blue-400"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/mlsa-amity-university-haryana",
      icon: <Linkedin className="w-5 h-5" />,
      color: "hover:text-blue-600"
    },
    {
      name: "Email",
      url: "mailto:mlsa.auh@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      color: "hover:text-red-500"
    },
    {
      name: "Discord",
      url: "https://discord.com/channels/915679536472023091/915679536472023094",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.18.33.25c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
        </svg>
      ),
      color: "hover:text-indigo-500"
    }
  ];

  const developerLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Arbazkhanark",
      icon: <Github className="w-4 h-4" />,
      color: "hover:text-gray-700 dark:hover:text-gray-300"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/arbaz-khan-0bb1aa1a0/",
      icon: <Linkedin className="w-4 h-4" />,
      color: "hover:text-blue-600"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/arbaazkhanark/",
      icon: <Instagram className="w-4 h-4" />,
      color: "hover:text-pink-500"
    }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src={"/logo.png"}
                alt={"mlsa logo"}
                height={150}
                width={150}
              />
              <span className="font-bold text-xl">MLSA</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering students through technology and community. Join us in
              building the future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/team"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/hiring"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hiring
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/happy-moments"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Happy Moments
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.com/channels/915679536472023091/915679536472023094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="mailto:mlsa.auh@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Email Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Follow us on social media for updates
              </p>
              <div className="flex flex-wrap gap-1">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border hover:border-primary/50"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Developer Credit - Subtle and Professional */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                &copy; 2025 Microsoft Learn Student Ambassadors. All rights reserved.
              </p>
            </div>
            
            {/* Developer Credit */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Built with</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span>by</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">Arbaz Khan</span>
                <div className="flex gap-2">
                  {developerLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-muted-foreground transition-colors ${link.color}`}
                      aria-label={`Arbaz Khan's ${link.name}`}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}