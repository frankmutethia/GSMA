"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Search,
  Eye,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowRight,
  Users,
  Building,
} from "lucide-react"
import Link from "next/link"

interface AssignedMMP {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  projectName: string
  status: string
  statusId: string
  progress: number
  currentStage: string
  totalStages: number
  completedStages: number
  lastContact: string
  nextDeadline: string
  unreadMessages: number
}

const mockAssignedMMPs: AssignedMMP[] = [
  {
    id: "1",
    companyName: "Hormuud Telecom",
    contactPerson: "Ahmed Hassan",
    email: "ahmed.hassan@hormuud.com",
    phone: "+252 61 123 4567",
    projectName: "2025_Hormuud_Recertification",
    status: "Assessment Phase",
    statusId: "B",
    progress: 65,
    currentStage: "Assessment Phase",
    totalStages: 5,
    completedStages: 2,
    lastContact: "2 hours ago",
    nextDeadline: "March 15, 2025",
    unreadMessages: 3,
  },
  {
    id: "2",
    companyName: "Somtel",
    contactPerson: "Fatima Ali",
    email: "fatima.ali@somtel.com",
    phone: "+252 61 987 6543",
    projectName: "2025_Somtel_Initial",
    status: "Document Review",
    statusId: "A",
    progress: 35,
    currentStage: "Document Review",
    totalStages: 5,
    completedStages: 1,
    lastContact: "1 day ago",
    nextDeadline: "March 25, 2025",
    unreadMessages: 1,
  },
  {
    id: "3",
    companyName: "Golis Telecom",
    contactPerson: "Omar Mohamed",
    email: "omar.mohamed@golis.com",
    phone: "+252 61 456 7890",
    projectName: "2025_Golis_Recertification",
    status: "Application Review",
    statusId: "A",
    progress: 20,
    currentStage: "Application Submission",
    totalStages: 5,
    completedStages: 1,
    lastContact: "3 days ago",
    nextDeadline: "April 5, 2025",
    unreadMessages: 0,
  },
]

export function AssignedMMPs() {
  const [mmps, setMmps] = useState<AssignedMMP[]>(mockAssignedMMPs)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMMPs = mmps.filter((mmp) =>
    mmp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mmp.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mmp.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadgeVariant = (statusId: string) => {
    switch (statusId) {
      case "F":
        return "default" // Certification Issued
      case "B":
        return "secondary" // Certification Pending
      case "A":
        return "outline" // Application Review
      default:
        return "outline"
    }
  }

  const getStatusColor = (statusId: string) => {
    switch (statusId) {
      case "F":
        return "text-green-600"
      case "B":
        return "text-yellow-600"
      case "A":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (statusId: string) => {
    switch (statusId) {
      case "F":
        return <CheckCircle2 className="w-3 h-3" />
      case "B":
        return <Clock className="w-3 h-3" />
      case "A":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-foreground">Assigned MMP Clients</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your assigned Mobile Money Provider clients and track their certification progress
            </p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Users className="w-3 h-3 mr-1" />
            {mmps.length} Active Clients
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by company, contact person, or project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/40 border-b border-border/50">
                <TableHead className="font-semibold text-foreground px-6 py-4">Client Details</TableHead>
                <TableHead className="font-semibold text-foreground">Project Status</TableHead>
                <TableHead className="font-semibold text-foreground">Progress & Timeline</TableHead>
                <TableHead className="font-semibold text-foreground">Communication</TableHead>
                <TableHead className="text-right font-semibold text-foreground px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMMPs.map((mmp) => (
                <TableRow
                  key={mmp.id}
                  className="hover:bg-muted/20 transition-colors duration-200 border-b border-border/30 group"
                >
                  <TableCell className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {mmp.companyName}
                          </div>
                          <div className="text-sm text-muted-foreground">{mmp.contactPerson}</div>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <span>{mmp.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>{mmp.phone}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="space-y-3">
                      <div className="font-medium text-sm text-foreground">{mmp.projectName}</div>
                      <Badge
                        variant={getStatusBadgeVariant(mmp.statusId)}
                        className={`${getStatusColor(mmp.statusId)} flex items-center space-x-1 w-fit`}
                      >
                        {getStatusIcon(mmp.statusId)}
                        <span className="text-xs font-medium">{mmp.status}</span>
                      </Badge>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{mmp.currentStage}</span>
                          <span className="font-medium text-foreground">{mmp.progress}%</span>
                        </div>
                        <Progress value={mmp.progress} className="h-2 bg-muted/50" />
                        <div className="text-xs text-muted-foreground">
                          {mmp.completedStages} of {mmp.totalStages} stages completed
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next deadline:</span>
                      </div>
                      <div className="text-sm font-medium text-foreground">{mmp.nextDeadline}</div>
                      <div className="text-xs text-muted-foreground">
                        Last contact: {mmp.lastContact}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Messages:</span>
                        {mmp.unreadMessages > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-xs">
                            {mmp.unreadMessages} new
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {mmp.unreadMessages === 0 ? "All caught up" : `${mmp.unreadMessages} unread messages`}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-right px-6 py-4">
                    <div className="flex items-center justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="View Project Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Link href={`/dashboard/consultant/communication?client=${mmp.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-green-50 hover:text-green-600 transition-colors"
                          title="Open Chat"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/consultant/projects/${mmp.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-purple-50 hover:text-purple-600 transition-colors group/btn"
                          title="View Project Overview"
                        >
                          <FileText className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-6 bg-gradient-to-r from-muted/20 to-muted/10 border-t border-border/50">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <ArrowRight className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Recommended Actions</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Schedule follow-up calls with clients due this week</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Review pending document submissions for Hormuud Telecom</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Prepare assessment report for Somtel project</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Update project timelines for all active clients</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
