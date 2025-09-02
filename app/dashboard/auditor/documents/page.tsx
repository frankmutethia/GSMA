import { RoleGuard } from "@/components/auth/role-guard"
import { DocumentLibrary } from "@/components/documents/document-library"
import { AssessorAuditorChat } from "@/components/documents/assessor-auditor-chat"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare } from "lucide-react"

export default function AuditorDocumentsPage() {
  return (
    <RoleGuard requiredRole="auditor">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Document Review & Communication</h1>
            <p className="text-muted-foreground">Review certification documents and communicate with MMPs about evidence and requirements</p>
          </div>

          <Tabs defaultValue="library" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="library" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Document Review
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                MMP Communication
              </TabsTrigger>
            </TabsList>

            <TabsContent value="library" className="space-y-6">
              <DocumentLibrary />
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <AssessorAuditorChat 
                currentUserRole="auditor"
                currentUserName="Michael Chen"
              />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </RoleGuard>
  )
}
