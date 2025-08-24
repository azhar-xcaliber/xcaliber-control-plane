"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Activity, CheckSquare, Settings } from "lucide-react"

interface ComponentLayoutProps {
  componentName: string
  children: {
    dashboards?: React.ReactNode
    activityLog?: React.ReactNode
    tasks?: React.ReactNode
    configuration?: React.ReactNode
  }
  taskCount?: number
  activityCount?: number
}

export function ComponentLayout({ componentName, children, taskCount = 0, activityCount = 0 }: ComponentLayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboards")

  return (
    <div className="flex-1 flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-auto grid-cols-4">
              <TabsTrigger value="dashboards" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboards
              </TabsTrigger>
              <TabsTrigger value="activity-log" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Activity Log
                {activityCount > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {activityCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                Tasks
                {taskCount > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {taskCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="configuration" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configuration
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="dashboards" className="h-full m-0">
            {children.dashboards || (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{componentName} Dashboards</h3>
                  <p className="text-gray-600">Component-specific dashboards and metrics will appear here.</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity-log" className="h-full m-0">
            {children.activityLog || (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{componentName} Activity Log</h3>
                  <p className="text-gray-600">
                    Component-specific activity logs for the selected tenant will appear here.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tasks" className="h-full m-0">
            {children.tasks || (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{componentName} Tasks</h3>
                  <p className="text-gray-600">Operations, alerts, and actionable tasks will appear here.</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="configuration" className="h-full m-0">
            {children.configuration || (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{componentName} Configuration</h3>
                  <p className="text-gray-600">Component settings and configuration options will appear here.</p>
                </div>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
