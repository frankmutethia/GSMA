"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Eye, Upload, Search, Filter, Calendar, User, FolderOpen } from "lucide-react"
import { format } from "date-fns"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadedDate: Date
  project: string
  indicator: string
  category: string
  status: "pending" | "approved" | "rejected" | "clarification"
  version: number
  comments?: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Legal_Framework_2025.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "Hormuud Telecom",
    uploadedDate: new Date("2025-01-15"),
    project: "2025_Hormuud Telecom_Recertification",
    indicator: "1.1 - Legal and Regulatory Framework",
    category: "Legal Framework",
    status: "approved",
    version: 2,
    comments: "Updated version with latest regulatory changes",
  },
  {
    id: "2",
    name: "Risk_Management_Policy.pdf",
    type: "PDF",
    size: "1.8 MB",
    uploadedBy: "Ethio Telecom",
    uploadedDate: new Date("2025-01-12"),
    project: "2025_Ethio Telecom_Certification",
    indicator: "2.1 - Risk Management Framework",
    category: "Risk Management",
    status: "clarification",
    version: 1,
    comments: "Needs additional operational risk details",
  },
  {
    id: "3",
    name: "AML_Compliance_Report.pdf",
    type: "PDF",
    size: "3.2 MB",
    uploadedBy: "Vodacom TZ",
    uploadedDate: new Date("2025-01-10"),
    project: "2025_Vodacom_Recertification",
    indicator: "2.2 - Anti-Money Laundering",
    category: "Risk Management",
    status: "pending",
    version: 1,
  },
  {
    id: "4",
    name: "Customer_Protection_Policy.docx",
    type: "DOCX",
    size: "856 KB",
    uploadedBy: "Dummy Provider",
    uploadedDate: new Date("2025-01-08"),
    project: "2025_certi_trust_test",
    indicator: "3.1 - Customer Protection",
    category: "Customer Protection",
    status: "rejected",
    version: 1,
    comments: "Policy lacks specific complaint resolution procedures",
  },
]

export function DocumentLibrary() {
  const [documents] = useState<Document[]>(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.indicator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    const matchesProject = projectFilter === "all" || doc.project === projectFilter
    return matchesSearch && matchesStatus && matchesCategory && matchesProject
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      case "clarification":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getFileIcon = (type: string) => {
    return <FileText className="w-4 h-4 text-muted-foreground" />
  }

  const uniqueCategories = [...new Set(documents.map((doc) => doc.category))]
  const uniqueProjects = [...new Set(documents.map((doc) => doc.project))]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>Manage and review certification documents</CardDescription>
          </div>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents, indicators, or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="clarification">Needs Clarification</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {uniqueProjects.map((project) => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center text-sm text-muted-foreground">
              <FolderOpen className="w-4 h-4 mr-1" />
              {filteredDocuments.length} documents
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Indicator</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Version</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getFileIcon(doc.type)}
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <div className="font-medium text-sm">{doc.indicator}</div>
                      <div className="text-xs text-muted-foreground">{doc.category}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[150px] truncate text-sm">{doc.project}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(doc.status)}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{doc.uploadedBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{format(doc.uploadedDate, "MMM dd, yyyy")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">v{doc.version}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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
  )
}
