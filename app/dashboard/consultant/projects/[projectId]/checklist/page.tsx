"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { RoleGuard } from "@/components/auth/role-guard"
import { PrinciplesChecklist } from "@/components/consultants/principles-checklist"

export default function ConsultantProjectChecklistPage() {
  return (
    <RoleGuard requiredRole="consultant">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Consultant Checklist</h1>
            <p className="text-muted-foreground">GSMA principles grouped with indicators, evidence links, and comments</p>
          </div>
          <PrinciplesChecklist />
        </div>
      </DashboardLayout>
    </RoleGuard>
  )
}
