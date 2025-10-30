"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ActivityIcon, CheckCircle, AlertTriangle, Clock, Zap } from "lucide-react"
import type { Activity } from "@/types/activity"
import { mockActivities } from "@/lib/mock-activities"

interface ActivityFeedProps {
  onActivitySelect: (activity: Activity) => void
  pod: string
  tenant: string
}

export function ActivityFeed({ onActivitySelect, pod, tenant }: ActivityFeedProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedService, setSelectedService] = useState("all")

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch =
      activity.event_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.url.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || activity.api_type === selectedType
    const matchesStatus = selectedStatus === "all" || activity.status_code.startsWith(selectedStatus)
    const matchesService = selectedService === "all" || activity.service_name === selectedService

    return matchesSearch && matchesType && matchesStatus && matchesService
  })

  const getStatusIcon = (statusCode: string) => {
    const code = Number.parseInt(statusCode)
    if (code >= 200 && code < 300) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    } else if (code >= 400 && code < 500) {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    } else if (code >= 500) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />
    }
    return <Clock className="w-4 h-4 text-gray-500" />
  }

  const getStatusColor = (statusCode: string) => {
    const code = Number.parseInt(statusCode)
    if (code >= 200 && code < 300) {
      return "bg-green-100 text-green-700"
    } else if (code >= 400 && code < 500) {
      return "bg-yellow-100 text-yellow-700"
    } else if (code >= 500) {
      return "bg-red-100 text-red-700"
    }
    return "bg-gray-100 text-gray-700"
  }

  const getApiTypeIcon = (apiType: string) => {
    switch (apiType) {
      case "REST":
        return <Zap className="w-4 h-4 text-blue-500" />
      case "RPC":
        return <Zap className="w-4 h-4 text-purple-500" />
      case "WEBHOOK":
        return <Zap className="w-4 h-4 text-orange-500" />
      case "SYSTEM":
        return <Zap className="w-4 h-4 text-gray-500" />
      default:
        return <ActivityIcon className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header and Filters */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Activity Feed</h2>
            <p className="text-sm text-gray-500">Real-time API trace activities across the platform</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {filteredActivities.length} activities
            </Badge>
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

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="API Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="REST">REST</SelectItem>
              <SelectItem value="RPC">RPC</SelectItem>
              <SelectItem value="WEBHOOK">Webhook</SelectItem>
              <SelectItem value="SYSTEM">System</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="2">2xx Success</SelectItem>
              <SelectItem value="4">4xx Client Error</SelectItem>
              <SelectItem value="5">5xx Server Error</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="data-catalog-api">Data Catalog API</SelectItem>
              <SelectItem value="workflow-orchestrator">Workflow Orchestrator</SelectItem>
              <SelectItem value="connector-service-athena">Connector Service</SelectItem>
              <SelectItem value="analytics-query-engine">Analytics Engine</SelectItem>
              <SelectItem value="health-monitor">Health Monitor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <Card
              key={activity.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onActivitySelect(activity)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-gray-100 rounded-lg">{getApiTypeIcon(activity.api_type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{activity.event_id}</h3>
                        <Badge variant="outline" className="text-xs">
                          {activity.api_type}
                        </Badge>
                        <Badge className={getStatusColor(activity.status_code)}>
                          {getStatusIcon(activity.status_code)}
                          <span className="ml-1">{activity.status_code}</span>
                        </Badge>
                        {activity.cache_hit && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                            Cached
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                        <div>
                          <span className="font-medium">Service:</span>
                          <div className="truncate">{activity.service_name}</div>
                        </div>
                        <div>
                          <span className="font-medium">Method:</span>
                          <div>{activity.method}</div>
                        </div>
                        <div>
                          <span className="font-medium">Response Time:</span>
                          <div>{activity.response_time}ms</div>
                        </div>
                        <div>
                          <span className="font-medium">Request ID:</span>
                          <div className="font-mono text-xs truncate">{activity.request_id}</div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 mb-2">
                        <span className="font-medium">URL:</span> {activity.url}
                      </div>

                      {/* Activity-specific metadata */}
                      {activity.attributes && Object.keys(activity.attributes).length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {Object.entries(activity.attributes).map(([key, value]) => (
                            <Badge key={key} variant="outline" className="text-xs">
                              {key}: {String(value)}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <ActivityIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-500 mb-4">No activities found</div>
              <div className="text-sm text-gray-400">
                Try adjusting your search criteria or check back later for new activities.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
