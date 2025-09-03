"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Key, Shield, Users, Activity, Plus, Settings, Lock } from "lucide-react"

const mockAccessPolicies = [
  {
    id: "ap_001",
    name: "Clinical Data Access",
    type: "Role-Based",
    status: "active" as const,
    description: "Access control for clinical staff to patient data",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    createdBy: "security.team@hospital.com",
    users: 245,
    resources: 12,
  },
  {
    id: "ap_002",
    name: "Research Data Access",
    type: "Attribute-Based",
    status: "active" as const,
    description: "Controlled access for research teams to de-identified data",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 12),
    createdBy: "research.team@hospital.com",
    users: 18,
    resources: 8,
  },
  {
    id: "ap_003",
    name: "Administrative Access",
    type: "Role-Based",
    status: "review" as const,
    description: "Administrative access to system configuration and reports",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 6),
    createdBy: "admin.team@hospital.com",
    users: 12,
    resources: 25,
  },
  {
    id: "ap_004",
    name: "Emergency Access Protocol",
    type: "Break-Glass",
    status: "active" as const,
    description: "Emergency access protocol for critical patient care situations",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    createdBy: "emergency.team@hospital.com",
    users: 8,
    resources: 15,
  },
]

const mockActivityData = [
  {
    id: "act_da_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    type: "success" as const,
    action: "Access Granted",
    description: "Dr. Smith accessed patient record P123456 via Clinical Data Access policy",
    user: "dr.smith@hospital.com",
    metadata: { policy: "ap_001", resource: "patient_record", patientId: "P123456", duration: "15m" },
  },
  {
    id: "act_da_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    type: "warning" as const,
    action: "Access Denied",
    description: "Unauthorized access attempt to research data from external IP",
    user: "unknown",
    metadata: { policy: "ap_002", resource: "research_dataset", ip: "192.168.1.100", reason: "IP not whitelisted" },
  },
  {
    id: "act_da_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
    type: "info" as const,
    action: "Policy Updated",
    description: "Administrative Access policy updated with new role assignments",
    user: "admin.team@hospital.com",
    metadata: { policy: "ap_003", changes: 3, newUsers: 2, removedUsers: 1 },
  },
  {
    id: "act_da_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
    type: "error" as const,
    action: "Break-Glass Activated",
    description: "Emergency access protocol activated for patient in critical condition",
    user: "dr.johnson@hospital.com",
    metadata: { policy: "ap_004", patientId: "P789012", reason: "cardiac_emergency", duration: "2h" },
  },
]

const mockTasksData = [
  {
    id: "task_da_001",
    title: "Review Administrative Access Policy",
    description: "Quarterly review of Administrative Access policy and user assignments",
    status: "pending" as const,
    priority: "medium" as const,
    assignee: "security.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    tags: ["review", "policy", "quarterly"],
  },
  {
    id: "task_da_002",
    title: "Investigate Unauthorized Access Attempt",
    description: "Investigate and respond to unauthorized access attempt from external IP",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "security.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    tags: ["security", "investigation", "unauthorized"],
  },
  {
    id: "task_da_003",
    title: "Update Break-Glass Procedures",
    description: "Update emergency access procedures based on recent incident review",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "emergency.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["emergency", "procedures", "break-glass"],
  },
  {
    id: "task_da_004",
    title: "Onboard New Research Team Members",
    description: "Configure access policies for new research team members",
    status: "completed" as const,
    priority: "medium" as const,
    assignee: "research.team@hospital.com",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    tags: ["onboarding", "research", "access"],
  },
]

const mockConfigurationData = [
  {
    id: "config_da_001",
    name: "Session Timeout",
    type: "number",
    value: 30,
    description: "User session timeout in minutes",
    category: "Security",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    modifiedBy: "security.team@hospital.com",
    defaultValue: 15,
  },
  {
    id: "config_da_002",
    name: "Multi-Factor Authentication",
    type: "boolean",
    value: true,
    description: "Require multi-factor authentication for all users",
    category: "Authentication",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "compliance@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_da_003",
    name: "Failed Login Attempts",
    type: "number",
    value: 3,
    description: "Maximum failed login attempts before account lockout",
    category: "Security",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    modifiedBy: "security.team@hospital.com",
    defaultValue: 5,
  },
  {
    id: "config_da_004",
    name: "Audit Log Retention",
    type: "number",
    value: 2555,
    description: "Audit log retention period in days",
    category: "Compliance",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    modifiedBy: "compliance@hospital.com",
    defaultValue: 2555,
  },
  {
    id: "config_da_005",
    name: "Break-Glass Approval Required",
    type: "boolean",
    value: false,
    description: "Require supervisor approval for break-glass access",
    category: "Emergency",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "emergency.team@hospital.com",
    defaultValue: true,
  },
]

export function DataAccessView() {
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
    console.log("Refreshing data access policies...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Policies</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockAccessPolicies.filter((ap) => ap.status === "active").length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockAccessPolicies.reduce((sum, ap) => sum + ap.users, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Protected Resources</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockAccessPolicies.reduce((sum, ap) => sum + ap.resources, 0)}
                </p>
              </div>
              <Key className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockAccessPolicies.filter((ap) => ap.status === "review").length}
                </p>
              </div>
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Role-Based", "Attribute-Based", "Break-Glass", "Time-Based"].map((type) => {
          const policies = mockAccessPolicies.filter((ap) => ap.type === type)
          return (
            <Card key={type} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{type}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {policies.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {policies.slice(0, 2).map((policy) => (
                    <div key={policy.id} className="text-sm">
                      <div className="font-medium text-gray-900 truncate">{policy.name}</div>
                      <div className="text-gray-500 text-xs">{policy.users} users</div>
                    </div>
                  ))}
                  {policies.length > 2 && <div className="text-xs text-gray-400">+{policies.length - 2} more</div>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Access Policies */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Access Policies</CardTitle>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Policy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAccessPolicies.map((policy) => (
              <div key={policy.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Lock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{policy.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {policy.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{policy.users} users</span>
                      <span className="text-xs text-gray-500">{policy.resources} resources</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      policy.status === "active"
                        ? "bg-green-100 text-green-700"
                        : policy.status === "review"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }
                  >
                    {policy.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
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
      items={mockAccessPolicies}
      onItemSelect={handleItemSelect}
      onCreateNew={handleCreateNew}
      itemType="Access Policy"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Data Access"
        description="Manage data access policies, permissions, and security controls"
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
        title={selectedItem?.name || "New Access Policy"}
        itemType="Access Policy"
      />
    </>
  )
}
