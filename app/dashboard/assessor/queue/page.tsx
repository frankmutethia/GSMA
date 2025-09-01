import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DocumentReview } from "@/components/assessor/document-review"

export default function ReviewQueuePage() {
  return (
    <DashboardLayout role="assessor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Review</h1>
          <p className="text-muted-foreground">Evaluate certification documents and indicators</p>
        </div>

        <DocumentReview />
      </div>
    </DashboardLayout>
  )
}
