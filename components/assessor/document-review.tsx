"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertCircle, FileText, MessageSquare } from "lucide-react"

interface DocumentIndicator {
  id: string
  category: string
  indicator: string
  description: string
  status: "pending" | "approved" | "rejected" | "clarification"
  documents: string[]
  comments?: string
}

const mockIndicators: DocumentIndicator[] = [
  {
    id: "1.1",
    category: "Legal Framework",
    indicator: "Legal and Regulatory Framework",
    description: "Evidence of compliance with national mobile money regulations",
    status: "approved",
    documents: ["Legal_Framework_2025.pdf", "Regulatory_Compliance.pdf"],
    comments: "Documentation is comprehensive and meets requirements.",
  },
  {
    id: "1.2",
    category: "Legal Framework",
    indicator: "Business Registration",
    description: "Valid business registration and licensing documents",
    status: "pending",
    documents: ["Business_Registration.pdf"],
  },
  {
    id: "2.1",
    category: "Risk Management",
    indicator: "Risk Management Framework",
    description: "Comprehensive risk management policies and procedures",
    status: "clarification",
    documents: ["Risk_Management_Policy.pdf"],
    comments: "Please provide additional details on operational risk mitigation strategies.",
  },
  {
    id: "2.2",
    category: "Risk Management",
    indicator: "Anti-Money Laundering",
    description: "AML/CFT policies and implementation evidence",
    status: "rejected",
    documents: ["AML_Policy.pdf"],
    comments: "AML policy lacks specific procedures for transaction monitoring.",
  },
]

export function DocumentReview() {
  const [indicators, setIndicators] = useState<DocumentIndicator[]>(mockIndicators)
  const [selectedIndicator, setSelectedIndicator] = useState<DocumentIndicator | null>(indicators[0])
  const [reviewComment, setReviewComment] = useState("")
  const [reviewStatus, setReviewStatus] = useState<string>("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "clarification":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "rejected":
        return "destructive"
      case "clarification":
        return "secondary"
      default:
        return "outline"
    }
  }

  const handleStatusUpdate = () => {
    if (selectedIndicator && reviewStatus) {
      const updatedIndicators = indicators.map((indicator) =>
        indicator.id === selectedIndicator.id
          ? {
              ...indicator,
              status: reviewStatus as DocumentIndicator["status"],
              comments: reviewComment || indicator.comments,
            }
          : indicator,
      )
      setIndicators(updatedIndicators)
      setSelectedIndicator({
        ...selectedIndicator,
        status: reviewStatus as DocumentIndicator["status"],
        comments: reviewComment || selectedIndicator.comments,
      })
      setReviewComment("")
      setReviewStatus("")
    }
  }

  const getStatusCounts = () => {
    return {
      pending: indicators.filter((i) => i.status === "pending").length,
      approved: indicators.filter((i) => i.status === "approved").length,
      rejected: indicators.filter((i) => i.status === "rejected").length,
      clarification: indicators.filter((i) => i.status === "clarification").length,
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Indicators Overview</CardTitle>
            <CardDescription>2025_Hormuud Telecom_Recertification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
                <div className="text-xs text-muted-foreground">Approved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{statusCounts.pending}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
                <div className="text-xs text-muted-foreground">Rejected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{statusCounts.clarification}</div>
                <div className="text-xs text-muted-foreground">Clarification</div>
              </div>
            </div>

            <div className="space-y-2">
              {indicators.map((indicator) => (
                <div
                  key={indicator.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedIndicator?.id === indicator.id ? "bg-muted border-primary" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedIndicator(indicator)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{indicator.id}</span>
                    {getStatusIcon(indicator.status)}
                  </div>
                  <div className="text-xs text-muted-foreground">{indicator.indicator}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        {selectedIndicator && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {selectedIndicator.id} - {selectedIndicator.indicator}
                  </CardTitle>
                  <CardDescription>{selectedIndicator.description}</CardDescription>
                </div>
                <Badge variant={getStatusBadgeVariant(selectedIndicator.status)}>
                  {selectedIndicator.status.charAt(0).toUpperCase() + selectedIndicator.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="documents" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="documents" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Submitted Documents</h4>
                    <div className="space-y-2">
                      {selectedIndicator.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{doc}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="review" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Review Status</label>
                      <Select value={reviewStatus} onValueChange={setReviewStatus}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select review status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="clarification">Needs Clarification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Review Comments</label>
                      <Textarea
                        placeholder="Provide detailed feedback on the submitted documents..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="mt-1 min-h-[120px]"
                      />
                    </div>

                    <Button onClick={handleStatusUpdate} disabled={!reviewStatus}>
                      Update Review Status
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Review History</h4>
                    {selectedIndicator.comments && (
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <MessageSquare className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Previous Review</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedIndicator.comments}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
