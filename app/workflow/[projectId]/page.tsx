import { CertificationWorkflow } from "@/components/workflow/certification-workflow"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

interface WorkflowPageProps {
  params: {
    projectId: string
  }
}

export default function WorkflowPage({ params }: WorkflowPageProps) {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certification Workflow</h1>
          <p className="text-muted-foreground">Track and manage certification progress</p>
        </div>

        <CertificationWorkflow />
      </div>
    </DashboardLayout>
  )
}
