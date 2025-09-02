"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Send } from "lucide-react"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  role: "MMP" | "Assessor" | "Auditor" | "Admin" | "Consultant"
  company: string
  status: "Active" | "Inactive"
  dashboardLink: string
}

const mockUsers: User[] = [
  {
    id: "162",
    name: "Certi Trust",
    email: "kenya@certi-trust.com",
    role: "Auditor",
    company: "Certi Trust",
    status: "Active",
    dashboardLink: "https://gsmamobilemoneycertification.com/certification/auditor",
  },
  {
    id: "163",
    name: "Ilyas Abdulkarim",
    email: "ilyas@hormuud.com",
    role: "MMP",
    company: "Hormuud Telecom",
    status: "Active",
    dashboardLink: "https://gsmamobilemoneycertification.com/certification/mmp",
  },
  {
    id: "164",
    name: "Evelyne Alemoka",
    email: "Evelyne.Alemoka@mtn.com",
    role: "MMP",
    company: "MTN Cameroon",
    status: "Active",
    dashboardLink: "https://gsmamobilemoneycertification.com/certification/mmp",
  },
  {
    id: "165",
    name: "Zewdu Gurmu",
    email: "zewdu.gurmu@ethio telecom.et",
    role: "MMP",
    company: "Ethio Telecom",
    status: "Active",
    dashboardLink: "https://gsmamobilemoneycertification.com/certification/mmp",
  },
  {
    id: "169",
    name: "Demo Assessor",
    email: "support@sobbayi.com",
    role: "Assessor",
    company: "Certi Trust",
    status: "Active",
    dashboardLink: "https://gsmamobilemoneycertification.com/certification/assessor",
  },
  {
    id: "170",
    name: "Jane Consultant",
    email: "jane.consultant@example.com",
    role: "Consultant",
    company: "Independent",
    status: "Active",
    dashboardLink: "https://gsmamobilemoneycertification.com/certification/consultant",
  },
  {
    id: "171",
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    company: "GSMA",
    status: "Active",
    dashboardLink: "https://gsmamobilemoneycertification.com/certification/admin",
  },
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("all")

  const searchFiltered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const roleFiltered = searchFiltered.filter((user) =>
    activeTab === "all" ? true : user.role.toLowerCase() === activeTab,
  )

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Admin":
        return "destructive"
      case "Auditor":
        return "secondary"
      case "Assessor":
        return "default"
      case "Consultant":
        return "secondary"
      case "MMP":
        return "outline"
      default:
        return "outline"
    }
  }

  const AddUserDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Create a new user account for the certification platform.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mmp">Mobile Money Provider</SelectItem>
                <SelectItem value="assessor">Assessor</SelectItem>
                <SelectItem value="auditor">Auditor</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="consultant">Consultant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Company
            </Label>
            <Input id="company" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              const name = (document.getElementById("name") as HTMLInputElement)?.value || "New User"
              const email = (document.getElementById("email") as HTMLInputElement)?.value || "user@example.com"
              const company = (document.getElementById("company") as HTMLInputElement)?.value || ""
              const newUser: User = {
                id: String(Date.now()).slice(-6),
                name,
                email,
                role: "MMP",
                company,
                status: "Active",
                dashboardLink: "#",
              }
              setUsers((prev) => [newUser, ...prev])
              setIsAddDialogOpen(false)
              toast.success("Invitation email sent", {
                description: `${name} (${email}) added and invited to set up their account.`,
              })
            }}
          >
            Create & Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const EditUserDialog = () => (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit User & Assign Role</DialogTitle>
          <DialogDescription>Update role and status; send role assignment email.</DialogDescription>
        </DialogHeader>
        {editingUser && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <Input defaultValue={editingUser.name} id="edit-name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <Input defaultValue={editingUser.email} id="edit-email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Role</Label>
              <Select defaultValue={editingUser.role.toLowerCase()} id="edit-role">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mmp">Mobile Money Provider</SelectItem>
                  <SelectItem value="assessor">Assessor</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Status</Label>
              <Select defaultValue={editingUser.status.toLowerCase()} id="edit-status">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => {
              if (!editingUser) return
              const role = (document.querySelector("[id='edit-role']") as any)?.value || editingUser.role
              const updated = {
                ...editingUser,
                name: (document.getElementById("edit-name") as HTMLInputElement)?.value || editingUser.name,
                email: (document.getElementById("edit-email") as HTMLInputElement)?.value || editingUser.email,
                role: String(role).toUpperCase() as User["role"],
                status:
                  ((document.querySelector("[id='edit-status']") as any)?.value || editingUser.status).toLowerCase() ===
                  "active"
                    ? "Active"
                    : "Inactive",
              } as User
              setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
              setIsEditDialogOpen(false)
              toast.success("Roles updated", {
                description: `${updated.name} is now ${updated.role}`,
              })
            }}
          >
            Save Changes
          </Button>
          <Button
            onClick={() => {
              if (!editingUser) return
              toast("Role assignment email queued", {
                description: `An email was sent to ${editingUser.email} summarizing assigned roles and access links.`,
              })
              setIsEditDialogOpen(false)
            }}
          >
            <Send className="w-4 h-4 mr-2" /> Send Role Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts and permissions across the platform</CardDescription>
          </div>
          <AddUserDialog />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mmp">MMPs</TabsTrigger>
            <TabsTrigger value="assessor">Assessors</TabsTrigger>
            <TabsTrigger value="auditor">Auditors</TabsTrigger>
            <TabsTrigger value="consultant">Consultants</TabsTrigger>
            <TabsTrigger value="admin">Admins</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roleFiltered.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.company}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingUser(user)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Mount auxiliary dialogs at the end of the file for clarity
export default function UserManagementWithDialogs() {
  return null
}
