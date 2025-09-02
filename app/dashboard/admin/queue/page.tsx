"use client"

import { RoleGuard } from "@/components/auth/role-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MessageSquare, FileText } from "lucide-react"
import { useState } from "react"

interface MessageItem {
  id: string
  from: string
  role: string
  subject: string
  received: string
  status: "Open" | "Waiting" | "Closed"
}

interface ApplicationItem {
  id: string
  mmp: string
  project: string
  submitted: string
  owner: string
  sla: string
  status: "New" | "In Review" | "Awaiting Info" | "Completed"
}

const mockMessages: MessageItem[] = [
  { id: "m1", from: "Hormuud Telecom", role: "MMP", subject: "Clarification on Risk Policy", received: "2025-02-10", status: "Open" },
  { id: "m2", from: "Sarah Johnson", role: "Assessor", subject: "Update on assessment 180/280", received: "2025-02-09", status: "Waiting" },
]

const mockApplications: ApplicationItem[] = [
  { id: "A-2025-001", mmp: "Hormuud Telecom", project: "2025_Hormuud Recert", submitted: "2025-02-08", owner: "Unassigned", sla: "3d", status: "New" },
  { id: "A-2025-002", mmp: "MTN Cameroon", project: "2025_MTN New", submitted: "2025-02-07", owner: "Ops Team", sla: "1d", status: "In Review" },
]

export default function AdminQueuesPage() {
  const [query, setQuery] = useState("")
  const filteredMessages = mockMessages.filter((m) => m.subject.toLowerCase().includes(query.toLowerCase()) || m.from.toLowerCase().includes(query.toLowerCase()))
  const filteredApps = mockApplications.filter((a) => a.mmp.toLowerCase().includes(query.toLowerCase()) || a.project.toLowerCase().includes(query.toLowerCase()))

  return (
    <RoleGuard requiredRole="admin">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Operations Queues</h1>
            <p className="text-muted-foreground">Unified communications and application intake</p>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search messages and applications..." className="pl-8" />
          </div>

          <Tabs defaultValue="messages" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="messages" className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Communications</TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2"><FileText className="w-4 h-4" /> Applications</TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Messages</CardTitle>
                  <CardDescription>Inbound messages from MMPs, Assessors, and Auditors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>From</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Received</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMessages.map((m) => (
                          <TableRow key={m.id}>
                            <TableCell className="font-medium">{m.from}</TableCell>
                            <TableCell>{m.role}</TableCell>
                            <TableCell>{m.subject}</TableCell>
                            <TableCell>{m.received}</TableCell>
                            <TableCell>
                              <Badge variant={m.status === "Open" ? "secondary" : m.status === "Waiting" ? "outline" : "default"}>{m.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Application Intake</CardTitle>
                  <CardDescription>Incoming applications from MMPs and Auditors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>MMP</TableHead>
                          <TableHead>Project</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>SLA</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApps.map((a) => (
                          <TableRow key={a.id}>
                            <TableCell className="font-medium">{a.id}</TableCell>
                            <TableCell>{a.mmp}</TableCell>
                            <TableCell>{a.project}</TableCell>
                            <TableCell>{a.submitted}</TableCell>
                            <TableCell>{a.owner}</TableCell>
                            <TableCell>{a.sla}</TableCell>
                            <TableCell>
                              <Badge variant={a.status === "New" ? "secondary" : a.status === "In Review" ? "outline" : a.status === "Awaiting Info" ? "secondary" : "default"}>{a.status}</Badge>
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
      </DashboardLayout>
    </RoleGuard>
  )
}


