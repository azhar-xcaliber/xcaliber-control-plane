"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Activity, CheckCircle, AlertTriangle } from "lucide-react"

const mockDataSources = [
  {
    id: "ds_001",
    name: "Patient Records Database",
    type: "PostgreSQL",
    status: "active" as const,
    description: "Primary patient records database with HIPAA compliance",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    createdBy: "john.doe@hospital.com",
  },
  {
    id: "ds_002",
    name: "Lab Results API",
    type: "REST API",
    status: "active" as const,
    description: "Laboratory test results from external lab systems",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 12),
    createdBy: "jane.smith@hospital.com",
  },
  {
    id: "ds_003",
    name: "Insurance Claims Feed",
    type: "SFTP",
    status: "error" as const,
    description: "Daily insurance claims data from clearinghouses",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 6),
    createdBy: "mike.johnson@hospital.com",
  },
  {
    id: "ds_004",
    name: "Pharmacy Systems",
    type: "HL7 FHIR",
    status: "inactive" as const,
    description: "Medication and prescription data from pharmacy systems",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    createdBy: "sarah.williams@hospital.com",
  },
]

const mockActivityData = [
  {
    id: "act_ds_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "success" as const,
    action: "Connection Established",
    description: "Successfully connected to Patient Records Database",
    user: "system",
    metadata: { source: "ds_001", connectionTime: "234ms" },
  },
  {
    id: "act_ds_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "error" as const,
    action: "Connection Failed",
    description: "Failed to connect to Insurance Claims Feed - timeout error",
    user: "system",
    metadata: { source: "ds_003", error: "Connection timeout after 30s" },
  },
  {
    id: "act_ds_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "info" as const,
    action: "Schema Updated",
    description: "Lab Results API schema updated to v2.1",
    user: "jane.smith@hospital.com",
    metadata: { source: "ds_002", version: "2.1", changes: 3 },
  },
  {
    id: "act_ds_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: "warning" as const,
    action: "High Latency Detected",
    description: "Patient Records Database showing increased response times",
    user: "system",
    metadata: { source: "ds_001", avgLatency: "1.2s", threshold: "500ms" },
  },
]

const mockTasksData = [
  {
    id: "task_ds_001",
    title: "Update FHIR Endpoint Configuration",
    description: "Update the FHIR endpoint configuration for Pharmacy Systems to use new authentication method",
    status: "pending" as const,
    priority: "high" as const,
    assignee: "sarah.williams@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["fhir", "authentication", "pharmacy"],
  },
  {
    id: "task_ds_002",
    title: "Investigate Claims Feed Timeout",
    description: "Investigate and resolve the recurring timeout issues with Insurance Claims Feed",
    status: "in-progress" as const,
    priority: "critical" as const,
    assignee: "mike.johnson@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 12),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    tags: ["troubleshooting", "claims", "timeout"],
  },
  {
    id: "task_ds_003",
    title: "Performance Optimization Review",
    description: "Review and optimize database queries for Patient Records Database",
    status: "completed" as const,
    priority: "medium" as const,
    assignee: "john.doe@hospital.com",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    tags: ["performance", "database", "optimization"],
  },
]

const mockConfigurationData = [
  {
    id: "config_ds_001",
    name: "Connection Pool Size",
    type: "number",
    value: 20,
    description: "Maximum number of concurrent database connections",
    category: "Database",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    modifiedBy: "john.doe@hospital.com",
    defaultValue: 10,
  },
  {
    id: "config_ds_002",
    name: "HIPAA Compliance Mode",
    type: "boolean",
    value: true,
    description: "Enable HIPAA compliance features and audit logging",
    category: "Security",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "admin@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_ds_003",
    name: "API Rate Limit",
    type: "number",
    value: 1000,
    description: "Maximum API requests per minute per client",
    category: "API",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    modifiedBy: "jane.smith@hospital.com",
    defaultValue: 500,
  },
  {
    id: "config_ds_004",
    name: "Encryption Algorithm",
    type: "string",
    value: "AES-256-GCM",
    description: "Encryption algorithm used for data at rest",
    category: "Security",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    modifiedBy: "security@hospital.com",
    defaultValue: "AES-256-GCM",
  },
  {
    id: "config_ds_005",
    name: "Backup Retention Days",
    type: "number",
    value: 90,
    description: "Number of days to retain database backups",
    category: "Backup",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "admin@hospital.com",
    defaultValue: 30,
  },
]

export function DataSourcesView() {
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
    console.log("Refreshing data sources...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
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
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockDataSources.filter((ds) => ds.status === "active").length}
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
                <p className="text-sm text-gray-600">Errors</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockDataSources.filter((ds) => ds.status === "error").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-600">
                  {mockDataSources.filter((ds) => ds.status === "inactive").length}
                </p>
              </div>
              <Activity className="w-8 h-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDataSources.slice(0, 3).map((source) => (
              <div key={source.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900">{source.name}</h4>
                    <p className="text-sm text-gray-500">{source.type}</p>
                  </div>
                </div>
                <Badge
                  className={
                    source.status === "active"
                      ? "bg-green-100 text-green-700"
                      : source.status === "error"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                  }
                >
                  {source.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const configurationContent = (
    <ConfigurationList
      items={mockDataSources}
      onItemSelect={handleItemSelect}
      onCreateNew={handleCreateNew}
      itemType="Data Source"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Data Sources"
        description="Manage healthcare data source connections and configurations"
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
        title={selectedItem?.name || "New Data Source"}
        itemType="Data Source"
      />
    </>
  )
}
