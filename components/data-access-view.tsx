"use client"
import { ComponentLayout } from "@/components/component-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Activity, Users, Shield } from "lucide-react"

const mockDataAccessActivityData = [
  {
    id: "act_da_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "success" as const,
    action: "API Key Generated",
    description: "New API key generated for external research partner",
    user: "api.admin@hospital.com",
    metadata: { keyId: "ak_001", permissions: "read-only", expiresIn: "90 days" },
  },
  {
    id: "act_da_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    type: "warning" as const,
    action: "Rate Limit Exceeded",
    description: "Client exceeded API rate limit for patient data endpoint",
    user: "system",
    metadata: { clientId: "client_123", endpoint: "/api/v1/patients", requestCount: 1200, limit: 1000 },
  },
  {
    id: "act_da_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 32),
    type: "info" as const,
    action: "Access Policy Updated",
    description: "Updated data access policy for clinical research group",
    user: "security.admin@hospital.com",
    metadata: { policyId: "policy_research", resourcesAffected: 15 },
  },
]

const mockDataAccessTasksData = [
  {
    id: "task_da_001",
    title: "Review API Access Permissions",
    description: "Quarterly review of API access permissions and user roles",
    status: "pending" as const,
    priority: "medium" as const,
    assignee: "security.admin@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    tags: ["security", "permissions", "quarterly-review"],
  },
  {
    id: "task_da_002",
    title: "Implement OAuth 2.0 Support",
    description: "Add OAuth 2.0 authentication support for third-party integrations",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "api.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    tags: ["oauth", "authentication", "integration"],
  },
]

const mockDataAccessConfigData = [
  {
    id: "config_da_001",
    name: "Default Rate Limit",
    type: "number",
    value: 1000,
    description: "Default API rate limit per minute for authenticated users",
    category: "API",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    modifiedBy: "api.admin@hospital.com",
    defaultValue: 500,
  },
  {
    id: "config_da_002",
    name: "Enable Audit Logging",
    type: "boolean",
    value: true,
    description: "Log all data access requests for compliance and security",
    category: "Security",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "compliance@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_da_003",
    name: "Session Timeout",
    type: "number",
    value: 3600,
    description: "Session timeout in seconds for authenticated users",
    category: "Security",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    modifiedBy: "security.admin@hospital.com",
    defaultValue: 1800,
  },
]

export function DataAccessView() {
  const handleRefresh = () => {
    console.log("Refreshing data access...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">API Endpoints</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
              <Code className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">128</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Requests/Hour</p>
                <p className="text-2xl font-bold text-blue-600">8.2K</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Compliance</p>
                <p className="text-2xl font-bold text-green-600">100%</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Access Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Data Access Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">Secure Data Access Control</div>
            <div className="text-sm text-gray-400">
              Manage API access, user permissions, and data security policies.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ComponentLayout
      title="Data Access"
      description="Manage secure access to healthcare data and APIs"
      dashboardContent={dashboardContent}
      onRefresh={handleRefresh}
      activityData={mockDataAccessActivityData}
      tasksData={mockDataAccessTasksData}
      configurationData={mockDataAccessConfigData}
    >
      {dashboardContent}
    </ComponentLayout>
  )
}
