"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  MessageSquare,
  Phone,
  Mail,
  Building,
  User,
  Clock,
  Search,
  Filter,
} from "lucide-react"

interface Message {
  id: string
  sender: "mmp" | "consultant"
  senderName: string
  content: string
  timestamp: Date
  isRead: boolean
}

interface Client {
  id: string
  name: string
  company: string
  avatar?: string
  lastSeen: string
  unreadCount: number
  isOnline: boolean
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    company: "Hormuud Telecom",
    lastSeen: "2 minutes ago",
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: "2",
    name: "Fatima Ali",
    company: "Somtel",
    lastSeen: "1 hour ago",
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: "3",
    name: "Omar Mohamed",
    company: "Golis Telecom",
    lastSeen: "3 days ago",
    unreadCount: 0,
    isOnline: false,
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "mmp",
    senderName: "Ahmed Hassan",
    content: "Hi Sarah, I have a question about the Risk Management documentation requirements.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: true,
  },
  {
    id: "2",
    sender: "consultant",
    senderName: "Sarah Consultant",
    content: "Hello Ahmed! Of course, I'd be happy to help. What specific aspect of Risk Management are you looking for?",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    isRead: true,
  },
  {
    id: "3",
    sender: "mmp",
    senderName: "Ahmed Hassan",
    content: "I need to understand the specific indicators for operational risk assessment. Can you point me to the right section?",
    timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    isRead: true,
  },
  {
    id: "4",
    sender: "consultant",
    senderName: "Sarah Consultant",
    content: "Absolutely! The operational risk indicators are covered in Section 3.2 of the certification framework. You'll need to address indicators RM-001 through RM-015. Would you like me to send you the detailed checklist?",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    isRead: false,
  },
  {
    id: "5",
    sender: "mmp",
    senderName: "Ahmed Hassan",
    content: "Yes, that would be very helpful! Also, do you have any templates for the risk assessment reports?",
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    isRead: false,
  },
]

export function ChatInterface() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(mockClients[0])
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const filteredClients = mockClients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedClient) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "consultant",
        senderName: "Sarah Consultant",
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

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Yesterday"
    if (diffDays > 1) return date.toLocaleDateString()
    return formatTime(date)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
      {/* Client List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Clients</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-1">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedClient?.id === client.id ? "bg-muted border-l-2 border-primary" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={client.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                            {client.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {client.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-foreground truncate">{client.name}</p>
                          {client.unreadCount > 0 && (
                            <Badge className="ml-2 text-xs">{client.unreadCount}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{client.company}</p>
                        <p className="text-xs text-muted-foreground">{client.lastSeen}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-3">
        <Card className="h-full flex flex-col">
          {selectedClient ? (
            <>
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedClient.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                          {selectedClient.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {selectedClient.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{selectedClient.name}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Building className="w-3 h-3" />
                          <span>{selectedClient.company}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{selectedClient.lastSeen}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "consultant" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === "consultant"
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
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a client to start chatting</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
