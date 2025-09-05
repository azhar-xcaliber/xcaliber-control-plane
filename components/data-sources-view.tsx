"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Database,
  Activity,
  CheckCircle,
  AlertTriangle,
  Send as Sync,
  Clock,
  Workflow,
  Plug,
  FileText,
  Calendar,
} from "lucide-react"
import type { DataSource } from "@/types/datasource"

const mockDataSources: DataSource[] = [
  {
    id: "ds_epic_001",
    createdAt: "2024-01-15T10:30:00Z",
    createdBy: "john.doe@hospital.com",
    status: "ACTIVE",
    modifiedAt: "2024-01-20T14:45:00Z",
    modifyBy: "jane.smith@hospital.com",
    syncStatus: "SYNCED",
    entityVersion: 3,
    name: "Epic EHR Integration",
    description: "Primary Epic EHR system integration for patient records, appointments, and clinical data",
    displayName: "Epic - Main Campus",
    version: 2,
    templateName: "epic-ehr-template",
    lifeCycleStage: "LIVE",
    type: "EPIC",
    protocol: "FHIR",
    accountId: "acc_001",
    tenantId: "tenant_hospital_main",
    podId: "pod_ehr_001",
    pipelines: [
      {
        id: "pip_001",
        createdAt: "2024-01-15T10:30:00Z",
        createdBy: "john.doe@hospital.com",
        status: "ACTIVE",
        modifiedAt: "2024-01-20T14:45:00Z",
        modifyBy: "jane.smith@hospital.com",
        syncStatus: "SYNCED",
        entityVersion: 1,
        name: "Patient Data Pipeline",
        type: "patient-sync",
        defaultState: true,
        defaultBatchSize: "1000",
        recurring: true,
        cronExpression: "0 */15 * * * *",
        connector: "epic-fhir-connector",
        delimiter: ",",
        format: "fhir-r4",
      },
    ],
    connectors: [
      {
        name: "epic-fhir-connector",
        description: "FHIR R4 compliant connector for Epic systems",
        displayName: "Epic FHIR Connector",
        version: 4,
        enabled: true,
        paradigms: {
          pullSupported: true,
          pushSupported: false,
        },
        type: "fhir-r4",
        auth: {
          method: "oauth2",
          sensitiveFields: ["client_secret", "private_key"],
        },
        secrets: [
          {
            key: "client_id",
            required: true,
            sensitive: false,
            description: "OAuth2 Client ID",
            value: "epic_client_123",
          },
          {
            key: "client_secret",
            required: true,
            sensitive: true,
            description: "OAuth2 Client Secret",
            value: "***hidden***",
          },
        ],
        config: [
          {
            key: "base_url",
            required: true,
            sensitive: false,
            description: "Epic FHIR Base URL",
            value: "https://fhir.epic.com/interconnect-fhir-oauth",
          },
          {
            key: "timeout",
            required: false,
            sensitive: false,
            description: "Request timeout in seconds",
            value: "30",
          },
        ],
      },
    ],
    formats: [
      {
        name: "fhir-r4",
        schema: {
          resourceType: "Patient",
          properties: {
            id: "string",
            name: "HumanName[]",
            birthDate: "date",
          },
        },
        type: "json",
        delimiter: "",
      },
    ],
    catalog: [
      {
        resource: "Patient",
        syncInterval: "15m",
        enabled: true,
      },
      {
        resource: "Encounter",
        syncInterval: "30m",
        enabled: true,
      },
      {
        resource: "Observation",
        syncInterval: "60m",
        enabled: false,
      },
    ],
    channels: ["ehr-data", "patient-updates"],
  },
  {
    id: "ds_athena_001",
    createdAt: "2024-01-10T08:15:00Z",
    createdBy: "mike.johnson@hospital.com",
    status: "ACTIVE",
    modifiedAt: "2024-01-21T09:30:00Z",
    modifyBy: "sarah.williams@hospital.com",
    syncStatus: "SYNCING",
    entityVersion: 2,
    name: "Athena Practice Management",
    description: "Athena Health practice management system for scheduling and billing",
    displayName: "Athena - Outpatient Clinics",
    version: 1,
    templateName: "athena-pm-template",
    lifeCycleStage: "LIVE",
    type: "ATHENA",
    protocol: "JSON_RPC",
    accountId: "acc_002",
    tenantId: "tenant_hospital_main",
    podId: "pod_pm_001",
    pipelines: [
      {
        id: "pip_002",
        createdAt: "2024-01-10T08:15:00Z",
        createdBy: "mike.johnson@hospital.com",
        status: "ACTIVE",
        modifiedAt: "2024-01-21T09:30:00Z",
        modifyBy: "sarah.williams@hospital.com",
        syncStatus: "SYNCING",
        entityVersion: 1,
        name: "Appointment Sync Pipeline",
        type: "appointment-sync",
        defaultState: true,
        defaultBatchSize: "500",
        recurring: true,
        cronExpression: "0 0 */6 * * *",
        connector: "athena-api-connector",
        delimiter: "",
        format: "json",
      },
    ],
    connectors: [
      {
        name: "athena-api-connector",
        description: "REST API connector for Athena Health systems",
        displayName: "Athena API Connector",
        version: 2,
        enabled: true,
        paradigms: {
          pullSupported: true,
          pushSupported: true,
        },
        type: "rest-api",
        auth: {
          method: "api-key",
          sensitiveFields: ["api_key"],
        },
        secrets: [
          {
            key: "api_key",
            required: true,
            sensitive: true,
            description: "Athena API Key",
            value: "***hidden***",
          },
        ],
        config: [
          {
            key: "api_version",
            required: true,
            sensitive: false,
            description: "API Version",
            value: "v1",
          },
        ],
      },
    ],
    formats: [
      {
        name: "athena-json",
        schema: {
          type: "object",
          properties: {
            appointmentId: "string",
            patientId: "string",
            providerId: "string",
            scheduledDateTime: "datetime",
          },
        },
        type: "json",
        delimiter: "",
      },
    ],
    catalog: [
      {
        resource: "Appointment",
        syncInterval: "6h",
        enabled: true,
      },
      {
        resource: "Provider",
        syncInterval: "24h",
        enabled: true,
      },
    ],
    channels: ["pm-data", "scheduling-updates"],
  },
  {
    id: "ds_pcc_001",
    createdAt: "2024-01-05T16:20:00Z",
    createdBy: "admin@hospital.com",
    status: "ERROR",
    modifiedAt: "2024-01-21T11:15:00Z",
    modifyBy: "support@hospital.com",
    syncStatus: "FAILED",
    entityVersion: 5,
    name: "Point Click Care LTC",
    description: "Point Click Care long-term care management system",
    displayName: "PCC - Nursing Home Division",
    version: 1,
    templateName: "point-click-care-template",
    lifeCycleStage: "PAUSED",
    type: "POINT_CLICK_CARE",
    protocol: "HL7",
    accountId: "acc_003",
    tenantId: "tenant_hospital_main",
    podId: "pod_ltc_001",
    pipelines: [
      {
        id: "pip_003",
        createdAt: "2024-01-05T16:20:00Z",
        createdBy: "admin@hospital.com",
        status: "ERROR",
        modifiedAt: "2024-01-21T11:15:00Z",
        modifyBy: "support@hospital.com",
        syncStatus: "FAILED",
        entityVersion: 2,
        name: "Care Plan Pipeline",
        type: "care-plan-sync",
        defaultState: false,
        defaultBatchSize: "200",
        recurring: true,
        cronExpression: "0 0 8 * * *",
        connector: "pcc-hl7-connector",
        delimiter: "|",
        format: "hl7-v2",
      },
    ],
    connectors: [
      {
        name: "pcc-hl7-connector",
        description: "HL7 v2 connector for Point Click Care systems",
        displayName: "PCC HL7 Connector",
        version: 1,
        enabled: false,
        paradigms: {
          pullSupported: true,
          pushSupported: true,
        },
        type: "hl7-v2",
        auth: {
          method: "certificate",
          sensitiveFields: ["private_key", "certificate"],
        },
        secrets: [
          {
            key: "certificate",
            required: true,
            sensitive: true,
            description: "Client Certificate",
            value: "***hidden***",
          },
        ],
        config: [
          {
            key: "mllp_port",
            required: true,
            sensitive: false,
            description: "MLLP Port",
            value: "2575",
          },
        ],
      },
    ],
    formats: [
      {
        name: "hl7-v2",
        schema: {
          segments: ["MSH", "PID", "PV1", "OBX"],
          fieldSeparator: "|",
          componentSeparator: "^",
        },
        type: "hl7",
        delimiter: "|",
      },
    ],
    catalog: [
      {
        resource: "CarePlan",
        syncInterval: "24h",
        enabled: false,
      },
      {
        resource: "Assessment",
        syncInterval: "12h",
        enabled: false,
      },
    ],
    channels: ["ltc-data", "care-updates"],
  },
  {
    id: "ds_elation_001",
    createdAt: "2023-12-20T12:00:00Z",
    createdBy: "david.wilson@hospital.com",
    status: "INACTIVE",
    modifiedAt: "2024-01-18T16:30:00Z",
    modifyBy: "admin@hospital.com",
    syncStatus: "PENDING",
    entityVersion: 1,
    name: "Elation Ambulatory EHR",
    description: "Elation Health ambulatory EHR system for primary care clinics",
    displayName: "Elation - Primary Care",
    version: 1,
    templateName: "elation-ehr-template",
    lifeCycleStage: "DRAFT",
    type: "ELATION",
    protocol: "FHIR",
    accountId: "acc_004",
    tenantId: "tenant_hospital_main",
    podId: "pod_ambulatory_001",
    pipelines: [],
    connectors: [
      {
        name: "elation-fhir-connector",
        description: "FHIR connector for Elation Health systems",
        displayName: "Elation FHIR Connector",
        version: 1,
        enabled: false,
        paradigms: {
          pullSupported: true,
          pushSupported: false,
        },
        type: "fhir-r4",
        auth: {
          method: "bearer-token",
          sensitiveFields: ["access_token"],
        },
        secrets: [],
        config: [],
      },
    ],
    formats: [],
    catalog: [],
    channels: ["ambulatory-data"],
  },
]

const mockActivityData = [
  {
    id: "act_ds_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "success" as const,
    action: "Pipeline Execution Completed",
    description: "Patient Data Pipeline completed successfully - 1,250 records processed",
    user: "system",
    metadata: {
      sourceId: "ds_epic_001",
      pipelineId: "pip_001",
      recordsProcessed: 1250,
      duration: "45s",
      batchSize: "1000",
    },
  },
  {
    id: "act_ds_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "error" as const,
    action: "Pipeline Execution Failed",
    description: "Care Plan Pipeline failed - HL7 connector authentication error",
    user: "system",
    metadata: {
      sourceId: "ds_pcc_001",
      pipelineId: "pip_003",
      error: "Certificate expired",
      retryCount: 3,
      nextRetry: new Date(Date.now() + 1000 * 60 * 60),
    },
  },
  {
    id: "act_ds_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "info" as const,
    action: "Connector Configuration Updated",
    description: "Epic FHIR Connector timeout increased from 30s to 45s",
    user: "jane.smith@hospital.com",
    metadata: {
      sourceId: "ds_epic_001",
      connectorName: "epic-fhir-connector",
      configKey: "timeout",
      oldValue: "30",
      newValue: "45",
    },
  },
  {
    id: "act_ds_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: "warning" as const,
    action: "Sync Delay Detected",
    description: "Appointment Sync Pipeline running longer than expected",
    user: "system",
    metadata: {
      sourceId: "ds_athena_001",
      pipelineId: "pip_002",
      expectedDuration: "5m",
      actualDuration: "18m",
      reason: "Large batch size processing",
    },
  },
]

const mockTasksData = [
  {
    id: "task_ds_001",
    title: "Renew PCC HL7 Certificate",
    description:
      "The client certificate for Point Click Care HL7 connector expires in 3 days. Renew and update connector configuration.",
    status: "pending" as const,
    priority: "critical" as const,
    assignee: "security@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["security", "certificate", "pcc", "hl7"],
  },
  {
    id: "task_ds_002",
    title: "Optimize Athena Batch Processing",
    description:
      "Appointment sync pipeline is taking too long. Review batch sizes and implement pagination for better performance.",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "mike.johnson@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    tags: ["performance", "athena", "pipeline", "optimization"],
  },
  {
    id: "task_ds_003",
    title: "Enable Observation Resource Sync",
    description: "Configure and test Observation resource synchronization for Epic FHIR connector",
    status: "completed" as const,
    priority: "medium" as const,
    assignee: "jane.smith@hospital.com",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    tags: ["epic", "fhir", "observation", "configuration"],
  },
]

const mockConfigurationData = [
  {
    id: "config_ds_001",
    name: "Default Pipeline Batch Size",
    type: "number",
    value: 1000,
    description: "Default batch size for new pipeline configurations",
    category: "Pipeline",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    modifiedBy: "admin@hospital.com",
    defaultValue: 500,
  },
  {
    id: "config_ds_002",
    name: "Max Connector Timeout",
    type: "string",
    value: "60s",
    description: "Maximum allowed timeout for connector configurations",
    category: "Connector",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    modifiedBy: "system@hospital.com",
    defaultValue: "30s",
  },
  {
    id: "config_ds_003",
    name: "Auto-Retry Failed Pipelines",
    type: "boolean",
    value: true,
    description: "Automatically retry failed pipeline executions",
    category: "Pipeline",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 12),
    modifiedBy: "ops@hospital.com",
    defaultValue: false,
  },
  {
    id: "config_ds_004",
    name: "Certificate Expiry Alert Days",
    type: "number",
    value: 7,
    description: "Days before certificate expiry to trigger alerts",
    category: "Security",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "security@hospital.com",
    defaultValue: 14,
  },
]

export function DataSourcesView() {
  const [selectedItem, setSelectedItem] = useState<DataSource | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleItemSelect = (item: DataSource) => {
    setSelectedItem(item)
    setIsDrawerOpen(true)
  }

  const handleCreateNew = () => {
    setSelectedItem(null)
    setIsDrawerOpen(true)
  }

  const handleRefresh = () => {
    console.log("Refreshing data sources...")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700"
      case "INACTIVE":
        return "bg-gray-100 text-gray-700"
      case "ERROR":
        return "bg-red-100 text-red-700"
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "MODIFYING":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
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
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "MODIFYING":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSyncStatusIcon = (syncStatus: string) => {
    switch (syncStatus) {
      case "SYNCED":
        return <CheckCircle className="w-4 h-4" />
      case "SYNCING":
      case "MODIFYING":
        return <Sync className="w-4 h-4 animate-spin" />
      case "FAILED":
        return <AlertTriangle className="w-4 h-4" />
      case "PENDING":
        return <Clock className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getLifeCycleColor = (stage: string) => {
    switch (stage) {
      case "LIVE":
        return "bg-green-100 text-green-700"
      case "READY":
        return "bg-blue-100 text-blue-700"
      case "DRAFT":
        return "bg-gray-100 text-gray-700"
      case "PAUSED":
        return "bg-yellow-100 text-yellow-700"
      case "STOPPED":
      case "ARCHIVED":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sources</p>
                <p className="text-2xl font-bold text-gray-900">{mockDataSources.length}</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Live Sources</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockDataSources.filter((ds) => ds.lifeCycleStage === "LIVE").length}
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
                <p className="text-sm text-gray-600">Active Pipelines</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockDataSources.reduce((count, ds) => count + ds.pipelines.length, 0)}
                </p>
              </div>
              <Workflow className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Issues</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockDataSources.filter((ds) => ds.status === "ERROR" || ds.syncStatus === "FAILED").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Source Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Data Source Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["EPIC", "ATHENA", "POINT_CLICK_CARE", "ELATION", "ECW"].map((type) => {
              const count = mockDataSources.filter((ds) => ds.type === type).length
              return (
                <div key={type} className="text-center p-3 border border-gray-200 rounded-lg">
                  <Database className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <p className="text-lg font-bold text-gray-900">{count}</p>
                  <p className="text-xs text-gray-600">{type.replace(/_/g, " ")}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDataSources.slice(0, 3).map((source) => (
              <div key={source.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{source.displayName}</h4>
                        <Badge variant="outline" className="text-xs">
                          {source.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {source.protocol}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Workflow className="w-3 h-3" />
                          {source.pipelines.length} pipelines
                        </span>
                        <span className="flex items-center gap-1">
                          <Plug className="w-3 h-3" />
                          {source.connectors.length} connectors
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {source.catalog.length} resources
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />v{source.version}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getLifeCycleColor(source.lifeCycleStage)}>{source.lifeCycleStage}</Badge>
                    <Badge className={getStatusColor(source.status)}>{source.status}</Badge>
                    <Badge className={getSyncStatusColor(source.syncStatus)}>
                      <div className="flex items-center gap-1">
                        {getSyncStatusIcon(source.syncStatus)}
                        {source.syncStatus}
                      </div>
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lifecycle Stage Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Lifecycle Stage Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {["DRAFT", "READY", "LIVE", "PAUSED", "STOPPED", "ARCHIVED"].map((stage) => {
              const count = mockDataSources.filter((ds) => ds.lifeCycleStage === stage).length
              return (
                <div key={stage} className="text-center p-3 border border-gray-200 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-xs text-gray-600 capitalize">{stage.toLowerCase()}</p>
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
      items={mockDataSources.map((ds) => ({
        id: ds.id,
        name: ds.displayName,
        type: `${ds.type} v${ds.version}`,
        status: ds.status.toLowerCase() as "active" | "inactive" | "error",
        description: ds.description,
        lastModified: new Date(ds.modifiedAt),
        createdBy: ds.modifyBy,
      }))}
      onItemSelect={(item) => {
        const dataSource = mockDataSources.find((ds) => ds.id === item.id)
        if (dataSource) handleItemSelect(dataSource)
      }}
      onCreateNew={handleCreateNew}
      itemType="Data Source"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Data Sources"
        description="Manage external data origins with connectors, pipelines, and catalog configurations"
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
        title={selectedItem?.displayName || "New Data Source"}
        itemType="Data Source"
      />
    </>
  )
}
