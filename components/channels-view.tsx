"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Plus,
  Settings,
  CheckCircle,
  AlertTriangle,
  Activity,
  MessageSquare,
  Smartphone,
  Monitor,
} from "lucide-react"

const mockChannels = [
  {
    id: "ch-001",
    name: "Patient Portal",
    type: "Web Portal",
    status: "active",
    users: "12,450",
    dailyInteractions: "3,200",
    description: "Patient-facing web portal for appointments and health records",
  },
  {
    id: "ch-002",
    name: "Mobile Health App",
    type: "Mobile App",
    status: "active",
    users: "8,900",
    dailyInteractions: "5,600",
    description: "iOS and Android mobile application for patient engagement",
  },
  {
    id: "ch-003",
    name: "Provider Dashboard",
    type: "Clinical Portal",
    status: "active",
    users: "1,200",
    dailyInteractions: "4,800",
    description: "Healthcare provider interface for clinical workflows",
  },
  {
    id: "ch-004",
    name: "Telehealth Platform",
    type: "Video Conferencing",
    status: "maintenance",
    users: "2,100",
    dailyInteractions: "450",
    description: "Virtual consultation and telehealth services",
  },
]

export function ChannelsView() {
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

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "Web Portal":
        return <Monitor className="w-5 h-5 text-blue-600" />
      case "Mobile App":
        return <Smartphone className="w-5 h-5 text-green-600" />
      case "Clinical Portal":
        return <MessageSquare className="w-5 h-5 text-purple-600" />
      case "Video Conferencing":
        return <Globe className="w-5 h-5 text-orange-600" />
      default:
        return <Globe className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Channels</h2>
            <p className="text-sm text-gray-500">Manage patient and provider interaction channels</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Channel
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Channels</p>
                  <p className="text-2xl font-bold text-gray-900">{mockChannels.length}</p>
                </div>
                <Globe className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">24.7K</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Daily Interactions</p>
                  <p className="text-2xl font-bold text-blue-600">14.1K</p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Uptime</p>
                  <p className="text-2xl font-bold text-green-600">99.8%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Channels List */}
        <div className="space-y-4">
          {mockChannels.map((channel) => (
            <Card key={channel.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-gray-100 rounded-lg">{getChannelIcon(channel.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {channel.type}
                        </Badge>
                        <Badge className={getStatusColor(channel.status)}>
                          {getStatusIcon(channel.status)}
                          <span className="ml-1">{channel.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{channel.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Active Users:</span>
                          <span className="ml-2 font-medium">{channel.users}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Daily Interactions:</span>
                          <span className="ml-2 font-medium">{channel.dailyInteractions}</span>
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
