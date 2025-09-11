"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { ConfigurationWorkflowDialog } from "@/components/configuration-workflow-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Radio, Activity, CheckCircle, AlertTriangle, Clock, Database, Workflow, Settings } from "lucide-react"
import type { DataChannel } from "@/types/channel"
import type { Activity as ActivityType } from "@/types/activity"

interface ChannelsViewProps {
  onActivitySelect: (activity: ActivityType) => void
}

const mockChannels: DataChannel[] = [
  {
    id: "ch_patient_data",
    name: "patient-data-stream",
    description: "Real-time patient data streaming channel for Epic EHR integration",
    version: "v2.1.0",
    status: "ACTIVE",
    syncStatus: "SYNCED",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    createdBy: "john.doe@hospital.com",
    throughput: {
      messagesPerSecond: 1250,
      bytesPerSecond: 2048000,
      peakThroughput: 3500,
    },
    consumers: [
      {
        id: "consumer_patient_360",
        name: "Patient 360 View",
        status: "active",
        lag: 0,
        throughput: 1200,
      },
      {
        id: "consumer_analytics",
        name: "Clinical Analytics",
        status: "active",
        lag: 15,
        throughput: 800,
      },
    ],
    partitions: 12,
    retentionPeriod: "7d",
    compressionType: "gzip",
    schema: {
      version: "1.2.0",
      fields: [
        { name: "patient_id", type: "string", required: true },
        { name: "encounter_id", type: "string", required: true },
        { name: "timestamp", type: "datetime", required: true },
        { name: "data", type: "object", required: true },
      ],
    },
    metrics: {
      totalMessages: 15420000,
      errorRate: 0.02,
      avgLatency: 45,
      availability: 99.95,
    },
  },
  {
    id: "ch_lab_results",
    name: "lab-results-channel",
    description: "Laboratory results and diagnostic reports streaming channel",
    version: "v1.8.3",
    status: "ACTIVE",
    syncStatus: "SYNCING",
    createdAt: "2024-01-10T08:15:00Z",
    updatedAt: "2024-01-21T09:30:00Z",
    createdBy: "lab.admin@hospital.com",
    throughput: {
      messagesPerSecond: 450,
      bytesPerSecond: 1024000,
      peakThroughput: 1200,
    },
    consumers: [
      {
        id: "consumer_results_viewer",
        name: "Results Viewer",
        status: "active",
        lag: 5,
        throughput: 400,
      },
    ],
    partitions: 6,
    retentionPeriod: "30d",
    compressionType: "snappy",
    schema: {
      version: "1.0.0",
      fields: [
        { name: "result_id", type: "string", required: true },
        { name: "patient_id", type: "string", required: true },
        { name: "test_type", type: "string", required: true },
        { name: "result_value", type: "string", required: true },
        { name: "reference_range", type: "string", required: false },
      ],
    },
    metrics: {
      totalMessages: 2340000,
      errorRate: 0.01,
      avgLatency: 32,
      availability: 99.8,
    },
  },
  {
    id: "ch_appointments",
    name: "appointments-stream",
    description: "Patient appointment scheduling and updates channel",
    version: "v3.0.1",
    status: "INACTIVE",
    syncStatus: "FAILED",
    createdAt: "2024-01-05T16:20:00Z",
    updatedAt: "2024-01-19T11:15:00Z",
    createdBy: "scheduling@hospital.com",
    throughput: {
      messagesPerSecond: 0,
      bytesPerSecond: 0,
      peakThroughput: 800,
    },
    consumers: [],
    partitions: 4,
    retentionPeriod: "14d",
    compressionType: "lz4",
    schema: {
      version: "2.1.0",
      fields: [
        { name: "appointment_id", type: "string", required: true },
        { name: "patient_id", type: "string", required: true },
        { name: "provider_id", type: "string", required: true },
        { name: "scheduled_time", type: "datetime", required: true },
        { name: "status", type: "string", required: true },
      ],
    },
    metrics: {
      totalMessages: 890000,
      errorRate: 0.15,
      avgLatency: 120,
      availability: 95.2,
    },
  },
  {
    id: "ch_medications",
    name: "medication-orders-channel",
    description: "Medication orders and pharmacy integration channel",
    version: "v1.5.2",
    status: "ACTIVE",
    syncStatus: "SYNCED",
    createdAt: "2023-12-20T12:00:00Z",
    updatedAt: "2024-01-18T16:30:00Z",
    createdBy: "pharmacy@hospital.com",
    throughput: {
      messagesPerSecond: 180,
      bytesPerSecond: 512000,
      peakThroughput: 500,
    },
    consumers: [
      {
        id: "consumer_pharmacy",
        name: "Pharmacy System",
        status: "active",
        lag: 2,
        throughput: 175,
      },
      {
        id: "consumer_med_reconciliation",
        name: "Med Reconciliation",
        status: "paused",
        lag: 450,
        throughput: 0,
      },
    ],
    partitions: 3,
    retentionPeriod: "90d",
    compressionType: "gzip",
    schema: {
      version: "1.1.0",
      fields: [
        { name: "order_id", type: "string", required: true },
        { name: "patient_id", type: "string", required: true },
        { name: "medication", type: "object", required: true },
        { name: "dosage", type: "string", required: true },
        { name: "frequency", type: "string", required: true },
      ],
    },
    metrics: {
      totalMessages: 1250000,
      errorRate: 0.005,
      avgLatency: 28,
      availability: 99.9,
    },
  },
]

const mockActivityData = [
  {
    id: "act_ch_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "success" as const,
    action: "Channel Message Processed",
    description: "Patient data stream processed 1,250 messages successfully",
    user: "system",
    metadata: {
      channelId: "ch_patient_data",
      messagesProcessed: 1250,
      throughput: "1.2k/sec",
      latency: "45ms",
    },
  },
  {
    id: "act_ch_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "error" as const,
    action: "Channel Sync Failed",
    description: "Appointments stream sync failed due to schema validation error",
    user: "system",
    metadata: {
      channelId: "ch_appointments",
      error: "Schema validation failed",
      affectedMessages: 45,
      retryScheduled: new Date(Date.now() + 1000 * 60 * 30),
    },
  },
  {
    id: "act_ch_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "info" as const,
    action: "Consumer Connected",
    description: "New consumer 'Clinical Analytics' connected to patient-data-stream",
    user: "system",
    metadata: {
      channelId: "ch_patient_data",
      consumerId: "consumer_analytics",
      consumerName: "Clinical Analytics",
      initialLag: 0,
    },
  },
  {
    id: "act_ch_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "warning" as const,
    action: "High Consumer Lag Detected",
    description: "Med Reconciliation consumer showing high lag on medication orders channel",
    user: "system",
    metadata: {
      channelId: "ch_medications",
      consumerId: "consumer_med_reconciliation",
      currentLag: 450,
      threshold: 100,
    },
  },
]

const mockTasksData = [
  {
    id: "task_ch_001",
    title: "Fix Appointments Channel Schema",
    description: "Resolve schema validation errors causing sync failures in appointments stream",
    status: "pending" as const,
    priority: "critical" as const,
    assignee: "data.engineer@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 4),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    tags: ["schema", "appointments", "validation", "critical"],
  },
  {
    id: "task_ch_002",
    title: "Optimize Lab Results Throughput",
    description: "Increase partition count and optimize compression for lab results channel",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "performance.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    tags: ["performance", "lab-results", "optimization", "throughput"],
  },
  {
    id: "task_ch_003",
    title: "Resume Med Reconciliation Consumer",
    description: "Investigate and resume the paused medication reconciliation consumer",
    status: "completed" as const,
    priority: "medium" as const,
    assignee: "ops.team@hospital.com",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["consumer", "medications", "reconciliation", "operations"],
  },
]

const mockConfigurationData = [
  {
    id: "config_ch_001",
    name: "Default Channel Retention",
    type: "string",
    value: "30d",
    description: "Default retention period for data channels",
    category: "Channel Management",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    modifiedBy: "data.engineer@hospital.com",
    defaultValue: "7d",
  },
  {
    id: "config_ch_002",
    name: "Auto-Sync Enabled",
    type: "boolean",
    value: true,
    description: "Automatically sync channel status with data sources",
    category: "Synchronization",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    modifiedBy: "system@hospital.com",
    defaultValue: false,
  },
  {
    id: "config_ch_003",
    name: "Default Channel Version",
    type: "string",
    value: "v1.0.0",
    description: "Default version for new data channels",
    category: "Channel Management",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 12),
    modifiedBy: "data.engineer@hospital.com",
    defaultValue: "v1.0.0",
  },
  {
    id: "config_ch_004",
    name: "Channel Status Validation",
    type: "boolean",
    value: true,
    description: "Validate channel status before allowing modifications",
    category: "Validation",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 6),
    modifiedBy: "admin@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_ch_005",
    name: "Listener Auto-Update",
    type: "boolean",
    value: false,
    description: "Automatically update data channel listeners when channel configuration changes",
    category: "Synchronization",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    modifiedBy: "system@hospital.com",
    defaultValue: false,
  },
  {
    id: "config_ch_006",
    name: "Pipeline State Tracking",
    type: "boolean",
    value: true,
    description: "Enable detailed tracking of data pipeline states and stages",
    category: "Pipeline Management",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 18),
    modifiedBy: "pipeline.admin@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_ch_007",
    name: "Channel Creation Approval",
    type: "boolean",
    value: false,
    description: "Require approval workflow for creating new data channels",
    category: "Governance",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    modifiedBy: "governance@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_ch_008",
    name: "Max Channel Listeners",
    type: "number",
    value: 10,
    description: "Maximum number of listeners allowed per data channel",
    category: "Performance",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    modifiedBy: "performance.team@hospital.com",
    defaultValue: 5,
  },
]

export function ChannelsView({ onActivitySelect }: ChannelsViewProps) {
  const [selectedItem, setSelectedItem] = useState<DataChannel | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isWorkflowDialogOpen, setIsWorkflowDialogOpen] = useState(false)
  const [selectedDataModel, setSelectedDataModel] = useState<any>(null)

  const handleItemSelect = (item: DataChannel) => {
    setSelectedItem(item)
    setIsDrawerOpen(true)
  }

  const handleCreateNew = () => {
    setSelectedItem(null)
    setIsDrawerOpen(true)
  }

  const handleRefresh = () => {
    console.log("Refreshing channels...")
  }

  const handleDataModelSelect = (dataModel: any) => {
    setSelectedDataModel(dataModel)
    setIsWorkflowDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return "bg-green-100 text-green-700"
      case "INACTIVE":
        return "bg-gray-100 text-gray-700"
      case "ERROR":
        return "bg-red-100 text-red-700"
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSyncStatusColor = (syncStatus: string) => {
    switch (syncStatus.toUpperCase()) {
      case "SYNCED":
        return "bg-green-100 text-green-700"
      case "SYNCING":
        return "bg-blue-100 text-blue-700"
      case "FAILED":
        return "bg-red-100 text-red-700"
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSyncStatusIcon = (syncStatus: string) => {
    switch (syncStatus.toUpperCase()) {
      case "SYNCED":
        return <CheckCircle className="w-4 h-4" />
      case "SYNCING":
        return <Activity className="w-4 h-4 animate-spin" />
      case "FAILED":
        return <AlertTriangle className="w-4 h-4" />
      case "PENDING":
        return <Clock className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Channels</p>
                <p className="text-2xl font-bold text-gray-900">{mockChannels.length}</p>
              </div>
              <Radio className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Channels</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockChannels.filter((ch) => ch.status === "ACTIVE").length}
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
                <p className="text-sm text-gray-600">Total Throughput</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockChannels.reduce((sum, ch) => sum + ch.throughput.messagesPerSecond, 0).toLocaleString()}
                  /s
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
                <p className="text-sm text-gray-600">Avg Availability</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(mockChannels.reduce((sum, ch) => sum + ch.metrics.availability, 0) / mockChannels.length).toFixed(
                    1,
                  )}
                  %
                </p>
              </div>
              <Database className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Models Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Workflow className="w-5 h-5" />
              Data Models & Workflows
            </CardTitle>
            <Button onClick={() => handleDataModelSelect({ name: "Patient 360 View" })}>
              <Settings className="w-4 h-4 mr-2" />
              Configure Workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: "dm_patient_360",
                name: "Patient 360 View",
                description: "Comprehensive patient data model with full clinical history",
                status: "active",
                channels: ["patient-data-stream", "lab-results-channel"],
                layers: ["Bronze", "Silver", "Gold"],
              },
              {
                id: "dm_clinical_analytics",
                name: "Clinical Analytics",
                description: "Analytics-ready clinical data for reporting and insights",
                status: "active",
                channels: ["patient-data-stream", "medication-orders-channel"],
                layers: ["Bronze", "Silver", "Gold"],
              },
              {
                id: "dm_quality_metrics",
                name: "Quality Metrics",
                description: "Healthcare quality metrics and performance indicators",
                status: "inactive",
                channels: ["appointments-stream"],
                layers: ["Bronze", "Silver"],
              },
            ].map((model) => (
              <Card
                key={model.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleDataModelSelect(model)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-500" />
                      <h4 className="font-medium">{model.name}</h4>
                    </div>
                    <Badge
                      className={
                        model.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }
                    >
                      {model.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{model.description}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-gray-500">Channels:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {model.channels.map((channel, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">Layers:</span>
                      <div className="flex gap-1 mt-1">
                        {model.layers.map((layer, index) => (
                          <Badge
                            key={index}
                            className={
                              layer === "Bronze"
                                ? "bg-amber-100 text-amber-700"
                                : layer === "Silver"
                                  ? "bg-slate-100 text-slate-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {layer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockChannels.slice(0, 3).map((channel) => (
              <div
                key={channel.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleItemSelect(channel)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Radio className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{channel.name}</h4>
                    <p className="text-sm text-gray-600">{channel.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>v{channel.version}</span>
                      <span>{channel.partitions} partitions</span>
                      <span>{channel.consumers.length} consumers</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div className="font-medium">{channel.throughput.messagesPerSecond.toLocaleString()}/s</div>
                    <div className="text-gray-500">{formatBytes(channel.throughput.bytesPerSecond)}/s</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(channel.status)}>{channel.status}</Badge>
                    <Badge className={getSyncStatusColor(channel.syncStatus)}>
                      <div className="flex items-center gap-1">
                        {getSyncStatusIcon(channel.syncStatus)}
                        {channel.syncStatus}
                      </div>
                    </Badge>
                  </div>
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
      items={mockChannels.map((channel) => ({
        id: channel.id,
        name: channel.name,
        type: `Channel v${channel.version}`,
        status: channel.status.toLowerCase() as "active" | "inactive" | "error",
        description: channel.description,
        lastModified: new Date(channel.updatedAt),
        createdBy: channel.createdBy,
      }))}
      onItemSelect={(item) => {
        const channel = mockChannels.find((ch) => ch.id === item.id)
        if (channel) handleItemSelect(channel)
      }}
      onCreateNew={handleCreateNew}
      itemType="Channel"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Data Channels"
        description="Manage real-time data streaming channels and message queues"
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
        title={selectedItem?.name || "New Channel"}
        itemType="Channel"
      />

      <ConfigurationWorkflowDialog
        isOpen={isWorkflowDialogOpen}
        onClose={() => setIsWorkflowDialogOpen(false)}
        dataModel={selectedDataModel}
      />
    </>
  )
}
