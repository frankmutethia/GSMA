"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  Users,
  FileText,
  CheckCircle,
  Settings,
  LogOut,
  Home,
  FolderOpen,
  Upload,
  BarChart3,
  Bell,
  Search,
  Zap,
  Activity,
  MessageSquare,
} from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Redirect to login if not authenticated (run as an effect, never conditionally)
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/")
    }
  }, [isLoading, user, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Loading...</h2>
            <p className="text-muted-foreground">Checking authentication...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show interim UI while redirecting unauthenticated users
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Redirecting to login...</h2>
            <p className="text-muted-foreground">Please wait...</p>
          </div>
        </div>
      </div>
    )
  }

  const role = user.role

  const getNavItems = () => {
    const baseItems = [
      { name: "Overview", href: `/dashboard/${role === "mmp" ? "provider" : role}`, icon: Home, badge: null },
      { name: "Documents", href: role === "mmp" ? "/documents" : `/dashboard/${role}/documents`, icon: FolderOpen, badge: null },
      { name: "Workflow", href: "/workflow/cert-2025-001", icon: BarChart3, badge: "Live" },
    ]

    switch (role) {
      case "admin":
        return [
          ...baseItems,
          { name: "User Management", href: "/dashboard/admin/users", icon: Users, badge: null },
          { name: "Consultants", href: "/dashboard/admin/consultants", icon: Users, badge: null },
          { name: "System Settings", href: "/dashboard/admin/settings", icon: Settings, badge: null },
        ]
      case "mmp":
        return [
          ...baseItems,
          { name: "My Certifications", href: "/dashboard/provider/certifications", icon: FileText, badge: "2" },
          { name: "Submit Documents", href: "/dashboard/provider/submit", icon: Upload, badge: null },
          { name: "My Consultant", href: "/dashboard/provider/consultant", icon: Users, badge: "1" },
        ]
      case "assessor":
        return [
          ...baseItems,
          { name: "Review Queue", href: "/dashboard/assessor/queue", icon: FileText, badge: "5" },
          { name: "Completed Reviews", href: "/dashboard/assessor/completed", icon: CheckCircle, badge: null },
        ]
      case "auditor":
        return [
          ...baseItems,
          { name: "Audit Queue", href: "/dashboard/auditor/queue", icon: FileText, badge: "3" },
          { name: "Completed Audits", href: "/dashboard/auditor/completed", icon: CheckCircle, badge: null },
        ]
      case "consultant":
        return [
          ...baseItems,
          { name: "Assigned MMPs", href: "/dashboard/consultant/assigned", icon: Users, badge: null },
          { name: "Project Overview", href: "/dashboard/consultant/projects", icon: FileText, badge: null },
          { name: "Communication", href: "/dashboard/consultant/communication", icon: MessageSquare, badge: null },
        ]
      default:
        return baseItems
    }
  }

  const navItems = getNavItems()

  const Sidebar = ({ className = "" }: { className?: string }) => (
    <div
      className={`flex flex-col h-full bg-gradient-to-b from-sidebar to-sidebar/95 border-r border-sidebar-border/50 backdrop-blur-sm ${className}`}
    >
      <div className="p-6 border-b border-sidebar-border/30">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-sidebar-primary to-sidebar-accent rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-sidebar-primary-foreground font-bold text-lg">G</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">GSMA</h2>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-sidebar-foreground/70">Certification Platform</p>
              <Badge
                variant="secondary"
                className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-600 border-green-500/20"
              >
                <Activity className="w-2 h-2 mr-1" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center justify-between px-3 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-accent-foreground transition-all duration-200 hover:translate-x-1"
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.name}</span>
            </div>
            {item.badge && (
              <Badge
                variant={item.badge === "Live" ? "default" : "secondary"}
                className={`text-xs px-2 py-0.5 ${
                  item.badge === "Live"
                    ? "bg-green-500 text-white animate-pulse"
                    : "bg-primary/10 text-primary border-primary/20"
                }`}
              >
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border/30 bg-sidebar-accent/5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-sidebar-accent to-sidebar-primary rounded-full flex items-center justify-center shadow-md">
              <span className="text-sidebar-accent-foreground text-sm font-bold">{user?.name?.charAt(0) || "U"}</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">{user?.name || "User"}</p>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email}</p>
              <Badge variant="outline" className="text-xs px-1.5 py-0 border-green-500/30 text-green-600">
                Online
              </Badge>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-accent-foreground transition-all duration-200"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-72 md:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-4 py-3 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <div>
                <h1 className="text-xl font-bold text-card-foreground capitalize">
                  {role === "mmp" ? "Provider" : role} Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.name?.split(" ")[0] || "User"}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Command Palette Trigger */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCommandOpen(true)}
                className="hidden md:flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search...</span>
                <div className="flex items-center space-x-1 ml-2">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </div>
              </Button>

              {/* Quick Actions */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-primary animate-pulse">
                    {notifications}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="sm">
                <Zap className="w-5 h-5 text-primary" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gradient-to-br from-background to-muted/20">
          <div className="relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            <div className="relative z-10">{children}</div>
          </div>
        </main>
      </div>

      {/* Background Pattern Styles */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0);
          background-size: 24px 24px;
        }
      `}</style>
    </div>
  )
}
