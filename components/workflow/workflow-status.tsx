"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, AlertCircle, Award } from "lucide-react"

interface WorkflowStatusProps {
  status: string
  progress: number
  currentStage: string
  totalStages: number
  completedStages: number
}

export function WorkflowStatus({ status, progress, currentStage, totalStages, completedStages }: WorkflowStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Award className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "blocked":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "blocked":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon(status)}
          <span className="font-medium">{currentStage}</span>
        </div>
        <Badge variant={getStatusBadgeVariant(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">
            {completedStages}/{totalStages} stages completed
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  )
}
