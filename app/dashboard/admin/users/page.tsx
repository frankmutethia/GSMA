import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { UserManagement } from "@/components/admin/user-management"

export default function AdminUsersPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage users, roles, and permissions across the certification platform
          </p>
        </div>
        <UserManagement />
      </div>
    </DashboardLayout>
  )
}
