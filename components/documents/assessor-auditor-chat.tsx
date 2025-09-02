"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Send, 
  MessageSquare, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle,
  HelpCircle,
  User,
  Shield,
  Eye,
  AlertCircle
} from "lucide-react"
import { format } from "date-fns"

interface ChatMessage {
  id: string
  sender: {
    id: string
    name: string
    role: "mmp" | "assessor" | "auditor"
    avatar?: string
  }
  content: string
  timestamp: Date
  documentId?: string
  documentName?: string
  messageType: "general" | "document_question" | "clarification_request" | "feedback"
  isRead: boolean
}

interface DocumentReference {
  id: string
  name: string
  status: "pending" | "approved" | "rejected" | "clarification"
  indicator: string
  project: string
  uploadedBy: string
}

// Mock data for different user roles
const mockUsers = {
  mmp: { id: "mmp1", name: "Hormuud Telecom", role: "mmp" as const },
  assessor: { id: "assessor1", name: "Sarah Johnson", role: "assessor" as const },
  auditor: { id: "auditor1", name: "Michael Chen", role: "auditor" as const }
}

const mockDocuments: DocumentReference[] = [
  {
    id: "1",
    name: "Legal_Framework_2025.pdf",
    status: "approved",
    indicator: "1.1 - Legal and Regulatory Framework",
    project: "2025_Hormuud Telecom_Recertification",
    uploadedBy: "Hormuud Telecom"
  },
  {
    id: "2",
    name: "Risk_Management_Policy.pdf",
    status: "clarification",
    indicator: "2.1 - Risk Management Framework",
    project: "2025_Hormuud Telecom_Recertification",
    uploadedBy: "Hormuud Telecom"
  },
  {
    id: "3",
    name: "AML_Compliance_Report.pdf",
    status: "pending",
    indicator: "2.2 - Anti-Money Laundering",
    project: "2025_Hormuud Telecom_Recertification",
    uploadedBy: "Hormuud Telecom"
  },
  {
    id: "4",
    name: "Customer_Protection_Policy.docx",
    status: "rejected",
    indicator: "3.1 - Customer Protection",
    project: "2025_Hormuud Telecom_Recertification",
    uploadedBy: "Hormuud Telecom"
  }
]

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    sender: mockUsers.mmp,
    content: "Hi team, I have a question about the Risk Management Policy document. The assessor mentioned it needs additional operational risk details. Could you clarify what specific information is required?",
    timestamp: new Date("2025-01-15T10:30:00"),
    documentId: "2",
    documentName: "Risk_Management_Policy.pdf",
    messageType: "clarification_request",
    isRead: true
  },
  {
    id: "2",
    sender: mockUsers.assessor,
    content: "Hello Hormuud Telecom. For the operational risk details, we need to see specific examples of how your organization identifies, assesses, and mitigates operational risks in your mobile money operations. This should include risk categories like technology failures, process inefficiencies, and human errors.",
    timestamp: new Date("2025-01-15T11:15:00"),
    documentId: "2",
    documentName: "Risk_Management_Policy.pdf",
    messageType: "feedback",
    isRead: true
  },
  {
    id: "3",
    sender: mockUsers.mmp,
    content: "Thank you for the clarification. I'll update the document to include specific operational risk examples and mitigation strategies. Should I also include our incident response procedures?",
    timestamp: new Date("2025-01-15T14:20:00"),
    documentId: "2",
    documentName: "Risk_Management_Policy.pdf",
    messageType: "document_question",
    isRead: false
  },
  {
    id: "4",
    sender: mockUsers.auditor,
    content: "Yes, incident response procedures would be very helpful. Also, please ensure you include your risk monitoring and reporting mechanisms. This will help us assess the effectiveness of your risk management framework.",
    timestamp: new Date("2025-01-15T15:45:00"),
    documentId: "2",
    documentName: "Risk_Management_Policy.pdf",
    messageType: "feedback",
    isRead: false
  }
]

interface AssessorAuditorChatProps {
  currentUserRole: "assessor" | "auditor"
  currentUserName: string
}

export function AssessorAuditorChat({ currentUserRole, currentUserName }: AssessorAuditorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<string>("all")
  const [messageType, setMessageType] = useState<string>("feedback")
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const currentUser = { id: currentUserRole === "assessor" ? "assessor1" : "auditor1", name: currentUserName, role: currentUserRole }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const filteredMessages = selectedDocument === "all" 
    ? messages 
    : messages.filter(msg => msg.documentId === selectedDocument)

  const unreadMessages = messages.filter(msg => !msg.isRead && msg.sender.role !== currentUser.role)

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: currentUser,
      content: newMessage,
      timestamp: new Date(),
      documentId: selectedDocument !== "all" ? selectedDocument : undefined,
      documentName: selectedDocument !== "all" 
        ? mockDocuments.find(doc => doc.id === selectedDocument)?.name 
        : undefined,
      messageType: messageType as any,
      isRead: false
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const markAsRead = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    )
  }

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case "document_question":
        return <FileText className="w-3 h-3" />
      case "clarification_request":
        return <HelpCircle className="w-3 h-3" />
      case "feedback":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <MessageSquare className="w-3 h-3" />
    }
  }

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "document_question":
        return "bg-blue-100 text-blue-800"
      case "clarification_request":
        return "bg-orange-100 text-orange-800"
      case "feedback":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "clarification":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "mmp":
        return <User className="w-3 h-3" />
      case "assessor":
        return <Eye className="w-3 h-3" />
      case "auditor":
        return <Shield className="w-3 h-3" />
      default:
        return <User className="w-3 h-3" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "mmp":
        return "bg-blue-100 text-blue-800"
      case "assessor":
        return "bg-purple-100 text-purple-800"
      case "auditor":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Document Discussion Chat
              </CardTitle>
              <CardDescription>
                Review and respond to MMP inquiries about document-related topics and evidence legibility
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getRoleColor(currentUser.role)}>
                {getRoleIcon(currentUser.role)}
                {currentUser.name}
              </Badge>
              {unreadMessages.length > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {unreadMessages.length} Unread
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">Chat Room</TabsTrigger>
              <TabsTrigger value="documents">Document References</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Documents</SelectItem>
                    {mockDocuments.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id}>
                        {doc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={messageType} onValueChange={setMessageType}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Message type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Discussion</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="document_question">Document Question</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border rounded-lg h-96 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.sender.role === currentUser.role ? "flex-row-reverse" : ""
                        }`}
                        onClick={() => message.sender.role !== currentUser.role && markAsRead(message.id)}
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback>
                            {message.sender.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className={`flex-1 max-w-[70%] ${
                          message.sender.role === currentUser.role ? "text-right" : ""
                        }`}>
                          <div className={`inline-block p-3 rounded-lg ${
                            message.sender.role === currentUser.role
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}>
                            {message.documentName && (
                              <div className="mb-2">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getMessageTypeColor(message.messageType)}`}
                                >
                                  {getMessageTypeIcon(message.messageType)}
                                  {message.documentName}
                                </Badge>
                              </div>
                            )}
                            <p className="text-sm">{message.content}</p>
                          </div>
                          
                          <div className={`mt-1 text-xs text-muted-foreground flex items-center gap-2 ${
                            message.sender.role === currentUser.role ? "justify-end" : ""
                          }`}>
                            <div className="flex items-center gap-1">
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getRoleColor(message.sender.role)}`}
                              >
                                {getRoleIcon(message.sender.role)}
                                {message.sender.name}
                              </Badge>
                            </div>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {format(message.timestamp, "MMM dd, HH:mm")}
                            </span>
                            {!message.isRead && message.sender.role !== currentUser.role && (
                              <Badge variant="outline" className="text-xs">
                                Unread
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your response..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <div className="grid gap-4">
                {mockDocuments.map((doc) => (
                  <Card key={doc.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">{doc.indicator}</p>
                          <p className="text-xs text-muted-foreground">Project: {doc.project}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(doc.id)
                            setActiveTab("chat")
                          }}
                        >
                          Discuss
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
