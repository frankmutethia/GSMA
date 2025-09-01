import { DocumentLibrary } from "@/components/documents/document-library"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function DocumentsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Management</h1>
          <p className="text-muted-foreground">Centralized document library for all certification projects</p>
        </div>

        <DocumentLibrary />
      </div>
    </DashboardLayout>
  )
}
