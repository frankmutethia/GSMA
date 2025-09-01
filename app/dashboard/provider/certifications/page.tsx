import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CertificationProjects } from "@/components/provider/certification-projects"

export default function ProviderCertificationsPage() {
  return (
    <DashboardLayout role="mmp">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Certifications</h1>
          <p className="text-muted-foreground mt-2">View and manage your certification applications and status</p>
        </div>
        <CertificationProjects />
      </div>
    </DashboardLayout>
  )
}
