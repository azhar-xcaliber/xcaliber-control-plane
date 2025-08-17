"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Plus, Settings, Play, Pause, Activity, CheckCircle, AlertTriangle } from "lucide-react"

const agents = [
  {
    id: "agent-001",
    name: "Data Quality Checker",
    description: "Monitors data quality across all pipelines",
    status: "active",
    lastActivity: "2 minutes ago",
    tasksCompleted: 1247,
    successRate: 98.5,
  },
  {
    id: "agent-002",
    name: "Performance Monitor",
    description: "Tracks system performance and alerts on issues",
    status: "active",
    lastActivity: "5 minutes ago",
    tasksCompleted: 892,
    successRate: 99.2,
  },
  {
    id: "agent-003",
    name: "Security Auditor",
    description: "Performs security checks and compliance monitoring",
    status: "paused",
    lastActivity: "1 hour ago",
    tasksCompleted: 456,
    successRate: 97.8,
  },
]

const recentTasks = [
  {
    id: "task-001",
    agent: "Data Quality Checker",
    task: "Validate customer data schema",
    status: "completed",
    duration: "1.2s",
    timestamp: "2 minutes ago",
  },
  {
    id: "task-002",
    agent: "Performance Monitor",
    task: "Check API response times",
    status: "completed",
    duration: "0.8s",
    timestamp: "5 minutes ago",
  },
  {
    id: "task-003",
    agent: "Data Quality Checker",
    task: "Scan for duplicate records",
    status: "running",
    duration: "Running...",
    timestamp: "8 minutes ago",
  },
]

export function AgentxView() {
  return (
    <div className="p-6 space-y-6">
      {/* Agent Overview */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Agent Management</h2>
          <p className="text-gray-600">Monitor and manage your autonomous agents</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Deploy Agent
        </Button>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{agent.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        agent.status === "active" ? "text-green-700 border-green-300" : "text-gray-700 border-gray-300"
                      }
                    >
                      {agent.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Activity</span>
                  <span className="font-medium">{agent.lastActivity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tasks Completed</span>
                  <span className="font-medium">{agent.tasksCompleted.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Success Rate</span>
                  <span className="font-medium">{agent.successRate}%</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  {agent.status === "active" ? (
                    <>
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Activity className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Agent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {task.status === "completed" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : task.status === "running" ? (
                      <Activity className="w-4 h-4 text-blue-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{task.task}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{task.agent}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{task.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">{task.duration}</span>
                  <Badge
                    className={
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "running"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
