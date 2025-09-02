"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Users,
  Building,
  Globe,
  Phone,
  Mail,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

interface Consultant {
  id: string
  name: string
  email: string
  phone: string
  organization: string
  specialty: string
  languages: string[]
  status: "active" | "inactive" | "pending"
  assignedMMPs: number
  joinDate: string
  lastActive: string
}

const mockConsultants: Consultant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@gsma.com",
    phone: "+1 (555) 123-4567",
    organization: "GSMA Consulting",
    specialty: "Risk Management & Compliance",
    languages: ["English", "French", "Spanish"],
    status: "active",
    assignedMMPs: 8,
    joinDate: "Jan 15, 2024",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@gsma.com",
    phone: "+252 61 123 4567",
    organization: "GSMA Consulting",
    specialty: "Technology & Infrastructure",
    languages: ["English", "Arabic", "Somali"],
    status: "active",
    assignedMMPs: 5,
    joinDate: "Feb 20, 2024",
    lastActive: "1 day ago",
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    email: "maria.rodriguez@gsma.com",
    phone: "+34 91 123 4567",
    organization: "GSMA Consulting",
    specialty: "Financial Services & AML",
    languages: ["English", "Spanish", "Portuguese"],
    status: "pending",
    assignedMMPs: 0,
    joinDate: "Mar 1, 2025",
    lastActive: "Never",
  },
]

export function ConsultantManagement() {
  const [consultants, setConsultants] = useState<Consultant[]>(mockConsultants)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingConsultant, setEditingConsultant] = useState<Consultant | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    specialty: "",
    languages: [] as string[],
    status: "pending" as const,
  })

  const filteredConsultants = consultants.filter((consultant) =>
    consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultant.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddConsultant = () => {
    setEditingConsultant(null)
    setFormData({
      name: "",
      email: "",
      phone: "",
      organization: "",
      specialty: "",
      languages: [],
      status: "pending",
    })
    setIsDialogOpen(true)
  }

  const handleEditConsultant = (consultant: Consultant) => {
    setEditingConsultant(consultant)
    setFormData({
      name: consultant.name,
      email: consultant.email,
      phone: consultant.phone,
      organization: consultant.organization,
      specialty: consultant.specialty,
      languages: consultant.languages,
      status: consultant.status,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteConsultant = (id: string) => {
    setConsultants(consultants.filter((c) => c.id !== id))
  }

  const handleSubmit = () => {
    if (editingConsultant) {
      // Update existing consultant
      setConsultants(consultants.map((c) =>
        c.id === editingConsultant.id
          ? { ...c, ...formData }
          : c
      ))
    } else {
      // Add new consultant
      const newConsultant: Consultant = {
        id: Date.now().toString(),
        ...formData,
        assignedMMPs: 0,
        joinDate: new Date().toLocaleDateString(),
        lastActive: "Never",
      }
      setConsultants([...consultants, newConsultant])
    }
    setIsDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Inactive</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Pending</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-3 h-3" />
      case "inactive":
        return <AlertCircle className="w-3 h-3" />
      case "pending":
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
          <h2 className="text-2xl font-bold text-foreground">Consultant Management</h2>
          <p className="text-muted-foreground">Manage consultant profiles, assignments, and access</p>
        </div>
        <Button onClick={handleAddConsultant} className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Consultant
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultants.length}</div>
            <p className="text-xs text-muted-foreground">Across all specialties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Consultants</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {consultants.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {consultants.filter((c) => c.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <Building className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {consultants.reduce((sum, c) => sum + c.assignedMMPs, 0)}
            </div>
            <p className="text-xs text-muted-foreground">MMP clients served</p>
          </CardContent>
        </Card>
      </div>

      {/* Consultants Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Consultant Directory</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage consultant profiles and assignments
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search consultants..."
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
                  <TableHead className="font-semibold text-foreground">Consultant</TableHead>
                  <TableHead className="font-semibold text-foreground">Contact</TableHead>
                  <TableHead className="font-semibold text-foreground">Specialty & Languages</TableHead>
                  <TableHead className="font-semibold text-foreground">Status & Activity</TableHead>
                  <TableHead className="font-semibold text-foreground">Assignments</TableHead>
                  <TableHead className="text-right font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsultants.map((consultant) => (
                  <TableRow
                    key={consultant.id}
                    className="hover:bg-muted/20 transition-colors duration-200 border-b border-border/30"
                  >
                    <TableCell className="py-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{consultant.name}</div>
                            <div className="text-sm text-muted-foreground">{consultant.organization}</div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Joined: {consultant.joinDate}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{consultant.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{consultant.phone}</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-foreground">{consultant.specialty}</div>
                        <div className="flex flex-wrap gap-1">
                          {consultant.languages.map((language, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Globe className="w-2 h-2 mr-1" />
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(consultant.status)}
                          {getStatusBadge(consultant.status)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last active: {consultant.lastActive}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{consultant.assignedMMPs}</div>
                        <div className="text-xs text-muted-foreground">MMP clients</div>
                      </div>
                    </TableCell>

                    <TableCell className="text-right py-4">
                      <div className="flex items-center justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditConsultant(consultant)}
                          className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="Edit Consultant"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteConsultant(consultant.id)}
                          className="hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Consultant"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Add/Edit Consultant Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingConsultant ? "Edit Consultant" : "Add New Consultant"}
            </DialogTitle>
            <DialogDescription>
              {editingConsultant
                ? "Update consultant information and settings"
                : "Create a new consultant profile with required information"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Enter organization"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                placeholder="e.g., Risk Management, Technology, Financial Services"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages">Languages (comma-separated)</Label>
              <Input
                id="languages"
                value={formData.languages.join(", ")}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value.split(", ").filter(l => l.trim()) })}
                placeholder="e.g., English, French, Spanish"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "inactive" | "pending") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingConsultant ? "Update Consultant" : "Add Consultant"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
