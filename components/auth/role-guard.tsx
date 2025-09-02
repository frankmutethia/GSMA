"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import { Loader2 } from "lucide-react"

interface RoleGuardProps {
  children: React.ReactNode
  requiredRole: string
  fallback?: React.ReactNode
}

export function RoleGuard({ children, requiredRole, fallback }: RoleGuardProps) {
  const { user, isLoading, validateRole, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (!isLoading && !isRedirecting) {
      if (!isAuthenticated) {
        // Not logged in, redirect to login
        setIsRedirecting(true)
        router.replace("/")
        return
      }

      if (!validateRole(requiredRole)) {
        // Wrong role, redirect to their appropriate dashboard
        if (user) {
          setIsRedirecting(true)
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
        }
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, validateRole, router, isRedirecting])

  // Show loading state while checking authentication or redirecting
  if (isLoading || isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              {isRedirecting ? "Redirecting..." : "Loading..."}
            </h2>
            <p className="text-muted-foreground">
              {isRedirecting ? "Taking you to your dashboard" : "Checking authentication..."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Not authenticated, show fallback or loading
  if (!isAuthenticated) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Redirecting to login...</h2>
            <p className="text-muted-foreground">Please wait...</p>
          </div>
        </div>
      </div>
    )
  }

  // Wrong role, show fallback or loading
  if (!validateRole(requiredRole)) {
    return fallback || (
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

  // User has the correct role, render the protected content
  return <>{children}</>
}
