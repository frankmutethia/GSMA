"use client"

import { useState, useEffect, useRef } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, MessageSquare, Phone, Mail, Building, Clock, CheckCircle } from "lucide-react"

interface Message {
  id: string
  sender: "mmp" | "consultant"
  senderName: string
  content: string
  timestamp: Date
  isRead: boolean
}

const mockConsultant = {
  name: "Sarah Johnson",
  organization: "GSMA Consulting",
  specialty: "Risk Management & Compliance",
  status: "active",
  avatar: undefined,
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "consultant",
    senderName: "Sarah Johnson",
    content: "Hello Joyce! I've reviewed your Risk Management documentation and I have some feedback to share.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: true,
  },
  {
    id: "2",
    sender: "mmp",
    senderName: "Joyce (Hormuud Telecom)",
    content: "Hi Sarah! Thank you for the review. I'm ready to hear your feedback.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    isRead: true,
  },
  {
    id: "3",
    sender: "consultant",
    senderName: "Sarah Johnson",
    content: "Great! Your risk assessment framework is solid, but I noticed a few areas that could be strengthened. Let me send you a detailed review document.",
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    isRead: true,
  },
  {
    id: "4",
    sender: "mmp",
    senderName: "Joyce (Hormuud Telecom)",
    content: "That would be very helpful. I'm particularly concerned about the operational risk indicators section.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    isRead: false,
  },
]

export default function ProviderConsultantChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "mmp",
        senderName: "Joyce (Hormuud Telecom)",
        content: newMessage.trim(),
        timestamp: new Date(),
        isRead: false,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <DashboardLayout role="mmp">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chat with Your Consultant</h1>
          <p className="text-muted-foreground">
            Communicate directly with {mockConsultant.name} for guidance and support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Consultant Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Consultant Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src={mockConsultant.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl">
                      {mockConsultant.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-foreground">{mockConsultant.name}</h3>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Building className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{mockConsultant.organization}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2">Specialty</h4>
                    <p className="text-xs text-muted-foreground">{mockConsultant.specialty}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2">Status</h4>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                        Active
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-foreground mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Phone className="w-3 h-3 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Mail className="w-3 h-3 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={mockConsultant.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                        {mockConsultant.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{mockConsultant.name}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{mockConsultant.organization}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>Online</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "mmp" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === "mmp"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium opacity-80">
                              {message.senderName}
                            </span>
                            <span className="text-xs opacity-60">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-border/50">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
