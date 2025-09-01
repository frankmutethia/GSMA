"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Award, FileText, Search, Calendar } from "lucide-react"

interface AuditProject {
  id: string
  projectName: string
  providerCompany: string
  assessorCompany: string
  status: string
  assessmentScore: number
  submittedDate: string
  assessmentDate: string
  certificationNumber?: string
  expiryDate?: string
}

const mockProjects: AuditProject[] = [
  {
    id: "1",
    projectName: "2024_Telesom_Cert",
    providerCompany: "Telesom",
    assessorCompany: "Resh Consulting",
    status: "Certification Issued",
    assessmentScore: 95,
    submittedDate: "2024-10-15",
    assessmentDate: "2024-11-20",
    certificationNumber: "MMC10020240522001",
    expiryDate: "2026-11-20",
  },
  {
    id: "2",
    projectName: "2024_Safaricom Kenya_Cert",
    providerCompany: "Safaricom M-Pesa Kenya",
    assessorCompany: "Resh Consulting",
    status: "Certification Issued",
    assessmentScore: 98,
    submittedDate: "2024-08-10",
    assessmentDate: "2024-09-15",
    certificationNumber: "MMC10020240806001",
    expiryDate: "2026-09-15",
  },
  {
    id: "3",
    projectName: "2025_Honora TZ_Recertification",
    providerCompany: "Honora Tanzania Mobile Solutions",
    assessorCompany: "Sentinel Africa",
    status: "Certification Issued",
    assessmentScore: 92,
    submittedDate: "2025-01-05",
    assessmentDate: "2025-01-25",
    certificationNumber: "MMC20250626001",
    expiryDate: "2027-01-25",
  },
  {
    id: "4",
    projectName: "2025_Hormuud Telecom_Som",
    providerCompany: "Hormuud Telecom",
    assessorCompany: "Certi Trust",
    status: "Ready for Audit",
    assessmentScore: 89,
    submittedDate: "2025-01-10",
    assessmentDate: "2025-01-28",
  },
]

export function AuditQueue() {
  const [projects] = useState<AuditProject[]>(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.providerCompany.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Certification Issued":
        return "default"
      case "Ready for Audit":
        return "secondary"
      case "Audit in Progress":
        return "outline"
      default:
        return "outline"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audit Queue</CardTitle>
          <CardDescription>Projects ready for final certification review</CardDescription>
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
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Ready for Audit">Ready for Audit</SelectItem>
                <SelectItem value="Audit in Progress">Audit in Progress</SelectItem>
                <SelectItem value="Certification Issued">Certification Issued</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Provider Company</TableHead>
                  <TableHead>Assessor Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Certification Number</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.projectName}</TableCell>
                    <TableCell>{project.providerCompany}</TableCell>
                    <TableCell>{project.assessorCompany}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(project.status)}>{project.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getScoreColor(project.assessmentScore)}`}>
                        {project.assessmentScore}%
                      </span>
                    </TableCell>
                    <TableCell>{project.certificationNumber || "-"}</TableCell>
                    <TableCell>
                      {project.expiryDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{project.expiryDate}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {project.status === "Ready for Audit" && (
                          <Button variant="ghost" size="sm">
                            <Award className="w-4 h-4" />
                          </Button>
                        )}
                        {project.certificationNumber && (
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
