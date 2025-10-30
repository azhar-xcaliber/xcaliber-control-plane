export interface Activity {
  id: number
  event_id: string
  service_name: string
  api_type: string
  method: string
  request_id: string
  url: string
  process_id: number
  cache_hit: boolean
  cache_age?: string
  status_code: string
  timestamp: string
  created_at: string
  response_time: number
  request_payload?: string
  request_headers?: string
  response_payload?: string
  request_params?: string
  source_id: string
  tenant_id: string
  workspace_id: string
  attributes?: Record<string, any>
  trace_id: string
  span_id: string
  parent_span_id: string
}
