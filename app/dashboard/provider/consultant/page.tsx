"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AssignedConsultant } from "@/components/provider/assigned-consultant"
import { ConsultantDirectory } from "@/components/provider/consultant-directory"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MessageSquare, Building, Award } from "lucide-react"

export default function ProviderConsultantPage() {
  // Mock state - in real app this would come from API
  const [hasAssignedConsultant] = useState(true) // Set to false to see directory view

  if (!hasAssignedConsultant) {
    return (
      <DashboardLayout role="mmp">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Consultant Services</h1>
            <p className="text-muted-foreground">
              Get professional guidance and support for your certification journey
            </p>
          </div>

          {/* No Consultant Assigned State */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">No Consultant Assigned</CardTitle>
              <p className="text-muted-foreground">
                You don't have a consultant assigned yet. Browse our network of certified GSMA consultants
                and select one that best fits your needs.
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="text-center p-4">
                  <Building className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Expert Guidance</h3>
                  <p className="text-xs text-muted-foreground">
                    Professional consultants with deep GSMA knowledge
                  </p>
                </div>
                <div className="text-center p-4">
                  <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Proven Track Record</h3>
                  <p className="text-xs text-muted-foreground">
                    Successfully helped 200+ providers achieve certification
                  </p>
                </div>
                <div className="text-center p-4">
                  <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Ongoing Support</h3>
                  <p className="text-xs text-muted-foreground">
                    Continuous guidance throughout your certification journey
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <ConsultantDirectory />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="mmp">
      <AssignedConsultant />
    </DashboardLayout>
  )
}
