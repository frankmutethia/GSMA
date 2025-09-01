import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, Eye, Award } from "lucide-react"

export default function AuditorCompletedPage() {
  const completedAudits = [
    {
      id: "cert-2024-001",
      projectName: "2024_Telecom_Cert",
      provider: "Telecom Solutions Ltd",
      completedDate: "2024-12-20",
      status: "Certified",
      certNumber: "MMC20240520001",
      expiryDate: "2026-12-20",
    },
    {
      id: "cert-2024-002",
      projectName: "2024_Safaricom_Kenya_Cert",
      provider: "Safaricom M-Pesa Kenya",
      completedDate: "2024-12-18",
      status: "Certified",
      certNumber: "MMC20240806001",
      expiryDate: "2026-12-18",
    },
    {
      id: "cert-2024-003",
      projectName: "2024_MTN_Cameroon_Cert",
      provider: "MTN Cameroon",
      completedDate: "2024-12-15",
      status: "Rejected",
      certNumber: null,
      expiryDate: null,
    },
  ]

  return (
    <DashboardLayout role="auditor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Completed Audits</h1>
            <p className="text-muted-foreground mt-2">View completed certification audits and issued certificates</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Certificates
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Audits</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">75% approval rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejections</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">25% rejection rate</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Completed Audits</CardTitle>
            <CardDescription>Find specific completed audits and certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by project name, provider, or certificate number..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {completedAudits.map((audit) => (
            <Card key={audit.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-foreground">{audit.projectName}</h3>
                      <Badge variant={audit.status === "Certified" ? "default" : "destructive"}>{audit.status}</Badge>
                    </div>
                    <p className="text-muted-foreground">{audit.provider}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Completed: {audit.completedDate}</span>
                      {audit.certNumber && <span>Cert #: {audit.certNumber}</span>}
                      {audit.expiryDate && <span>Expires: {audit.expiryDate}</span>}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {audit.status === "Certified" && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
