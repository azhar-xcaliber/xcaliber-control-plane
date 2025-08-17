"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, Play, Pause, Settings, Plus, Search, Activity, CheckCircle, AlertTriangle, Clock, MessageSquare } from 'lucide-react'
import type { Activity } from "@/types/activity"

interface AgentsStudioProps {
  onActivitySelect: (activity: Activity) => void
}

const mockAgentInteractions = [
  {
    id: "int_001",
    agent_id: "agent_001",
    agent_name: "Data Quality Checker",
    interaction_type: "validation",
    status: "completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    duration: 1240,
    input: "customer_data_batch_001",
    output: "validation_report_001",
    result: "success",
    details: "Validated 15,420 records with 0 errors found"
  },
  {
    id: "int_002",
    agent_id: "agent_002", 
    agent_name: "Performance Monitor",
    interaction_type: "monitoring",
    status: "running",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    duration: null,
    input: "system_metrics_stream",
    output: "performance_alerts",
    result: "in_progress",
    details: "Monitoring API response times and system health"
  },
  {
    id: "int_003",
    agent_id: "agent_003",
    agent_name: "Security Auditor", 
    interaction_type: "audit",
    status: "completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    duration: 3420,
    input: "access_logs_batch",
    output: "security_report_003",
    result: "warning",
    details: "Found 3 suspicious access patterns requiring review"
  },
  {
    id: "int_004",
    agent_id: "agent_001",
    agent_name: "Data Quality Checker",
    interaction_type: "validation",
    status: "failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    duration: 890,
    input: "product_data_batch_002",
    output: "validation_error_004",
    result: "error",
    details: "Validation failed: 45 records with schema violations"
  }
]

const mockAgents = [
  {
    id: "agent_001",
    name: "Data Quality Checker",
    type: "Validation Agent",
    status: "active",
    interactions_today: 23,
    success_rate: 98.5,
    avg_response_time: "1.2s",
    description: "Validates data quality and schema compliance"
  },
  {
    id: "agent_002",
    name: "Performance Monitor", 
    type: "Monitoring Agent",
    status: "active",
    interactions_today: 156,
    success_rate: 99.2,
    avg_response_time: "0.8s",
    description: "Monitors system performance and generates alerts"
  },
  {
    id: "agent_003",
    name: "Security Auditor",
    type: "Security Agent", 
    status: "paused",
    interactions_today: 8,
    success_rate: 97.8,
    avg_response_time: "2.1s",
    description: "Performs security audits and compliance checks"
  }
]

export function AgentsStudio({ onActivitySelect }: AgentsStudioProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"interactions" | "agents">("interactions")

  const filteredInteractions = mockAgentInteractions.filter(interaction =>
    interaction.agent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.interaction_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interaction.details.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAgents = mockAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "running":
        return "bg-blue-100 text-blue-700"
      case "failed":
        return "bg-red-100 text-red-700"
      case "active":
        return "bg-green-100 text-green-700"
      case "paused":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "running":
        return <Activity className="w-4 h-4" />
      case "failed":
        return <AlertTriangle className="w-4 h-4" />
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "paused":
        return <Pause className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleInteractionSelect = (interaction: any) => {
    const activity: Activity = {
      id: interaction.id,
      type: "agent-interaction",
      name: `${interaction.agent_name} - ${interaction.interaction_type}`,
      status: interaction.status === "completed" ? "success" : interaction.status === "failed" ? "failed" : "running",
      timestamp: interaction.timestamp,
      duration: interaction.duration,
      tenant: "Current Tenant",
      metadata: {
        agent: interaction.agent_name,
        interactionType: interaction.interaction_type,
        input: interaction.input,
        output: interaction.output,
        result: interaction.result,
        details: interaction.details
      }
    }
    onActivitySelect(activity)
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header and Controls */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Agent Studio</h2>
            <p className="text-sm text-gray-500">Manage agent interactions and configurations</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setViewMode(viewMode === "interactions" ? "agents" : "interactions")}>
              {viewMode === "interactions" ? "View Agents" : "View Interactions"}
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Agent
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={`Search ${viewMode}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Agents</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockAgents.filter(a => a.status === "active").length}
                  </p>
                </div>
                <Bot className="w-8 h-8 text-blue-500" />
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
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-green-600">
                    {(mockAgents.reduce((acc, a) => acc + a.success_rate, 0) / mockAgents.length).toFixed(1)}%
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
                  <p className="text-sm text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold text-gray-900">1.4s</p>
                </div>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === "interactions" ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Agent Interactions</h3>
            {filteredInteractions.map((interaction) => (
              <Card 
                key={interaction.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleInteractionSelect(interaction)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Bot className="w-5 h-5 text-orange-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{interaction.agent_name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {interaction.interaction_type}
                          </Badge>
                          <Badge className={getStatusColor(interaction.status)}>
                            {getStatusIcon(interaction.status)}
                            <span className="ml-1">{interaction.status}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{interaction.details}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <span className="ml-2 font-medium">
                              {interaction.duration ? `${interaction.duration}ms` : "Running..."}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Input:</span>
                            <span className="ml-2 font-medium truncate">{interaction.input}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Output:</span>
                            <span className="ml-2 font-medium truncate">{interaction.output}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Time:</span>
                            <span className="ml-2 font-medium">{interaction.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Agent Configurations</h3>
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Bot className="w-5 h-5 text-orange-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {agent.type}
                          </Badge>
                          <Badge className={getStatusColor(agent.status)}>
                            {getStatusIcon(agent.status)}
                            <span className="ml-1">{agent.status}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Interactions Today:</span>
                            <span className="ml-2 font-medium">{agent.interactions_today}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Success Rate:</span>
                            <span className="ml-2 font-medium text-green-600">{agent.success_rate}%</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Avg Response:</span>
                            <span className="ml-2 font-medium">{agent.avg_response_time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        {agent.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
