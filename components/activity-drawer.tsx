"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Copy, ExternalLink, CheckCircle, AlertTriangle, Clock, Zap } from "lucide-react"
import type { Activity } from "@/types/activity"

interface ActivityDrawerProps {
  activity: Activity | null
  isOpen: boolean
  onClose: () => void
}

export function ActivityDrawer({ activity, isOpen, onClose }: ActivityDrawerProps) {
  if (!isOpen || !activity) return null

  const getStatusIcon = (statusCode: string) => {
    const code = Number.parseInt(statusCode)
    if (code >= 200 && code < 300) {
      return <CheckCircle className="w-5 h-5 text-green-600" />
    } else if (code >= 400 && code < 500) {
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    } else if (code >= 500) {
      return <AlertTriangle className="w-5 h-5 text-red-600" />
    }
    return <Clock className="w-5 h-5 text-gray-500" />
  }

  const getStatusColor = (statusCode: string) => {
    const code = Number.parseInt(statusCode)
    if (code >= 200 && code < 300) {
      return "bg-green-100 text-green-800 border-green-200"
    } else if (code >= 400 && code < 500) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    } else if (code >= 500) {
      return "bg-red-100 text-red-800 border-red-200"
    }
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  const handleCopyId = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatJson = (jsonString?: string) => {
    if (!jsonString) return "N/A"
    try {
      return JSON.stringify(JSON.parse(jsonString), null, 2)
    } catch {
      return jsonString
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 z-40 flex justify-end">
      <div className="bg-white w-[700px] h-full flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Activity Details</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge className={getStatusColor(activity.status_code)}>
              {getStatusIcon(activity.status_code)}
              <span className="ml-1">{activity.status_code}</span>
            </Badge>
            <Badge variant="outline">{activity.api_type}</Badge>
            <Badge variant="outline">{activity.method}</Badge>
            {activity.cache_hit && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Cached {activity.cache_age && `(${activity.cache_age})`}
              </Badge>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{activity.event_id}</h3>
            <p className="text-sm text-gray-600">{activity.service_name}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="h-full">
            <div className="border-b border-gray-200 px-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="request">Request</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="trace">Trace</TabsTrigger>
                <TabsTrigger value="attributes">Attributes</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-6 space-y-6">
              {/* Request Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Request Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Request ID</div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono">{activity.request_id}</code>
                        <Button variant="ghost" size="sm" onClick={() => handleCopyId(activity.request_id)}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Process ID</div>
                      <div className="font-medium">{activity.process_id}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">URL</div>
                    <div className="font-mono text-sm break-all">{activity.url}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Timing Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Timing Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Timestamp</div>
                      <div className="font-medium">{new Date(activity.timestamp).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Response Time</div>
                      <div className="font-medium">{activity.response_time}ms</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Created At</div>
                      <div className="font-medium">{new Date(activity.created_at).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Cache Hit</div>
                      <div className="font-medium">{activity.cache_hit ? "Yes" : "No"}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Context Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Context</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Source ID</div>
                      <div className="font-mono text-xs">{activity.source_id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tenant ID</div>
                      <div className="font-mono text-xs">{activity.tenant_id}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Workspace ID</div>
                    <div className="font-mono text-xs">{activity.workspace_id}</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="request" className="p-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activity.request_params && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Parameters</div>
                      <code className="block text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto">
                        {activity.request_params}
                      </code>
                    </div>
                  )}
                  {activity.request_headers && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Headers</div>
                      <code className="block text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto">
                        {activity.request_headers}
                      </code>
                    </div>
                  )}
                  {activity.request_payload && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Payload</div>
                      <code className="block text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto whitespace-pre">
                        {formatJson(activity.request_payload)}
                      </code>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="response" className="p-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Response Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Status Code</div>
                    <Badge className={getStatusColor(activity.status_code)}>{activity.status_code}</Badge>
                  </div>
                  {activity.response_payload && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Payload</div>
                      <code className="block text-xs bg-gray-50 p-3 rounded border border-gray-200 overflow-x-auto whitespace-pre">
                        {formatJson(activity.response_payload)}
                      </code>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trace" className="p-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    OpenTelemetry Trace
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Trace ID</div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono">{activity.trace_id}</code>
                      <Button variant="ghost" size="sm" onClick={() => handleCopyId(activity.trace_id)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Span ID</div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono">{activity.span_id}</code>
                      <Button variant="ghost" size="sm" onClick={() => handleCopyId(activity.span_id)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Parent Span ID</div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono">{activity.parent_span_id}</code>
                      <Button variant="ghost" size="sm" onClick={() => handleCopyId(activity.parent_span_id)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attributes" className="p-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Additional Attributes</CardTitle>
                </CardHeader>
                <CardContent>
                  {activity.attributes && Object.keys(activity.attributes).length > 0 ? (
                    <div className="space-y-2">
                      {Object.entries(activity.attributes).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="text-sm font-medium text-gray-700">{key}</span>
                          <span className="text-sm text-gray-600">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">No additional attributes</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              View in Trace Explorer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
