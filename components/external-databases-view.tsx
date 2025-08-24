"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Database, Plus, Settings, CheckCircle, AlertTriangle, HardDrive, Activity } from "lucide-react"

const mockDatabases = [
  {
    id: "db-001",
    name: "Oracle Clinical Database",
    type: "Oracle",
    status: "connected",
    lastSync: "1 minute ago",
    tables: 45,
    dataSize: "890GB",
    description: "Primary clinical data repository",
  },
  {
    id: "db-002",
    name: "PostgreSQL Analytics DB",
    type: "PostgreSQL",
    status: "connected",
    lastSync: "3 minutes ago",
    tables: 23,
    dataSize: "234GB",
    description: "Analytics and reporting database",
  },
  {
    id: "db-003",
    name: "MongoDB Document Store",
    type: "MongoDB",
    status: "syncing",
    lastSync: "5 minutes ago",
    tables: 12,
    dataSize: "156GB",
    description: "Unstructured clinical documents and notes",
  },
  {
    id: "db-004",
    name: "MySQL Legacy System",
    type: "MySQL",
    status: "error",
    lastSync: "2 hours ago",
    tables: 67,
    dataSize: "445GB",
    description: "Legacy patient management system",
  },
]

export function ExternalDatabasesView() {
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
        return <Activity className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Database className="w-4 h-4" />
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">External Databases</h2>
            <p className="text-sm text-gray-500">Connect to external database systems and applications</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Database
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Connected DBs</p>
                  <p className="text-2xl font-bold text-gray-900">{mockDatabases.length}</p>
                </div>
                <Database className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Data Size</p>
                  <p className="text-2xl font-bold text-green-600">1.7TB</p>
                </div>
                <HardDrive className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tables</p>
                  <p className="text-2xl font-bold text-blue-600">147</p>
                </div>
                <Database className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Health Score</p>
                  <p className="text-2xl font-bold text-green-600">92%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Databases List */}
        <div className="space-y-4">
          {mockDatabases.map((db) => (
            <Card key={db.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Database className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{db.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {db.type}
                        </Badge>
                        <Badge className={getStatusColor(db.status)}>
                          {getStatusIcon(db.status)}
                          <span className="ml-1">{db.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{db.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Tables:</span>
                          <span className="ml-2 font-medium">{db.tables}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Data Size:</span>
                          <span className="ml-2 font-medium">{db.dataSize}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Sync:</span>
                          <span className="ml-2 font-medium">{db.lastSync}</span>
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
