"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect to role-specific dashboard
      switch (user.role) {
        case "mmp":
          router.replace("/dashboard/provider")
          break
        case "assessor":
          router.replace("/dashboard/assessor")
          break
        case "auditor":
          router.replace("/dashboard/auditor")
          break
        case "consultant":
          router.replace("/dashboard/consultant")
          break
        case "admin":
          router.replace("/dashboard/admin")
          break
        default:
          router.replace("/")
      }
    } else if (!isLoading && !user) {
      // Not authenticated, redirect to login
      router.replace("/")
    }
  }, [user, isLoading, router])

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Redirecting...</h2>
          <p className="text-muted-foreground">Taking you to your dashboard</p>
        </div>
      </div>
    </div>
  )
}
