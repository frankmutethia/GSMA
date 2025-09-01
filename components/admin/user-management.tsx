"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
import { Search, Plus, Edit, Trash2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "MMP" | "Assessor" | "Auditor" | "Admin"
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
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "Admin":
        return "destructive"
      case "Auditor":
        return "secondary"
      case "Assessor":
        return "default"
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
          <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
            Create User
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
              {filteredUsers.map((user) => (
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
                      <Button variant="ghost" size="sm">
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
      </CardContent>
    </Card>
  )
}
