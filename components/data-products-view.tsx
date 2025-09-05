"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Activity,
  CheckCircle,
  AlertTriangle,
  Send as Sync,
  Clock,
  Workflow,
  Database,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Layers,
} from "lucide-react"
import type { DataProduct } from "@/types/data-product"

const mockDataProducts: DataProduct[] = [
  {
    id: "dp_patient_360",
    createdAt: "2024-01-15T10:30:00Z",
    createdBy: "data.engineer@hospital.com",
    status: "ACTIVE",
    modifiedAt: "2024-01-22T14:45:00Z",
    modifyBy: "product.owner@hospital.com",
    syncStatus: "SYNCED",
    entityVersion: 4,
    name: "patient-360-view",
    description:
      "Comprehensive patient view combining EHR, lab results, imaging, and care plans for holistic patient management",
    displayName: "Patient 360° View",
    templateName: "patient-360-template",
    lifeCycleStage: "LIVE",
    dataChannels: ["ehr-data", "lab-results", "imaging-data", "care-plans"],
    dataSourceIds: ["ds_epic_001", "ds_lab_system_001", "ds_pacs_001"],
    version: 3,
    namespaceId: "ns_clinical_001",
    tenantId: "tenant_hospital_main",
    dataChannelListeners: [
      {
        id: "dcl_001",
        createdAt: "2024-01-15T10:30:00Z",
        createdBy: "data.engineer@hospital.com",
        status: "ACTIVE",
        modifiedAt: "2024-01-20T14:45:00Z",
        modifyBy: "system",
        syncStatus: "SYNCED",
        entityVersion: 2,
        dataChannelName: "ehr-data",
        dataSourceId: "ds_epic_001",
        accountId: "acc_001",
        tenantId: "tenant_hospital_main",
        namespaceId: "ns_clinical_001",
        dataPipeline: {
          id: "pip_patient_transform",
          createdAt: "2024-01-15T10:30:00Z",
          createdBy: "data.engineer@hospital.com",
          status: "ACTIVE",
          modifiedAt: "2024-01-20T14:45:00Z",
          modifyBy: "system",
          syncStatus: "SYNCED",
          entityVersion: 1,
          name: "Patient Data Transformation Pipeline",
          description: "Transforms and enriches patient data from multiple sources",
          states: ["extract", "transform", "validate", "load"],
          stages: ["ingestion", "processing", "quality-check", "delivery"],
        },
      },
    ],
  },
  {
    id: "dp_clinical_analytics",
    createdAt: "2024-01-12T09:15:00Z",
    createdBy: "analytics.lead@hospital.com",
    status: "ACTIVE",
    modifiedAt: "2024-01-21T16:20:00Z",
    modifyBy: "data.scientist@hospital.com",
    syncStatus: "SYNCING",
    entityVersion: 6,
    name: "clinical-analytics-dashboard",
    description: "Real-time clinical analytics and KPIs for hospital operations, quality metrics, and patient outcomes",
    displayName: "Clinical Analytics Dashboard",
    templateName: "analytics-dashboard-template",
    lifeCycleStage: "LIVE",
    dataChannels: ["clinical-metrics", "quality-indicators", "operational-data"],
    dataSourceIds: ["ds_epic_001", "ds_athena_001", "ds_quality_system_001"],
    version: 2,
    namespaceId: "ns_analytics_001",
    tenantId: "tenant_hospital_main",
    dataChannelListeners: [
      {
        id: "dcl_002",
        createdAt: "2024-01-12T09:15:00Z",
        createdBy: "analytics.lead@hospital.com",
        status: "ACTIVE",
        modifiedAt: "2024-01-21T16:20:00Z",
        modifyBy: "system",
        syncStatus: "SYNCING",
        entityVersion: 3,
        dataChannelName: "clinical-metrics",
        dataSourceId: "ds_epic_001",
        accountId: "acc_001",
        tenantId: "tenant_hospital_main",
        namespaceId: "ns_analytics_001",
        dataPipeline: {
          id: "pip_analytics_aggregation",
          createdAt: "2024-01-12T09:15:00Z",
          createdBy: "analytics.lead@hospital.com",
          status: "ACTIVE",
          modifiedAt: "2024-01-21T16:20:00Z",
          modifyBy: "system",
          syncStatus: "SYNCING",
          entityVersion: 2,
          name: "Clinical Analytics Aggregation Pipeline",
          description: "Aggregates clinical data for real-time analytics and reporting",
          states: ["collect", "aggregate", "calculate", "publish"],
          stages: ["data-collection", "metric-calculation", "validation", "dashboard-update"],
        },
      },
    ],
  },
  {
    id: "dp_population_health",
    createdAt: "2024-01-08T14:30:00Z",
    createdBy: "population.health@hospital.com",
    status: "MODIFYING",
    modifiedAt: "2024-01-22T10:15:00Z",
    modifyBy: "data.engineer@hospital.com",
    syncStatus: "MODIFYING",
    entityVersion: 3,
    name: "population-health-insights",
    description: "Population health management with risk stratification, care gap analysis, and outcome predictions",
    displayName: "Population Health Insights",
    templateName: "population-health-template",
    lifeCycleStage: "LIVE",
    dataChannels: ["patient-cohorts", "risk-scores", "care-gaps", "outcomes"],
    dataSourceIds: ["ds_epic_001", "ds_claims_system_001", "ds_social_determinants_001"],
    version: 1,
    namespaceId: "ns_population_health_001",
    tenantId: "tenant_hospital_main",
    dataChannelListeners: [
      {
        id: "dcl_003",
        createdAt: "2024-01-08T14:30:00Z",
        createdBy: "population.health@hospital.com",
        status: "MODIFYING",
        modifiedAt: "2024-01-22T10:15:00Z",
        modifyBy: "system",
        syncStatus: "MODIFYING",
        entityVersion: 2,
        dataChannelName: "patient-cohorts",
        dataSourceId: "ds_epic_001",
        accountId: "acc_001",
        tenantId: "tenant_hospital_main",
        namespaceId: "ns_population_health_001",
        dataPipeline: {
          id: "pip_risk_stratification",
          createdAt: "2024-01-08T14:30:00Z",
          createdBy: "population.health@hospital.com",
          status: "MODIFYING",
          modifiedAt: "2024-01-22T10:15:00Z",
          modifyBy: "system",
          syncStatus: "MODIFYING",
          entityVersion: 1,
          name: "Risk Stratification Pipeline",
          description: "Calculates patient risk scores and identifies care gaps",
          states: ["identify", "analyze", "score", "stratify"],
          stages: ["patient-identification", "risk-analysis", "scoring", "cohort-assignment"],
        },
      },
    ],
  },
  {
    id: "dp_financial_reporting",
    createdAt: "2024-01-05T11:45:00Z",
    createdBy: "finance.analyst@hospital.com",
    status: "ERROR",
    modifiedAt: "2024-01-22T08:30:00Z",
    modifyBy: "system",
    syncStatus: "FAILED",
    entityVersion: 2,
    name: "financial-reporting-suite",
    description: "Comprehensive financial reporting including revenue cycle, cost analysis, and payer mix analytics",
    displayName: "Financial Reporting Suite",
    templateName: "financial-reporting-template",
    lifeCycleStage: "PAUSED",
    dataChannels: ["revenue-cycle", "cost-data", "payer-mix"],
    dataSourceIds: ["ds_athena_001", "ds_epic_001", "ds_erp_system_001"],
    version: 1,
    namespaceId: "ns_finance_001",
    tenantId: "tenant_hospital_main",
    dataChannelListeners: [
      {
        id: "dcl_004",
        createdAt: "2024-01-05T11:45:00Z",
        createdBy: "finance.analyst@hospital.com",
        status: "ERROR",
        modifiedAt: "2024-01-22T08:30:00Z",
        modifyBy: "system",
        syncStatus: "FAILED",
        entityVersion: 1,
        dataChannelName: "revenue-cycle",
        dataSourceId: "ds_athena_001",
        accountId: "acc_002",
        tenantId: "tenant_hospital_main",
        namespaceId: "ns_finance_001",
        dataPipeline: {
          id: "pip_revenue_analysis",
          createdAt: "2024-01-05T11:45:00Z",
          createdBy: "finance.analyst@hospital.com",
          status: "ERROR",
          modifiedAt: "2024-01-22T08:30:00Z",
          modifyBy: "system",
          syncStatus: "FAILED",
          entityVersion: 1,
          name: "Revenue Cycle Analysis Pipeline",
          description: "Processes financial data for revenue cycle reporting",
          states: ["extract", "reconcile", "analyze", "report"],
          stages: ["data-extraction", "reconciliation", "analysis", "reporting"],
        },
      },
    ],
  },
  {
    id: "dp_quality_measures",
    createdAt: "2023-12-28T16:00:00Z",
    createdBy: "quality.director@hospital.com",
    status: "INACTIVE",
    modifiedAt: "2024-01-20T12:00:00Z",
    modifyBy: "admin@hospital.com",
    syncStatus: "PENDING",
    entityVersion: 1,
    name: "quality-measures-tracker",
    description:
      "Healthcare quality measures tracking and reporting for regulatory compliance and performance improvement",
    displayName: "Quality Measures Tracker",
    templateName: "quality-measures-template",
    lifeCycleStage: "DRAFT",
    dataChannels: ["quality-metrics", "compliance-data"],
    dataSourceIds: ["ds_epic_001", "ds_quality_registry_001"],
    version: 1,
    namespaceId: "ns_quality_001",
    tenantId: "tenant_hospital_main",
    dataChannelListeners: [],
  },
]

const mockActivityData = [
  {
    id: "act_dp_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    type: "success" as const,
    action: "Data Product Pipeline Completed",
    description: "Patient 360° View pipeline processed 2,450 patient records successfully",
    user: "system",
    metadata: {
      dataProductId: "dp_patient_360",
      pipelineId: "pip_patient_transform",
      recordsProcessed: 2450,
      duration: "3m 15s",
      qualityScore: 98.5,
    },
  },
  {
    id: "act_dp_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: "error" as const,
    action: "Data Product Pipeline Failed",
    description: "Financial Reporting Suite pipeline failed due to data source connectivity issues",
    user: "system",
    metadata: {
      dataProductId: "dp_financial_reporting",
      pipelineId: "pip_revenue_analysis",
      error: "Connection timeout to ERP system",
      retryCount: 2,
      nextRetry: new Date(Date.now() + 1000 * 60 * 30),
    },
  },
  {
    id: "act_dp_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    type: "info" as const,
    action: "Data Product Configuration Updated",
    description: "Population Health Insights data channels updated to include new social determinants source",
    user: "data.engineer@hospital.com",
    metadata: {
      dataProductId: "dp_population_health",
      configChange: "Added social-determinants channel",
      newDataSources: ["ds_social_determinants_001"],
      version: 2,
    },
  },
  {
    id: "act_dp_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
    type: "warning" as const,
    action: "Data Quality Alert",
    description: "Clinical Analytics Dashboard detected data quality issues in recent batch",
    user: "system",
    metadata: {
      dataProductId: "dp_clinical_analytics",
      qualityIssue: "Missing values in patient demographics",
      affectedRecords: 156,
      qualityScore: 92.3,
    },
  },
]

const mockTasksData = [
  {
    id: "task_dp_001",
    title: "Fix Financial Reporting Pipeline",
    description: "Resolve ERP system connectivity issues causing financial reporting pipeline failures",
    status: "pending" as const,
    priority: "critical" as const,
    assignee: "finance.analyst@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    tags: ["financial", "pipeline", "connectivity", "erp"],
  },
  {
    id: "task_dp_002",
    title: "Optimize Patient 360 Performance",
    description: "Improve Patient 360° View pipeline performance to handle increased data volume",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "data.engineer@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    tags: ["performance", "patient-360", "optimization", "scaling"],
  },
  {
    id: "task_dp_003",
    title: "Implement Quality Measures Automation",
    description: "Activate Quality Measures Tracker and configure automated reporting workflows",
    status: "completed" as const,
    priority: "medium" as const,
    assignee: "quality.director@hospital.com",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    tags: ["quality", "automation", "compliance", "reporting"],
  },
]

const mockConfigurationData = [
  {
    id: "config_dp_001",
    name: "Default Data Product Version",
    type: "number",
    value: 1,
    description: "Default version number for new data products",
    category: "Data Product",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    modifiedBy: "admin@hospital.com",
    defaultValue: 1,
  },
  {
    id: "config_dp_002",
    name: "Pipeline Execution Timeout",
    type: "string",
    value: "30m",
    description: "Maximum execution time for data product pipelines",
    category: "Pipeline",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    modifiedBy: "data.engineer@hospital.com",
    defaultValue: "15m",
  },
  {
    id: "config_dp_003",
    name: "Quality Score Threshold",
    type: "number",
    value: 95,
    description: "Minimum data quality score required for data product publication",
    category: "Quality",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 6),
    modifiedBy: "quality.director@hospital.com",
    defaultValue: 90,
  },
  {
    id: "config_dp_004",
    name: "Auto-Retry Failed Pipelines",
    type: "boolean",
    value: true,
    description: "Automatically retry failed data product pipelines",
    category: "Pipeline",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 18),
    modifiedBy: "ops@hospital.com",
    defaultValue: false,
  },
]

export function DataProductsView() {
  const [selectedItem, setSelectedItem] = useState<DataProduct | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleItemSelect = (item: DataProduct) => {
    setSelectedItem(item)
    setIsDrawerOpen(true)
  }

  const handleCreateNew = () => {
    setSelectedItem(null)
    setIsDrawerOpen(true)
  }

  const handleRefresh = () => {
    console.log("Refreshing data products...")
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
      case "MODIFYING":
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
      case "DELETED":
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
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{mockDataProducts.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Live Products</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockDataProducts.filter((dp) => dp.lifeCycleStage === "LIVE").length}
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
                  {mockDataProducts.reduce((count, dp) => count + dp.dataChannelListeners.length, 0)}
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
                  {mockDataProducts.filter((dp) => dp.status === "ERROR" || dp.syncStatus === "FAILED").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Product Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Data Product Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Clinical", icon: Users, count: 2 },
              { name: "Analytics", icon: BarChart3, count: 1 },
              { name: "Financial", icon: FileText, count: 1 },
              { name: "Quality", icon: CheckCircle, count: 1 },
            ].map((category) => (
              <div key={category.name} className="text-center p-3 border border-gray-200 rounded-lg">
                <category.icon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-lg font-bold text-gray-900">{category.count}</p>
                <p className="text-xs text-gray-600">{category.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Data Products */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Data Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDataProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{product.displayName}</h4>
                        <Badge variant="outline" className="text-xs">
                          v{product.version}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {product.templateName}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {product.dataChannels.length} channels
                        </span>
                        <span className="flex items-center gap-1">
                          <Database className="w-3 h-3" />
                          {product.dataSourceIds.length} sources
                        </span>
                        <span className="flex items-center gap-1">
                          <Workflow className="w-3 h-3" />
                          {product.dataChannelListeners.length} listeners
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(product.modifiedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getLifeCycleColor(product.lifeCycleStage)}>{product.lifeCycleStage}</Badge>
                    <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                    <Badge className={getSyncStatusColor(product.syncStatus)}>
                      <div className="flex items-center gap-1">
                        {getSyncStatusIcon(product.syncStatus)}
                        {product.syncStatus}
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
              const count = mockDataProducts.filter((dp) => dp.lifeCycleStage === stage).length
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

      {/* Data Channel Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Most Used Data Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "ehr-data", count: 3, products: ["Patient 360°", "Clinical Analytics", "Population Health"] },
              { name: "clinical-metrics", count: 2, products: ["Clinical Analytics", "Quality Measures"] },
              { name: "revenue-cycle", count: 1, products: ["Financial Reporting"] },
              { name: "quality-indicators", count: 1, products: ["Clinical Analytics"] },
            ].map((channel) => (
              <div key={channel.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{channel.name}</p>
                  <p className="text-sm text-gray-600">Used by: {channel.products.join(", ")}</p>
                </div>
                <Badge variant="outline">{channel.count} products</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const configurationContent = (
    <ConfigurationList
      items={mockDataProducts.map((dp) => ({
        id: dp.id,
        name: dp.displayName,
        type: `${dp.templateName} v${dp.version}`,
        status: dp.status.toLowerCase() as "active" | "inactive" | "error",
        description: dp.description,
        lastModified: new Date(dp.modifiedAt),
        createdBy: dp.modifyBy,
      }))}
      onItemSelect={(item) => {
        const dataProduct = mockDataProducts.find((dp) => dp.id === item.id)
        if (dataProduct) handleItemSelect(dataProduct)
      }}
      onCreateNew={handleCreateNew}
      itemType="Data Product"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Data Products"
        description="Manage curated data products with integrated pipelines, quality metrics, and consumer interfaces"
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
        title={selectedItem?.displayName || "New Data Product"}
        itemType="Data Product"
      />
    </>
  )
}
