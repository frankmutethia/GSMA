"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DocumentSubmission() {
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedIndicator, setSelectedIndicator] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const projects = ["2025_certi_trust_test", "2025_certitrust_test 2", "2025_certitrust_test"]

  const indicators = [
    "1.1 - Legal and Regulatory Framework",
    "1.2 - Business Registration",
    "1.3 - Operating License",
    "2.1 - Risk Management Framework",
    "2.2 - Anti-Money Laundering",
    "3.1 - Customer Protection",
    "3.2 - Data Protection",
    "4.1 - Technical Infrastructure",
    "4.2 - System Security",
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || [])
    setFiles((prev) => [...prev, ...uploadedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please ensure all documents are in PDF format and do not exceed 10MB per file. Review the certification
          toolkit for specific requirements for each indicator.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
          <CardDescription>
            Select your certification project and upload supporting documents for specific indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="project">Certification Project</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="indicator">Certification Indicator</Label>
              <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an indicator" />
                </SelectTrigger>
                <SelectContent>
                  {indicators.map((indicator) => (
                    <SelectItem key={indicator} value={indicator}>
                      {indicator}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Document Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a brief description of the documents being uploaded..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <Label>Upload Documents</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                  Choose Files
                </Button>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files</Label>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Save Draft</Button>
            <Button disabled={!selectedProject || !selectedIndicator || files.length === 0}>Submit Documents</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submission Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">Accepted File Types</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• PDF documents (.pdf)</li>
                <li>• Microsoft Word (.doc, .docx)</li>
                <li>• Microsoft Excel (.xls, .xlsx)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maximum file size: 10MB</li>
                <li>• Clear, legible documents</li>
                <li>• Official letterhead when applicable</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
