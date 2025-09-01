import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, Eye } from "lucide-react"

export default function AssessorCompletedPage() {
  const completedReviews = [
    {
      id: "cert-2024-001",
      projectName: "2024_Telecom_Cert",
      provider: "Telecom Solutions Ltd",
      completedDate: "2024-12-15",
      status: "Approved",
      score: 95,
    },
    {
      id: "cert-2024-002",
      projectName: "2024_Safaricom_Kenya_Cert",
      provider: "Safaricom M-Pesa Kenya",
      completedDate: "2024-12-10",
      status: "Approved",
      score: 88,
    },
    {
      id: "cert-2024-003",
      projectName: "2024_MTN_Cameroon_Cert",
      provider: "MTN Cameroon",
      completedDate: "2024-12-05",
      status: "Rejected",
      score: 65,
    },
  ]

  return (
    <DashboardLayout role="assessor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Completed Reviews</h1>
            <p className="text-muted-foreground mt-2">View your completed certification assessments and reports</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Completed Reviews</CardTitle>
            <CardDescription>Find specific completed assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by project name, provider, or certification ID..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {completedReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-foreground">{review.projectName}</h3>
                      <Badge variant={review.status === "Approved" ? "default" : "destructive"}>{review.status}</Badge>
                    </div>
                    <p className="text-muted-foreground">{review.provider}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Completed: {review.completedDate}</span>
                      <span>Score: {review.score}%</span>
                      <span>ID: {review.id}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
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
