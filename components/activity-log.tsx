"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Download, CheckCircle, AlertTriangle, Activity, RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ActivityLogEntry {
  id: string
  timestamp: Date
  type: "info" | "warning" | "error" | "success"
  action: string
  description: string
  user?: string
  metadata?: Record<string, any>
}

interface ActivityLogProps {
  activities: ActivityLogEntry[]
  componentName: string
}

export function ActivityLog({ activities, componentName }: ActivityLogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || activity.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-700"
      case "warning":
        return "bg-yellow-100 text-yellow-700"
      case "error":
        return "bg-red-100 text-red-700"
      default:
        return "bg-blue-100 text-blue-700"
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
            <p className="text-sm text-gray-500">Recent activities for {componentName}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Types</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <Badge variant="outline" className="text-sm">
            {filteredActivities.length} entries
          </Badge>
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-3">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">{getTypeIcon(activity.type)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900">{activity.action}</h4>
                      <Badge className={getTypeColor(activity.type)}>{activity.type}</Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
                      {activity.user && <span>by {activity.user}</span>}
                      <span className="font-mono">{activity.id}</span>
                    </div>

                    {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        {Object.entries(activity.metadata).map(([key, value]) => (
                          <span key={key} className="mr-4">
                            {key}: {String(value)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-400">{activity.timestamp.toLocaleTimeString()}</div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-500 mb-4">No activities found</div>
              <div className="text-sm text-gray-400">
                {searchTerm || selectedType !== "all"
                  ? "Try adjusting your search criteria."
                  : "Activities will appear here as they occur."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
