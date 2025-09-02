"use client"

import { RoleGuard } from "@/components/auth/role-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Users,
  Settings,
  FileText,
  BarChart3,
  Shield,
  Activity,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, AreaChart, Area } from "recharts"
import { useMemo } from "react"

export default function AdminDashboard() {
  const userGrowth = useMemo(
    () => [
      { month: "Jan", users: 1020 },
      { month: "Feb", users: 1065 },
      { month: "Mar", users: 1110 },
      { month: "Apr", users: 1155 },
      { month: "May", users: 1188 },
      { month: "Jun", users: 1247 },
    ],
    [],
  )

  const projectFlow = useMemo(
    () => [
      { stage: "New", count: 18 },
      { stage: "Review", count: 36 },
      { stage: "Audit", count: 22 },
      { stage: "Certified", count: 13 },
    ],
    [],
  )

  const messagesKpi = useMemo(
    () => [
      { day: "Mon", inbound: 32, resolved: 20 },
      { day: "Tue", inbound: 28, resolved: 25 },
      { day: "Wed", inbound: 34, resolved: 27 },
      { day: "Thu", inbound: 29, resolved: 24 },
      { day: "Fri", inbound: 26, resolved: 22 },
    ],
    [],
  )
  return (
    <RoleGuard requiredRole="admin">
      <DashboardLayout>
        <div className="space-y-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground rounded-2xl shadow-2xl">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin Dashboard
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-100 border-green-400/30 animate-pulse">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                      System Active
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, Administrator!</h1>
                  <p className="text-primary-foreground/90 text-lg max-w-2xl leading-relaxed">
                    Monitor system health, manage users, and oversee the certification platform operations.
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold">99.9%</div>
                    <div className="text-sm text-primary-foreground/70">System Uptime</div>
                  </div>
                  <div className="w-16 h-16 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeDasharray="99.9, 100"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Activity className="w-4 h-4 mr-2" />
                  System Status
                </Button>
                <div className="flex items-center space-x-2 text-primary-foreground/80">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">2 minor alerts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">1,247</div>
                <p className="text-xs text-muted-foreground mb-2">Active accounts</p>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +23 this week
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
                <div className="p-2 bg-green-500/10 rounded-lg group-hover:scale-110 transition-transform">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">89</div>
                <p className="text-xs text-muted-foreground mb-2">Certification projects</p>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5 this month
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">98.5%</div>
                <p className="text-xs text-muted-foreground mb-2">Performance score</p>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Optimal
                </Badge>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Alerts</CardTitle>
                <div className="p-2 bg-orange-500/10 rounded-lg group-hover:scale-110 transition-transform">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">2</div>
                <p className="text-xs text-muted-foreground mb-2">Minor issues</p>
                <div className="flex items-center text-xs text-orange-600">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Low priority
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-card/50 rounded-xl border border-border/50">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
              <p className="text-muted-foreground">
                Manage users, monitor system performance, and configure platform settings
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/dashboard/admin/users">
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  User Management
                </Button>
              </Link>
              <Link href="/dashboard/admin/settings">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
              </Link>
            </div>
          </div>

          {/* Background Pattern Styles */}
          <style jsx>{`
            .bg-grid-pattern {
              background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0);
              background-size: 20px 20px;
            }
          `}</style>

          {/* Reports */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-2">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">User Growth (last 6 months)</CardTitle>
              </CardHeader>
              <CardContent className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowth} margin={{ left: -20, right: 10, top: 5, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ stroke: "#c7d2fe" }} />
                    <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Projects by Stage</CardTitle>
              </CardHeader>
              <CardContent className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectFlow} margin={{ left: -20, right: 10, top: 5, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="stage" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Comms: Inbound vs Resolved</CardTitle>
              </CardHeader>
              <CardContent className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={messagesKpi} margin={{ left: -20, right: 10, top: 5, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="inbound" stroke="#3b82f6" fill="url(#gradA)" />
                    <Area type="monotone" dataKey="resolved" stroke="#10b981" fill="url(#gradB)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </RoleGuard>
  )
}
