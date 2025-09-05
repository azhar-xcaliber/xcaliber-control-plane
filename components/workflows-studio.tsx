"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Workflow, Activity, CheckCircle, BarChart3, Database, Globe, Bot, AlertCircle } from "lucide-react"
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
  lastModified: Date
  createdBy: string
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
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    createdBy: "john.doe@company.com",
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
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 12),
    createdBy: "jane.smith@company.com",
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
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 6),
    createdBy: "mike.wilson@company.com",
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
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdBy: "sarah.jones@company.com",
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
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    createdBy: "alex.brown@company.com",
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
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    createdBy: "chris.davis@company.com",
  },
]

const mockActivityData = [
  {
    id: "act_wf_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "success" as const,
    action: "Workflow Execution Completed",
    description: "Customer Data Processing Pipeline completed successfully in 2m 34s",
    user: "system",
    metadata: {
      workflow: "Customer Data Processing Pipeline",
      duration: "2m 34s",
      recordsProcessed: 15420,
      successRate: 98.5,
    },
  },
  {
    id: "act_wf_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "error" as const,
    action: "Workflow Execution Failed",
    description: "Batch ETL Processing failed due to database connection timeout",
    user: "system",
    metadata: {
      workflow: "Batch ETL Processing",
      error: "Database connection timeout",
      duration: "12m 45s",
      failurePoint: "Step 3: Data Transformation",
    },
  },
  {
    id: "act_wf_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "info" as const,
    action: "Workflow Configuration Updated",
    description: "API Gateway Rate Limiting workflow updated to v3.0.1",
    user: "mike.wilson@company.com",
    metadata: {
      workflow: "API Gateway Rate Limiting",
      version: "v3.0.1",
      configChanges: 2,
      previousVersion: "v3.0.0",
    },
  },
  {
    id: "act_wf_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: "warning" as const,
    action: "Performance Degradation Detected",
    description: "Agent Health Monitoring workflow showing increased execution time",
    user: "system",
    metadata: {
      workflow: "Agent Health Monitoring",
      avgDuration: "1m 12s",
      previousAvg: "45s",
      threshold: "1m",
    },
  },
]

const mockTasksData = [
  {
    id: "task_wf_001",
    title: "Optimize ETL Processing Performance",
    description: "Investigate and optimize the Batch ETL Processing workflow to reduce execution time",
    status: "pending" as const,
    priority: "high" as const,
    assignee: "chris.davis@company.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["performance", "etl", "optimization"],
  },
  {
    id: "task_wf_002",
    title: "Fix Database Connection Issues",
    description: "Resolve recurring database connection timeouts in ETL workflows",
    status: "in-progress" as const,
    priority: "critical" as const,
    assignee: "john.doe@company.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 12),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    tags: ["troubleshooting", "database", "connectivity"],
  },
  {
    id: "task_wf_003",
    title: "Update Workflow Documentation",
    description: "Update documentation for all operational workflows to reflect recent changes",
    status: "completed" as const,
    priority: "medium" as const,
    assignee: "jane.smith@company.com",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    tags: ["documentation", "maintenance", "workflows"],
  },
]

const mockConfigurationData = [
  {
    id: "config_wf_001",
    name: "Max Concurrent Workflows",
    type: "number",
    value: 10,
    description: "Maximum number of workflows that can run concurrently",
    category: "Performance",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    modifiedBy: "admin@company.com",
    defaultValue: 5,
  },
  {
    id: "config_wf_002",
    name: "Workflow Timeout",
    type: "number",
    value: 3600,
    description: "Default workflow execution timeout in seconds",
    category: "Performance",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    modifiedBy: "john.doe@company.com",
    defaultValue: 1800,
  },
  {
    id: "config_wf_003",
    name: "Auto Retry Failed Workflows",
    type: "boolean",
    value: true,
    description: "Automatically retry failed workflows up to 3 times",
    category: "Reliability",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "system@company.com",
    defaultValue: false,
  },
  {
    id: "config_wf_004",
    name: "Notification Webhooks",
    type: "string",
    value: "https://api.company.com/webhooks/workflows",
    description: "Webhook URL for workflow status notifications",
    category: "Notifications",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    modifiedBy: "admin@company.com",
    defaultValue: "",
  },
]

const workflowTypes = [
  { id: "operational", label: "Operational", icon: Workflow, color: "blue" },
  { id: "injection", label: "Injection", icon: Database, color: "green" },
  { id: "gateway", label: "Gateway", icon: Globe, color: "purple" },
  { id: "agentx", label: "AgentX", icon: Bot, color: "orange" },
  { id: "hdf", label: "HDF", icon: BarChart3, color: "indigo" },
]

export function WorkflowsStudio({ onActivitySelect }: WorkflowsStudioProps) {
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
    console.log("Refreshing workflows...")
  }

  const getTypeIcon = (type: string) => {
    const workflowType = workflowTypes.find((t) => t.id === type)
    return workflowType?.icon || Workflow
  }

  const getTypeColor = (type: string) => {
    const workflowType = workflowTypes.find((t) => t.id === type)
    return workflowType?.color || "gray"
  }

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
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      {/* Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Types Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflowTypes.map((type) => {
              const Icon = type.icon
              const count = mockWorkflows.filter((w) => w.type === type.id).length
              return (
                <div key={type.id} className="text-center p-4 border border-gray-200 rounded-lg">
                  <Icon className={`w-8 h-8 text-${type.color}-600 mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600">{type.label}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWorkflows.slice(0, 5).map((workflow) => {
              const TypeIcon = getTypeIcon(workflow.type)
              const StatusIcon = getStatusIcon(workflow.status)

              return (
                <div
                  key={workflow.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleItemSelect(workflow)}
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
  )

  const configurationContent = (
    <ConfigurationList
      items={mockWorkflows}
      onItemSelect={handleItemSelect}
      onCreateNew={handleCreateNew}
      itemType="Workflow"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Workflow Studio"
        description="Design, manage, and monitor all workflow types"
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
        title={selectedItem?.name || "New Workflow"}
        itemType="Workflow"
      />
    </>
  )
}
