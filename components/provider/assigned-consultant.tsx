"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Globe,
  Building,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  User,
  FileText,
  Award,
} from "lucide-react"
import Link from "next/link"

interface AssignedConsultant {
  id: string
  name: string
  email: string
  phone: string
  organization: string
  specialty: string
  languages: string[]
  status: "active" | "busy" | "offline"
  rating: number
  totalProjects: number
  experience: string
  hourlyRate: string
  avatar?: string
  bio: string
  assignedDate: string
  nextMeeting: string
  totalHours: number
  projectProgress: number
}

const mockAssignedConsultant: AssignedConsultant = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.johnson@gsma.com",
  phone: "+1 (555) 123-4567",
  organization: "GSMA Consulting",
  specialty: "Risk Management & Compliance",
  languages: ["English", "French", "Spanish"],
  status: "active",
  rating: 4.9,
  totalProjects: 24,
  experience: "8+ years",
  hourlyRate: "$150/hr",
  bio: "Expert in mobile money compliance with deep knowledge of GSMA standards and regulatory requirements across multiple jurisdictions. Specialized in helping MMPs navigate complex regulatory landscapes and achieve certification efficiently.",
  assignedDate: "January 15, 2025",
  nextMeeting: "March 10, 2025 at 2:00 PM",
  totalHours: 45,
  projectProgress: 75,
}

export function AssignedConsultant() {
  const [consultant] = useState<AssignedConsultant>(mockAssignedConsultant)

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      )
    }
    return stars
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
      case "busy":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Busy</Badge>
      case "offline":
        return <Badge className="bg-gray-500/10 text-gray-600 border-gray-500/20">Offline</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-3 h-3" />
      case "busy":
        return <Clock className="w-3 h-3" />
      case "offline":
        return <Clock className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Assigned Consultant</h2>
          <p className="text-muted-foreground">
            Professional guidance and support for your certification journey
          </p>
        </div>
        <Button variant="outline" className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
          <Users className="w-4 h-4 mr-2" />
          Request Change
        </Button>
      </div>

      {/* Consultant Profile Card */}
      <Card className="overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border/50">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={consultant.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                  {consultant.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl mb-2">{consultant.name}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Building className="w-3 h-3" />
                    <span>{consultant.organization}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Award className="w-3 h-3" />
                    <span>{consultant.specialty}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    {getStatusIcon(consultant.status)}
                    {getStatusBadge(consultant.status)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{consultant.hourlyRate}</div>
              <div className="text-sm text-muted-foreground">Hourly Rate</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Left Column - Contact & Info */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{consultant.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{consultant.phone}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Languages</h4>
                <div className="flex flex-wrap gap-1">
                  {consultant.languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Globe className="w-2 h-2 mr-1" />
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Experience & Rating</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(consultant.rating)}
                    <span className="text-sm text-muted-foreground ml-1">({consultant.rating})</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {consultant.experience} experience
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {consultant.totalProjects} successful projects
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Bio */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-3">About</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {consultant.bio}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Assignment Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Assigned since:</span>
                    <span className="font-medium">{consultant.assignedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total hours:</span>
                    <span className="font-medium">{consultant.totalHours} hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Project progress:</span>
                    <span className="font-medium">{consultant.projectProgress}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Actions & Schedule */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Link href="/dashboard/provider/consultant/chat">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Open Chat
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Request Document Review
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Next Meeting</h4>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">{consultant.nextMeeting}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Scheduled consultation
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-muted-foreground">Document review completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-3 h-3 text-blue-600" />
                    <span className="text-muted-foreground">Last message: 2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-3 h-3 text-purple-600" />
                    <span className="text-muted-foreground">Risk assessment updated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information Tabs */}
      <Card>
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress">Project Progress</TabsTrigger>
            <TabsTrigger value="communication">Communication History</TabsTrigger>
            <TabsTrigger value="documents">Shared Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-4">
            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-3">Certification Progress with Consultant</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">{consultant.projectProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${consultant.projectProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Consultant has contributed {consultant.totalHours} hours to your project
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-3">Recent Communications</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span>Risk Management consultation</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span>Document review feedback</span>
                  <span className="text-muted-foreground">1 day ago</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span>Project timeline update</span>
                  <span className="text-muted-foreground">3 days ago</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-3">Documents Shared with Consultant</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span>Risk_Assessment_Report.pdf</span>
                  <Badge variant="outline" className="text-xs">Reviewed</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span>Compliance_Checklist.xlsx</span>
                  <Badge variant="outline" className="text-xs">Under Review</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <span>Security_Framework.pdf</span>
                  <Badge variant="outline" className="text-xs">Pending</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
