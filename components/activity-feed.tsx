"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Activity, CheckCircle, AlertTriangle, Clock, Workflow, Bot, Database } from "lucide-react"
import type { Activity as ActivityType } from "@/types/activity"

interface ActivityFeedProps {
  onActivitySelect: (activity: ActivityType) => void
  pod: string
  tenant: string
}

const mockActivities: ActivityType[] = [
  {
    id: "act_001",
    type: "workflow",
    name: "Patient Data Processing Workflow",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    duration: 2340,
    tenant: "Henry Ford Health",
    metadata: {
      workflowId: "wf_001",
      recordsProcessed: 1247,
      source: "EMR System",
    },
  },
  {
    id: "act_002",
    type: "agent-interaction",
    name: "Data Quality Validation Agent",
    status: "running",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    duration: null,
    tenant: "Henry Ford Health",
    metadata: {
      agentId: "agent_001",
      operation: "data_validation",
      progress: 67,
    },
  },
  {
    id: "act_003",
    type: "data-ingestion",
    name: "Lab Results Import",
    status: "failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    duration: 890,
    tenant: "TechStart Inc",
    metadata: {
      source: "Lab API",
      error: "Connection timeout",
      retryCount: 3,
    },
  },
  {
    id: "act_004",
    type: "workflow",
    name: "Insurance Claims Processing",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    duration: 5670,
    tenant: "Global Systems",
    metadata: {
      workflowId: "wf_002",
      claimsProcessed: 234,
      approvedClaims: 189,
    },
  },
  {
    id: "act_005",
    type: "api-call",
    name: "FHIR Patient Resource Access",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    duration: 45,
    tenant: "Henry Ford Health",
    metadata: {
      endpoint: "/Patient/12345",
      method: "GET",
      responseCode: 200,
    },
  },
]

export function ActivityFeed({ onActivitySelect, pod, tenant }: ActivityFeedProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedTenant, setSelectedTenant] = useState("all")

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || activity.type === selectedType
    const matchesStatus = selectedStatus === "all" || activity.status === selectedStatus
    const matchesTenant = selectedTenant === "all" || activity.tenant === selectedTenant

    return matchesSearch && matchesType && matchesStatus && matchesTenant
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "running":
        return <Activity className="w-4 h-4 text-blue-500" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "workflow":
        return <Workflow className="w-4 h-4 text-purple-500" />
      case "agent-interaction":
        return <Bot className="w-4 h-4 text-orange-500" />
      case "data-ingestion":
        return <Database className="w-4 h-4 text-blue-500" />
      case "api-call":
        return <Activity className="w-4 h-4 text-green-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
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
    <div className="flex-1 flex flex-col">
      {/* Header and Filters */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Activity Feed</h2>
            <p className="text-sm text-gray-500">Real-time activity across the platform</p>
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
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="workflow">Workflows</SelectItem>
              <SelectItem value="agent-interaction">Agents</SelectItem>
              <SelectItem value="data-ingestion">Data</SelectItem>
              <SelectItem value="api-call">API Calls</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedTenant} onValueChange={setSelectedTenant}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tenant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tenants</SelectItem>
              <SelectItem value="Henry Ford Health">Henry Ford Health</SelectItem>
              <SelectItem value="TechStart Inc">TechStart Inc</SelectItem>
              <SelectItem value="Global Systems">Global Systems</SelectItem>
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
                    <div className="p-2 bg-gray-100 rounded-lg">{getTypeIcon(activity.type)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                        <Badge variant="outline" className="text-xs capitalize">
                          {activity.type.replace("-", " ")}
                        </Badge>
                        <Badge className={getStatusColor(activity.status)}>
                          {getStatusIcon(activity.status)}
                          <span className="ml-1 capitalize">{activity.status}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Tenant:</span>
                          <div className="truncate">{activity.tenant}</div>
                        </div>
                        <div>
                          <span className="font-medium">Time:</span>
                          <div>{activity.timestamp.toLocaleTimeString()}</div>
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span>
                          <div>
                            {activity.duration
                              ? `${activity.duration}ms`
                              : activity.status === "running"
                                ? "Running..."
                                : "N/A"}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">ID:</span>
                          <div className="font-mono text-xs">{activity.id}</div>
                        </div>
                      </div>

                      {/* Activity-specific metadata */}
                      {activity.metadata && (
                        <div className="mt-3 text-xs text-gray-500">
                          {activity.type === "workflow" && activity.metadata.recordsProcessed && (
                            <span>Processed {activity.metadata.recordsProcessed} records</span>
                          )}
                          {activity.type === "agent-interaction" && activity.metadata.progress && (
                            <span>Progress: {activity.metadata.progress}%</span>
                          )}
                          {activity.type === "data-ingestion" && activity.metadata.error && (
                            <span className="text-red-600">Error: {activity.metadata.error}</span>
                          )}
                          {activity.type === "api-call" && activity.metadata.responseCode && (
                            <span>Response: {activity.metadata.responseCode}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">{activity.timestamp.toLocaleDateString()}</div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
