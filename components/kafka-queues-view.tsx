"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Plus, Settings, CheckCircle, AlertTriangle, TrendingUp, Database } from "lucide-react"

const mockKafkaQueues = [
  {
    id: "kafka-001",
    name: "patient-data-stream",
    topic: "healthcare.patients.updates",
    status: "active",
    messagesPerSec: "1,247",
    consumers: 3,
    partitions: 6,
    description: "Real-time patient data updates and changes",
  },
  {
    id: "kafka-002",
    name: "clinical-events",
    topic: "healthcare.clinical.events",
    status: "active",
    messagesPerSec: "892",
    consumers: 2,
    partitions: 4,
    description: "Clinical events and procedure notifications",
  },
  {
    id: "kafka-003",
    name: "lab-results-queue",
    topic: "healthcare.lab.results",
    status: "warning",
    messagesPerSec: "456",
    consumers: 1,
    partitions: 3,
    description: "Laboratory test results and diagnostic data",
  },
]

export function KafkaQueuesView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
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
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Kafka Queues</h2>
            <p className="text-sm text-gray-500">Manage real-time data streaming and message queues</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Queue
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Queues</p>
                  <p className="text-2xl font-bold text-gray-900">{mockKafkaQueues.length}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Messages/Sec</p>
                  <p className="text-2xl font-bold text-green-600">2.6K</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Consumers</p>
                  <p className="text-2xl font-bold text-blue-600">6</p>
                </div>
                <Database className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Partitions</p>
                  <p className="text-2xl font-bold text-gray-900">13</p>
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kafka Queues List */}
        <div className="space-y-4">
          {mockKafkaQueues.map((queue) => (
            <Card key={queue.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Activity className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{queue.name}</h3>
                        <Badge className={getStatusColor(queue.status)}>
                          {getStatusIcon(queue.status)}
                          <span className="ml-1">{queue.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{queue.description}</p>
                      <div className="text-xs text-gray-500 mb-3">Topic: {queue.topic}</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Messages/Sec:</span>
                          <span className="ml-2 font-medium">{queue.messagesPerSec}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Consumers:</span>
                          <span className="ml-2 font-medium">{queue.consumers}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Partitions:</span>
                          <span className="ml-2 font-medium">{queue.partitions}</span>
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
