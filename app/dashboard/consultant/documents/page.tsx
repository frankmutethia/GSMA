"use client"

import { RoleGuard } from "@/components/auth/role-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DocumentLibrary } from "@/components/documents/document-library"
import { DocumentChat } from "@/components/documents/document-chat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare } from "lucide-react"

export default function ConsultantDocumentsPage() {
  return (
    <RoleGuard requiredRole="consultant">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documents</h1>
            <p className="text-muted-foreground">Access document library and chat with MMPs, assessors, and auditors</p>
          </div>

          <Tabs defaultValue="library" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="library" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Document Library
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Discussion Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="library" className="space-y-6">
              <DocumentLibrary />
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <DocumentChat />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </RoleGuard>
  )
}


