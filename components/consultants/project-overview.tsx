"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Building,
  User,
  BarChart3,
  Eye,
  Download,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

interface ProjectIndicator {
  id: string
  category: string
  name: string
  description: string
  status: "completed" | "pending" | "in-progress" | "requires-clarification"
  evidence: string[]
  lastUpdated: string
  assignedTo: string
  priority: "high" | "medium" | "low"
}

interface ProjectDocument {
  id: string
  name: string
  type: string
  status: "approved" | "pending" | "rejected" | "under-review"
  uploadedBy: string
  uploadedDate: string
  size: string
  version: string
}

const mockProjects = [
  {
    id: "1",
    companyName: "Hormuud Telecom",
    projectName: "2025_Hormuud_Recertification",
    status: "Assessment Phase",
    progress: 65,
    currentStage: "Assessment Phase",
    totalStages: 5,
    completedStages: 2,
    startDate: "Jan 10, 2025",
    estimatedCompletion: "Mar 15, 2025",
    totalIndicators: 280,
    completedIndicators: 182,
    pendingIndicators: 98,
  },
  {
    id: "2",
    companyName: "Somtel",
    projectName: "2025_Somtel_Initial",
    status: "Document Review",
    progress: 35,
    currentStage: "Document Review",
    totalStages: 5,
    completedStages: 1,
    startDate: "Jan 20, 2025",
    estimatedCompletion: "Mar 25, 2025",
    totalIndicators: 280,
    completedIndicators: 98,
    pendingIndicators: 182,
  },
]

const mockIndicators: ProjectIndicator[] = [
  {
    id: "RM-001",
    category: "Risk Management",
    name: "Operational Risk Assessment",
    description: "Comprehensive assessment of operational risks including technology, process, and human factors",
    status: "completed",
    evidence: ["Risk_Assessment_Report.pdf", "Risk_Register.xlsx"],
    lastUpdated: "2 days ago",
    assignedTo: "Hormuud Telecom",
    priority: "high",
  },
  {
    id: "RM-002",
    category: "Risk Management",
    name: "Risk Mitigation Strategies",
    description: "Documented strategies and controls to mitigate identified operational risks",
    status: "in-progress",
    evidence: ["Mitigation_Plan.pdf"],
    lastUpdated: "1 day ago",
    assignedTo: "Hormuud Telecom",
    priority: "high",
  },
  {
    id: "RM-003",
    category: "Risk Management",
    name: "Risk Monitoring Framework",
    description: "Framework for ongoing monitoring and review of risk mitigation effectiveness",
    status: "pending",
    evidence: [],
    lastUpdated: "3 days ago",
    assignedTo: "Hormuud Telecom",
    priority: "medium",
  },
]

const mockDocuments: ProjectDocument[] = [
  {
    id: "1",
    name: "Risk_Assessment_Report.pdf",
    type: "Risk Management",
    status: "approved",
    uploadedBy: "Ahmed Hassan",
    uploadedDate: "Jan 25, 2025",
    size: "2.4 MB",
    version: "1.0",
  },
  {
    id: "2",
    name: "Risk_Register.xlsx",
    type: "Risk Management",
    status: "approved",
    uploadedBy: "Ahmed Hassan",
    uploadedDate: "Jan 25, 2025",
    size: "1.8 MB",
    version: "1.0",
  },
  {
    id: "3",
    name: "Mitigation_Plan.pdf",
    type: "Risk Management",
    status: "under-review",
    uploadedBy: "Ahmed Hassan",
    uploadedDate: "Jan 28, 2025",
    size: "3.1 MB",
    version: "1.0",
  },
]

export function ProjectOverview() {
  const [projects] = useState(mockProjects)
  const [indicators] = useState(mockIndicators)
  const [documents] = useState(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(mockProjects[0])

  const filteredIndicators = indicators.filter((indicator) =>
    indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    indicator.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    indicator.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "pending":
        return "outline"
      case "requires-clarification":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "in-progress":
        return "text-blue-600"
      case "pending":
        return "text-yellow-600"
      case "requires-clarification":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-3 h-3" />
      case "in-progress":
        return <Clock className="w-3 h-3" />
      case "pending":
        return <Clock className="w-3 h-3" />
      case "requires-clarification":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Rejected</Badge>
      case "under-review":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Under Review</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Project Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedProject.id === project.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{project.companyName}</h3>
                    <p className="text-xs text-muted-foreground">{project.projectName}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {project.currentStage} • {project.completedStages}/{project.totalStages} stages
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Overview */}
      {selectedProject && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedProject.projectName}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedProject.companyName} • Started {selectedProject.startDate}
                </p>
              </div>
              <Badge variant="secondary">
                {selectedProject.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{selectedProject.progress}%</div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{selectedProject.completedIndicators}</div>
                <div className="text-sm text-muted-foreground">Completed Indicators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{selectedProject.pendingIndicators}</div>
                <div className="text-sm text-muted-foreground">Pending Indicators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.ceil((new Date(selectedProject.estimatedCompletion).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-muted-foreground">Days Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs for Indicators and Documents */}
      <Tabs defaultValue="indicators" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="indicators">Indicators ({indicators.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="indicators" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Indicators</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track progress on all 280 certification indicators
                  </p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search indicators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/40 border-b border-border/50">
                      <TableHead className="font-semibold text-foreground">Indicator</TableHead>
                      <TableHead className="font-semibold text-foreground">Status</TableHead>
                      <TableHead className="font-semibold text-foreground">Evidence</TableHead>
                      <TableHead className="font-semibold text-foreground">Last Updated</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIndicators.map((indicator) => (
                      <TableRow
                        key={indicator.id}
                        className="hover:bg-muted/20 transition-colors duration-200 border-b border-border/30"
                      >
                        <TableCell className="py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-sm text-foreground">{indicator.id}</div>
                            <div className="text-sm text-foreground">{indicator.name}</div>
                            <div className="text-xs text-muted-foreground">{indicator.description}</div>
                            <Badge variant="outline" className="text-xs">
                              {indicator.category}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge
                            variant={getStatusBadgeVariant(indicator.status)}
                            className={`${getStatusColor(indicator.status)} flex items-center space-x-1 w-fit`}
                          >
                            {getStatusIcon(indicator.status)}
                            <span className="text-xs font-medium capitalize">{indicator.status.replace("-", " ")}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="space-y-1">
                            {indicator.evidence.length > 0 ? (
                              indicator.evidence.map((doc, index) => (
                                <div key={index} className="text-xs text-muted-foreground flex items-center space-x-1">
                                  <FileText className="w-3 h-3" />
                                  <span>{doc}</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-xs text-muted-foreground">No evidence uploaded</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="text-sm text-muted-foreground">{indicator.lastUpdated}</div>
                          <div className="text-xs text-muted-foreground">Assigned to: {indicator.assignedTo}</div>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <div className="flex items-center justify-end space-x-1">
                            <a href={`/dashboard/consultant/projects/${selectedProject.id}`} aria-label="View checklist">
                              <Button variant="ghost" size="sm" title="View checklist">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </a>
                            <Button variant="ghost" size="sm" title="Download Evidence">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Link href={`/dashboard/consultant/communication?client=${selectedProject.id}`}>
                              <Button variant="ghost" size="sm" title="Send Message">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Documents</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Review and manage all uploaded project documents
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/40 border-b border-border/50">
                      <TableHead className="font-semibold text-foreground">Document</TableHead>
                      <TableHead className="font-semibold text-foreground">Type</TableHead>
                      <TableHead className="font-semibold text-foreground">Status</TableHead>
                      <TableHead className="font-semibold text-foreground">Uploaded By</TableHead>
                      <TableHead className="font-semibold text-foreground">Date</TableHead>
                      <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((document) => (
                      <TableRow
                        key={document.id}
                        className="hover:bg-muted/20 transition-colors duration-200 border-b border-border/30"
                      >
                        <TableCell className="py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-sm text-foreground">{document.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {document.size} • v{document.version}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge variant="outline" className="text-xs">
                            {document.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          {getDocumentStatusBadge(document.status)}
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{document.uploadedBy}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="text-sm text-muted-foreground">{document.uploadedDate}</div>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <div className="flex items-center justify-end space-x-1">
                            <Button variant="ghost" size="sm" title="View Document">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Download">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
