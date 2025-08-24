"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Plus,
  Settings,
  CheckCircle,
  AlertTriangle,
  Activity,
  Database,
  BarChart3,
  Shield,
} from "lucide-react"

const mockHdfComponents = [
  {
    id: "hdf-001",
    name: "Clinical Data Warehouse",
    type: "Data Repository",
    status: "operational",
    dataVolume: "2.4TB",
    lastUpdate: "5 minutes ago",
    description: "Centralized repository for clinical and patient data",
  },
  {
    id: "hdf-002",
    name: "FHIR Data Processor",
    type: "Data Processor",
    status: "operational",
    dataVolume: "890GB",
    lastUpdate: "2 minutes ago",
    description: "FHIR standard data processing and transformation engine",
  },
  {
    id: "hdf-003",
    name: "Analytics Engine",
    type: "Analytics",
    status: "processing",
    dataVolume: "1.2TB",
    lastUpdate: "1 minute ago",
    description: "Healthcare analytics and reporting engine",
  },
  {
    id: "hdf-004",
    name: "Compliance Monitor",
    type: "Compliance",
    status: "monitoring",
    dataVolume: "156GB",
    lastUpdate: "3 minutes ago",
    description: "HIPAA and healthcare compliance monitoring system",
  },
]

export function HdfView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-700"
      case "processing":
        return "bg-blue-100 text-blue-700"
      case "monitoring":
        return "bg-purple-100 text-purple-700"
      case "warning":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4" />
      case "processing":
        return <Activity className="w-4 h-4" />
      case "monitoring":
        return <Shield className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getComponentIcon = (type: string) => {
    switch (type) {
      case "Data Repository":
        return <Database className="w-5 h-5 text-blue-600" />
      case "Data Processor":
        return <Activity className="w-5 h-5 text-green-600" />
      case "Analytics":
        return <BarChart3 className="w-5 h-5 text-purple-600" />
      case "Compliance":
        return <Shield className="w-5 h-5 text-orange-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Healthcare Data Factory (HDF)</h2>
            <p className="text-sm text-gray-500">Healthcare-specific data processing and analytics platform</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Component
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">HDF Components</p>
                  <p className="text-2xl font-bold text-gray-900">{mockHdfComponents.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Data Volume</p>
                  <p className="text-2xl font-bold text-green-600">4.6TB</p>
                </div>
                <Database className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Processing Jobs</p>
                  <p className="text-2xl font-bold text-blue-600">23</p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Compliance Score</p>
                  <p className="text-2xl font-bold text-green-600">98.5%</p>
                </div>
                <Shield className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* HDF Components List */}
        <div className="space-y-4">
          {mockHdfComponents.map((component) => (
            <Card key={component.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-gray-100 rounded-lg">{getComponentIcon(component.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{component.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {component.type}
                        </Badge>
                        <Badge className={getStatusColor(component.status)}>
                          {getStatusIcon(component.status)}
                          <span className="ml-1">{component.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Data Volume:</span>
                          <span className="ml-2 font-medium">{component.dataVolume}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Update:</span>
                          <span className="ml-2 font-medium">{component.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
