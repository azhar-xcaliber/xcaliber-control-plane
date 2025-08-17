"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Clock, Database, ArrowRight, AlertCircle, CheckCircle, BarChart3, FileText, GitBranch } from "lucide-react"
import type { Activity } from "@/types/activity"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface ActivityDrawerProps {
  activity: Activity | null
  isOpen: boolean
  onClose: () => void
}

export function ActivityDrawer({ activity, isOpen, onClose }: ActivityDrawerProps) {
  if (!activity) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200"
      case "failed":
        return "text-red-600 bg-red-50 border-red-200"
      case "running":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return CheckCircle
      case "failed":
        return AlertCircle
      case "running":
        return Clock
      default:
        return Clock
    }
  }

  const StatusIcon = getStatusIcon(activity.status)

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-96 bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", getStatusColor(activity.status))}>
              <StatusIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 truncate">{activity.name}</h2>
              <p className="text-sm text-gray-500">{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            <Tabs defaultValue="metadata" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
                <TabsTrigger value="lineage">Lineage</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
              </TabsList>

              <TabsContent value="metadata" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Activity Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">ID</span>
                      <span className="text-sm font-mono">{activity.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Type</span>
                      <Badge variant="outline">{activity.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status</span>
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Duration</span>
                      <span className="text-sm">{activity.duration ? `${activity.duration}ms` : "Running..."}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Tenant</span>
                      <span className="text-sm">{activity.tenant}</span>
                    </div>
                  </CardContent>
                </Card>

                {activity.metadata && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Additional Metadata</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {Object.entries(activity.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="text-sm font-mono text-right max-w-48 truncate">
                            {typeof value === "number" ? value.toLocaleString() : String(value)}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="lineage" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <GitBranch className="w-4 h-4" />
                      Data Lineage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">{activity.metadata?.source || "Input Source"}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">
                          {activity.metadata?.destination || "Output Destination"}
                        </span>
                      </div>
                    </div>

                    {activity.metadata?.recordsProcessed && (
                      <div className="mt-3 text-sm text-gray-600">
                        <strong>{activity.metadata.recordsProcessed.toLocaleString()}</strong> records processed
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Activity Logs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs space-y-1">
                      <div className="text-green-400">[INFO] Activity started: {activity.name}</div>
                      <div className="text-blue-400">
                        [DEBUG] Processing {activity.metadata?.recordsProcessed || 0} records
                      </div>
                      {activity.status === "failed" && activity.metadata?.error && (
                        <div className="text-red-400">[ERROR] {activity.metadata.error}</div>
                      )}
                      {activity.status === "success" && (
                        <div className="text-green-400">[INFO] Activity completed successfully</div>
                      )}
                      {activity.status === "running" && (
                        <div className="text-yellow-400">[INFO] Activity in progress...</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {activity.duration ? `${activity.duration}ms` : "N/A"}
                        </div>
                        <div className="text-xs text-gray-600">Execution Time</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {activity.metadata?.recordsProcessed?.toLocaleString() || "N/A"}
                        </div>
                        <div className="text-xs text-gray-600">Records Processed</div>
                      </div>
                    </div>

                    <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                      Performance graph would be rendered here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
