import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ConsultantManagement } from "@/components/admin/consultant-management"

export default function AdminConsultantsPage() {
  return (
    <DashboardLayout role="admin">
      <ConsultantManagement />
    </DashboardLayout>
  )
}
