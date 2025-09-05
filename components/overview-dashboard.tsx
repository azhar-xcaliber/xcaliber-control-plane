"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle,
  AlertTriangle,
  Database,
  RefreshCw,
  Building2,
  Search,
  Edit,
  Lock,
  CheckSquare,
  Clock,
  DollarSign,
  FileText,
  Calendar,
  User,
  AlertCircle,
  Info,
  XCircle,
  Zap,
} from "lucide-react"
import { TenantConfigurationDrawer } from "@/components/tenant-configuration-drawer"
import { TaskDetailsDrawer } from "@/components/task-details-drawer"
import { BillingDetailsDrawer } from "@/components/billing-details-drawer"
import { ActivityDetailsDrawer } from "@/components/activity-details-drawer"

interface OverviewDashboardProps {
  pod: string
  tenant: string
}

// Enhanced activity data with proper categorization
const mockActivities = [
  {
    id: "act_001",
    title: "Patient Data Processing Workflow",
    type: "workflow",
    severity: "informational",
    status: "success",
    component: "Data Products",
    details: "Successfully processed 1,247 patient records from EMR system",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    duration: 2340,
    triggeredBy: "System Scheduler",
    source: "EMR Integration",
    connectionTime: 145,
  },
  {
    id: "act_002",
    title: "Data Quality Validation Failed",
    type: "agent-interaction",
    severity: "major",
    status: "error",
    component: "Agents",
    details: "Data quality agent detected 23% missing required fields in incoming dataset",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    duration: 890,
    triggeredBy: "john.doe@company.com",
    source: "Quality Agent",
    connectionTime: 67,
  },
  {
    id: "act_003",
    title: "API Rate Limit Warning",
    type: "api-call",
    severity: "warning",
    status: "warning",
    component: "Data Access",
    details: "Approaching rate limit threshold (85% of daily quota used)",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    duration: 45,
    triggeredBy: "External Service",
    source: "FHIR API Gateway",
    connectionTime: 23,
  },
  {
    id: "act_004",
    title: "Critical System Alert",
    type: "workflow",
    severity: "critical",
    status: "error",
    component: "Data Operations",
    details: "Database connection pool exhausted, blocking new transactions",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    duration: null,
    triggeredBy: "System Monitor",
    source: "Database Monitor",
    connectionTime: 0,
  },
]

const mockTasks = [
  {
    id: "task_001",
    title: "Update FHIR Mappings",
    description: "Review and update patient demographic mappings for new FHIR R4 requirements",
    status: "pending",
    priority: "high",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    assignee: "Sarah Johnson",
    component: "Data Sources",
    isScheduled: true,
    estimatedHours: 4,
  },
  {
    id: "task_002",
    title: "Security Audit Review",
    description: "Complete quarterly security audit for tenant data access patterns",
    status: "in-progress",
    priority: "critical",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    assignee: "Mike Chen",
    component: "Data Access",
    isScheduled: true,
    estimatedHours: 8,
  },
  {
    id: "task_003",
    title: "Agent Training Data Update",
    description: "Upload new training dataset for improved natural language processing",
    status: "completed",
    priority: "medium",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    assignee: "Emily Rodriguez",
    component: "Agents",
    isScheduled: false,
    estimatedHours: 2,
  },
]

const mockBillingReports = [
  {
    id: "bill_001",
    period: "December 2024",
    type: "monthly",
    totalCost: 45620.5,
    apiCalls: 2456789,
    storageGB: 1240,
    computeHours: 890,
    status: "finalized",
    dueDate: new Date(2025, 0, 15),
    components: {
      "Data Sources": 12450.25,
      "Data Products": 18920.75,
      Agents: 8934.5,
      Workflows: 5315.0,
    },
  },
  {
    id: "bill_002",
    period: "November 2024",
    type: "monthly",
    totalCost: 52340.25,
    apiCalls: 2789456,
    storageGB: 1380,
    computeHours: 1020,
    status: "paid",
    dueDate: new Date(2024, 11, 15),
    components: {
      "Data Sources": 14230.5,
      "Data Products": 21450.75,
      Agents: 10234.0,
      Workflows: 6425.0,
    },
  },
]

export function OverviewDashboard({ pod, tenant }: OverviewDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isConfigurationDrawerOpen, setIsConfigurationDrawerOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedBilling, setSelectedBilling] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState(null)

  // Activity filters
  const [activitySearch, setActivitySearch] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [componentFilter, setComponentFilter] = useState("all")

  // Task filters
  const [taskSearch, setTaskSearch] = useState("")
  const [taskStatusFilter, setTaskStatusFilter] = useState("all")

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(activitySearch.toLowerCase()) ||
      activity.details.toLowerCase().includes(activitySearch.toLowerCase())
    const matchesSeverity = severityFilter === "all" || activity.severity === severityFilter
    const matchesType = typeFilter === "all" || activity.type === typeFilter
    const matchesComponent = componentFilter === "all" || activity.component === componentFilter
    return matchesSearch && matchesSeverity && matchesType && matchesComponent
  })

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
      task.description.toLowerCase().includes(taskSearch.toLowerCase())
    const matchesStatus = taskStatusFilter === "all" || task.status === taskStatusFilter
    return matchesSearch && matchesStatus
  })

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case "severe":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "major":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case "minor":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "severe":
        return "bg-red-50 text-red-700 border-red-200"
      case "major":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "minor":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
              <p className="text-sm text-gray-500">Comprehensive overview and management for Acme Corp</p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="activity">Activity Feed</TabsTrigger>
              <TabsTrigger value="tasks">To-do List</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} className="h-full flex flex-col">
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Component Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Data Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-100 text-green-700">8 Active</Badge>
                      <Badge variant="outline">4 Staged</Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Last sync: 2 min ago</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Active Workflows</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-blue-100 text-blue-700">18 Running</Badge>
                      <Badge className="bg-yellow-100 text-yellow-700">5 Queued</Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Avg duration: 4.2 min</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Agents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-100 text-green-700">6 Online</Badge>
                      <Badge className="bg-red-100 text-red-700">1 Error</Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Response time: 1.2s avg</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">API Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89.4K</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-100 text-green-700">↑ 12%</Badge>
                      <span className="text-xs text-gray-500">vs last month</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Rate limit: 15% used</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockActivities.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        {getSeverityIcon(activity.severity)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{activity.title}</span>
                            <Badge className={getSeverityColor(activity.severity)}>{activity.severity}</Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            {activity.component} • {activity.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                        {getStatusIcon(activity.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuration Tab */}
            <TabsContent value="configuration" className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Tenant Configuration</h2>
                    <p className="text-sm text-gray-500">Manage tenant settings and configurations</p>
                  </div>
                  <Button onClick={() => setIsConfigurationDrawerOpen(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Configuration
                  </Button>
                </div>

                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Organization Details
                        <Lock className="w-4 h-4 text-gray-400" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Organization Name</label>
                          <div className="text-sm text-gray-900">Acme Corp</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Plan</label>
                          <Badge>Enterprise</Badge>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Primary Contact</label>
                          <div className="text-sm text-gray-900">john.doe@acmecorp.com</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Phone</label>
                          <div className="text-sm text-gray-900">+1 (555) 123-4567</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Licenses & Products
                        <Lock className="w-4 h-4 text-gray-400" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium">Data Products Suite</div>
                            <div className="text-sm text-gray-500">License: DP-ENT-2024</div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium">Advanced Analytics</div>
                            <div className="text-sm text-gray-500">License: AA-PRO-2024</div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Activity Feed Tab */}
            <TabsContent value="activity" className="flex-1 overflow-hidden flex flex-col">
              {/* Activity Filters */}
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search activities..."
                      value={activitySearch}
                      onChange={(e) => setActivitySearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="severe">Severe</SelectItem>
                      <SelectItem value="major">Major</SelectItem>
                      <SelectItem value="minor">Minor</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="informational">Informational</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="workflow">Workflow</SelectItem>
                      <SelectItem value="agent-interaction">Agent</SelectItem>
                      <SelectItem value="api-call">API Call</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={componentFilter} onValueChange={setComponentFilter}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Component" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Components</SelectItem>
                      <SelectItem value="Data Sources">Data Sources</SelectItem>
                      <SelectItem value="Data Products">Data Products</SelectItem>
                      <SelectItem value="Data Operations">Data Operations</SelectItem>
                      <SelectItem value="Agents">Agents</SelectItem>
                      <SelectItem value="Workflows">Workflows</SelectItem>
                      <SelectItem value="Data Access">Data Access</SelectItem>
                    </SelectContent>
                  </Select>

                  <Badge variant="outline">{filteredActivities.length} activities</Badge>
                </div>
              </div>

              {/* Activity List */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                  {filteredActivities.map((activity) => (
                    <Card
                      key={activity.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-gray-100 rounded-lg">{getSeverityIcon(activity.severity)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                              <Badge className={getSeverityColor(activity.severity)}>{activity.severity}</Badge>
                              <Badge variant="outline">{activity.type}</Badge>
                              {getStatusIcon(activity.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{activity.component}</span>
                              <span>•</span>
                              <span>{activity.timestamp.toLocaleString()}</span>
                              <span>•</span>
                              <span>By {activity.triggeredBy}</span>
                              {activity.duration && (
                                <>
                                  <span>•</span>
                                  <span>{activity.duration}ms</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks" className="flex-1 overflow-hidden flex flex-col">
              {/* Task Filters */}
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search tasks..."
                      value={taskSearch}
                      onChange={(e) => setTaskSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={taskStatusFilter} onValueChange={setTaskStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Badge variant="outline">{filteredTasks.length} tasks</Badge>
                </div>
              </div>

              {/* Task List */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <Card
                      key={task.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedTask(task)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <CheckSquare
                            className={`w-5 h-5 mt-1 ${task.status === "completed" ? "text-green-500" : "text-gray-400"}`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4
                                className={`font-semibold ${task.status === "completed" ? "line-through text-gray-500" : "text-gray-900"}`}
                              >
                                {task.title}
                              </h4>
                              <Badge
                                className={
                                  task.priority === "critical"
                                    ? "bg-red-100 text-red-700"
                                    : task.priority === "high"
                                      ? "bg-orange-100 text-orange-700"
                                      : task.priority === "medium"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-gray-100 text-gray-700"
                                }
                              >
                                {task.priority}
                              </Badge>
                              <Badge variant="outline">{task.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {task.assignee}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Due {task.dueDate.toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.estimatedHours}h
                              </span>
                              <span>{task.component}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-green-600" />
                        <div>
                          <div className="text-2xl font-bold text-gray-900">$45,620</div>
                          <div className="text-sm text-gray-500">Current Month</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Zap className="w-8 h-8 text-blue-600" />
                        <div>
                          <div className="text-2xl font-bold text-gray-900">2.4M</div>
                          <div className="text-sm text-gray-500">API Calls</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Database className="w-8 h-8 text-purple-600" />
                        <div>
                          <div className="text-2xl font-bold text-gray-900">1.24TB</div>
                          <div className="text-sm text-gray-500">Storage Used</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockBillingReports.map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedBilling(report)}
                        >
                          <div className="flex items-center gap-4">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <div className="font-semibold text-gray-900">{report.period}</div>
                              <div className="text-sm text-gray-500">
                                {report.apiCalls.toLocaleString()} API calls • {report.storageGB}GB storage
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">${report.totalCost.toLocaleString()}</div>
                            <Badge
                              className={
                                report.status === "paid"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }
                            >
                              {report.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Drawers */}
      <TenantConfigurationDrawer
        isOpen={isConfigurationDrawerOpen}
        onClose={() => setIsConfigurationDrawerOpen(false)}
      />

      <TaskDetailsDrawer task={selectedTask} isOpen={!!selectedTask} onClose={() => setSelectedTask(null)} />

      <BillingDetailsDrawer
        billing={selectedBilling}
        isOpen={!!selectedBilling}
        onClose={() => setSelectedBilling(null)}
      />

      <ActivityDetailsDrawer
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  )
}
