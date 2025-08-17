"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Database, Workflow, Bot, Server, AlertTriangle, BarChart3, Settings, RefreshCw, Activity } from 'lucide-react'

interface PodServiceViewProps {
  service: string
  pod: string
}

const serviceConfig = {
  gateway: {
    title: "Gateway Service",
    description: "API Gateway and routing management",
    icon: Globe,
    color: "blue",
  },
  ods: {
    title: "Operational Data Store",
    description: "Real-time operational data management",
    icon: Database,
    color: "green",
  },
  xcflow: {
    title: "XCFlow / Workflows",
    description: "Orchestration and workflow management",
    icon: Workflow,
    color: "purple",
  },
  agentx: {
    title: "Agentx / Agents",
    description: "Agent deployment and management",
    icon: Bot,
    color: "orange",
  },
  infrastructure: {
    title: "Infrastructure",
    description: "Kubernetes and infrastructure monitoring",
    icon: Server,
    color: "gray",
  },
  alerts: {
    title: "Pod Alerts",
    description: "System alerts and notifications",
    icon: AlertTriangle,
    color: "red",
  },
  telemetry: {
    title: "Telemetry & Usage",
    description: "System metrics and usage analytics",
    icon: BarChart3,
    color: "indigo",
  },
}

const pods = [
  { id: "prod-east", name: "Production East" },
  { id: "prod-west", name: "Production West" },
  { id: "staging", name: "Staging" },
  { id: "dev", name: "Development" },
]

const mockMetrics = {
  gateway: [
    { label: "Requests/sec", value: "1,247", trend: "up" },
    { label: "Avg Response Time", value: "89ms", trend: "down" },
    { label: "Error Rate", value: "0.12%", trend: "down" },
    { label: "Active Connections", value: "2,341", trend: "up" },
  ],
  ods: [
    { label: "Read Operations/sec", value: "3,456", trend: "up" },
    { label: "Write Operations/sec", value: "892", trend: "stable" },
    { label: "Storage Used", value: "2.4TB", trend: "up" },
    { label: "Query Avg Time", value: "12ms", trend: "down" },
  ],
  xcflow: [
    { label: "Active Workflows", value: "23", trend: "stable" },
    { label: "Completed Today", value: "1,456", trend: "up" },
    { label: "Failed Workflows", value: "3", trend: "down" },
    { label: "Avg Execution Time", value: "2.3s", trend: "down" },
  ],
  agentx: [
    { label: "Active Agents", value: "12", trend: "stable" },
    { label: "Tasks Completed", value: "8,934", trend: "up" },
    { label: "Success Rate", value: "98.7%", trend: "up" },
    { label: "Avg Task Time", value: "1.8s", trend: "stable" },
  ],
  infrastructure: [
    { label: "CPU Usage", value: "67%", trend: "stable" },
    { label: "Memory Usage", value: "72%", trend: "up" },
    { label: "Active Pods", value: "156", trend: "stable" },
    { label: "Network I/O", value: "2.1GB/s", trend: "up" },
  ],
  alerts: [
    { label: "Active Alerts", value: "3", trend: "down" },
    { label: "Critical", value: "0", trend: "stable" },
    { label: "Warnings", value: "3", trend: "down" },
    { label: "Resolved Today", value: "12", trend: "up" },
  ],
  telemetry: [
    { label: "Data Points/sec", value: "45K", trend: "up" },
    { label: "Storage Growth", value: "12GB/day", trend: "stable" },
    { label: "Active Dashboards", value: "28", trend: "up" },
    { label: "Query Performance", value: "156ms", trend: "down" },
  ],
}

export function PodServiceView({ service, pod }: PodServiceViewProps) {
  const config = serviceConfig[service as keyof typeof serviceConfig]
  const metrics = mockMetrics[service as keyof typeof mockMetrics] || []
  const currentPod = pods.find(p => p.id === pod)

  if (!config) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Service Not Found</h2>
          <p className="text-gray-600">The requested service could not be found.</p>
        </div>
      </div>
    )
  }

  const Icon = config.icon

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-${config.color}-100 rounded-lg`}>
              <Icon className={`w-6 h-6 text-${config.color}-600`} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{config.title}</h1>
              <p className="text-gray-600">{config.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">
              Pod: {currentPod?.name}
            </Badge>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Service Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-700">Operational</Badge>
                <span className="text-sm text-gray-600">Last updated: 2 minutes ago</span>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    </div>
                    <div
                      className={`p-2 rounded-full ${
                        metric.trend === "up" ? "bg-green-100" : metric.trend === "down" ? "bg-red-100" : "bg-gray-100"
                      }`}
                    >
                      <Activity
                        className={`w-4 h-4 ${
                          metric.trend === "up"
                            ? "text-green-600"
                            : metric.trend === "down"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Service-specific content */}
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500">
                Service-specific monitoring dashboard would be rendered here
                <br />
                <span className="text-sm">Pod: {currentPod?.name}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
