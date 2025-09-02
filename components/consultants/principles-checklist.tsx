"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { FileText, MessageSquare, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { gsmaPrinciplesSeed, Principle } from "@/lib/utils"

function statusToBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completed</Badge>
    case "in-progress":
      return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">In Progress</Badge>
    case "requires-clarification":
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Clarification</Badge>
    default:
      return <Badge variant="outline">Pending</Badge>
  }
}

function statusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="w-3 h-3" />
    case "in-progress":
      return <Clock className="w-3 h-3" />
    case "requires-clarification":
      return <AlertCircle className="w-3 h-3" />
    default:
      return <Clock className="w-3 h-3" />
  }
}

export function PrinciplesChecklist() {
  const [principles] = useState<Principle[]>(gsmaPrinciplesSeed)
  const [q, setQ] = useState("")

  const principleProgress = useMemo(() => {
    return principles.map((p) => {
      const all = p.subPrinciples.flatMap((s) => s.indicators)
      const done = all.filter((i) => i.status === "completed").length
      const value = Math.round((done / (all.length || 1)) * 100)
      return { id: p.id, value }
    })
  }, [principles])

  const matches = (text: string) => text.toLowerCase().includes(q.toLowerCase())

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>GSMA Core Principles Checklist</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">8 principles grouped with sample sub-principles and indicators.</p>
            </div>
            <Input placeholder="Search indicators or principles..." value={q} onChange={(e) => setQ(e.target.value)} className="w-72" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => {
              const prog = principleProgress.find((pp) => pp.id === p.id)?.value || 0
              return (
                <div key={p.id} className="p-4 rounded-lg border bg-card">
                  <div className="font-semibold mb-1">{p.title}</div>
                  <div className="text-xs text-muted-foreground mb-3">{p.description}</div>
                  <Progress value={prog} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">{prog}% complete</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {principles.map((principle) => (
        <Card key={principle.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{principle.title}</CardTitle>
              <Badge variant="secondary">{principle.subPrinciples.length} Sub-principles</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{principle.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {principle.subPrinciples.map((sp) => (
              <div key={sp.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{sp.title}</div>
                  <Badge variant="outline">{sp.indicators.length} indicators</Badge>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Indicator</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Evidence</TableHead>
                        <TableHead>Comments</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sp.indicators
                        .filter((i) => q ? matches(i.id) || matches(i.title) || matches(i.description) : true)
                        .map((ind) => (
                        <TableRow key={ind.id}>
                          <TableCell className="align-top">
                            <div className="space-y-1">
                              <div className="font-medium text-sm">{ind.id} — {ind.title}</div>
                              <div className="text-xs text-muted-foreground">{ind.description}</div>
                            </div>
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="flex items-center gap-1">
                              {statusIcon(ind.status)}
                              {statusToBadge(ind.status)}
                            </div>
                          </TableCell>
                          <TableCell className="align-top">
                            <div className="space-y-1 text-xs">
                              {ind.evidence?.length ? (
                                ind.evidence.map((e, idx) => (
                                  <div key={idx} className="flex items-center gap-1 text-muted-foreground">
                                    <FileText className="w-3 h-3" />
                                    <span>{e}</span>
                                  </div>
                                ))
                              ) : (
                                <span className="text-muted-foreground">No evidence</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="align-top text-xs text-muted-foreground">{ind.comments || "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


