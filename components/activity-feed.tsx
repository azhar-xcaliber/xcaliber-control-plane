"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, Search, Database, Workflow, Globe, AlertCircle, CheckCircle, Clock, Bot, Filter, X, ArrowRight, FileText, BarChart3 } from 'lucide-react'
import type { Activity } from "@/types/activity"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface ActivityFeedProps {
  onActivitySelect: (activity: Activity) => void
  pod: string
  tenant: string
}

const mockActivities: Activity[] = [
  {
    id: "act-001",
    type: "api-call",
    name: "Customer Data Retrieval",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    duration: 89,
    tenant: "Acme Corp",
    metadata: {
      endpoint: "/api/v1/customers",
      method: "GET",
      responseCode: 200,
      recordsReturned: 150,
      requestId: "req_123456",
      input: '{ "query": "recent_customers" }',
      output: '{ "count": 150, "items": [...] }',
      source: "gateway",
      destination: "customer-service",
    },
  },
  {
    id: "act-002",
    type: "workflow",
    name: "Customer Data Processing Pipeline",
    status: "running",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    duration: null,
    tenant: "Acme Corp",
    metadata: {
      workflowId: "wf_001",
      stage: "data_transformation",
      recordsProcessed: 8934,
      estimatedCompletion: "2 minutes",
      input: "s3://bucket/raw/customers/*.json",
      output: "s3://bucket/processed/customers.parquet",
      source: "raw-lake",
      destination: "processed-lake",
    },
  },
  {
    id: "act-003",
    type: "agent-interaction",
    name: "Data Quality Validation",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    duration: 1240,
    tenant: "Acme Corp",
    metadata: {
      agent: "data-quality-checker",
      validationRules: 12,
      recordsValidated: 15420,
      issuesFound: 0,
      input: "customer_data_batch_001",
      output: "validation_report_001",
      source: "validation-agent",
      destination: "reports-store",
    },
  },
  {
    id: "act-004",
    type: "data-activity",
    name: "Customer Profile Schema Update",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    duration: 2340,
    tenant: "Acme Corp",
    metadata: {
      modelName: "customer_profile",
      operation: "schema_update",
      fieldsAdded: 2,
      recordsAffected: 125000,
      input: '{ add: ["preferred_contact_method"] }',
      output: "Schema v2.1 applied",
      source: "schema-service",
      destination: "ods",
    },
  },
  {
    id: "act-005",
    type: "fault",
    name: "API Rate Limit Exceeded",
    status: "failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    duration: 0,
    tenant: "Acme Corp",
    metadata: {
      endpoint: "/api/v1/transactions",
      errorCode: "RATE_LIMIT_EXCEEDED",
      requestsPerMinute: 1200,
      limit: 1000,
      input: "bulk transaction import",
      output: "HTTP 429 Too Many Requests",
      source: "client-app",
      destination: "gateway",
      error: "HTTP 429",
    },
  },
  {
    id: "act-006",
    type: "workflow",
    name: "Real-time Analytics Processing",
    status: "failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    duration: 3420,
    tenant: "Acme Corp",
    metadata: {
      workflowId: "wf_002",
      stage: "aggregation",
      error: "Connection timeout to external data source",
      recordsProcessed: 5600,
      input: "kafka:topic/events",
      output: "warehouse.table_analytics",
      source: "kafka",
      destination: "warehouse",
    },
  },
  {
    id: "act-007",
    type: "api-call",
    name: "Authentication Request",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    duration: 45,
    tenant: "Acme Corp",
    metadata: {
      endpoint: "/api/v1/auth/login",
      method: "POST",
      responseCode: 200,
      userId: "user_789",
      input: '{ "username": "jdoe" }',
      output: '{ "token": "***" }',
      source: "web-app",
      destination: "auth-service",
    },
  },
  {
    id: "act-008",
    type: "agent-interaction",
    name: "Security Audit Scan",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    duration: 5670,
    tenant: "Acme Corp",
    metadata: {
      agent: "security-auditor",
      resourcesScanned: 45,
      vulnerabilities: 2,
      severity: "medium",
      input: "access_logs_batch",
      output: "security_report_008",
      source: "logs",
      destination: "sec-reports",
    },
  },
]

const activityTypes = [
  { id: "api-call", label: "API Calls", icon: Globe, count: mockActivities.filter((a) => a.type === "api-call").length },
  { id: "workflow", label: "Workflows", icon: Workflow, count: mockActivities.filter((a) => a.type === "workflow").length },
  { id: "agent-interaction", label: "Agent Interactions", icon: Bot, count: mockActivities.filter((a) => a.type === "agent-interaction").length },
  { id: "data-activity", label: "Data Activities", icon: Database, count: mockActivities.filter((a) => a.type === "data-activity").length },
  { id: "fault", label: "Faults", icon: AlertCircle, count: mockActivities.filter((a) => a.type === "fault").length },
]

const statusTypes = [
  { id: "success", label: "Success", count: mockActivities.filter((a) => a.status === "success").length },
  { id: "running", label: "Running", count: mockActivities.filter((a) => a.status === "running").length },
  { id: "failed", label: "Failed", count: mockActivities.filter((a) => a.status === "failed").length },
  { id: "pending", label: "Pending", count: mockActivities.filter((a) => a.status === "pending").length },
]

const timeRanges = [
  { id: "1h", label: "Last Hour" },
  { id: "6h", label: "Last 6 Hours" },
  { id: "24h", label: "Last 24 Hours" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
]

export function ActivityFeed({ onActivitySelect, pod, tenant }: ActivityFeedProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [showFilters, setShowFilters] = useState(true)

  // Local details panel state
  const [selectedActivityDetail, setSelectedActivityDetail] = useState<Activity | null>(null)

  const getActivityIcon = (type: string) => {
    const activityType = activityTypes.find((t) => t.id === type)
    return activityType?.icon || Clock
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200"
      case "failed":
        return "text-red-600 bg-red-50 border-red-200"
      case "running":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700"
      case "failed":
        return "bg-red-100 text-red-700"
      case "running":
        return "bg-blue-100 text-blue-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
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
      case "pending":
        return Clock
      default:
        return Clock
    }
  }

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(activity.type)
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(activity.status)

    const now = new Date()
    const diff = now.getTime() - activity.timestamp.getTime()
    let matchesTime = true
    switch (selectedTimeRange) {
      case "1h":
        matchesTime = diff <= 60 * 60 * 1000
        break
      case "6h":
        matchesTime = diff <= 6 * 60 * 60 * 1000
        break
      case "24h":
        matchesTime = diff <= 24 * 60 * 60 * 1000
        break
      case "7d":
        matchesTime = diff <= 7 * 24 * 60 * 60 * 1000
        break
      case "30d":
        matchesTime = diff <= 30 * 24 * 60 * 60 * 1000
        break
    }

    return matchesSearch && matchesType && matchesStatus && matchesTime
  })

  const handleTypeFilter = (typeId: string, checked: boolean) => {
    setSelectedTypes((prev) => (checked ? [...prev, typeId] : prev.filter((t) => t !== typeId)))
  }

  const handleStatusFilter = (statusId: string, checked: boolean) => {
    setSelectedStatuses((prev) => (checked ? [...prev, statusId] : prev.filter((s) => s !== statusId)))
  }

  const clearAllFilters = () => {
    setSelectedTypes([])
    setSelectedStatuses([])
    setSearchTerm("")
    setSelectedTimeRange("24h")
  }

  const activeFiltersCount = selectedTypes.length + selectedStatuses.length + (searchTerm ? 1 : 0)

  const openDetails = (activity: Activity) => {
    setSelectedActivityDetail(activity)
  }

  const closeDetails = () => setSelectedActivityDetail(null)

  const renderDetailsPanel = () => {
    const activity = selectedActivityDetail
    if (!activity) return null

    const StatusIcon = getStatusIcon(activity.status)
    const durationText = activity.duration != null ? `${activity.duration}ms` : "Running..."
    const inputData =
      activity.metadata && (activity.metadata as any).input ? String((activity.metadata as any).input) : "N/A"
    const outputData =
      activity.metadata && (activity.metadata as any).output ? String((activity.metadata as any).output) : "N/A"

    const diagramUrl = activity.type === "workflow" ? "/activity-details-workflow.png" : "/activity-flow-diagram.png"

    // Build "Additional Metadata" list excluding input/output to avoid duplication
    const additionalMeta = Object.entries(activity.metadata || {}).filter(
      ([k]) => !["input", "output"].includes(k)
    )

    return (
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{activity.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <Badge className={getStatusBadgeColor(activity.status)}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {activity.status}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">
                {activity.type.replace("-", " ")}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={closeDetails} aria-label="Close details">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Overview / Activity Details (kept from previous drawer) */}
          <div className="space-y-3 p-3 border border-gray-200 rounded-lg">
            <div className="text-sm font-medium text-gray-700">Activity Details</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">ID</span>
                <span className="font-mono truncate max-w-[9rem] text-right">{activity.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type</span>
                <span className="capitalize">{activity.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="capitalize">{activity.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span>{durationText}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tenant</span>
                <span>{activity.tenant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Occurred</span>
                <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Input Data</div>
            <pre className="bg-gray-50 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap break-words">
              {inputData}
            </pre>
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Output Data</div>
            <pre className="bg-gray-50 rounded-lg p-3 text-xs font-mono whitespace-pre-wrap break-words">
              {outputData}
            </pre>
          </div>

          {/* Diagram */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Diagram</div>
            <div className="border border-gray-200 rounded-lg p-3 bg-white">
              <img src={diagramUrl || "/placeholder.svg"} alt="Relevant diagram for activity" className="w-full rounded" />
            </div>
          </div>

          {/* Additional Metadata (kept) */}
          {additionalMeta.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Additional Metadata</div>
              <div className="space-y-1 text-sm">
                {additionalMeta.map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-3">
                    <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="font-mono text-right truncate max-w-[10rem]">
                      {typeof value === "number" ? value.toLocaleString() : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Lineage (kept) */}
          {(activity.metadata?.source || activity.metadata?.destination || activity.metadata?.recordsProcessed) && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Data Lineage</div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">{activity.metadata?.source || "Input Source"}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">{activity.metadata?.destination || "Output Destination"}</span>
                </div>
              </div>
              {activity.metadata?.recordsProcessed && (
                <div className="text-xs text-gray-600">
                  <strong>{activity.metadata.recordsProcessed.toLocaleString()}</strong> records processed
                </div>
              )}
            </div>
          )}

          {/* Activity Logs (kept) */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Activity Logs</div>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs space-y-1">
              <div className="text-green-400">[INFO] Activity started: {activity.name}</div>
              {activity.metadata?.recordsProcessed && (
                <div className="text-blue-400">[DEBUG] Processing {activity.metadata.recordsProcessed} records</div>
              )}
              {activity.status === "failed" && activity.metadata?.error && (
                <div className="text-red-400">[ERROR] {(activity.metadata as any).error}</div>
              )}
              {activity.status === "success" && (
                <div className="text-green-400">[INFO] Activity completed successfully</div>
              )}
              {activity.status === "running" && <div className="text-yellow-400">[INFO] Activity in progress...</div>}
            </div>
          </div>

          {/* Performance Metrics (kept) */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-700">Performance Metrics</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{activity.duration ? `${activity.duration}ms` : "N/A"}</div>
                <div className="text-xs text-gray-600">Execution Time</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">
                  {activity.metadata?.recordsProcessed?.toLocaleString() || "N/A"}
                </div>
                <div className="text-xs text-gray-600">Records Processed</div>
              </div>
            </div>
            <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 text-xs">
              <BarChart3 className="w-4 h-4 mr-2" />
              Performance graph placeholder
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full min-w-0">
      {/* Main Content FIRST */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Activity Feed</h2>
              <Badge variant="outline" className="text-sm">
                {filteredActivities.length} activities
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {!showFilters && (
                <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              )}
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-2">No activities found</div>
              <div className="text-sm text-gray-400">Try adjusting your filters or search terms</div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredActivities.map((activity) => {
                const ActivityIcon = getActivityIcon(activity.type)
                const StatusIcon = getStatusIcon(activity.status)

                return (
                  <Card
                    key={activity.id}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-blue-500"
                    onClick={() => openDetails(activity)}
                    aria-label={`Open details for ${activity.name}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <ActivityIcon className="w-5 h-5 text-gray-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900 truncate">{activity.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {activity.type.replace("-", " ")}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <span>{formatDistanceToNow(activity.timestamp, { addSuffix: true })}</span>
                            {activity.duration !== null && <span>{activity.duration}ms</span>}
                            <span>{activity.tenant}</span>
                          </div>

                          {/* Quick metadata hints */}
                          {activity.metadata && (
                            <div className="text-xs text-gray-600">
                              {activity.type === "api-call" && (activity.metadata as any).endpoint && (
                                <span className="mr-4">
                                  {(activity.metadata as any).method} {(activity.metadata as any).endpoint}
                                </span>
                              )}
                              {activity.type === "workflow" && (activity.metadata as any).recordsProcessed && (
                                <span className="mr-4">
                                  {(activity.metadata as any).recordsProcessed.toLocaleString()} records processed
                                </span>
                              )}
                              {activity.type === "agent-interaction" && (activity.metadata as any).agent && (
                                <span className="mr-4">Agent: {(activity.metadata as any).agent}</span>
                              )}
                              {activity.type === "data-activity" && (activity.metadata as any).modelName && (
                                <span className="mr-4">Model: {(activity.metadata as any).modelName}</span>
                              )}
                              {activity.type === "fault" && (activity.metadata as any).errorCode && (
                                <span className="mr-4 text-red-600">
                                  {"Error: "}
                                  {(activity.metadata as any).errorCode}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className={cn("text-xs", getStatusColor(activity.status))}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Details panel between feed and filters */}
      <div
        className={cn(
          "bg-white border-l border-gray-200 transition-all duration-300 overflow-hidden h-full",
          selectedActivityDetail ? "w-[380px]" : "w-0 border-transparent"
        )}
        aria-hidden={!selectedActivityDetail}
      >
        {selectedActivityDetail && renderDetailsPanel()}
      </div>

      {/* Filters Sidebar on the far right */}
      {showFilters && (
        <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
          {/* Filter Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && <Badge variant="secondary" className="text-xs">{activeFiltersCount}</Badge>}
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} aria-label="Hide filters">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearAllFilters} className="w-full">
                Clear All Filters
              </Button>
            )}
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Time Range */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Time Range</label>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {timeRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Activity Types */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Activity Types</label>
              <div className="space-y-3">
                {activityTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <div key={type.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={type.id}
                        checked={selectedTypes.includes(type.id)}
                        onCheckedChange={(checked) => handleTypeFilter(type.id, checked as boolean)}
                      />
                      <label
                        htmlFor={type.id}
                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer flex-1"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{type.label}</span>
                        <Badge variant="outline" className="ml-auto text-xs">
                          {type.count}
                        </Badge>
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Status</label>
              <div className="space-y-3">
                {statusTypes.map((status) => (
                  <div key={status.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={status.id}
                      checked={selectedStatuses.includes(status.id)}
                      onCheckedChange={(checked) => handleStatusFilter(status.id, checked as boolean)}
                    />
                    <label
                      htmlFor={status.id}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer flex-1"
                    >
                      <span>{status.label}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {status.count}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
