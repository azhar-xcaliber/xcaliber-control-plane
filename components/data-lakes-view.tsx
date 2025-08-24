"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Plus, Settings, CheckCircle, AlertTriangle, HardDrive, TrendingUp } from "lucide-react"

const mockDataLakes = [
  {
    id: "dl-001",
    name: "Snowflake Healthcare Warehouse",
    type: "Snowflake",
    status: "connected",
    dataVolume: "2.4TB",
    dailyIngestion: "45GB",
    tables: 156,
    description: "Primary data warehouse for healthcare analytics and reporting",
  },
  {
    id: "dl-002",
    name: "Databricks ML Platform",
    type: "Databricks",
    status: "connected",
    dataVolume: "1.8TB",
    dailyIngestion: "32GB",
    tables: 89,
    description: "Machine learning and advanced analytics platform",
  },
  {
    id: "dl-003",
    name: "AWS S3 Data Lake",
    type: "AWS S3",
    status: "syncing",
    dataVolume: "5.2TB",
    dailyIngestion: "78GB",
    tables: 234,
    description: "Raw data storage and archival system",
  },
]

export function DataLakesView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-700"
      case "syncing":
        return "bg-blue-100 text-blue-700"
      case "error":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4" />
      case "syncing":
        return <TrendingUp className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Database className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    return <Database className="w-5 h-5 text-blue-600" />
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Data Lakes</h2>
            <p className="text-sm text-gray-500">Manage connections to Snowflake, Databricks, and other data lakes</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Data Lake
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Connected Lakes</p>
                  <p className="text-2xl font-bold text-gray-900">{mockDataLakes.length}</p>
                </div>
                <Database className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Data Volume</p>
                  <p className="text-2xl font-bold text-green-600">9.4TB</p>
                </div>
                <HardDrive className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Daily Ingestion</p>
                  <p className="text-2xl font-bold text-blue-600">155GB</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tables</p>
                  <p className="text-2xl font-bold text-gray-900">479</p>
                </div>
                <Database className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Lakes List */}
        <div className="space-y-4">
          {mockDataLakes.map((lake) => (
            <Card key={lake.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-blue-100 rounded-lg">{getTypeIcon(lake.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{lake.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {lake.type}
                        </Badge>
                        <Badge className={getStatusColor(lake.status)}>
                          {getStatusIcon(lake.status)}
                          <span className="ml-1">{lake.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{lake.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Data Volume:</span>
                          <span className="ml-2 font-medium">{lake.dataVolume}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Daily Ingestion:</span>
                          <span className="ml-2 font-medium">{lake.dailyIngestion}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Tables:</span>
                          <span className="ml-2 font-medium">{lake.tables}</span>
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
