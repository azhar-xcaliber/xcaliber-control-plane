"use client"
import { ComponentLayout } from "@/components/component-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Send as Sync, CheckCircle } from "lucide-react"

const mockCrmActivityData = [
  {
    id: "act_crm_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "success" as const,
    action: "Contact Sync Completed",
    description: "Successfully synchronized 1,247 patient contacts with Salesforce",
    user: "system",
    metadata: { crmSystem: "salesforce", contactsSynced: 1247, duration: "3m 45s" },
  },
  {
    id: "act_crm_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
    type: "warning" as const,
    action: "API Rate Limit Approached",
    description: "HubSpot API usage approaching daily rate limit",
    user: "system",
    metadata: { crmSystem: "hubspot", currentUsage: "9500", dailyLimit: "10000" },
  },
  {
    id: "act_crm_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: "info" as const,
    action: "Field Mapping Updated",
    description: "Updated field mappings for patient demographics in CRM integration",
    user: "crm.admin@hospital.com",
    metadata: { crmSystem: "salesforce", fieldsUpdated: 5, mappingVersion: "v2.3" },
  },
]

const mockCrmTasksData = [
  {
    id: "task_crm_001",
    title: "Configure HubSpot Integration",
    description: "Set up new HubSpot integration for patient engagement tracking",
    status: "pending" as const,
    priority: "high" as const,
    assignee: "crm.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    tags: ["hubspot", "integration", "patient-engagement"],
  },
  {
    id: "task_crm_002",
    title: "Optimize Sync Performance",
    description: "Improve sync performance for large contact datasets",
    status: "in-progress" as const,
    priority: "medium" as const,
    assignee: "integration.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    tags: ["performance", "sync", "optimization"],
  },
]

const mockCrmConfigData = [
  {
    id: "config_crm_001",
    name: "Sync Interval",
    type: "string",
    value: "15 minutes",
    description: "Frequency of contact synchronization with CRM systems",
    category: "Synchronization",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    modifiedBy: "crm.admin@hospital.com",
    defaultValue: "30 minutes",
  },
  {
    id: "config_crm_002",
    name: "Enable Bidirectional Sync",
    type: "boolean",
    value: false,
    description: "Allow data to sync both ways between hospital system and CRM",
    category: "Synchronization",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "crm.admin@hospital.com",
    defaultValue: false,
  },
  {
    id: "config_crm_003",
    name: "Data Privacy Mode",
    type: "boolean",
    value: true,
    description: "Enable enhanced data privacy features for CRM integrations",
    category: "Privacy",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "privacy@hospital.com",
    defaultValue: true,
  },
]

export function CrmSystemsView() {
  const handleRefresh = () => {
    console.log("Refreshing CRM systems...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Connected CRMs</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Synchronized Contacts</p>
                <p className="text-2xl font-bold text-green-600">12.4K</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Sync</p>
                <p className="text-2xl font-bold text-blue-600">2h ago</p>
              </div>
              <Sync className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sync Status</p>
                <p className="text-2xl font-bold text-green-600">100%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CRM Systems */}
      <Card>
        <CardHeader>
          <CardTitle>CRM System Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">Customer relationship management integration</div>
            <div className="text-sm text-gray-400">
              Integrate with Salesforce, HubSpot, and other enterprise CRM systems for patient relationship management.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ComponentLayout
      title="CRM Systems"
      description="Customer relationship management system integration"
      dashboardContent={dashboardContent}
      onRefresh={handleRefresh}
      activityData={mockCrmActivityData}
      tasksData={mockCrmTasksData}
      configurationData={mockCrmConfigData}
    >
      {dashboardContent}
    </ComponentLayout>
  )
}
