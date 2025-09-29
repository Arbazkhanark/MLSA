"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const faqResponses: Record<string, string> = {
  "how to join":
    "You can join MLSA by visiting our Hiring page and filling out the application form. We welcome students of all skill levels!",
  events:
    "We host regular workshops, seminars, and hackathons. Check our Events page for upcoming activities and registration details.",
  requirements:
    "No prior experience required! We provide mentorship and learning opportunities for beginners. Just bring your enthusiasm to learn!",
  contact:
    "You can reach us at mlsa@college.edu or visit our office during office hours: Mon-Fri 2-6 PM, Sat 10 AM-2 PM.",
  resources:
    "We offer curated learning materials, tutorials, and tools on our Resources page. Everything is free for students!",
  team: "Our team consists of passionate students led by experienced mentors. Visit our Team page to meet everyone!",
  hello:
    "Hello! Welcome to MLSA! I'm here to help answer your questions about our community. How can I assist you today?",
  help: "I can help you with information about joining MLSA, our events, resources, team, and general questions. Just ask me anything!",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm the MLSA assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const [key, response] of Object.entries(faqResponses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    return "I'm not sure about that specific question, but you can always contact us directly at mlsa@college.edu or check our website for more information!"
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    const botResponse: Message = {
      id: messages.length + 2,
      text: getBotResponse(inputValue),
      sender: "bot",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, botResponse])
    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        size="lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 h-96 shadow-2xl border-border/50 animate-fade-in-up">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5 text-primary" />
              MLSA Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <span>{message.text}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Try asking about joining, events, or resources!</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
