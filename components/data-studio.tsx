"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Database, Plus, Search, Eye, Edit, Activity, CheckCircle, AlertTriangle, FileText, Table, BarChart3 } from 'lucide-react'
import type { Activity } from "@/types/activity"

interface DataStudioProps {
  onActivitySelect: (activity: Activity) => void
}

const mockDataModels = [
  {
    id: "model_001",
    name: "Customer Profile",
    type: "Entity Model",
    status: "active",
    last_updated: new Date(Date.now() - 1000 * 60 * 30),
    records: 125000,
    schema_version: "v2.1",
    description: "Customer demographic and profile information",
    fields: 23,
    relationships: 5
  },
  {
    id: "model_002",
    name: "Transaction Data",
    type: "Event Model", 
    status: "active",
    last_updated: new Date(Date.now() - 1000 * 60 * 15),
    records: 2500000,
    schema_version: "v1.8",
    description: "Financial transaction records and metadata",
    fields: 18,
    relationships: 3
  },
  {
    id: "model_003",
    name: "Product Catalog",
    type: "Reference Model",
    status: "updating",
    last_updated: new Date(Date.now() - 1000 * 60 * 5),
    records: 45000,
    schema_version: "v3.0",
    description: "Product information and catalog data",
    fields: 31,
    relationships: 8
  },
  {
    id: "model_004",
    name: "Analytics Metrics",
    type: "Aggregation Model",
    status: "error",
    last_updated: new Date(Date.now() - 1000 * 60 * 60),
    records: 0,
    schema_version: "v1.2",
    description: "Pre-computed analytics and KPI metrics",
    fields: 15,
    relationships: 2
  }
]

const mockDataActivities = [
  {
    id: "data_001",
    model_id: "model_001",
    model_name: "Customer Profile",
    activity_type: "schema_update",
    status: "completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    duration: 2340,
    details: "Added new field 'preferred_contact_method' to schema",
    records_affected: 125000
  },
  {
    id: "data_002",
    model_id: "model_002",
    model_name: "Transaction Data",
    activity_type: "data_ingestion",
    status: "running",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    duration: null,
    details: "Ingesting real-time transaction data from payment gateway",
    records_affected: 8934
  },
  {
    id: "data_003",
    model_id: "model_004",
    model_name: "Analytics Metrics",
    activity_type: "validation_error",
    status: "failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    duration: 1200,
    details: "Data validation failed: 15 records with invalid metric calculations",
    records_affected: 15
  }
]

export function DataStudio({ onActivitySelect }: DataStudioProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"models" | "activities">("models")
  const [selectedModel, setSelectedModel] = useState<string | null>(null)

  const filteredModels = mockDataModels.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredActivities = mockDataActivities.filter(activity =>
    activity.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.activity_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.details.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "updating":
        return "bg-blue-100 text-blue-700"
      case "error":
        return "bg-red-100 text-red-700"
      case "completed":
        return "bg-green-100 text-green-700"
      case "running":
        return "bg-blue-100 text-blue-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "updating":
        return <Activity className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "running":
        return <Activity className="w-4 h-4" />
      case "failed":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Database className="w-4 h-4" />
    }
  }

  const handleDataActivitySelect = (activity: any) => {
    const activityData: Activity = {
      id: activity.id,
      type: "data-model",
      name: `${activity.model_name} - ${activity.activity_type}`,
      status: activity.status === "completed" ? "success" : activity.status === "failed" ? "failed" : "running",
      timestamp: activity.timestamp,
      duration: activity.duration,
      tenant: "Current Tenant",
      metadata: {
        modelName: activity.model_name,
        activityType: activity.activity_type,
        recordsAffected: activity.records_affected,
        details: activity.details
      }
    }
    onActivitySelect(activityData)
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header and Controls */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Data Studio</h2>
            <p className="text-sm text-gray-500">Manage data models and monitor data activities</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setViewMode(viewMode === "models" ? "activities" : "models")}>
              {viewMode === "models" ? "View Activities" : "View Models"}
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Model
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
                  <p className="text-sm text-gray-600">Data Models</p>
                  <p className="text-2xl font-bold text-gray-900">{mockDataModels.length}</p>
                </div>
                <Database className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Records</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {mockDataModels.reduce((acc, m) => acc + m.records, 0).toLocaleString()}
                  </p>
                </div>
                <Table className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Models</p>
                  <p className="text-2xl font-bold text-green-600">
                    {mockDataModels.filter(m => m.status === "active").length}
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
                  <p className="text-sm text-gray-600">Recent Activities</p>
                  <p className="text-2xl font-bold text-gray-900">{mockDataActivities.length}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === "models" ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Data Models</h3>
            {filteredModels.map((model) => (
              <Card key={model.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Database className="w-5 h-5 text-green-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{model.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {model.type}
                          </Badge>
                          <Badge className={getStatusColor(model.status)}>
                            {getStatusIcon(model.status)}
                            <span className="ml-1">{model.status}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{model.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Records:</span>
                            <span className="ml-2 font-medium">{model.records.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Fields:</span>
                            <span className="ml-2 font-medium">{model.fields}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Version:</span>
                            <span className="ml-2 font-medium">{model.schema_version}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Updated:</span>
                            <span className="ml-2 font-medium">{model.last_updated.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Data Activities</h3>
            {filteredActivities.map((activity) => (
              <Card 
                key={activity.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleDataActivitySelect(activity)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{activity.model_name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {activity.activity_type.replace("_", " ")}
                          </Badge>
                          <Badge className={getStatusColor(activity.status)}>
                            {getStatusIcon(activity.status)}
                            <span className="ml-1">{activity.status}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{activity.details}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <span className="ml-2 font-medium">
                              {activity.duration ? `${activity.duration}ms` : "Running..."}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Records Affected:</span>
                            <span className="ml-2 font-medium">{activity.records_affected.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Time:</span>
                            <span className="ml-2 font-medium">{activity.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
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
