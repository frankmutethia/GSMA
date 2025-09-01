"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, CheckCircle, AlertCircle, Cloud } from "lucide-react"

interface UploadFile {
  file: File
  progress: number
  status: "uploading" | "completed" | "error"
  id: string
}

export function DocumentUpload() {
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedIndicator, setSelectedIndicator] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [description, setDescription] = useState("")
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const projects = [
    "2025_Hormuud Telecom_Recertification",
    "2025_Ethio Telecom_Certification",
    "2025_Vodacom_Recertification",
    "2025_certi_trust_test",
  ]

  const categories = [
    "Legal Framework",
    "Risk Management",
    "Customer Protection",
    "Technical Infrastructure",
    "Financial Management",
  ]

  const indicators = [
    "1.1 - Legal and Regulatory Framework",
    "1.2 - Business Registration",
    "2.1 - Risk Management Framework",
    "2.2 - Anti-Money Laundering",
    "3.1 - Customer Protection",
    "3.2 - Data Protection",
  ]

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFileSelection(files)
  }, [])

  const handleFileSelection = (files: File[]) => {
    const newUploadFiles: UploadFile[] = files.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
      id: Math.random().toString(36).substr(2, 9),
    }))

    setUploadFiles((prev) => [...prev, ...newUploadFiles])

    // Simulate upload progress
    newUploadFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + Math.random() * 30, 100)
            const newStatus = newProgress === 100 ? "completed" : "uploading"
            return { ...file, progress: newProgress, status: newStatus }
          }
          return file
        }),
      )
    }, 500)

    setTimeout(() => {
      clearInterval(interval)
      setUploadFiles((prev) =>
        prev.map((file) => (file.id === fileId ? { ...file, progress: 100, status: "completed" } : file)),
      )
    }, 3000)
  }

  const removeFile = (fileId: string) => {
    setUploadFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const handleSubmit = () => {
    console.log("Submitting documents:", {
      project: selectedProject,
      indicator: selectedIndicator,
      category: selectedCategory,
      description,
      files: uploadFiles.map((f) => f.file.name),
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Cloud className="w-4 h-4 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>Upload certification documents for review and assessment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="project">Certification Project</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
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
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="indicator">Certification Indicator</Label>
            <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
              <SelectTrigger>
                <SelectValue placeholder="Select indicator" />
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

          <div className="space-y-2">
            <Label htmlFor="description">Document Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a brief description of the documents being uploaded..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>
            Drag and drop files or click to browse. Supported formats: PDF, DOC, DOCX, XLS, XLSX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop files here to upload</p>
              <p className="text-sm text-muted-foreground">or click to browse your computer</p>
              <Input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => handleFileSelection(Array.from(e.target.files || []))}
                className="hidden"
                id="file-upload"
              />
              <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                Choose Files
              </Button>
            </div>
          </div>

          {uploadFiles.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="font-medium">Uploading Files</h4>
              <div className="space-y-3">
                {uploadFiles.map((uploadFile) => (
                  <div key={uploadFile.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2 flex-1">
                      {getStatusIcon(uploadFile.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{uploadFile.file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                        {uploadFile.status === "uploading" && <Progress value={uploadFile.progress} className="h-2" />}
                        {uploadFile.status === "completed" && (
                          <div className="text-xs text-green-600">Upload completed</div>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(uploadFile.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Maximum file size: 10MB per file. Ensure documents are clear and legible. Use official letterhead when
              applicable.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline">Save Draft</Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedProject || !selectedIndicator || uploadFiles.length === 0}
            >
              Submit Documents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
