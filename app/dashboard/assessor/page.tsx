"use client"

import { RoleGuard } from "@/components/auth/role-guard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Clock,
  CheckCircle,
  Eye,
  TrendingUp,
  Award,
  Calendar,
  ArrowRight,
} from "lucide-react"

export default function AssessorDashboard() {
  return (
    <RoleGuard requiredRole="assessor">
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
                      <Eye className="w-3 h-3 mr-1" />
                      Assessor Dashboard
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-100 border-green-400/30 animate-pulse">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                      Active Session
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
                  <p className="text-primary-foreground/90 text-lg max-w-2xl leading-relaxed">
                    Review certification documents, assess compliance, and provide guidance to MMPs.
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold">78%</div>
                    <div className="text-sm text-primary-foreground/70">Review Progress</div>
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
                        strokeDasharray="78, 100"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <FileText className="w-4 h-4 mr-2" />
                  Review Guidelines
                </Button>
                <div className="flex items-center space-x-2 text-primary-foreground/80">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Next deadline: March 20, 2025</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:scale-110 transition-transform">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">5</div>
                <p className="text-xs text-muted-foreground mb-2">Awaiting assessment</p>
                <div className="flex items-center text-xs text-blue-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2 this week
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                <div className="p-2 bg-green-500/10 rounded-lg group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">12</div>
                <p className="text-xs text-muted-foreground mb-2">This month</p>
                <Progress value={75} className="h-1" />
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
                <div className="p-2 bg-orange-500/10 rounded-lg group-hover:scale-110 transition-transform">
                  <FileText className="h-4 w-4 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">3</div>
                <p className="text-xs text-muted-foreground mb-2">Under review</p>
                <div className="flex items-center text-xs text-orange-600">
                  <Eye className="w-3 h-3 mr-1" />
                  Active reviews
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:scale-110 transition-transform">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-1">94%</div>
                <p className="text-xs text-muted-foreground mb-2">Approval rate</p>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                  <Award className="w-3 h-3 mr-1" />
                  Excellent
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-card/50 rounded-xl border border-border/50">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">Review Queue</h2>
              <p className="text-muted-foreground">
                Access pending reviews, assess documents, and provide feedback to MMPs
              </p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              View Queue
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Background Pattern Styles */}
          <style jsx>{`
            .bg-grid-pattern {
              background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0);
              background-size: 20px 20px;
            }
          `}</style>
        </div>
      </DashboardLayout>
    </RoleGuard>
  )
}
