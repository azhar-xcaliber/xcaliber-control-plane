"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react"
import type { ActivityType } from "@/types/activity"

interface AgentsStudioProps {
  onActivitySelect: (activity: ActivityType) => void
}

const mockAgents = [
  {
    id: "agent_001",
    name: "Data Quality Checker",
    type: "Validation Agent",
    status: "active" as const,
    interactions_today: 23,
    success_rate: 98.5,
    avg_response_time: "1.2s",
    description: "Validates data quality and schema compliance",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    createdBy: "john.doe@hospital.com",
  },
  {
    id: "agent_002",
    name: "Performance Monitor",
    type: "Monitoring Agent",
    status: "active" as const,
    interactions_today: 156,
    success_rate: 99.2,
    avg_response_time: "0.8s",
    description: "Monitors system performance and generates alerts",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 12),
    createdBy: "jane.smith@hospital.com",
  },
  {
    id: "agent_003",
    name: "Security Auditor",
    type: "Security Agent",
    status: "inactive" as const,
    interactions_today: 8,
    success_rate: 97.8,
    avg_response_time: "2.1s",
    description: "Performs security audits and compliance checks",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 6),
    createdBy: "mike.johnson@hospital.com",
  },
  {
    id: "agent_004",
    name: "Patient Data Processor",
    type: "Processing Agent",
    status: "active" as const,
    interactions_today: 89,
    success_rate: 96.7,
    avg_response_time: "1.8s",
    description: "Processes and enriches patient data records",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdBy: "sarah.williams@hospital.com",
  },
]

const mockActivityData = [
  {
    id: "act_ag_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "success" as const,
    action: "Agent Interaction Completed",
    description: "Data Quality Checker validated 15,420 records with 0 errors found",
    user: "system",
    metadata: {
      agent: "Data Quality Checker",
      interactionType: "validation",
      duration: "1240ms",
      recordsProcessed: 15420,
    },
  },
  {
    id: "act_ag_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "warning" as const,
    action: "Performance Alert",
    description: "Security Auditor found 3 suspicious access patterns requiring review",
    user: "system",
    metadata: {
      agent: "Security Auditor",
      alertLevel: "warning",
      patternsFound: 3,
      requiresReview: true,
    },
  },
  {
    id: "act_ag_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "error" as const,
    action: "Agent Interaction Failed",
    description: "Patient Data Processor failed: 45 records with schema violations",
    user: "system",
    metadata: {
      agent: "Patient Data Processor",
      error: "Schema violations",
      failedRecords: 45,
      totalRecords: 1200,
    },
  },
  {
    id: "act_ag_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "info" as const,
    action: "Agent Configuration Updated",
    description: "Performance Monitor configuration updated to v2.1",
    user: "jane.smith@hospital.com",
    metadata: {
      agent: "Performance Monitor",
      version: "2.1",
      configChanges: 3,
    },
  },
]

const mockTasksData = [
  {
    id: "task_ag_001",
    title: "Update Security Agent Rules",
    description: "Update the Security Auditor agent with new compliance rules for HIPAA 2024",
    status: "pending" as const,
    priority: "high" as const,
    assignee: "mike.johnson@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["security", "compliance", "hipaa"],
  },
  {
    id: "task_ag_002",
    title: "Investigate Data Processing Failures",
    description: "Investigate recurring schema validation failures in Patient Data Processor",
    status: "in-progress" as const,
    priority: "critical" as const,
    assignee: "sarah.williams@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 12),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    tags: ["troubleshooting", "data-processing", "validation"],
  },
  {
    id: "task_ag_003",
    title: "Performance Optimization Review",
    description: "Review and optimize response times for all monitoring agents",
    status: "completed" as const,
    priority: "medium" as const,
    assignee: "jane.smith@hospital.com",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    tags: ["performance", "optimization", "monitoring"],
  },
]

const mockConfigurationData = [
  {
    id: "config_ag_001",
    name: "Max Concurrent Interactions",
    type: "number",
    value: 50,
    description: "Maximum number of concurrent agent interactions",
    category: "Performance",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    modifiedBy: "admin@hospital.com",
    defaultValue: 25,
  },
  {
    id: "config_ag_002",
    name: "Security Audit Frequency",
    type: "string",
    value: "hourly",
    description: "How often security audits are performed",
    category: "Security",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    modifiedBy: "mike.johnson@hospital.com",
    defaultValue: "daily",
  },
  {
    id: "config_ag_003",
    name: "Data Validation Rules",
    type: "boolean",
    value: true,
    description: "Enable strict data validation rules for all agents",
    category: "Data Quality",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "system@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_ag_004",
    name: "Response Timeout",
    type: "number",
    value: 30,
    description: "Agent response timeout in seconds",
    category: "Performance",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "jane.smith@hospital.com",
    defaultValue: 15,
  },
]

export function AgentsStudio({ onActivitySelect }: AgentsStudioProps) {
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
    console.log("Refreshing agents...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900">{mockAgents.length}</p>
              </div>
              <Bot className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Agents</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockAgents.filter((a) => a.status === "active").length}
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
                <p className="text-sm text-gray-600">Interactions Today</p>
                <p className="text-2xl font-bold text-blue-600">
                  {mockAgents.reduce((acc, a) => acc + a.interactions_today, 0)}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Success Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {(mockAgents.reduce((acc, a) => acc + a.success_rate, 0) / mockAgents.length).toFixed(1)}%
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Agents */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleItemSelect(agent)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Bot className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{agent.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {agent.type}
                      </Badge>
                      <Badge
                        className={
                          agent.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }
                      >
                        {agent.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium text-green-600">{agent.success_rate}% success</div>
                  <div className="text-gray-500">{agent.interactions_today} interactions today</div>
                  <div className="text-gray-500">Avg: {agent.avg_response_time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Types Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Validation Agent", "Monitoring Agent", "Security Agent", "Processing Agent"].map((type) => {
              const count = mockAgents.filter((a) => a.type === type).length
              return (
                <div key={type} className="text-center p-4 border border-gray-200 rounded-lg">
                  <Bot className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600">{type}</div>
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
      items={mockAgents}
      onItemSelect={handleItemSelect}
      onCreateNew={handleCreateNew}
      itemType="Agent"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Agent Studio"
        description="Manage agent interactions and configurations"
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
        title={selectedItem?.name || "New Agent"}
        itemType="Agent"
      />
    </>
  )
}
