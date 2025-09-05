"use client"

import { useState } from "react"
import { ComponentLayout } from "./component-layout"
import { ConfigurationList } from "./configuration-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Radio, GitBranch, Search, Plus, Activity, CheckCircle, AlertCircle, Clock, Database, Zap } from "lucide-react"
import { DetailsDrawer } from "./details-drawer"
import type { DataChannel, DataChannelListener } from "../types/channel"

// Mock data based on actual API structure
const mockChannels: DataChannel[] = [
  {
    id: "ch-001",
    name: "patient-data-channel",
    description: "Primary channel for patient demographic and clinical data",
    version: "2.1.0",
    status: "ACTIVE",
    syncStatus: "SYNCED",
    createdBy: "system-admin",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-10T14:22:00Z",
  },
  {
    id: "ch-002",
    name: "lab-results-channel",
    description: "Channel for laboratory test results and diagnostic data",
    version: "1.8.3",
    status: "ACTIVE",
    syncStatus: "SYNCING",
    createdBy: "data-engineer",
    createdAt: "2024-02-01T09:15:00Z",
    updatedAt: "2024-03-12T11:45:00Z",
  },
  {
    id: "ch-003",
    name: "billing-events-channel",
    description: "Financial and billing event processing channel",
    version: "1.5.2",
    status: "INACTIVE",
    syncStatus: "FAILED",
    createdBy: "billing-admin",
    createdAt: "2024-01-20T16:00:00Z",
    updatedAt: "2024-03-08T13:30:00Z",
  },
  {
    id: "ch-004",
    name: "medication-orders-channel",
    description: "Medication orders and pharmacy integration channel",
    version: "2.0.1",
    status: "MODIFYING",
    syncStatus: "PENDING",
    createdBy: "pharmacy-lead",
    createdAt: "2024-02-15T12:00:00Z",
    updatedAt: "2024-03-11T16:20:00Z",
  },
  {
    id: "ch-005",
    name: "imaging-data-channel",
    description: "Medical imaging and DICOM data processing channel",
    version: "1.9.0",
    status: "ACTIVE",
    syncStatus: "SYNCED",
    createdBy: "radiology-tech",
    createdAt: "2024-01-25T14:30:00Z",
    updatedAt: "2024-03-09T10:15:00Z",
  },
]

const mockChannelListeners: DataChannelListener[] = [
  {
    id: "cl-001",
    createdAt: "2024-01-15T10:35:00Z",
    createdBy: "system-admin",
    status: "ACTIVE",
    modifiedAt: "2024-03-10T14:25:00Z",
    modifyBy: "data-engineer",
    syncStatus: "SYNCED",
    entityVersion: 3,
    dataChannelName: "patient-data-channel",
    dataSourceId: "ds-epic-001",
    accountId: "acc-healthcare-main",
    tenantId: "tenant-hospital-a",
    namespaceId: "ns-clinical-data",
    dataPipeline: {
      id: "dp-001",
      createdAt: "2024-01-15T10:35:00Z",
      createdBy: "system-admin",
      status: "ACTIVE",
      modifiedAt: "2024-03-10T14:25:00Z",
      modifyBy: "data-engineer",
      syncStatus: "SYNCED",
      entityVersion: 2,
      name: "patient-data-pipeline",
      description: "Pipeline for processing patient demographic and clinical data",
      states: ["RECEIVED", "VALIDATED", "TRANSFORMED", "ENRICHED", "DELIVERED"],
      stages: ["INGESTION", "VALIDATION", "TRANSFORMATION", "ENRICHMENT", "DELIVERY"],
    },
  },
  {
    id: "cl-002",
    createdAt: "2024-02-01T09:20:00Z",
    createdBy: "data-engineer",
    status: "ACTIVE",
    modifiedAt: "2024-03-12T11:50:00Z",
    modifyBy: "lab-technician",
    syncStatus: "SYNCING",
    entityVersion: 1,
    dataChannelName: "lab-results-channel",
    dataSourceId: "ds-labcorp-001",
    accountId: "acc-healthcare-main",
    tenantId: "tenant-hospital-a",
    namespaceId: "ns-lab-data",
    dataPipeline: {
      id: "dp-002",
      createdAt: "2024-02-01T09:20:00Z",
      createdBy: "data-engineer",
      status: "ACTIVE",
      modifiedAt: "2024-03-12T11:50:00Z",
      modifyBy: "lab-technician",
      syncStatus: "SYNCING",
      entityVersion: 1,
      name: "lab-results-pipeline",
      description: "Pipeline for processing laboratory test results",
      states: ["RECEIVED", "VALIDATED", "NORMALIZED", "DELIVERED"],
      stages: ["INGESTION", "VALIDATION", "NORMALIZATION", "DELIVERY"],
    },
  },
]

// Mock Activity Data for Data Channels
const mockActivityData = [
  {
    id: "act_ch_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "success" as const,
    action: "Channel Sync Completed",
    description: "Patient data channel successfully synchronized 1,247 records",
    user: "system",
    metadata: {
      channelId: "ch-001",
      recordsProcessed: 1247,
      duration: "2.3s",
      syncStatus: "SYNCED",
    },
  },
  {
    id: "act_ch_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    type: "error" as const,
    action: "Channel Listener Failed",
    description: "Billing events channel listener encountered connection timeout",
    user: "system",
    metadata: {
      channelId: "ch-003",
      listenerId: "cl-003",
      error: "Connection timeout after 30s",
      retryAttempt: 3,
    },
  },
  {
    id: "act_ch_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    type: "warning" as const,
    action: "Pipeline State Change",
    description: "Lab results channel pipeline moved to MODIFYING state for maintenance",
    user: "lab-technician",
    metadata: {
      channelId: "ch-002",
      pipelineId: "dp-002",
      previousState: "ACTIVE",
      newState: "MODIFYING",
      reason: "Scheduled maintenance",
    },
  },
  {
    id: "act_ch_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: "info" as const,
    action: "Channel Version Updated",
    description: "Medication orders channel updated to version 2.0.1 with enhanced validation",
    user: "pharmacy-lead",
    metadata: {
      channelId: "ch-004",
      previousVersion: "2.0.0",
      newVersion: "2.0.1",
      features: ["Enhanced validation", "Improved error handling"],
    },
  },
  {
    id: "act_ch_005",
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
    type: "success" as const,
    action: "Pipeline Execution Completed",
    description: "Imaging data pipeline successfully processed 89 DICOM files",
    user: "system",
    metadata: {
      channelId: "ch-005",
      pipelineId: "dp-003",
      filesProcessed: 89,
      totalSize: "2.3GB",
    },
  },
  {
    id: "act_ch_006",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "warning" as const,
    action: "High Message Volume",
    description: "Patient data channel experiencing higher than normal message volume",
    user: "system",
    metadata: {
      channelId: "ch-001",
      currentVolume: "3.2K msg/hour",
      normalVolume: "2.1K msg/hour",
      threshold: "3K msg/hour",
    },
  },
]

// Mock Tasks Data for Data Channels
const mockTasksData = [
  {
    id: "task_ch_001",
    title: "Fix Billing Channel Connection Issues",
    description: "Investigate and resolve persistent connection timeouts in billing events channel",
    status: "in-progress" as const,
    priority: "critical" as const,
    assignee: "billing-admin",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    tags: ["billing", "connection", "timeout", "urgent"],
    metadata: {
      channelId: "ch-003",
      errorCount: 15,
      lastError: "Connection timeout after 30s",
    },
  },
  {
    id: "task_ch_002",
    title: "Complete Lab Pipeline Maintenance",
    description: "Finish scheduled maintenance on lab results processing pipeline",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "lab-technician",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 4),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    tags: ["lab", "pipeline", "maintenance", "scheduled"],
    metadata: {
      channelId: "ch-002",
      pipelineId: "dp-002",
      maintenanceType: "Performance optimization",
    },
  },
  {
    id: "task_ch_003",
    title: "Upgrade Imaging Channel Infrastructure",
    description: "Plan and execute infrastructure upgrade for imaging data channel to handle increased DICOM volume",
    status: "pending" as const,
    priority: "medium" as const,
    assignee: "radiology-tech",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    tags: ["imaging", "infrastructure", "upgrade", "capacity"],
    metadata: {
      channelId: "ch-005",
      currentCapacity: "100GB/day",
      targetCapacity: "500GB/day",
    },
  },
  {
    id: "task_ch_004",
    title: "Implement Channel Monitoring Alerts",
    description: "Set up automated monitoring and alerting for all data channels",
    status: "pending" as const,
    priority: "medium" as const,
    assignee: "system-admin",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    tags: ["monitoring", "alerts", "automation", "ops"],
    metadata: {
      scope: "All channels",
      alertTypes: ["Performance", "Errors", "Capacity"],
    },
  },
  {
    id: "task_ch_005",
    title: "Optimize Patient Channel Performance",
    description: "Review and optimize patient data channel to handle increased message volume",
    status: "completed" as const,
    priority: "high" as const,
    assignee: "data-engineer",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    tags: ["patient", "performance", "optimization", "completed"],
    metadata: {
      channelId: "ch-001",
      improvementAchieved: "35% throughput increase",
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    },
  },
]

// Mock Configuration Data for Data Channels
const mockConfigurationData = [
  {
    id: "config_ch_001",
    name: "Channel Sync Interval",
    type: "number",
    value: 30,
    description: "Default interval in seconds between channel synchronization attempts",
    category: "Synchronization",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    modifiedBy: "system-admin",
    defaultValue: 60,
  },
  {
    id: "config_ch_002",
    name: "Max Retry Attempts",
    type: "number",
    value: 5,
    description: "Maximum number of retry attempts for failed channel operations",
    category: "Error Handling",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    modifiedBy: "ops-team",
    defaultValue: 3,
  },
  {
    id: "config_ch_003",
    name: "Pipeline Buffer Size",
    type: "number",
    value: 1000,
    description: "Maximum number of records in pipeline processing buffer",
    category: "Performance",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "performance-team",
    defaultValue: 500,
  },
  {
    id: "config_ch_004",
    name: "Connection Timeout",
    type: "number",
    value: 30,
    description: "Connection timeout in seconds for channel listeners",
    category: "Network",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    modifiedBy: "network-admin",
    defaultValue: 15,
  },
  {
    id: "config_ch_005",
    name: "Enable Channel Monitoring",
    type: "boolean",
    value: true,
    description: "Enable real-time monitoring and alerting for all data channels",
    category: "Monitoring",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    modifiedBy: "monitoring-team",
    defaultValue: true,
  },
  {
    id: "config_ch_006",
    name: "Message Batch Size",
    type: "number",
    value: 100,
    description: "Number of messages to process in a single batch",
    category: "Performance",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    modifiedBy: "data-engineer",
    defaultValue: 50,
  },
  {
    id: "config_ch_007",
    name: "Audit Logging Level",
    type: "string",
    value: "DETAILED",
    description: "Level of audit logging for channel operations (BASIC, DETAILED, VERBOSE)",
    category: "Compliance",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "compliance-team",
    defaultValue: "BASIC",
  },
  {
    id: "config_ch_008",
    name: "Enable Data Encryption",
    type: "boolean",
    value: true,
    description: "Enable end-to-end encryption for all channel data transmission",
    category: "Security",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    modifiedBy: "security-team",
    defaultValue: true,
  },
  {
    id: "config_ch_009",
    name: "Channel Health Check Interval",
    type: "number",
    value: 60,
    description: "Interval in seconds for channel health status checks",
    category: "Monitoring",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    modifiedBy: "ops-team",
    defaultValue: 120,
  },
  {
    id: "config_ch_010",
    name: "Dead Letter Queue Enabled",
    type: "boolean",
    value: true,
    description: "Enable dead letter queue for failed message processing",
    category: "Error Handling",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
    modifiedBy: "data-engineer",
    defaultValue: false,
  },
]

export function ChannelsView() {
  const [selectedItem, setSelectedItem] = useState<DataChannel | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredChannels = mockChannels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleItemSelect = (item: DataChannel) => {
    setSelectedItem(item)
    setIsDrawerOpen(true)
  }

  const handleCreateNew = () => {
    setSelectedItem(null)
    setIsDrawerOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "INACTIVE":
        return <AlertCircle className="w-4 h-4 text-gray-500" />
      case "MODIFYING":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "ERROR":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />
    }
  }

  const getSyncStatusIcon = (syncStatus: string) => {
    switch (syncStatus) {
      case "SYNCED":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "SYNCING":
        return <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
      case "FAILED":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700"
      case "INACTIVE":
        return "bg-gray-100 text-gray-700"
      case "MODIFYING":
        return "bg-blue-100 text-blue-700"
      case "ERROR":
        return "bg-red-100 text-red-700"
      default:
        return "bg-yellow-100 text-yellow-700"
    }
  }

  const getSyncStatusColor = (syncStatus: string) => {
    switch (syncStatus) {
      case "SYNCED":
        return "bg-green-100 text-green-700"
      case "SYNCING":
        return "bg-blue-100 text-blue-700"
      case "FAILED":
        return "bg-red-100 text-red-700"
      default:
        return "bg-yellow-100 text-yellow-700"
    }
  }

  const handleRefresh = () => {
    console.log("Refreshing data channels...")
  }

  // Calculate statistics
  const totalChannels = mockChannels.length
  const activeChannels = mockChannels.filter((c) => c.status === "ACTIVE").length
  const syncedChannels = mockChannels.filter((c) => c.syncStatus === "SYNCED").length
  const totalListeners = mockChannelListeners.length

  const dashboardContent = (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Channels</p>
                <p className="text-2xl font-bold text-gray-900">{totalChannels}</p>
              </div>
              <Radio className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Channels</p>
                <p className="text-2xl font-bold text-green-600">{activeChannels}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Synced Channels</p>
                <p className="text-2xl font-bold text-blue-600">{syncedChannels}</p>
              </div>
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Channel Listeners</p>
                <p className="text-2xl font-bold text-purple-600">{totalListeners}</p>
              </div>
              <Database className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Channel Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["ACTIVE", "INACTIVE", "MODIFYING", "ERROR"].map((status) => {
                const count = mockChannels.filter((c) => c.status === status).length
                const percentage = totalChannels > 0 ? (count / totalChannels) * 100 : 0
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <span className="text-sm font-medium">{status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            status === "ACTIVE"
                              ? "bg-green-500"
                              : status === "INACTIVE"
                                ? "bg-gray-500"
                                : status === "MODIFYING"
                                  ? "bg-blue-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Sync Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["SYNCED", "SYNCING", "FAILED", "PENDING"].map((syncStatus) => {
                const count = mockChannels.filter((c) => c.syncStatus === syncStatus).length
                const percentage = totalChannels > 0 ? (count / totalChannels) * 100 : 0
                return (
                  <div key={syncStatus} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getSyncStatusIcon(syncStatus)}
                      <span className="text-sm font-medium">{syncStatus}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            syncStatus === "SYNCED"
                              ? "bg-green-500"
                              : syncStatus === "SYNCING"
                                ? "bg-blue-500"
                                : syncStatus === "FAILED"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channels List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Data Channels</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search channels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={handleCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                Add Channel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredChannels.map((channel) => (
              <Card
                key={channel.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleItemSelect(channel)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Radio className="w-5 h-5 text-blue-600 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 truncate">{channel.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            v{channel.version}
                          </Badge>
                          <Badge className={getStatusColor(channel.status)}>{channel.status}</Badge>
                          <Badge className={getSyncStatusColor(channel.syncStatus)}>{channel.syncStatus}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                        <div className="text-xs text-gray-500">
                          <span>Created by {channel.createdBy}</span>
                          <span className="mx-2">•</span>
                          <span>Updated {new Date(channel.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(channel.status)}
                      {getSyncStatusIcon(channel.syncStatus)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Listeners */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Channel Listeners & Pipelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockChannelListeners.map((listener) => (
              <Card key={listener.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <GitBranch className="w-5 h-5 text-purple-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900">{listener.dataChannelName}</h4>
                          <Badge variant="outline" className="text-xs">
                            v{listener.entityVersion}
                          </Badge>
                          <Badge className={getStatusColor(listener.status)}>{listener.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">
                              Pipeline: <span className="font-medium">{listener.dataPipeline.name}</span>
                            </p>
                            <p className="text-gray-600">
                              Namespace: <span className="font-medium">{listener.namespaceId}</span>
                            </p>
                            <p className="text-gray-600">
                              Data Source: <span className="font-medium">{listener.dataSourceId}</span>
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">
                              States: <span className="font-medium">{listener.dataPipeline.states.join(", ")}</span>
                            </p>
                            <p className="text-gray-600">
                              Stages: <span className="font-medium">{listener.dataPipeline.stages.join(", ")}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(listener.status)}
                      {getSyncStatusIcon(listener.syncStatus)}
                    </div>
                  </div>
                </CardContent>
              </Card>
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
      itemType="Data Channel"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Data Channels"
        description="Manage data channels, listeners, and processing pipelines"
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
        title={selectedItem?.name || "New Data Channel"}
        itemType="Data Channel"
      />
    </>
  )
}
