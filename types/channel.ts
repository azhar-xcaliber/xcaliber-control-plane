export interface DataChannel {
  id: string
  name: string
  description: string
  version: string
  status: "PENDING" | "INACTIVE" | "MODIFYING" | "ACTIVE" | "DELETED" | "ERROR"
  syncStatus: "PENDING" | "MODIFYING" | "SYNCED" | "FAILED"
  createdBy: string
  createdAt: string
  updatedAt: string
  entityVersion?: number
  dataChannelListeners?: DataChannelListener[]
  throughput?: {
    messagesPerSecond: number
    bytesPerSecond: number
    peakThroughput: number
  }
  consumers?: Array<{
    id: string
    name: string
    status: string
    lag: number
    throughput: number
  }>
  partitions?: number
  retentionPeriod?: string
  compressionType?: string
  schema?: {
    version: string
    fields: Array<{
      name: string
      type: string
      required: boolean
    }>
  }
  metrics?: {
    totalMessages: number
    errorRate: number
    avgLatency: number
    availability: number
  }
}

export interface DataPipeline {
  id: string
  createdAt: string
  createdBy: string
  status: "PENDING" | "INACTIVE" | "MODIFYING" | "ACTIVE" | "DELETED" | "ERROR"
  modifiedAt: string
  modifyBy: string
  syncStatus: "PENDING" | "MODIFYING" | "SYNCED" | "FAILED"
  entityVersion: number
  name: string
  description: string
  states: string[]
  stages: string[]
}

export interface DataChannelListener {
  id: string
  createdAt: string
  createdBy: string
  status: "PENDING" | "INACTIVE" | "MODIFYING" | "ACTIVE" | "DELETED" | "ERROR"
  modifiedAt: string
  modifyBy: string
  syncStatus: "PENDING" | "MODIFYING" | "SYNCED" | "FAILED"
  entityVersion: number
  dataChannelName: string
  dataSourceId: string
  accountId: string
  tenantId: string
  namespaceId: string
  dataPipeline: DataPipeline
}

export interface ChannelRequest {
  name: string
  description: string
  version: string
  status: string
  syncStatus: string
}

export interface ChannelResponse extends ChannelRequest {
  id: string
  createdBy: string
  createdAt: string
  updatedAt: string
}
