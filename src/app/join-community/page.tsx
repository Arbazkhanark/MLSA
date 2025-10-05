"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, MessageCircle, QrCode, Shield, Sparkles, Calendar, Trophy, Download } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/public/navigation"
import { Footer } from "@/components/public/footer"
import QRCode from "qrcode"

export default function JoinCommunityPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const whatsappLink = "https://chat.whatsapp.com/GfsBZEHM0gMCDVChBbDzRj?mode=ems_qr_t"
  const groupInviteCode = "GfsBZEHM0gMCDVChBbDzRj"

  // Generate QR Code
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(whatsappLink, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
        setQrCodeDataUrl(url)
        
        // Also draw on canvas for download
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, whatsappLink, {
            width: 256,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          })
        }
      } catch (err) {
        console.error('Error generating QR code:', err)
      }
    }

    generateQRCode()
  }, [whatsappLink])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(whatsappLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQRCode = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a')
      link.download = 'mlsa-auh-whatsapp-qr.png'
      link.href = qrCodeDataUrl
      link.click()
    }
  }

  const benefits = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Instant Updates",
      description: "Get real-time notifications about events, workshops, and opportunities"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Connect with Peers",
      description: "Network with 150+ tech enthusiasts from AUH"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Event Reminders",
      description: "Never miss important deadlines or events"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe Space",
      description: "Verified AUH student community with proper guidelines"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Exclusive Content",
      description: "Access to private resources and learning materials"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Career Opportunities",
      description: "First access to internships and mentorship programs"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(101,163,255,0.15),transparent_50%)]" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
            <Users className="w-10 h-10 text-primary" />
          </div>
        </div>
        <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-accent" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-14 h-14 bg-chart-3/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-chart-3" />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Badge */}
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

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Join Our Community
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with fellow AUH students and be part of Amity University Haryana&apos;s most vibrant tech community
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - QR Code & Join Options */}
            <div className="space-y-8">
              <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-primary/20">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <QrCode className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">Scan to Join</h3>
                  <p className="text-muted-foreground mb-6">
                    Scan this QR code with your WhatsApp to instantly join our community
                  </p>

                  {/* QR Code Container */}
                  <div className="bg-white p-6 rounded-2xl shadow-lg inline-block mb-6 border-2 border-primary/20">
                    <div className="w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center p-4">
                      <div className="bg-white p-4 rounded-lg shadow-inner border flex flex-col items-center">
                        {qrCodeDataUrl ? (
                          <>
                            <img 
                              src={qrCodeDataUrl} 
                              alt="WhatsApp Group QR Code"
                              className="w-48 h-48"
                            />
                            <p className="text-xs text-gray-600 mt-2 font-mono">
                              MLSA x AUH WhatsApp Group
                            </p>
                          </>
                        ) : (
                          <div className="w-48 h-48 flex items-center justify-center">
                            <div className="text-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                              <p className="text-xs text-gray-500">Generating QR Code...</p>
                            </div>
                          </div>
                        )}
                        {/* Hidden canvas for download */}
                        <canvas ref={canvasRef} className="hidden" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full animate-glow bg-green-600 hover:bg-green-700"
                      onClick={() => window.open(whatsappLink, '_blank')}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Join WhatsApp Group
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={copyToClipboard}
                      >
                        {copied ? "Copied!" : "Copy Link"}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={downloadQRCode}
                        disabled={!qrCodeDataUrl}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Save QR
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Benefits */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join Our Community?</h2>
                <p className="text-xl text-muted-foreground">
                  Be part of something bigger. Connect, learn, and grow with like-minded students at AUH.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <Card 
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-card/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                          {benefit.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Community Guidelines</h2>
            <p className="text-xl text-muted-foreground">
              To ensure a positive experience for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Be Respectful</h3>
                <p className="text-sm text-muted-foreground">
                  Treat all members with respect and maintain a positive environment
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Stay Relevant</h3>
                <p className="text-sm text-muted-foreground">
                  Keep discussions focused on tech, learning, and community events
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Share Knowledge</h3>
                <p className="text-sm text-muted-foreground">
                  Help others learn and grow by sharing your knowledge and experiences
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-chart-3 mb-2">24/7</div>
              <div className="text-muted-foreground">Active Chat</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-chart-4 mb-2">100%</div>
              <div className="text-muted-foreground">Student-Run</div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Connect?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join 150+ AUH students who are already part of our growing tech community
            </p>
            <Button 
              size="lg" 
              className="animate-glow bg-green-600 hover:bg-green-700"
              onClick={() => window.open(whatsappLink, '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join WhatsApp Group Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}