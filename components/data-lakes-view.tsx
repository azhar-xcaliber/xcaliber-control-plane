"use client"
import { ComponentLayout } from "@/components/component-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, HardDrive, TrendingUp, Activity } from "lucide-react"

const mockDataLakeActivityData = [
  {
    id: "act_dl_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    type: "success" as const,
    action: "Data Lake Sync Completed",
    description: "Successfully synchronized patient data to Snowflake data lake",
    user: "system",
    metadata: { dataLake: "snowflake-prod", recordsSynced: 45000, duration: "12m 34s" },
  },
  {
    id: "act_dl_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 28),
    type: "warning" as const,
    action: "Storage Threshold Exceeded",
    description: "Databricks data lake approaching storage capacity limit",
    user: "system",
    metadata: { dataLake: "databricks-analytics", currentUsage: "2.1TB", limit: "2.5TB" },
  },
  {
    id: "act_dl_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
    type: "info" as const,
    action: "Query Performance Optimized",
    description: "Applied indexing optimizations to improve query performance",
    user: "data.engineer@hospital.com",
    metadata: { dataLake: "bigquery-warehouse", tablesOptimized: 8, performanceGain: "35%" },
  },
]

const mockDataLakeTasksData = [
  {
    id: "task_dl_001",
    title: "Expand Databricks Storage",
    description: "Increase storage capacity for Databricks analytics data lake",
    status: "pending" as const,
    priority: "high" as const,
    assignee: "infrastructure@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    tags: ["storage", "databricks", "capacity"],
  },
  {
    id: "task_dl_002",
    title: "Implement Data Archival Policy",
    description: "Set up automated archival for old data in Snowflake data lake",
    status: "in-progress" as const,
    priority: "medium" as const,
    assignee: "data.governance@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    tags: ["archival", "governance", "snowflake"],
  },
]

const mockDataLakeConfigData = [
  {
    id: "config_dl_001",
    name: "Sync Frequency",
    type: "string",
    value: "hourly",
    description: "Frequency of data synchronization to data lakes",
    category: "Synchronization",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    modifiedBy: "data.engineer@hospital.com",
    defaultValue: "daily",
  },
  {
    id: "config_dl_002",
    name: "Enable Data Encryption",
    type: "boolean",
    value: true,
    description: "Encrypt data at rest in all connected data lakes",
    category: "Security",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "security@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_dl_003",
    name: "Retention Period",
    type: "string",
    value: "7 years",
    description: "Data retention period for healthcare records",
    category: "Compliance",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    modifiedBy: "compliance@hospital.com",
    defaultValue: "5 years",
  },
]

export function DataLakesView() {
  const handleRefresh = () => {
    console.log("Refreshing data lakes...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Connected Lakes</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Storage</p>
                <p className="text-2xl font-bold text-purple-600">2.4TB</p>
              </div>
              <HardDrive className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Growth</p>
                <p className="text-2xl font-bold text-green-600">12GB</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Query Volume</p>
                <p className="text-2xl font-bold text-blue-600">8.2K</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Lakes */}
      <Card>
        <CardHeader>
          <CardTitle>Enterprise Data Lake Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">Data lake connections and management</div>
            <div className="text-sm text-gray-400">
              Connect to Snowflake, Databricks, and other enterprise data lakes for unified data access.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ComponentLayout
      title="Data Lakes"
      description="Enterprise data lake integration and management"
      dashboardContent={dashboardContent}
      onRefresh={handleRefresh}
      activityData={mockDataLakeActivityData}
      tasksData={mockDataLakeTasksData}
      configurationData={mockDataLakeConfigData}
    >
      {dashboardContent}
    </ComponentLayout>
  )
}
