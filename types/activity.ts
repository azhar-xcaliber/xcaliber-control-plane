export interface Activity {
  id: string
  type: string
  name: string
  status: "success" | "failed" | "running" | "pending"
  timestamp: Date
  duration: number | null
  tenant: string
  metadata?: {
    source?: string
    destination?: string
    recordsProcessed?: number
    error?: string
    endpoint?: string
    method?: string
    responseCode?: number
    agent?: string
    tablesChecked?: number
    issuesFound?: number
    [key: string]: any
  }
}
