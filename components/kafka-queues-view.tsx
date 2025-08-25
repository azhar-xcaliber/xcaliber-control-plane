"use client"
import { ComponentLayout } from "@/components/component-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, MessageSquare, TrendingUp, AlertTriangle } from "lucide-react"

const mockKafkaActivityData = [
  {
    id: "act_kafka_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    type: "warning" as const,
    action: "Consumer Lag Detected",
    description: "High consumer lag detected on patient-events topic",
    user: "system",
    metadata: { topic: "patient-events", lag: "15000 messages", consumer: "analytics-service" },
  },
  {
    id: "act_kafka_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 22),
    type: "success" as const,
    action: "Topic Created",
    description: "New Kafka topic created for radiology image metadata",
    user: "kafka.admin@hospital.com",
    metadata: { topic: "radiology-metadata", partitions: 6, replication: 3 },
  },
  {
    id: "act_kafka_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "info" as const,
    action: "Partition Rebalance",
    description: "Consumer group rebalanced for lab-results topic",
    user: "system",
    metadata: { topic: "lab-results", consumerGroup: "processing-group", duration: "2.3s" },
  },
]

const mockKafkaTasksData = [
  {
    id: "task_kafka_001",
    title: "Optimize Consumer Performance",
    description: "Investigate and resolve consumer lag issues on high-volume topics",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "kafka.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    tags: ["performance", "consumer-lag", "optimization"],
  },
  {
    id: "task_kafka_002",
    title: "Set Up Topic Monitoring",
    description: "Configure monitoring and alerting for critical Kafka topics",
    status: "pending" as const,
    priority: "medium" as const,
    assignee: "monitoring.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["monitoring", "alerting", "topics"],
  },
]

const mockKafkaConfigData = [
  {
    id: "config_kafka_001",
    name: "Default Retention Period",
    type: "string",
    value: "7 days",
    description: "Default message retention period for new topics",
    category: "Storage",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    modifiedBy: "kafka.admin@hospital.com",
    defaultValue: "3 days",
  },
  {
    id: "config_kafka_002",
    name: "Enable SSL",
    type: "boolean",
    value: true,
    description: "Enable SSL encryption for all Kafka communications",
    category: "Security",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "security@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_kafka_003",
    name: "Max Message Size",
    type: "string",
    value: "10MB",
    description: "Maximum message size allowed in Kafka topics",
    category: "Performance",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    modifiedBy: "kafka.admin@hospital.com",
    defaultValue: "1MB",
  },
]

export function KafkaQueuesView() {
  const handleRefresh = () => {
    console.log("Refreshing Kafka queues...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Topics</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Messages/sec</p>
                <p className="text-2xl font-bold text-green-600">1.2K</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Throughput</p>
                <p className="text-2xl font-bold text-blue-600">45MB/s</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lag</p>
                <p className="text-2xl font-bold text-yellow-600">234ms</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kafka Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Enterprise Kafka Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">Kafka message queue integration</div>
            <div className="text-sm text-gray-400">
              Configure and monitor Kafka topics for enterprise data streaming and messaging.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ComponentLayout
      title="Kafka Queues"
      description="Enterprise message queue integration and monitoring"
      dashboardContent={dashboardContent}
      onRefresh={handleRefresh}
      activityData={mockKafkaActivityData}
      tasksData={mockKafkaTasksData}
      configurationData={mockKafkaConfigData}
    >
      {dashboardContent}
    </ComponentLayout>
  )
}
