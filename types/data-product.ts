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

export interface DataProduct {
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
  displayName: string
  templateName: string
  lifeCycleStage: "DRAFT" | "READY" | "LIVE" | "PAUSED" | "STOPPED" | "ARCHIVED" | "DELETED"
  dataChannels: string[]
  dataSourceIds: string[]
  dataChannelListeners: DataChannelListener[]
  version: number
  namespaceId: string
  tenantId: string
}

export interface DataProductQualityMetric {
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
  displayName: string
  type: string
  query: string
  cron: string
}
