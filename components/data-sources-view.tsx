"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, CheckCircle, AlertTriangle, TrendingUp, Activity } from "lucide-react"

const mockDataSources = [
  {
    id: "ds-001",
    name: "Electronic Health Records",
    description: "Primary EHR system containing patient records and clinical data",
    type: "EHR System",
    status: "active" as const,
    lastModified: "2 hours ago",
    icon: <Database className="w-5 h-5 text-blue-600" />,
    metadata: {
      lastSync: "2 minutes ago",
      recordCount: "2.4M",
      connectionString: "encrypted",
      dataVolume: "890GB",
      syncFrequency: "Real-time",
    },
  },
  {
    id: "ds-002",
    name: "Laboratory Information System",
    description: "Lab results, test orders, and diagnostic information",
    type: "LIS",
    status: "active" as const,
    lastModified: "1 day ago",
    icon: <Database className="w-5 h-5 text-green-600" />,
    metadata: {
      lastSync: "5 minutes ago",
      recordCount: "890K",
      connectionString: "encrypted",
      dataVolume: "234GB",
      syncFrequency: "Every 5 minutes",
    },
  },
  {
    id: "ds-003",
    name: "Radiology PACS",
    description: "Medical imaging and radiology data archive",
    type: "PACS",
    status: "warning" as const,
    lastModified: "3 days ago",
    icon: <Database className="w-5 h-5 text-orange-600" />,
    metadata: {
      lastSync: "1 hour ago",
      recordCount: "156K",
      connectionString: "encrypted",
      dataVolume: "1.2TB",
      syncFrequency: "Hourly",
    },
  },
  {
    id: "ds-004",
    name: "Claims Management System",
    description: "Insurance claims and billing information",
    type: "Claims",
    status: "inactive" as const,
    lastModified: "1 week ago",
    icon: <Database className="w-5 h-5 text-red-600" />,
    metadata: {
      lastSync: "3 hours ago",
      recordCount: "1.2M",
      connectionString: "encrypted",
      dataVolume: "445GB",
      syncFrequency: "Daily",
    },
  },
]

const mockTasks = [
  {
    id: "task-001",
    title: "Configure new EHR connection",
    description: "Set up connection to new Epic EHR system",
    priority: "high",
    dueDate: "Today",
    assignee: "System Admin",
  },
  {
    id: "task-002",
    title: "Review PACS sync warnings",
    description: "Investigate intermittent sync issues with radiology system",
    priority: "medium",
    dueDate: "Tomorrow",
    assignee: "Data Engineer",
  },
  {
    id: "task-003",
    title: "Update Claims system credentials",
    description: "Rotate authentication credentials for claims management system",
    priority: "low",
    dueDate: "Next week",
    assignee: "Security Team",
  },
]

const mockActivities = [
  {
    id: "act-001",
    action: "Data source connected",
    target: "Laboratory Information System",
    timestamp: "2 minutes ago",
    user: "System",
  },
  {
    id: "act-002",
    action: "Sync completed",
    target: "Electronic Health Records",
    timestamp: "5 minutes ago",
    user: "System",
  },
  {
    id: "act-003",
    action: "Configuration updated",
    target: "Radiology PACS",
    timestamp: "1 hour ago",
    user: "John Doe",
  },
]

export function DataSourcesView() {
  const [selectedItem, setSelectedItem] = useState<(typeof mockDataSources)[0] | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleItemSelect = (item: (typeof mockDataSources)[0]) => {
    setSelectedItem(item)
    setIsDrawerOpen(true)
  }

  const handleCreateNew = () => {
    console.log("Create new data source")
  }

  const handleEdit = (item: (typeof mockDataSources)[0]) => {
    console.log("Edit data source:", item.id)
  }

  const handleDelete = (item: (typeof mockDataSources)[0]) => {
    console.log("Delete data source:", item.id)
  }

  const renderDashboards = () => (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sources</p>
                <p className="text-2xl font-bold text-gray-900">{mockDataSources.length}</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Connected</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockDataSources.filter((ds) => ds.status === "active").length}
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
                <p className="text-sm text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockDataSources.filter((ds) => ds.status === "warning").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">4.6M</p>
              </div>
              <Database className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and additional dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Data Volume Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Data volume trends chart would render here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Sync Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDataSources.map((source) => (
                <div key={source.id} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                  <div className="flex items-center gap-2">
                    {source.icon}
                    <span className="text-sm font-medium">{source.name}</span>
                  </div>
                  <Badge
                    className={
                      source.status === "active"
                        ? "bg-green-100 text-green-700"
                        : source.status === "warning"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }
                  >
                    {source.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderActivityLog = () => (
    <div className="p-6">
      <div className="space-y-3">
        {mockActivities.map((activity) => (
          <Card key={activity.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.target}</div>
                    <div className="text-xs text-gray-500 mt-1">by {activity.user}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{activity.timestamp}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="p-6">
      <div className="space-y-3">
        {mockTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-sm">{task.title}</h3>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Due: {task.dueDate}</span>
                    <span>Assigned to: {task.assignee}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderConfiguration = () => (
    <ConfigurationList
      items={mockDataSources}
      title="Data Sources"
      onItemSelect={handleItemSelect}
      onCreateNew={handleCreateNew}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchPlaceholder="Search data sources..."
    />
  )

  return (
    <>
      <ComponentLayout
        componentName="Data Sources"
        onCreateNew={handleCreateNew}
        taskCount={mockTasks.length}
        activityCount={mockActivities.length}
      >
        {{
          dashboards: renderDashboards(),
          activityLog: renderActivityLog(),
          tasks: renderTasks(),
          configuration: renderConfiguration(),
        }}
      </ComponentLayout>

      <DetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        item={selectedItem}
        onEdit={() => selectedItem && handleEdit(selectedItem)}
        onToggleStatus={() => console.log("Toggle status")}
        onDuplicate={() => console.log("Duplicate item")}
      >
        {selectedItem && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Connection Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Last Sync:</span>
                <span className="font-medium">{selectedItem.metadata?.lastSync}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Record Count:</span>
                <span className="font-medium">{selectedItem.metadata?.recordCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Data Volume:</span>
                <span className="font-medium">{selectedItem.metadata?.dataVolume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sync Frequency:</span>
                <span className="font-medium">{selectedItem.metadata?.syncFrequency}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </DetailsDrawer>
    </>
  )
}
