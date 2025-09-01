import { DocumentUpload } from "@/components/documents/document-upload"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function DocumentUploadPage() {
  return (
    <DashboardLayout role="mmp">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload Documents</h1>
          <p className="text-muted-foreground">Submit certification documents for review</p>
        </div>

        <DocumentUpload />
      </div>
    </DashboardLayout>
  )
}
