"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Wifi, Database, Activity, Plus, Settings, Zap } from "lucide-react"

const mockDataChannels = [
  {
    id: "ch_001",
    name: "HL7 FHIR Channel",
    type: "HL7 FHIR",
    status: "active" as const,
    description: "Bidirectional HL7 FHIR messaging for clinical data exchange",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2),
    createdBy: "integration.team@hospital.com",
    throughput: "2.5K msg/hour",
    endpoints: 8,
  },
  {
    id: "ch_002",
    name: "ADT Message Stream",
    type: "HL7 v2.x",
    status: "active" as const,
    description: "Admission, Discharge, Transfer message processing",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 6),
    createdBy: "adt.team@hospital.com",
    throughput: "1.8K msg/hour",
    endpoints: 12,
  },
  {
    id: "ch_003",
    name: "Lab Results Interface",
    type: "REST API",
    status: "maintenance" as const,
    description: "Laboratory results data channel with real-time updates",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 1),
    createdBy: "lab.team@hospital.com",
    throughput: "850 msg/hour",
    endpoints: 4,
  },
  {
    id: "ch_004",
    name: "Insurance Claims Gateway",
    type: "EDI X12",
    status: "error" as const,
    description: "Electronic Data Interchange for insurance claims processing",
    lastModified: new Date(Date.now() - 1000 * 60 * 30),
    createdBy: "billing.team@hospital.com",
    throughput: "0 msg/hour",
    endpoints: 6,
  },
]

const mockActivityData = [
  {
    id: "act_ch_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "success" as const,
    action: "Message Processed",
    description: "HL7 FHIR Channel successfully processed patient admission message",
    user: "system",
    metadata: { channel: "ch_001", messageType: "ADT^A01", patientId: "P123456" },
  },
  {
    id: "act_ch_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    type: "error" as const,
    action: "Channel Error",
    description: "Insurance Claims Gateway failed to connect to clearinghouse",
    user: "system",
    metadata: { channel: "ch_004", error: "Connection timeout", endpoint: "claims.clearinghouse.com" },
  },
  {
    id: "act_ch_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: "warning" as const,
    action: "High Message Volume",
    description: "ADT Message Stream experiencing higher than normal message volume",
    user: "system",
    metadata: { channel: "ch_002", volume: "2.1K msg/hour", threshold: "2K msg/hour" },
  },
  {
    id: "act_ch_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    type: "info" as const,
    action: "Maintenance Started",
    description: "Lab Results Interface maintenance window started",
    user: "lab.team@hospital.com",
    metadata: { channel: "ch_003", duration: "2h", impact: "read-only" },
  },
]

const mockTasksData = [
  {
    id: "task_ch_001",
    title: "Fix Claims Gateway Connection",
    description: "Investigate and resolve connection issues with Insurance Claims Gateway",
    status: "in-progress" as const,
    priority: "critical" as const,
    assignee: "billing.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 4),
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    tags: ["claims", "connection", "troubleshooting"],
  },
  {
    id: "task_ch_002",
    title: "Complete Lab Interface Maintenance",
    description: "Complete scheduled maintenance for Lab Results Interface",
    status: "in-progress" as const,
    priority: "medium" as const,
    assignee: "lab.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["maintenance", "lab", "interface"],
  },
  {
    id: "task_ch_003",
    title: "Optimize ADT Message Processing",
    description: "Optimize ADT Message Stream to handle increased message volume",
    status: "pending" as const,
    priority: "high" as const,
    assignee: "adt.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    tags: ["optimization", "adt", "performance"],
  },
  {
    id: "task_ch_004",
    title: "FHIR R4 Compliance Update",
    description: "Update HL7 FHIR Channel to support FHIR R4 specification",
    status: "completed" as const,
    priority: "medium" as const,
    assignee: "integration.team@hospital.com",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    tags: ["fhir", "compliance", "upgrade"],
  },
]

const mockConfigurationData = [
  {
    id: "config_ch_001",
    name: "Message Retry Attempts",
    type: "number",
    value: 3,
    description: "Number of retry attempts for failed message processing",
    category: "Messaging",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    modifiedBy: "integration.team@hospital.com",
    defaultValue: 2,
  },
  {
    id: "config_ch_002",
    name: "Connection Timeout",
    type: "number",
    value: 30,
    description: "Connection timeout in seconds for external endpoints",
    category: "Network",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    modifiedBy: "ops.team@hospital.com",
    defaultValue: 15,
  },
  {
    id: "config_ch_003",
    name: "Message Queue Size",
    type: "number",
    value: 10000,
    description: "Maximum number of messages in processing queue",
    category: "Performance",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "performance.team@hospital.com",
    defaultValue: 5000,
  },
  {
    id: "config_ch_004",
    name: "Enable Message Logging",
    type: "boolean",
    value: true,
    description: "Enable detailed logging for all message transactions",
    category: "Logging",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    modifiedBy: "compliance@hospital.com",
    defaultValue: false,
  },
  {
    id: "config_ch_005",
    name: "HIPAA Audit Mode",
    type: "boolean",
    value: true,
    description: "Enable HIPAA compliance audit logging for all channels",
    category: "Compliance",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "compliance@hospital.com",
    defaultValue: true,
  },
]

export function ChannelsView() {
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
    console.log("Refreshing data channels...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Channels</p>
                <p className="text-2xl font-bold text-gray-900">{mockDataChannels.length}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Channels</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockDataChannels.filter((ch) => ch.status === "active").length}
                </p>
              </div>
              <Wifi className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Endpoints</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockDataChannels.reduce((sum, ch) => sum + ch.endpoints, 0)}
                </p>
              </div>
              <Database className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Throughput</p>
                <p className="text-2xl font-bold text-orange-600">1.3K/hr</p>
              </div>
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["HL7 FHIR", "HL7 v2.x", "REST API", "EDI X12"].map((type) => {
          const channels = mockDataChannels.filter((ch) => ch.type === type)
          return (
            <Card key={type} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{type}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {channels.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {channels.slice(0, 2).map((channel) => (
                    <div key={channel.id} className="text-sm">
                      <div className="font-medium text-gray-900 truncate">{channel.name}</div>
                      <div className="text-gray-500 text-xs">{channel.throughput}</div>
                    </div>
                  ))}
                  {channels.length > 2 && <div className="text-xs text-gray-400">+{channels.length - 2} more</div>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Channels */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Data Channels</CardTitle>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Channel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDataChannels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{channel.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {channel.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{channel.throughput}</span>
                      <span className="text-xs text-gray-500">{channel.endpoints} endpoints</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      channel.status === "active"
                        ? "bg-green-100 text-green-700"
                        : channel.status === "maintenance"
                          ? "bg-yellow-100 text-yellow-700"
                          : channel.status === "error"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                    }
                  >
                    {channel.status}
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
      items={mockDataChannels}
      onItemSelect={handleItemSelect}
      onCreateNew={handleCreateNew}
      itemType="Data Channel"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Data Channels"
        description="Manage healthcare data communication channels and messaging interfaces"
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
