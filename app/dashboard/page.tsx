"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user?.role) {
      router.push(`/dashboard/${user.role}`)
    }
  }, [user, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Redirecting...</h1>
        <p className="text-muted-foreground">Taking you to your dashboard</p>
      </div>
    </div>
  )
}
