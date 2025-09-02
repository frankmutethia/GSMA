import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AssignedMMPs } from "@/components/consultants/assigned-mmps"

export default function ConsultantAssignedPage() {
  return (
    <DashboardLayout role="consultant">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assigned MMP Clients</h1>
          <p className="text-muted-foreground">Manage and track your assigned Mobile Money Provider clients</p>
        </div>

        <AssignedMMPs />
      </div>
    </DashboardLayout>
  )
}
