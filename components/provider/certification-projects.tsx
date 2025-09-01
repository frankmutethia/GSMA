"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Eye,
  Upload,
  Download,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowRight,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface CertificationProject {
  projectName: string
  status: string
  statusId: string
  certificationNumber?: string
  dateIssued?: string
  dateExpires?: string
  workflowStatus: string
  progress: number
  currentStage: string
  totalStages: number
  completedStages: number
}

const mockProjects: CertificationProject[] = [
  {
    projectName: "2025_certi_trust_test",
    status: "(B) Certification Pending",
    statusId: "B",
    certificationNumber: "",
    dateIssued: "",
    dateExpires: "",
    workflowStatus: "in-progress",
    progress: 65,
    currentStage: "Assessment Phase",
    totalStages: 5,
    completedStages: 2,
  },
  {
    projectName: "2025_certitrust_test 2",
    status: "(A) Certification Application Review",
    statusId: "A",
    certificationNumber: "",
    dateIssued: "",
    dateExpires: "",
    workflowStatus: "in-progress",
    progress: 35,
    currentStage: "Document Review",
    totalStages: 5,
    completedStages: 1,
  },
  {
    projectName: "2025_certitrust_test",
    status: "(A) Certification Application Review",
    statusId: "A",
    certificationNumber: "",
    dateIssued: "",
    dateExpires: "",
    workflowStatus: "in-progress",
    progress: 20,
    currentStage: "Application Submission",
    totalStages: 5,
    completedStages: 1,
  },
]

export function CertificationProjects() {
  const [projects] = useState<CertificationProject[]>(mockProjects)

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
            <CardTitle className="text-xl font-bold text-foreground">Active Certification Projects</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track progress and manage your certification applications
            </p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" />
            {projects.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/40 border-b border-border/50">
                <TableHead className="font-semibold text-foreground px-6 py-4">Project Details</TableHead>
                <TableHead className="font-semibold text-foreground">Status & Progress</TableHead>
                <TableHead className="font-semibold text-foreground">Timeline</TableHead>
                <TableHead className="font-semibold text-foreground">Certification Info</TableHead>
                <TableHead className="text-right font-semibold text-foreground px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-muted/20 transition-colors duration-200 border-b border-border/30 group"
                >
                  <TableCell className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.projectName}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Created: Jan 15, 2025</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="space-y-3">
                      <Badge
                        variant={getStatusBadgeVariant(project.statusId)}
                        className={`${getStatusColor(project.statusId)} flex items-center space-x-1 w-fit`}
                      >
                        {getStatusIcon(project.statusId)}
                        <span className="text-xs font-medium">{project.status}</span>
                      </Badge>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{project.currentStage}</span>
                          <span className="font-medium text-foreground">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2 bg-muted/50" />
                        <div className="text-xs text-muted-foreground">
                          {project.completedStages} of {project.totalStages} stages completed
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Est. completion:</span>
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {index === 0 ? "Mar 15, 2025" : index === 1 ? "Apr 20, 2025" : "May 10, 2025"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {index === 0 ? "~45 days remaining" : index === 1 ? "~75 days remaining" : "~95 days remaining"}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Number:</span>
                        <span className="ml-2 font-medium">{project.certificationNumber || "Pending"}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Issued:</span>
                        <span className="ml-2 font-medium">{project.dateIssued || "Pending"}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Expires:</span>
                        <span className="ml-2 font-medium">{project.dateExpires || "TBD"}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-right px-6 py-4">
                    <div className="flex items-center justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-green-50 hover:text-green-600 transition-colors"
                        title="Upload Documents"
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-purple-50 hover:text-purple-600 transition-colors"
                        title="Download Reports"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Link href={`/workflow/${project.projectName}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10 hover:text-primary transition-colors group/btn"
                          title="View Workflow"
                        >
                          <BarChart3 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
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
                  <span className="text-muted-foreground">Upload pending documentation for active applications</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Respond to assessor feedback within 48 hours</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Download certification toolkit for guidance</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Set up notifications for status updates</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Get Toolkit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
