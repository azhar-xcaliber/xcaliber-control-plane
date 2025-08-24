"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Plus, Settings, CheckCircle, AlertTriangle, Users, TrendingUp } from "lucide-react"

const mockCrmSystems = [
  {
    id: "crm-001",
    name: "Salesforce Health Cloud",
    type: "Salesforce",
    status: "connected",
    lastSync: "2 minutes ago",
    records: "45,230",
    syncFrequency: "Real-time",
    description: "Patient relationship management and care coordination",
  },
  {
    id: "crm-002",
    name: "Microsoft Dynamics 365",
    type: "Dynamics 365",
    status: "connected",
    lastSync: "5 minutes ago",
    records: "23,890",
    syncFrequency: "Every 5 minutes",
    description: "Provider relationship and referral management",
  },
  {
    id: "crm-003",
    name: "HubSpot Healthcare",
    type: "HubSpot",
    status: "warning",
    lastSync: "1 hour ago",
    records: "12,450",
    syncFrequency: "Hourly",
    description: "Marketing automation and patient engagement",
  },
]

export function CrmSystemsView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-700"
      case "warning":
        return "bg-yellow-100 text-yellow-700"
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
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Building2 className="w-4 h-4" />
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">CRM Systems</h2>
            <p className="text-sm text-gray-500">Integrate with customer relationship management platforms</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add CRM Integration
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Connected CRMs</p>
                  <p className="text-2xl font-bold text-gray-900">{mockCrmSystems.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Records</p>
                  <p className="text-2xl font-bold text-green-600">81.6K</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sync Status</p>
                  <p className="text-2xl font-bold text-green-600">98.5%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Syncs</p>
                  <p className="text-2xl font-bold text-blue-600">2</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CRM Systems List */}
        <div className="space-y-4">
          {mockCrmSystems.map((crm) => (
            <Card key={crm.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{crm.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {crm.type}
                        </Badge>
                        <Badge className={getStatusColor(crm.status)}>
                          {getStatusIcon(crm.status)}
                          <span className="ml-1">{crm.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{crm.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Records:</span>
                          <span className="ml-2 font-medium">{crm.records}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Sync:</span>
                          <span className="ml-2 font-medium">{crm.lastSync}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Frequency:</span>
                          <span className="ml-2 font-medium">{crm.syncFrequency}</span>
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
