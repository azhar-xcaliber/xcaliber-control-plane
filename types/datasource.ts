export interface DataSource {
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
  version: number
  templateName: string
  lifeCycleStage: "DRAFT" | "READY" | "LIVE" | "PAUSED" | "STOPPED" | "ARCHIVED" | "DELETED"
  type: "EPIC" | "ATHENA" | "POINT_CLICK_CARE" | "ELATION" | "ECW"
  protocol: "HL7" | "JSON_RPC" | "FHIR" | "CCDA"
  accountId: string
  tenantId: string
  podId: string
  pipelines: Pipeline[]
  connectors: Connector[]
  formats: Format[]
  catalog: CatalogEntry[]
  channels: string[]
}

export interface Pipeline {
  id: string
  createdAt: string
  createdBy: string
  status: "PENDING" | "INACTIVE" | "MODIFYING" | "ACTIVE" | "DELETED" | "ERROR"
  modifiedAt: string
  modifyBy: string
  syncStatus: "PENDING" | "MODIFYING" | "SYNCED" | "FAILED"
  entityVersion: number
  name: string
  type: string
  defaultState: boolean
  defaultBatchSize: string
  recurring: boolean
  cronExpression: string
  connector: string
  delimiter: string
  format: string
}

export interface Connector {
  name: string
  description: string
  displayName: string
  version: number
  enabled: boolean
  paradigms: {
    pullSupported: boolean
    pushSupported: boolean
  }
  type: string
  auth: {
    method: string
    sensitiveFields: string[]
  }
  secrets: ConnectorConfig[]
  config: ConnectorConfig[]
}

export interface ConnectorConfig {
  key?: string
  required?: boolean
  sensitive?: boolean
  description?: string
  value?: string
  autoScaling?: {
    minReplicas: number
    maxReplicas: number
  }
  resources?: {
    limits: {
      cpu: string
      memory: string
    }
    requests: {
      cpu: string
      memory: string
    }
  }
}

export interface Format {
  name: string
  schema: Record<string, any>
  type: string
  delimiter: string
}

export interface CatalogEntry {
  resource: string
  syncInterval: string
  enabled: boolean
}

export interface DataSourceTemplate {
  name: string
  displayName: string
  description: string
  type: string
  channels: string[]
  connectors: Connector[]
  formats: Format[]
  pipelines: Omit<
    Pipeline,
    "id" | "createdAt" | "createdBy" | "status" | "modifiedAt" | "modifyBy" | "syncStatus" | "entityVersion"
  >[]
  catalog: CatalogEntry[]
}

export interface Catalogue {
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
  type: "DATA_SOURCE" | "DATA_PRODUCT" | "Agent" | "MCP" | "API"
}
