"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, CheckCircle, AlertTriangle, Clock, Database, Workflow, Bot, Globe, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'

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

const mockMetrics = {
  availability: {
    status: "healthy",
    uptime: "99.97%",
    services: {
      total: 12,
      healthy: 11,
      warning: 1,
      critical: 0
    }
  },
  performance: {
    activeWorkflows: 23,
    apiCalls: 15420,
    agentInteractions: 892,
    dataActivities: 3456
  },
  statistics: {
    workflows: {
      total: 156,
      successful: 148,
      failed: 8,
      avgDuration: "2.3s"
    },
    apis: {
      total: 8934,
      successful: 8821,
      failed: 113,
      avgResponseTime: "89ms"
    },
    agents: {
      interactions: 2341,
      successful: 2298,
      failed: 43,
      avgProcessingTime: "1.2s"
    },
    data: {
      recordsProcessed: 1250000,
      storageUsed: "2.4TB",
      queriesExecuted: 45600,
      avgQueryTime: "12ms"
    }
  },
  alerts: [
    {
      id: "alert-1",
      type: "warning",
      message: "High memory usage on workflow engine",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      service: "XCFlow"
    },
    {
      id: "alert-2",
      type: "info",
      message: "Scheduled maintenance window approaching",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      service: "Infrastructure"
    },
    {
      id: "alert-3",
      type: "resolved",
      message: "API rate limit threshold exceeded - resolved",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      service: "Gateway"
    }
  ]
}

export function OverviewDashboard({ pod, tenant }: OverviewDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h")
  const [selectedDashboard, setSelectedDashboard] = useState("general")

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
                <TabsTrigger value="general">General Dashboard</TabsTrigger>
                <TabsTrigger value="quality">Quality Dashboard</TabsTrigger>
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
          <TabsContent value="general" className="space-y-6">
            {/* Availability Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Service Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{mockMetrics.availability.uptime}</div>
                    <div className="text-sm text-gray-500">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{mockMetrics.availability.services.total}</div>
                    <div className="text-sm text-gray-500">Total Services</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{mockMetrics.availability.services.healthy}</div>
                    <div className="text-sm text-gray-500">Healthy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{mockMetrics.availability.services.warning}</div>
                    <div className="text-sm text-gray-500">Warnings</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Workflows</p>
                      <p className="text-2xl font-bold text-gray-900">{mockMetrics.performance.activeWorkflows}</p>
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
                      <p className="text-2xl font-bold text-gray-900">{mockMetrics.performance.apiCalls.toLocaleString()}</p>
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
                      <p className="text-2xl font-bold text-gray-900">{mockMetrics.performance.agentInteractions}</p>
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
                      <p className="text-2xl font-bold text-gray-900">{mockMetrics.performance.dataActivities}</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Database className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workflow Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Executions</span>
                    <span className="font-medium">{mockMetrics.statistics.workflows.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="font-medium text-green-600">
                      {((mockMetrics.statistics.workflows.successful / mockMetrics.statistics.workflows.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Duration</span>
                    <span className="font-medium">{mockMetrics.statistics.workflows.avgDuration}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Requests</span>
                    <span className="font-medium">{mockMetrics.statistics.apis.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="font-medium text-green-600">
                      {((mockMetrics.statistics.apis.successful / mockMetrics.statistics.apis.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Response Time</span>
                    <span className="font-medium">{mockMetrics.statistics.apis.avgResponseTime}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts and Data Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockMetrics.alerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{alert.service}</Badge>
                            <span className="text-xs text-gray-500">
                              {alert.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Records Processed</span>
                    <span className="font-medium">{mockMetrics.statistics.data.recordsProcessed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="font-medium">{mockMetrics.statistics.data.storageUsed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Queries Executed</span>
                    <span className="font-medium">{mockMetrics.statistics.data.queriesExecuted.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Query Time</span>
                    <span className="font-medium">{mockMetrics.statistics.data.avgQueryTime}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">Quality metrics and monitoring dashboard</div>
                  <div className="text-sm text-gray-400">
                    This dashboard would show data quality metrics, validation results, 
                    error rates, and compliance monitoring specific to data quality concerns.
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
