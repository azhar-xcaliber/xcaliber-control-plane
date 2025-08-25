"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, BarChart3, Activity, CheckSquare, Settings } from "lucide-react"
import { ActivityLog } from "@/components/activity-log"
import { TasksPanel } from "@/components/tasks-panel"
import { ConfigurationPanel } from "@/components/configuration-panel"

interface ComponentLayoutProps {
  title: string
  description: string
  children?: React.ReactNode
  dashboardContent?: React.ReactNode
  configurationContent?: React.ReactNode
  onRefresh?: () => void
  activityData?: any[]
  tasksData?: any[]
  configurationData?: any[]
}

export function ComponentLayout({
  title,
  description,
  children,
  dashboardContent,
  configurationContent,
  onRefresh,
  activityData = [],
  tasksData = [],
  configurationData = [],
}: ComponentLayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "activity", label: "Activity Log", icon: Activity },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "configuration", label: "Configuration", icon: Settings },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return dashboardContent || children
      case "activity":
        return <ActivityLog activities={activityData} componentName={title} />
      case "tasks":
        return <TasksPanel tasks={tasksData} componentName={title} />
      case "configuration":
        return configurationContent || <ConfigurationPanel configurations={configurationData} componentName={title} />
      default:
        return dashboardContent || children
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Component Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            {onRefresh && (
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.id === "tasks" && tasksData.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {tasksData.length}
                  </Badge>
                )}
                {tab.id === "activity" && activityData.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {activityData.length}
                  </Badge>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">{renderTabContent()}</div>
    </div>
  )
}
