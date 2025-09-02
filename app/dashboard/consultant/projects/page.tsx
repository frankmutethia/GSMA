import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProjectOverview } from "@/components/consultants/project-overview"

export default function ConsultantProjectsPage() {
  return (
    <DashboardLayout role="consultant">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Overview</h1>
          <p className="text-muted-foreground">Monitor and track certification project progress for your assigned clients</p>
        </div>

        <ProjectOverview />
      </div>
    </DashboardLayout>
  )
}
