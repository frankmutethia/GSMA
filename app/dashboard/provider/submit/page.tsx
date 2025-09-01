import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DocumentSubmission } from "@/components/provider/document-submission"

export default function SubmitDocumentsPage() {
  return (
    <DashboardLayout role="mmp">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Submit Documents</h1>
          <p className="text-muted-foreground">Upload and manage your certification documentation</p>
        </div>

        <DocumentSubmission />
      </div>
    </DashboardLayout>
  )
}
