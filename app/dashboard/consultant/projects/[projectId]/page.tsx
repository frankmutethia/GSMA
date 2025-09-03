"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { RoleGuard } from "@/components/auth/role-guard"
import { ProjectOverview } from "@/components/consultants/project-overview"

interface ProjectPageProps {
  params: {
    projectId: string
  }
}

export default function ConsultantProjectPage({ params }: ProjectPageProps) {
  return (
    <RoleGuard requiredRole="consultant">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Overview</h1>
            <p className="text-muted-foreground">
              Detailed view of project {params.projectId} for your assigned client
            </p>
          </div>

          <ProjectOverview />
        </div>
      </DashboardLayout>
    </RoleGuard>
  )
}
