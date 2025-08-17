"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Workflow, Globe, Activity, Plus, Settings, Play, Pause } from "lucide-react"

const dataFabricComponents = [
  {
    id: "interop-gateway",
    name: "Interop Gateway",
    description: "API gateway for data interoperability",
    status: "active",
    icon: Globe,
    workflows: 12,
    requests: "1.2M/day",
  },
  {
    id: "data-factory",
    name: "Data Factory",
    description: "ETL and data transformation workflows",
    status: "active",
    icon: Database,
    workflows: 8,
    requests: "450K/day",
  },
  {
    id: "streaming",
    name: "Streaming Engine",
    description: "Real-time data streaming and processing",
    status: "active",
    icon: Activity,
    workflows: 5,
    requests: "2.1M/day",
  },
]

const recentWorkflows = [
  {
    id: "wf-001",
    name: "Customer Data Sync",
    type: "ETL Pipeline",
    status: "running",
    lastRun: "2 minutes ago",
  },
  {
    id: "wf-002",
    name: "Real-time Analytics",
    type: "Streaming",
    status: "active",
    lastRun: "Active",
  },
  {
    id: "wf-003",
    name: "Data Quality Check",
    type: "Validation",
    status: "completed",
    lastRun: "1 hour ago",
  },
]

export function DataFabricView() {
  return (
    <div className="p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dataFabricComponents.map((component) => {
          const Icon = component.icon
          return (
            <Card key={component.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{component.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {component.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{component.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Active Workflows</span>
                    <span className="font-medium">{component.workflows}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Daily Requests</span>
                    <span className="font-medium">{component.requests}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Workflows */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Workflows</CardTitle>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Workflow className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{workflow.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {workflow.type}
                      </Badge>
                      <span className="text-xs text-gray-500">Last run: {workflow.lastRun}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      workflow.status === "running"
                        ? "bg-blue-100 text-blue-700"
                        : workflow.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                    }
                  >
                    {workflow.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    {workflow.status === "running" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
