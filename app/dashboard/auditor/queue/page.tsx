import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CertificationReview } from "@/components/auditor/certification-review"

export default function AuditQueuePage() {
  return (
    <DashboardLayout role="auditor">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certification Review</h1>
          <p className="text-muted-foreground">Final audit and certification approval</p>
        </div>

        <CertificationReview />
      </div>
    </DashboardLayout>
  )
}
