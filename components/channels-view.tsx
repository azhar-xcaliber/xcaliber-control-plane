"use client"
import { ComponentLayout } from "@/components/component-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Activity, CheckCircle, MessageSquare } from "lucide-react"

const mockChannelActivityData = [
  {
    id: "act_ch_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    type: "success" as const,
    action: "Message Processed",
    description: "Successfully processed HL7 ADT message from EMR system",
    user: "system",
    metadata: { channel: "hl7-adt", messageId: "MSG_001", processingTime: "45ms" },
  },
  {
    id: "act_ch_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: "warning" as const,
    action: "High Message Volume",
    description: "FHIR channel experiencing higher than normal message volume",
    user: "system",
    metadata: { channel: "fhir-r4", messagesPerMinute: 1200, threshold: 800 },
  },
  {
    id: "act_ch_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    type: "info" as const,
    action: "Channel Configuration Updated",
    description: "Updated routing rules for lab results channel",
    user: "admin@hospital.com",
    metadata: { channel: "lab-results", rulesUpdated: 3 },
  },
]

const mockChannelTasksData = [
  {
    id: "task_ch_001",
    title: "Configure New Radiology Channel",
    description: "Set up new data channel for radiology DICOM images from imaging systems",
    status: "pending" as const,
    priority: "high" as const,
    assignee: "radiology.admin@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    tags: ["radiology", "dicom", "imaging"],
  },
  {
    id: "task_ch_002",
    title: "Optimize Message Routing",
    description: "Review and optimize message routing rules for better performance",
    status: "in-progress" as const,
    priority: "medium" as const,
    assignee: "integration.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    tags: ["performance", "routing", "optimization"],
  },
]

const mockChannelConfigData = [
  {
    id: "config_ch_001",
    name: "Message Buffer Size",
    type: "number",
    value: 10000,
    description: "Maximum number of messages to buffer before processing",
    category: "Performance",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    modifiedBy: "admin@hospital.com",
    defaultValue: 5000,
  },
  {
    id: "config_ch_002",
    name: "Enable Message Encryption",
    type: "boolean",
    value: true,
    description: "Encrypt messages in transit between channels",
    category: "Security",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "security@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_ch_003",
    name: "Retry Attempts",
    type: "number",
    value: 3,
    description: "Number of retry attempts for failed message delivery",
    category: "Reliability",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "integration.team@hospital.com",
    defaultValue: 3,
  },
]

export function ChannelsView() {
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
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
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
                <p className="text-sm text-gray-600">Messages Today</p>
                <p className="text-2xl font-bold text-blue-600">12.4K</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Throughput</p>
                <p className="text-2xl font-bold text-purple-600">2.1K/min</p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Types */}
      <Card>
        <CardHeader>
          <CardTitle>Data Channel Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">Data channel management and configuration</div>
            <div className="text-sm text-gray-400">
              Configure and monitor data channels for healthcare data exchange.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ComponentLayout
      title="Data Channels"
      description="Configure and monitor healthcare data exchange channels"
      dashboardContent={dashboardContent}
      onRefresh={handleRefresh}
      activityData={mockChannelActivityData}
      tasksData={mockChannelTasksData}
      configurationData={mockChannelConfigData}
    >
      {dashboardContent}
    </ComponentLayout>
  )
}
