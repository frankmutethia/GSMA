"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { writePublicContent, readPublicContent } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function AdminSettingsPage() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    // Preload existing content into the form fields when available
    const data = readPublicContent()
    if (typeof window !== "undefined") {
      ;(document.getElementById("newsletter-title") as HTMLInputElement | null)?.setAttribute(
        "value",
        data.newsletterTitle || "",
      )
      ;(document.getElementById("newsletter-content") as HTMLTextAreaElement | null)?.append(
        data.newsletterContent || "",
      )
      ;(document.getElementById("articles") as HTMLTextAreaElement | null)?.append(
        (data.articles || []).join("\n"),
      )
      ;(document.getElementById("contact-email") as HTMLInputElement | null)?.setAttribute(
        "value",
        data.contactEmail || "",
      )
      ;(document.getElementById("contact-phone") as HTMLInputElement | null)?.setAttribute(
        "value",
        data.contactPhone || "",
      )
      ;(document.getElementById("contact-address") as HTMLTextAreaElement | null)?.append(
        data.contactAddress || "",
      )
    }
    setLoaded(true)
  }, [])
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

          {/** CMS: Public Site Content Management */}
          <Card>
            <CardHeader>
              <CardTitle>Public Site Content</CardTitle>
              <CardDescription>Manage official GSMA site content displayed on the landing page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="newsletter-title">Newsletter Title</Label>
                  <Input id="newsletter-title" placeholder="Monthly Certification Insights" />
                  <Label htmlFor="newsletter-content">Newsletter Content</Label>
                  <Textarea id="newsletter-content" rows={6} placeholder="Write the newsletter content shown on the public site..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Certifier Contact Email</Label>
                  <Input id="contact-email" placeholder="certification@gsma.com" />
                  <Label htmlFor="contact-phone">Certifier Contact Phone</Label>
                  <Input id="contact-phone" placeholder="+44 20 1234 5678" />
                  <Label htmlFor="contact-address">Certifier Address</Label>
                  <Textarea id="contact-address" rows={4} placeholder="Postal address and office details..." />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="articles">Basic Articles (one per line)</Label>
                <Textarea id="articles" rows={6} placeholder="e.g. What is GSMA Certification?\nApplication Requirements\nAssessment Overview" />
              </div>
            </CardContent>
          </Card>

          {/** Translations and Localization */}
          <Card>
            <CardHeader>
              <CardTitle>Translations & Localization</CardTitle>
              <CardDescription>Configure languages and translated content for public pages and documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Enabled Languages</Label>
                  <Input placeholder="Comma-separated codes, e.g. en,fr,es" defaultValue="en,fr" />
                </div>
                <div className="space-y-2">
                  <Label>Require Document Language Metadata</Label>
                  <Switch id="doc-lang-meta" defaultChecked />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="landing-translation">Landing Page Translation (selected language)</Label>
                  <Textarea id="landing-translation" rows={6} placeholder="Localized text for the landing page hero and highlights..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newsletter-translation">Newsletter Translation (selected language)</Label>
                  <Textarea id="newsletter-translation" rows={6} placeholder="Localized newsletter content..." />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="article-translations">Article Translations (JSON)</Label>
                <Textarea id="article-translations" rows={8} placeholder='{
  "Application Requirements": "...translated...",
  "Assessment Overview": "...translated..."
}' />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-translate-prompts" />
                  <Label htmlFor="auto-translate-prompts">Allow suggested translations for uploaded documents</Label>
                </div>
                <p className="text-xs text-muted-foreground">When enabled, the system will request language on upload and store language code with each document for downstream reviewers.</p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button
              onClick={() => {
                const title = (document.getElementById("newsletter-title") as HTMLInputElement)?.value || ""
                const content = (document.getElementById("newsletter-content") as HTMLTextAreaElement)?.value || ""
                const articlesRaw = (document.getElementById("articles") as HTMLTextAreaElement)?.value || ""
                const contactEmail = (document.getElementById("contact-email") as HTMLInputElement)?.value || ""
                const contactPhone = (document.getElementById("contact-phone") as HTMLInputElement)?.value || ""
                const contactAddress = (document.getElementById("contact-address") as HTMLTextAreaElement)?.value || ""
                writePublicContent({
                  newsletterTitle: title,
                  newsletterContent: content,
                  articles: articlesRaw
                    .split("\n")
                    .map((a) => a.trim())
                    .filter(Boolean),
                  contactEmail,
                  contactPhone,
                  contactAddress,
                })
                alert("Public content saved locally. The landing page will now read from this store.")
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
