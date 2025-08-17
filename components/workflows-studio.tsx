"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Play, Pause, Plus, Search, Filter, Clock, CheckCircle, AlertCircle, Workflow, BarChart3, Edit, Database, Globe, Bot, Activity, X } from 'lucide-react'
import type { Activity as ActivityType } from "@/types/activity"

interface WorkflowsStudioProps {
  onActivitySelect: (activity: ActivityType) => void
}

interface WorkflowData {
  id: string
  name: string
  type: "operational" | "injection" | "gateway" | "agentx" | "hdf"
  category: "active" | "executing" | "continuous" | "one-time"
  status: "running" | "completed" | "failed" | "paused" | "scheduled"
  created: Date
  lastRun: Date
  nextRun?: Date
  duration: string
  avgDuration: number
  successRate: number
  executions: number
  description: string
  author: string
  version: string
  triggers: string[]
  dependencies: string[]
}

const mockWorkflows: WorkflowData[] = [
  {
    id: "wf_op_001",
    name: "Customer Data Processing Pipeline",
    type: "operational",
    category: "continuous",
    status: "running",
    created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    lastRun: new Date(Date.now() - 1000 * 60 * 5),
    duration: "2m 34s",
    avgDuration: 154000,
    successRate: 98.5,
    executions: 1247,
    description: "Processes customer data from multiple sources with validation and enrichment",
    author: "john.doe@company.com",
    version: "v2.1.0",
    triggers: ["schedule", "data-arrival"],
    dependencies: ["customer-api", "validation-service"],
  },
  {
    id: "wf_inj_002",
    name: "Real-time Data Injection",
    type: "injection",
    category: "continuous",
    status: "running",
    created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    lastRun: new Date(Date.now() - 1000 * 30),
    duration: "Continuous",
    avgDuration: 0,
    successRate: 99.2,
    executions: 8934,
    description: "Ingests streaming data from Kafka topics into data lake",
    author: "jane.smith@company.com",
    version: "v1.8.2",
    triggers: ["kafka-stream"],
    dependencies: ["kafka-cluster", "data-lake"],
  },
  {
    id: "wf_gw_003",
    name: "API Gateway Rate Limiting",
    type: "gateway",
    category: "active",
    status: "completed",
    created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    lastRun: new Date(Date.now() - 1000 * 60 * 15),
    duration: "45s",
    avgDuration: 45000,
    successRate: 97.8,
    executions: 456,
    description: "Monitors and enforces API rate limits across all endpoints",
    author: "mike.wilson@company.com",
    version: "v3.0.1",
    triggers: ["api-request"],
    dependencies: ["gateway-service"],
  },
  {
    id: "wf_ag_004",
    name: "Agent Health Monitoring",
    type: "agentx",
    category: "continuous",
    status: "running",
    created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    lastRun: new Date(Date.now() - 1000 * 60 * 2),
    duration: "1m 12s",
    avgDuration: 72000,
    successRate: 94.2,
    executions: 2341,
    description: "Monitors agent health and performance metrics",
    author: "sarah.jones@company.com",
    version: "v1.5.0",
    triggers: ["schedule"],
    dependencies: ["agent-registry", "metrics-collector"],
  },
  {
    id: "wf_hdf_005",
    name: "Data Quality Validation",
    type: "hdf",
    category: "one-time",
    status: "completed",
    created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    lastRun: new Date(Date.now() - 1000 * 60 * 60),
    duration: "5m 23s",
    avgDuration: 323000,
    successRate: 100,
    executions: 12,
    description: "Validates data quality across all HDF datasets",
    author: "alex.brown@company.com",
    version: "v2.0.0",
    triggers: ["manual"],
    dependencies: ["hdf-service", "quality-rules"],
  },
  {
    id: "wf_op_006",
    name: "Batch ETL Processing",
    type: "operational",
    category: "one-time",
    status: "failed",
    created: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    lastRun: new Date(Date.now() - 1000 * 60 * 30),
    duration: "12m 45s",
    avgDuration: 765000,
    successRate: 89.3,
    executions: 89,
    description: "Nightly batch processing of transaction data",
    author: "chris.davis@company.com",
    version: "v1.2.1",
    triggers: ["schedule"],
    dependencies: ["transaction-db", "etl-service"],
  },
]

const workflowTypes = [
  { id: "operational", label: "Operational", icon: Workflow, color: "blue", count: mockWorkflows.filter((w) => w.type === "operational").length },
  { id: "injection", label: "Injection", icon: Database, color: "green", count: mockWorkflows.filter((w) => w.type === "injection").length },
  { id: "gateway", label: "Gateway", icon: Globe, color: "purple", count: mockWorkflows.filter((w) => w.type === "gateway").length },
  { id: "agentx", label: "AgentX", icon: Bot, color: "orange", count: mockWorkflows.filter((w) => w.type === "agentx").length },
  { id: "hdf", label: "HDF", icon: BarChart3, color: "indigo", count: mockWorkflows.filter((w) => w.type === "hdf").length },
]

const workflowCategories = [
  { id: "active", label: "Active", count: mockWorkflows.filter((w) => w.category === "active").length },
  { id: "executing", label: "Executing", count: mockWorkflows.filter((w) => w.category === "executing").length },
  { id: "continuous", label: "Continuous", count: mockWorkflows.filter((w) => w.category === "continuous").length },
  { id: "one-time", label: "One-time", count: mockWorkflows.filter((w) => w.category === "one-time").length },
]

const workflowStatuses = [
  { id: "running", label: "Running", count: mockWorkflows.filter((w) => w.status === "running").length },
  { id: "completed", label: "Completed", count: mockWorkflows.filter((w) => w.status === "completed").length },
  { id: "failed", label: "Failed", count: mockWorkflows.filter((w) => w.status === "failed").length },
  { id: "paused", label: "Paused", count: mockWorkflows.filter((w) => w.status === "paused").length },
  { id: "scheduled", label: "Scheduled", count: mockWorkflows.filter((w) => w.status === "scheduled").length },
]

export function WorkflowsStudio({ onActivitySelect }: WorkflowsStudioProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(true)
  const [viewMode, setViewMode] = useState<"list" | "dashboard">("dashboard")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-blue-100 text-blue-700"
      case "completed":
        return "bg-green-100 text-green-700"
      case "failed":
        return "bg-red-100 text-red-700"
      case "paused":
        return "bg-yellow-100 text-yellow-700"
      case "scheduled":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Activity className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "failed":
        return <AlertCircle className="w-4 h-4" />
      case "paused":
        return <Pause className="w-4 h-4" />
      case "scheduled":
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    const workflowType = workflowTypes.find((t) => t.id === type)
    return workflowType?.icon || Workflow
  }

  const getTypeColor = (type: string) => {
    const workflowType = workflowTypes.find((t) => t.id === type)
    return workflowType?.color || "gray"
  }

  const filteredWorkflows = mockWorkflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(workflow.type)
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(workflow.category)
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(workflow.status)

    return matchesSearch && matchesType && matchesCategory && matchesStatus
  })

  const handleTypeFilter = (typeId: string, checked: boolean) => {
    setSelectedTypes((prev) => (checked ? [...prev, typeId] : prev.filter((t) => t !== typeId)))
  }

  const handleCategoryFilter = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) => (checked ? [...prev, categoryId] : prev.filter((c) => c !== categoryId)))
  }

  const handleStatusFilter = (statusId: string, checked: boolean) => {
    setSelectedStatuses((prev) => (checked ? [...prev, statusId] : prev.filter((s) => s !== statusId)))
  }

  const clearAllFilters = () => {
    setSelectedTypes([])
    setSelectedCategories([])
    setSelectedStatuses([])
    setSearchTerm("")
  }

  const activeFiltersCount =
    selectedTypes.length + selectedCategories.length + selectedStatuses.length + (searchTerm ? 1 : 0)

  const handleWorkflowAction = (workflow: WorkflowData, _action: string) => {
    const activity: ActivityType = {
      id: workflow.id,
      type: "workflow",
      name: workflow.name,
      status: workflow.status === "completed" ? "success" : workflow.status === "failed" ? "failed" : "running",
      timestamp: workflow.lastRun,
      duration: workflow.avgDuration,
      tenant: "Current Tenant",
      metadata: {
        workflowType: workflow.type,
        category: workflow.category,
        successRate: workflow.successRate,
        executions: workflow.executions,
        description: workflow.description,
        author: workflow.author,
        version: workflow.version,
        triggers: workflow.triggers.join(", "),
        dependencies: workflow.dependencies.join(", "),
      },
    }
    onActivitySelect(activity)
  }

  return (
    <div className="flex h-full w-full min-w-0">
      {/* Main Content FIRST for right-side filters */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Workflow Studio</h2>
              <p className="text-sm text-gray-500">Design, manage, and monitor all workflow types</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setViewMode(viewMode === "dashboard" ? "list" : "dashboard")}>
                {viewMode === "dashboard" ? "List View" : "Dashboard"}
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Workflow
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Show Filters button when panel is hidden */}
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
            <Badge variant="outline" className="text-sm">
              {filteredWorkflows.length} workflows
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === "dashboard" ? (
            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Workflows</p>
                        <p className="text-2xl font-bold text-gray-900">{mockWorkflows.length}</p>
                      </div>
                      <Workflow className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Running</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {mockWorkflows.filter((w) => w.status === "running").length}
                        </p>
                      </div>
                      <Activity className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Success Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          {(mockWorkflows.reduce((acc, w) => acc + w.successRate, 0) / mockWorkflows.length).toFixed(1)}%
                        </p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Executions</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {mockWorkflows.reduce((acc, w) => acc + w.executions, 0).toLocaleString()}
                        </p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Types distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Types Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {workflowTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <div key={type.id} className="text-center p-4 border border-gray-200 rounded-lg">
                          <Icon className={`w-8 h-8 text-${type.color}-600 mx-auto mb-2`} />
                          <div className="text-2xl font-bold text-gray-900">{type.count}</div>
                          <div className="text-sm text-gray-600">{type.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent workflows */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Workflows</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredWorkflows.slice(0, 5).map((workflow) => {
                      const TypeIcon = getTypeIcon(workflow.type)
                      const StatusIcon = getStatusIcon(workflow.status)

                      return (
                        <div
                          key={workflow.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 bg-${getTypeColor(workflow.type)}-100 rounded-lg`}>
                              <TypeIcon className={`w-5 h-5 text-${getTypeColor(workflow.type)}-600`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {workflow.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {workflow.category}
                                </Badge>
                                <span className="text-xs text-gray-500">Last run: {workflow.lastRun.toLocaleTimeString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right text-sm">
                              <div className="font-medium">{workflow.successRate}% success</div>
                              <div className="text-gray-500">{workflow.executions} runs</div>
                            </div>
                            <Badge className={getStatusColor(workflow.status)}>
                              {StatusIcon}
                              <span className="ml-1">{workflow.status}</span>
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* List View */
            <div className="p-6">
              <div className="space-y-4">
                {filteredWorkflows.map((workflow) => {
                  const TypeIcon = getTypeIcon(workflow.type)
                  const StatusIcon = getStatusIcon(workflow.status)

                  return (
                    <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`p-2 bg-${getTypeColor(workflow.type)}-100 rounded-lg`}>
                              <TypeIcon className={`w-5 h-5 text-${getTypeColor(workflow.type)}-600`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {workflow.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {workflow.category}
                                </Badge>
                                <Badge className={getStatusColor(workflow.status)}>
                                  {StatusIcon}
                                  <span className="ml-1">{workflow.status}</span>
                                </Badge>
                              </div>

                              <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">ID:</span>
                                  <span className="ml-2 font-medium font-mono">{workflow.id}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Duration:</span>
                                  <span className="ml-2 font-medium">{workflow.duration}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Success Rate:</span>
                                  <span className="ml-2 font-medium text-green-600">{workflow.successRate}%</span>
                                </div>
                                <div>
                                  <span className="text-gray-500">Executions:</span>
                                  <span className="ml-2 font-medium">{workflow.executions.toLocaleString()}</span>
                                </div>
                              </div>

                              <div className="mt-3 text-xs text-gray-500">
                                <span>Author: {workflow.author}</span>
                                <span className="mx-2">•</span>
                                <span>Version: {workflow.version}</span>
                                <span className="mx-2">•</span>
                                <span>Created: {workflow.created.toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleWorkflowAction(workflow, "details")}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // play/pause could be handled here
                              }}
                            >
                              {workflow.status === "running" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters Sidebar on the right */}
      {showFilters && (
        <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && <Badge variant="secondary" className="text-xs">{activeFiltersCount}</Badge>}
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
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

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Workflow Types */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Workflow Types</label>
              <div className="space-y-3">
                {workflowTypes.map((type) => {
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
                        <Icon className={`w-4 h-4 text-${type.color}-600`} />
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

            {/* Categories */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Categories</label>
              <div className="space-y-3">
                {workflowCategories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryFilter(category.id, checked as boolean)}
                    />
                    <label
                      htmlFor={category.id}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer flex-1"
                    >
                      <span>{category.label}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {category.count}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Status</label>
              <div className="space-y-3">
                {workflowStatuses.map((status) => (
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
