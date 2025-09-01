"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Award, FileText, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AssessmentSummary {
  category: string
  totalIndicators: number
  passedIndicators: number
  score: number
  status: "pass" | "fail" | "conditional"
}

const mockAssessment: AssessmentSummary[] = [
  {
    category: "Legal Framework",
    totalIndicators: 45,
    passedIndicators: 42,
    score: 93,
    status: "pass",
  },
  {
    category: "Risk Management",
    totalIndicators: 68,
    passedIndicators: 61,
    score: 90,
    status: "pass",
  },
  {
    category: "Customer Protection",
    totalIndicators: 52,
    passedIndicators: 48,
    score: 92,
    status: "pass",
  },
  {
    category: "Technical Infrastructure",
    totalIndicators: 73,
    passedIndicators: 65,
    score: 89,
    status: "pass",
  },
  {
    category: "Financial Management",
    totalIndicators: 42,
    passedIndicators: 36,
    score: 86,
    status: "conditional",
  },
]

export function CertificationReview() {
  const [certificationDecision, setCertificationDecision] = useState("")
  const [certificationNumber, setCertificationNumber] = useState("MMC20250201001")
  const [issueDate, setIssueDate] = useState<Date>()
  const [expiryDate, setExpiryDate] = useState<Date>()
  const [auditComments, setAuditComments] = useState("")

  const overallScore = Math.round(
    mockAssessment.reduce((sum, category) => sum + category.score, 0) / mockAssessment.length,
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "fail":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "conditional":
        return <FileText className="w-4 h-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pass":
        return "default"
      case "fail":
        return "destructive"
      case "conditional":
        return "secondary"
      default:
        return "outline"
    }
  }

  const handleCertificationApproval = () => {
    // Handle certification approval logic
    console.log("Certification approved with:", {
      decision: certificationDecision,
      number: certificationNumber,
      issueDate,
      expiryDate,
      comments: auditComments,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>2025_Hormuud Telecom_Som - Final Audit</CardTitle>
          <CardDescription>Hormuud Telecom - Assessed by Certi Trust</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{overallScore}%</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {mockAssessment.reduce((sum, cat) => sum + cat.passedIndicators, 0)}
              </div>
              <div className="text-sm text-muted-foreground">
                of {mockAssessment.reduce((sum, cat) => sum + cat.totalIndicators, 0)} Indicators Passed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {mockAssessment.filter((cat) => cat.status === "pass").length}
              </div>
              <div className="text-sm text-muted-foreground">of {mockAssessment.length} Categories Passed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="assessment" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assessment">Assessment Summary</TabsTrigger>
          <TabsTrigger value="certification">Certification Decision</TabsTrigger>
          <TabsTrigger value="documents">Supporting Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="assessment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Assessment Results</CardTitle>
              <CardDescription>Detailed breakdown by certification category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssessment.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(category.status)}
                      <div>
                        <div className="font-medium">{category.category}</div>
                        <div className="text-sm text-muted-foreground">
                          {category.passedIndicators}/{category.totalIndicators} indicators passed
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-semibold">{category.score}%</div>
                        <Badge variant={getStatusBadgeVariant(category.status)} className="text-xs">
                          {category.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certification Decision</CardTitle>
              <CardDescription>Make the final certification decision and issue certificate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="decision">Certification Decision</Label>
                  <Select value={certificationDecision} onValueChange={setCertificationDecision}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select decision" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approve Certification</SelectItem>
                      <SelectItem value="conditional">Conditional Approval</SelectItem>
                      <SelectItem value="rejected">Reject Certification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cert-number">Certification Number</Label>
                  <Input
                    id="cert-number"
                    value={certificationNumber}
                    onChange={(e) => setCertificationNumber(e.target.value)}
                    placeholder="MMC20250201001"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !issueDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {issueDate ? format(issueDate, "PPP") : "Select issue date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={issueDate} onSelect={setIssueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !expiryDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Audit Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Provide detailed comments on the certification decision..."
                  value={auditComments}
                  onChange={(e) => setAuditComments(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button onClick={handleCertificationApproval} disabled={!certificationDecision}>
                  <Award className="w-4 h-4 mr-2" />
                  Issue Certification
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
              <CardDescription>Assessment reports and supporting documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Assessment_Report_Hormuud_2025.pdf</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Assessor_Recommendations.pdf</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Provider_Response_Documents.zip</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
