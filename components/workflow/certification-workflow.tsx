"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, FileText, User, Calendar, ArrowRight, AlertCircle, MessageSquare } from "lucide-react"
import { format } from "date-fns"

interface WorkflowStage {
  id: string
  name: string
  description: string
  status: "completed" | "active" | "pending" | "blocked"
  assignedTo?: string
  startDate?: Date
  completedDate?: Date
  estimatedDuration: number
  actualDuration?: number
  requirements: string[]
  documents: string[]
  comments?: string
}

interface CertificationWorkflow {
  projectId: string
  projectName: string
  provider: string
  currentStage: number
  overallProgress: number
  startDate: Date
  estimatedCompletion: Date
  stages: WorkflowStage[]
  notifications: WorkflowNotification[]
}

interface WorkflowNotification {
  id: string
  type: "info" | "warning" | "success" | "error"
  message: string
  timestamp: Date
  read: boolean
}

const mockWorkflow: CertificationWorkflow = {
  projectId: "cert-2025-001",
  projectName: "2025_Hormuud Telecom_Recertification",
  provider: "Hormuud Telecom",
  currentStage: 2,
  overallProgress: 65,
  startDate: new Date("2025-01-10"),
  estimatedCompletion: new Date("2025-03-15"),
  stages: [
    {
      id: "application",
      name: "Application Submission",
      description: "Initial application and project setup",
      status: "completed",
      assignedTo: "Hormuud Telecom",
      startDate: new Date("2025-01-10"),
      completedDate: new Date("2025-01-12"),
      estimatedDuration: 2,
      actualDuration: 2,
      requirements: ["Complete application form", "Submit company documentation", "Pay application fee"],
      documents: ["Application_Form.pdf", "Company_Registration.pdf", "Payment_Receipt.pdf"],
      comments: "Application submitted successfully with all required documentation.",
    },
    {
      id: "document-review",
      name: "Document Review",
      description: "Initial document review and validation",
      status: "completed",
      assignedTo: "Certi Trust",
      startDate: new Date("2025-01-13"),
      completedDate: new Date("2025-01-20"),
      estimatedDuration: 7,
      actualDuration: 7,
      requirements: ["Review all submitted documents", "Validate completeness", "Request clarifications if needed"],
      documents: ["Document_Review_Report.pdf"],
      comments: "All documents reviewed and validated. Minor clarifications requested and resolved.",
    },
    {
      id: "assessment",
      name: "Assessment Phase",
      description: "Detailed assessment of 280+ indicators",
      status: "active",
      assignedTo: "Certi Trust",
      startDate: new Date("2025-01-21"),
      estimatedDuration: 30,
      requirements: ["Assess all 280 indicators", "Conduct site visits if required", "Prepare assessment report"],
      documents: ["Assessment_Progress_Report.pdf"],
      comments: "Assessment in progress. 180 of 280 indicators completed.",
    },
    {
      id: "audit",
      name: "Final Audit",
      description: "Independent audit and verification",
      status: "pending",
      assignedTo: "Independent Auditor",
      estimatedDuration: 10,
      requirements: ["Review assessment findings", "Conduct independent verification", "Prepare audit report"],
      documents: [],
    },
    {
      id: "certification",
      name: "Certification Decision",
      description: "Final certification decision and issuance",
      status: "pending",
      assignedTo: "GSMA Certification Board",
      estimatedDuration: 5,
      requirements: ["Review audit report", "Make certification decision", "Issue certificate if approved"],
      documents: [],
    },
  ],
  notifications: [
    {
      id: "1",
      type: "info",
      message: "Assessment phase is 64% complete (180/280 indicators)",
      timestamp: new Date("2025-01-28"),
      read: false,
    },
    {
      id: "2",
      type: "success",
      message: "Document review phase completed successfully",
      timestamp: new Date("2025-01-20"),
      read: true,
    },
    {
      id: "3",
      type: "warning",
      message: "Clarification requested for Risk Management documentation",
      timestamp: new Date("2025-01-18"),
      read: true,
    },
  ],
}

export function CertificationWorkflow() {
  const [workflow] = useState<CertificationWorkflow>(mockWorkflow)
  const [selectedStage, setSelectedStage] = useState<WorkflowStage>(workflow.stages[workflow.currentStage])

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "active":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "blocked":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "active":
        return "secondary"
      case "blocked":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <MessageSquare className="w-4 h-4 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{workflow.projectName}</CardTitle>
              <CardDescription>
                {workflow.provider} • Started {format(workflow.startDate, "MMM dd, yyyy")}
              </CardDescription>
            </div>
            <Badge variant="secondary">
              Stage {workflow.currentStage + 1} of {workflow.stages.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{workflow.overallProgress}%</span>
              </div>
              <Progress value={workflow.overallProgress} className="h-2" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{workflow.currentStage + 1}</div>
                <div className="text-sm text-muted-foreground">Current Stage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {workflow.stages.filter((s) => s.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed Stages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.ceil((workflow.estimatedCompletion.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-muted-foreground">Days Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="workflow" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workflow">Workflow Stages</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Stages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workflow.stages.map((stage, index) => (
                      <div
                        key={stage.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedStage.id === stage.id ? "bg-muted border border-primary" : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedStage(stage)}
                      >
                        {getStageIcon(stage.status)}
                        <div className="flex-1">
                          <div className="font-medium text-sm">{stage.name}</div>
                          <Badge variant={getStatusBadgeVariant(stage.status)} className="text-xs mt-1">
                            {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                          </Badge>
                        </div>
                        {index < workflow.stages.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedStage.name}</CardTitle>
                  <CardDescription>{selectedStage.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2">Stage Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>Assigned to: {selectedStage.assignedTo || "Not assigned"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>
                            Duration: {selectedStage.actualDuration || selectedStage.estimatedDuration} days
                            {selectedStage.actualDuration &&
                              selectedStage.actualDuration !== selectedStage.estimatedDuration && (
                                <span className="text-muted-foreground"> (est. {selectedStage.estimatedDuration})</span>
                              )}
                          </span>
                        </div>
                        {selectedStage.startDate && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>Started: {format(selectedStage.startDate, "MMM dd, yyyy")}</span>
                          </div>
                        )}
                        {selectedStage.completedDate && (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Completed: {format(selectedStage.completedDate, "MMM dd, yyyy")}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Status</h4>
                      <Badge variant={getStatusBadgeVariant(selectedStage.status)} className="mb-3">
                        {selectedStage.status.charAt(0).toUpperCase() + selectedStage.status.slice(1)}
                      </Badge>
                      {selectedStage.comments && (
                        <p className="text-sm text-muted-foreground">{selectedStage.comments}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="space-y-1">
                      {selectedStage.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedStage.documents.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Documents</h4>
                      <div className="space-y-2">
                        {selectedStage.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{doc}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedStage.status === "active" && (
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Request Update</Button>
                      <Button>Mark Complete</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Chronological view of certification progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {workflow.stages.map((stage, index) => (
                  <div key={stage.id} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      {getStageIcon(stage.status)}
                      {index < workflow.stages.length - 1 && <div className="w-px h-12 bg-border mt-2" />}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{stage.name}</h4>
                        <Badge variant={getStatusBadgeVariant(stage.status)}>
                          {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{stage.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        {stage.assignedTo && <span>Assigned to: {stage.assignedTo}</span>}
                        {stage.startDate && <span>Started: {format(stage.startDate, "MMM dd")}</span>}
                        {stage.completedDate && <span>Completed: {format(stage.completedDate, "MMM dd")}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Notifications</CardTitle>
              <CardDescription>Recent updates and alerts for this certification project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workflow.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      notification.read ? "bg-muted/30" : "bg-muted"
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(notification.timestamp, "MMM dd, yyyy 'at' HH:mm")}
                      </p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
