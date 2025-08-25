"use client"
import { ComponentLayout } from "@/components/component-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Zap, Activity, CheckCircle } from "lucide-react"

const mockExternalDbActivityData = [
  {
    id: "act_edb_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 7),
    type: "success" as const,
    action: "Database Connection Established",
    description: "Successfully connected to external PostgreSQL database",
    user: "system",
    metadata: { database: "external-postgres-01", connectionTime: "156ms", status: "healthy" },
  },
  {
    id: "act_edb_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: "error" as const,
    action: "Connection Timeout",
    description: "Failed to connect to Oracle database - connection timeout",
    user: "system",
    metadata: { database: "oracle-legacy", error: "Connection timeout after 30s", retryCount: 3 },
  },
  {
    id: "act_edb_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 42),
    type: "info" as const,
    action: "Query Performance Optimized",
    description: "Applied query optimization for MySQL database connections",
    user: "db.admin@hospital.com",
    metadata: { database: "mysql-analytics", queriesOptimized: 12, performanceGain: "28%" },
  },
]

const mockExternalDbTasksData = [
  {
    id: "task_edb_001",
    title: "Fix Oracle Connection Issues",
    description: "Investigate and resolve connection timeout issues with Oracle legacy database",
    status: "in-progress" as const,
    priority: "critical" as const,
    assignee: "db.admin@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    tags: ["oracle", "connection", "troubleshooting"],
  },
  {
    id: "task_edb_002",
    title: "Set Up MongoDB Integration",
    description: "Configure new MongoDB connection for document storage requirements",
    status: "pending" as const,
    priority: "medium" as const,
    assignee: "integration.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["mongodb", "integration", "documents"],
  },
]

const mockExternalDbConfigData = [
  {
    id: "config_edb_001",
    name: "Connection Pool Size",
    type: "number",
    value: 50,
    description: "Maximum number of concurrent connections per external database",
    category: "Performance",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    modifiedBy: "db.admin@hospital.com",
    defaultValue: 25,
  },
  {
    id: "config_edb_002",
    name: "Enable SSL Connections",
    type: "boolean",
    value: true,
    description: "Require SSL encryption for all external database connections",
    category: "Security",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "security@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_edb_003",
    name: "Query Timeout",
    type: "number",
    value: 30,
    description: "Query timeout in seconds for external database operations",
    category: "Performance",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    modifiedBy: "db.admin@hospital.com",
    defaultValue: 15,
  },
]

export function ExternalDatabasesView() {
  const handleRefresh = () => {
    console.log("Refreshing external databases...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Connected DBs</p>
                <p className="text-2xl font-bold text-gray-900">7</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Connections</p>
                <p className="text-2xl font-bold text-green-600">6</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Queries/Hour</p>
                <p className="text-2xl font-bold text-blue-600">3.2K</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-purple-600">45ms</p>
              </div>
              <Zap className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* External Databases */}
      <Card>
        <CardHeader>
          <CardTitle>External Database Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">External database connections</div>
            <div className="text-sm text-gray-400">
              Connect to PostgreSQL, MySQL, Oracle, and other external databases for comprehensive data access.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ComponentLayout
      title="External Databases"
      description="External database integration and connection management"
      dashboardContent={dashboardContent}
      onRefresh={handleRefresh}
      activityData={mockExternalDbActivityData}
      tasksData={mockExternalDbTasksData}
      configurationData={mockExternalDbConfigData}
    >
      {dashboardContent}
    </ComponentLayout>
  )
}
