"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Plus, Settings, CheckCircle, AlertTriangle, Activity, Key, Shield, Database } from "lucide-react"

const mockAccessPoints = [
  {
    id: "ap-001",
    name: "Patient Data API",
    type: "REST API",
    status: "active",
    requests: "12.4K/day",
    latency: "89ms",
    description: "Secure API for patient demographic and clinical data access",
  },
  {
    id: "ap-002",
    name: "Clinical Analytics Query",
    type: "GraphQL",
    status: "active",
    requests: "3.2K/day",
    latency: "156ms",
    description: "Flexible query interface for clinical analytics and reporting",
  },
  {
    id: "ap-003",
    name: "FHIR Resource Server",
    type: "FHIR API",
    status: "active",
    requests: "8.9K/day",
    latency: "67ms",
    description: "HL7 FHIR compliant resource server for interoperability",
  },
  {
    id: "ap-004",
    name: "Bulk Data Export",
    type: "Batch API",
    status: "maintenance",
    requests: "45/day",
    latency: "2.3s",
    description: "Bulk data export service for research and analytics",
  },
]

export function DataAccessView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "maintenance":
        return "bg-yellow-100 text-yellow-700"
      case "inactive":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />
      case "inactive":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getAccessIcon = (type: string) => {
    switch (type) {
      case "REST API":
        return <Code className="w-5 h-5 text-blue-600" />
      case "GraphQL":
        return <Database className="w-5 h-5 text-purple-600" />
      case "FHIR API":
        return <Shield className="w-5 h-5 text-green-600" />
      case "Batch API":
        return <Activity className="w-5 h-5 text-orange-600" />
      default:
        return <Code className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Data Access</h2>
            <p className="text-sm text-gray-500">Manage secure data access points and API endpoints</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Access Point
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Access Points</p>
                  <p className="text-2xl font-bold text-gray-900">{mockAccessPoints.length}</p>
                </div>
                <Code className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Daily Requests</p>
                  <p className="text-2xl font-bold text-green-600">24.6K</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Latency</p>
                  <p className="text-2xl font-bold text-blue-600">98ms</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Security Score</p>
                  <p className="text-2xl font-bold text-green-600">99.2%</p>
                </div>
                <Shield className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Access Points List */}
        <div className="space-y-4">
          {mockAccessPoints.map((accessPoint) => (
            <Card key={accessPoint.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-gray-100 rounded-lg">{getAccessIcon(accessPoint.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{accessPoint.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {accessPoint.type}
                        </Badge>
                        <Badge className={getStatusColor(accessPoint.status)}>
                          {getStatusIcon(accessPoint.status)}
                          <span className="ml-1">{accessPoint.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{accessPoint.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Requests:</span>
                          <span className="ml-2 font-medium">{accessPoint.requests}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Avg Latency:</span>
                          <span className="ml-2 font-medium">{accessPoint.latency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Key className="w-4 h-4" />
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
      </div>
    </div>
  )
}
