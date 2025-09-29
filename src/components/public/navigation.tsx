// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Menu, X, Code, Users, Calendar, BookOpen, Mail, Heart } from "lucide-react"

// const navItems = [
//   { name: "Home", href: "/", icon: Code },
//   { name: "Team", href: "/team", icon: Users },
//   { name: "Hiring", href: "/hiring", icon: Users },
//   { name: "Events", href: "/events", icon: Calendar },
//   { name: "Resources", href: "/resources", icon: BookOpen },
//   { name: "Happy Moments", href: "/happy-moments", icon: Heart },
//   { name: "Contact", href: "/contact", icon: Mail },
// ]

// export function Navigation() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link href="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//               <Code className="w-5 h-5 text-primary-foreground" />
//             </div>
//             <span className="font-bold text-xl">MLSA</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-1"
//               >
//                 <item.icon className="w-4 h-4" />
//                 <span>{item.name}</span>
//               </Link>
//             ))}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
//               {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-card border border-border rounded-lg mt-2">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200 flex items-center space-x-2"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span>{item.name}</span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

















"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Code, Users, Calendar, BookOpen, Mail, Heart, Settings } from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Code },
  { name: "Team", href: "/team", icon: Users },
  { name: "Hiring", href: "/hiring", icon: Users },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Happy Moments", href: "/happy-moments", icon: Heart },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "Admin", href: "/admin", icon: Settings },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">MLSA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-1"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border border-border rounded-lg mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors duration-200 flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
