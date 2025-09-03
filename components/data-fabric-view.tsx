"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Workflow, Activity, Plus, Settings, Play, Pause, Zap, Server } from "lucide-react"

const dataOperationsComponents = [
  {
    id: "pipeline-orchestrator",
    name: "Pipeline Orchestrator",
    description: "Manages and orchestrates data processing pipelines",
    status: "active",
    icon: Workflow,
    pipelines: 24,
    throughput: "2.8TB/day",
    uptime: "99.9%",
  },
  {
    id: "stream-processor",
    name: "Stream Processor",
    description: "Real-time data stream processing and transformation",
    status: "active",
    icon: Zap,
    pipelines: 12,
    throughput: "450GB/hour",
    uptime: "99.8%",
  },
  {
    id: "data-quality-engine",
    name: "Data Quality Engine",
    description: "Automated data quality monitoring and validation",
    status: "active",
    icon: Activity,
    pipelines: 18,
    throughput: "1.2TB/day",
    uptime: "99.7%",
  },
  {
    id: "metadata-manager",
    name: "Metadata Manager",
    description: "Centralized metadata management and lineage tracking",
    status: "maintenance",
    icon: Database,
    pipelines: 8,
    throughput: "50GB/day",
    uptime: "98.5%",
  },
]

const recentOperations = [
  {
    id: "op-001",
    name: "Patient Data ETL",
    type: "Batch Pipeline",
    status: "running",
    progress: 75,
    startTime: new Date(Date.now() - 1000 * 60 * 45),
    estimatedCompletion: new Date(Date.now() + 1000 * 60 * 15),
  },
  {
    id: "op-002",
    name: "Real-time Vitals Stream",
    type: "Streaming",
    status: "active",
    progress: 100,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    estimatedCompletion: null,
  },
  {
    id: "op-003",
    name: "Claims Data Validation",
    type: "Quality Check",
    status: "completed",
    progress: 100,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    estimatedCompletion: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "op-004",
    name: "Lab Results Processing",
    type: "Batch Pipeline",
    status: "failed",
    progress: 45,
    startTime: new Date(Date.now() - 1000 * 60 * 60),
    estimatedCompletion: null,
  },
]

const mockActivityData = [
  {
    id: "act_do_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "success" as const,
    action: "Pipeline Completed",
    description: "Patient Data ETL pipeline completed successfully",
    user: "system",
    metadata: { pipeline: "op-001", duration: "45m", recordsProcessed: 125000 },
  },
  {
    id: "act_do_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "error" as const,
    action: "Pipeline Failed",
    description: "Lab Results Processing pipeline failed due to schema mismatch",
    user: "system",
    metadata: { pipeline: "op-004", error: "Schema validation failed", stage: "transformation" },
  },
  {
    id: "act_do_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "warning" as const,
    action: "High Memory Usage",
    description: "Stream Processor showing elevated memory consumption",
    user: "system",
    metadata: { component: "stream-processor", memoryUsage: "87%", threshold: "80%" },
  },
  {
    id: "act_do_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "info" as const,
    action: "Maintenance Started",
    description: "Metadata Manager scheduled maintenance window started",
    user: "ops.team@hospital.com",
    metadata: { component: "metadata-manager", duration: "2h", impact: "minimal" },
  },
]

const mockTasksData = [
  {
    id: "task_do_001",
    title: "Optimize Stream Processing Performance",
    description: "Investigate and resolve memory usage issues in Stream Processor component",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "ops.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    tags: ["performance", "streaming", "memory"],
  },
  {
    id: "task_do_002",
    title: "Update Pipeline Schema Validation",
    description: "Update schema validation rules for Lab Results Processing pipeline",
    status: "pending" as const,
    priority: "critical" as const,
    assignee: "data.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    tags: ["schema", "validation", "lab-results"],
  },
  {
    id: "task_do_003",
    title: "Complete Metadata Manager Maintenance",
    description: "Complete scheduled maintenance and performance tuning for Metadata Manager",
    status: "in-progress" as const,
    priority: "medium" as const,
    assignee: "ops.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 6),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["maintenance", "metadata", "performance"],
  },
  {
    id: "task_do_004",
    title: "Implement Data Lineage Tracking",
    description: "Implement comprehensive data lineage tracking for all ETL pipelines",
    status: "completed" as const,
    priority: "medium" as const,
    assignee: "data.team@hospital.com",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    tags: ["lineage", "tracking", "governance"],
  },
]

const mockConfigurationData = [
  {
    id: "config_do_001",
    name: "Pipeline Retry Attempts",
    type: "number",
    value: 3,
    description: "Maximum number of retry attempts for failed pipeline stages",
    category: "Pipeline",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    modifiedBy: "ops.team@hospital.com",
    defaultValue: 2,
  },
  {
    id: "config_do_002",
    name: "Stream Buffer Size",
    type: "number",
    value: 10000,
    description: "Buffer size for streaming data processing (records)",
    category: "Streaming",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    modifiedBy: "data.team@hospital.com",
    defaultValue: 5000,
  },
  {
    id: "config_do_003",
    name: "Quality Check Threshold",
    type: "number",
    value: 0.95,
    description: "Minimum data quality score to pass validation",
    category: "Quality",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    modifiedBy: "quality.team@hospital.com",
    defaultValue: 0.9,
  },
  {
    id: "config_do_004",
    name: "Metadata Sync Interval",
    type: "number",
    value: 300,
    description: "Metadata synchronization interval in seconds",
    category: "Metadata",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "ops.team@hospital.com",
    defaultValue: 600,
  },
  {
    id: "config_do_005",
    name: "Enable Data Lineage",
    type: "boolean",
    value: true,
    description: "Enable automatic data lineage tracking for all operations",
    category: "Governance",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "compliance@hospital.com",
    defaultValue: true,
  },
]

export function DataFabricView() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleItemSelect = (item: any) => {
    setSelectedItem(item)
    setIsDrawerOpen(true)
  }

  const handleCreateNew = () => {
    setSelectedItem(null)
    setIsDrawerOpen(true)
  }

  const handleRefresh = () => {
    console.log("Refreshing data operations...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {dataOperationsComponents.map((component) => {
          const Icon = component.icon
          return (
            <Card key={component.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{component.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {component.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{component.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Active Pipelines</span>
                    <span className="font-medium">{component.pipelines}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Throughput</span>
                    <span className="font-medium">{component.throughput}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Uptime</span>
                    <span className="font-medium text-green-600">{component.uptime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Operations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Operations</CardTitle>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Operation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOperations.map((operation) => (
              <div
                key={operation.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Server className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{operation.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {operation.type}
                      </Badge>
                      {operation.status === "running" && (
                        <div className="flex items-center gap-1">
                          <div className="w-20 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${operation.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{operation.progress}%</span>
                        </div>
                      )}
                      {operation.estimatedCompletion && (
                        <span className="text-xs text-gray-500">
                          ETA: {operation.estimatedCompletion.toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      operation.status === "running"
                        ? "bg-blue-100 text-blue-700"
                        : operation.status === "active"
                          ? "bg-green-100 text-green-700"
                          : operation.status === "completed"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-red-100 text-red-700"
                    }
                  >
                    {operation.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    {operation.status === "running" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const configurationContent = (
    <ConfigurationList
      items={dataOperationsComponents}
      onItemSelect={handleItemSelect}
      onCreateNew={handleCreateNew}
      itemType="Data Operation"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Data Operations"
        description="Monitor and manage data processing operations and pipeline orchestration"
        dashboardContent={dashboardContent}
        configurationContent={configurationContent}
        onRefresh={handleRefresh}
        activityData={mockActivityData}
        tasksData={mockTasksData}
        configurationData={mockConfigurationData}
      >
        {dashboardContent}
      </ComponentLayout>

      <DetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        item={selectedItem}
        title={selectedItem?.name || "New Data Operation"}
        itemType="Data Operation"
      />
    </>
  )
}
