"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, MessageSquare, Clock, Search } from "lucide-react"

interface ReviewProject {
  id: string
  projectName: string
  providerCompany: string
  status: string
  priority: "High" | "Medium" | "Low"
  submittedDate: string
  dueDate: string
  documentsCount: number
  completedIndicators: number
  totalIndicators: number
}

const mockProjects: ReviewProject[] = [
  {
    id: "1",
    projectName: "2025_Hormuud Telecom_Recertification",
    providerCompany: "Hormuud Telecom",
    status: "Application Review",
    priority: "High",
    submittedDate: "2025-01-15",
    dueDate: "2025-02-15",
    documentsCount: 45,
    completedIndicators: 120,
    totalIndicators: 280,
  },
  {
    id: "2",
    projectName: "2025_Ethio Telecom_Certification",
    providerCompany: "Ethio Telecom",
    status: "Document Review",
    priority: "Medium",
    submittedDate: "2025-01-10",
    dueDate: "2025-02-10",
    documentsCount: 38,
    completedIndicators: 85,
    totalIndicators: 280,
  },
  {
    id: "3",
    projectName: "2025_Vodacom_Recertification",
    providerCompany: "Vodacom TZ",
    status: "Pending Clarification",
    priority: "High",
    submittedDate: "2025-01-08",
    dueDate: "2025-02-08",
    documentsCount: 52,
    completedIndicators: 200,
    totalIndicators: 280,
  },
  {
    id: "4",
    projectName: "2025_certi_trust_test",
    providerCompany: "Dummy Provider",
    status: "Initial Review",
    priority: "Low",
    submittedDate: "2025-01-20",
    dueDate: "2025-02-20",
    documentsCount: 12,
    completedIndicators: 25,
    totalIndicators: 280,
  },
]

export function ReviewQueue() {
  const [projects] = useState<ReviewProject[]>(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.providerCompany.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Application Review":
        return "default"
      case "Document Review":
        return "secondary"
      case "Pending Clarification":
        return "destructive"
      case "Initial Review":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Queue</CardTitle>
        <CardDescription>Certification applications awaiting your assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects or providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Application Review">Application Review</SelectItem>
              <SelectItem value="Document Review">Document Review</SelectItem>
              <SelectItem value="Pending Clarification">Pending Clarification</SelectItem>
              <SelectItem value="Initial Review">Initial Review</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High Priority</SelectItem>
              <SelectItem value="Medium">Medium Priority</SelectItem>
              <SelectItem value="Low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.projectName}</TableCell>
                  <TableCell>{project.providerCompany}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(project.status)}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(project.priority)}>{project.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${getProgressPercentage(project.completedIndicators, project.totalIndicators)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {project.completedIndicators}/{project.totalIndicators}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{project.dueDate}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4" />
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
  )
}
