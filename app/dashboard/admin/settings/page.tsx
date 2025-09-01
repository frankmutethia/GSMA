import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function AdminSettingsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground mt-2">Configure platform settings and system preferences</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
              <CardDescription>General settings for the GSMA certification platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="GSMA Mobile Money Certification" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" defaultValue="support@gsma.com" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certification Settings</CardTitle>
              <CardDescription>Configure certification workflow and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-validity">Certificate Validity (months)</Label>
                  <Input id="cert-validity" type="number" defaultValue="24" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-deadline">Review Deadline (days)</Label>
                  <Input id="review-deadline" type="number" defaultValue="30" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-notifications" defaultChecked />
                <Label htmlFor="auto-notifications">Automatic Notifications</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-file-size">Max File Size (MB)</Label>
                  <Input id="max-file-size" type="number" defaultValue="50" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="two-factor" />
                  <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="audit-logging" defaultChecked />
                  <Label htmlFor="audit-logging">Enable Audit Logging</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
