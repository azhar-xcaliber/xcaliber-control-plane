"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ExternalLink, RefreshCw, CheckCircle, AlertTriangle, Clock, ActivityIcon } from "lucide-react"
import type { Activity } from "@/types/activity"

interface ActivityDrawerProps {
  activity: Activity | null
  isOpen: boolean
  onClose: () => void
}

export function ActivityDrawer({ activity, isOpen, onClose }: ActivityDrawerProps) {
  if (!isOpen || !activity) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "running":
        return <ActivityIcon className="w-5 h-5 text-blue-500" />
      case "failed":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700"
      case "running":
        return "bg-blue-100 text-blue-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Activity Details</h2>
            <p className="text-sm text-gray-500">{activity.type}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                {getStatusIcon(activity.status)}
                {activity.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Duration</span>
                <span className="text-sm font-medium">
                  {activity.duration ? `${activity.duration}ms` : activity.status === "running" ? "Running..." : "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tenant</span>
                <span className="text-sm font-medium">{activity.tenant}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Started</span>
                <span className="text-sm font-medium">{activity.timestamp.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          {activity.metadata && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(activity.metadata).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                    <span className="text-sm font-medium truncate ml-2">
                      {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Activity Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Activity Started</div>
                    <div className="text-xs text-gray-500">{activity.timestamp.toLocaleString()}</div>
                  </div>
                </div>

                {activity.status === "success" && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Activity Completed</div>
                      <div className="text-xs text-gray-500">
                        {new Date(activity.timestamp.getTime() + (activity.duration || 0)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                {activity.status === "running" && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">In Progress</div>
                      <div className="text-xs text-gray-500">Currently running...</div>
                    </div>
                  </div>
                )}

                {activity.status === "failed" && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Activity Failed</div>
                      <div className="text-xs text-gray-500">
                        {new Date(activity.timestamp.getTime() + (activity.duration || 0)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                View in Logs
              </Button>

              {activity.status === "failed" && (
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Activity
                </Button>
              )}

              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ActivityIcon className="w-4 h-4 mr-2" />
                View Related Activities
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
