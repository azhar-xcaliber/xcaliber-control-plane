"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  Database,
  Workflow,
  Bot,
  Globe,
  RefreshCw,
  Users,
  Building2,
  Server,
} from "lucide-react"

interface OverviewDashboardProps {
  pod: string
  tenant: string
}

const timeRanges = [
  { id: "1h", label: "Last Hour" },
  { id: "24h", label: "Last 24 Hours" },
  { id: "7d", label: "Last 7 Days" },
  { id: "30d", label: "Last 30 Days" },
]

// Platform-wide metrics (not tenant-specific)
const mockPlatformMetrics = {
  infrastructure: {
    totalPods: 4,
    healthyPods: 3,
    warningPods: 1,
    criticalPods: 0,
    totalTenants: 12,
    activeTenants: 10,
    totalUsers: 1247,
    activeUsers: 892,
  },
  performance: {
    totalWorkflows: 156,
    activeWorkflows: 23,
    totalApiCalls: 45620,
    totalAgentInteractions: 3892,
    totalDataActivities: 12456,
  },
  resources: {
    cpuUtilization: "67%",
    memoryUtilization: "72%",
    storageUsed: "8.4TB",
    networkThroughput: "2.3GB/s",
  },
  alerts: [
    {
      id: "alert-1",
      type: "warning",
      message: "High memory usage on staging pod",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      pod: "staging",
      tenant: "Global Systems",
    },
    {
      id: "alert-2",
      type: "info",
      message: "Scheduled maintenance window approaching",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      pod: "prod-east",
      tenant: "Platform",
    },
    {
      id: "alert-3",
      type: "resolved",
      message: "API rate limit threshold exceeded - resolved",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      pod: "prod-west",
      tenant: "Acme Corp",
    },
  ],
}

export function OverviewDashboard({ pod, tenant }: OverviewDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [selectedDashboard, setSelectedDashboard] = useState("platform")

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Dashboard Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Tabs value={selectedDashboard} onValueChange={setSelectedDashboard}>
              <TabsList>
                <TabsTrigger value="platform">Platform Overview</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                <TabsTrigger value="tenants">Tenant Management</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              {timeRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs value={selectedDashboard} className="space-y-6">
          <TabsContent value="platform" className="space-y-6">
            {/* Platform Health Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-500" />
                  Platform Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockPlatformMetrics.infrastructure.totalPods}
                    </div>
                    <div className="text-sm text-gray-500">Total Pods</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {mockPlatformMetrics.infrastructure.healthyPods}
                    </div>
                    <div className="text-sm text-gray-500">Healthy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {mockPlatformMetrics.infrastructure.warningPods}
                    </div>
                    <div className="text-sm text-gray-500">Warnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {mockPlatformMetrics.infrastructure.criticalPods}
                    </div>
                    <div className="text-sm text-gray-500">Critical</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Activity Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Workflows</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {mockPlatformMetrics.performance.activeWorkflows}
                      </p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Workflow className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">API Calls</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {mockPlatformMetrics.performance.totalApiCalls.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Agent Interactions</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {mockPlatformMetrics.performance.totalAgentInteractions.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Bot className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Data Activities</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {mockPlatformMetrics.performance.totalDataActivities.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Database className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resource Utilization and Recent Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CPU Utilization</span>
                    <span className="font-medium">{mockPlatformMetrics.resources.cpuUtilization}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Memory Utilization</span>
                    <span className="font-medium">{mockPlatformMetrics.resources.memoryUtilization}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="font-medium">{mockPlatformMetrics.resources.storageUsed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Network Throughput</span>
                    <span className="font-medium">{mockPlatformMetrics.resources.networkThroughput}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockPlatformMetrics.alerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {alert.pod}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {alert.tenant}
                            </Badge>
                            <span className="text-xs text-gray-500">{alert.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="infrastructure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Infrastructure Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">Infrastructure monitoring and resource management</div>
                  <div className="text-sm text-gray-400">
                    Detailed infrastructure metrics, pod health, and resource allocation will be displayed here.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tenants" className="space-y-6">
            {/* Tenant Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Tenants</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {mockPlatformMetrics.infrastructure.totalTenants}
                      </p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Tenants</p>
                      <p className="text-2xl font-bold text-green-600">
                        {mockPlatformMetrics.infrastructure.activeTenants}
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {mockPlatformMetrics.infrastructure.activeUsers}
                      </p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tenant Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">Tenant provisioning and management</div>
                  <div className="text-sm text-gray-400">
                    Tenant onboarding, configuration, and lifecycle management tools will be available here.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
