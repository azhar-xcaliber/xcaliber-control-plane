"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Activity, CheckCircle, AlertTriangle, Clock, Copy, ExternalLink, RefreshCw } from "lucide-react"

interface ActivityDetails {
  id: string
  title: string
  type: string
  severity: string
  status: string
  component: string
  details: string
  timestamp: Date
  duration: number | null
  triggeredBy: string
  source: string
  connectionTime: number
}

interface ActivityDetailsDrawerProps {
  activity: ActivityDetails | null
  isOpen: boolean
  onClose: () => void
}

export function ActivityDetailsDrawer({ activity, isOpen, onClose }: ActivityDetailsDrawerProps) {
  if (!isOpen || !activity) return null

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "severe":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "major":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case "minor":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default:
        return <Activity className="w-5 h-5 text-blue-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "severe":
        return "bg-red-50 text-red-700 border-red-200"
      case "major":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "minor":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(activity.id)
  }

  const handleRetry = () => {
    console.log("Retrying activity:", activity.id)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-96 h-full flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Activity Details</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={getSeverityColor(activity.severity)}>
              {getSeverityIcon(activity.severity)}
              <span className="ml-1">{activity.severity}</span>
            </Badge>
            <Badge variant="outline">{activity.type}</Badge>
            {getStatusIcon(activity.status)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title and Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{activity.title}</h3>
            <p className="text-gray-600">{activity.details}</p>
          </div>

          {/* Activity Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Component</div>
                  <div className="font-medium">{activity.component}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Source</div>
                  <div className="font-medium">{activity.source}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Triggered By</div>
                  <div className="font-medium">{activity.triggeredBy}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(activity.status)}
                    <span className="font-medium capitalize">{activity.status}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Started At</span>
                <span className="font-medium">{activity.timestamp.toLocaleString()}</span>
              </div>
              {activity.duration && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Duration</span>
                  <span className="font-medium">{activity.duration}ms</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Connection Time</span>
                <span className="font-medium">{activity.connectionTime}ms</span>
              </div>
            </CardContent>
          </Card>

          {/* Activity ID and Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity ID</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-gray-100 px-2 py-1 rounded font-mono">{activity.id}</code>
                <Button variant="outline" size="sm" onClick={handleCopyId}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Activities */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Related Activities</h4>
            <div className="text-sm text-gray-500">No related activities found for this event.</div>
          </div>

          {/* Error Details (if applicable) */}
          {activity.status === "error" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-red-700">Error Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Error Code:</span> ERR_CONNECTION_TIMEOUT
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Stack Trace:</span>
                  </div>
                  <code className="block text-xs bg-red-50 p-2 rounded border border-red-200">
                    at Database.connect (db.js:42:15) at processData (processor.js:128:9) at Object.handler
                    (index.js:89:12)
                  </code>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-2">
            {activity.status === "error" && (
              <Button onClick={handleRetry} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            )}
            <Button variant="outline" className="flex-1 bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
