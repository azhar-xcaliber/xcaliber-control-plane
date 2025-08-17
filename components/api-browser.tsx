"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Save, Copy, Globe, Clock, CheckCircle, AlertCircle, Plus, Folder, FileText } from 'lucide-react'

const mockCollections = [
  {
    id: "auth",
    name: "Authentication",
    requests: [
      { id: "login", name: "User Login", method: "POST", url: "/api/v1/auth/login" },
      { id: "refresh", name: "Refresh Token", method: "POST", url: "/api/v1/auth/refresh" },
    ]
  },
  {
    id: "workflows",
    name: "Workflows",
    requests: [
      { id: "list-workflows", name: "List Workflows", method: "GET", url: "/api/v1/workflows" },
      { id: "create-workflow", name: "Create Workflow", method: "POST", url: "/api/v1/workflows" },
      { id: "execute-workflow", name: "Execute Workflow", method: "POST", url: "/api/v1/workflows/{id}/execute" },
    ]
  },
  {
    id: "data",
    name: "Data Models",
    requests: [
      { id: "list-models", name: "List Data Models", method: "GET", url: "/api/v1/data/models" },
      { id: "query-data", name: "Query Data", method: "POST", url: "/api/v1/data/query" },
    ]
  }
]

const mockResponse = {
  status: 200,
  statusText: "OK",
  headers: {
    "Content-Type": "application/json",
    "X-Response-Time": "89ms",
    "X-Request-ID": "req_123456789"
  },
  data: {
    success: true,
    data: {
      workflows: [
        {
          id: "wf_001",
          name: "Customer Data Processing",
          status: "active",
          created_at: "2024-01-15T10:30:00Z"
        },
        {
          id: "wf_002", 
          name: "Real-time Analytics",
          status: "running",
          created_at: "2024-01-15T09:15:00Z"
        }
      ]
    },
    meta: {
      total: 2,
      page: 1,
      per_page: 10
    }
  }
}

export function ApiBrowser() {
  const [selectedMethod, setSelectedMethod] = useState("GET")
  const [url, setUrl] = useState("/api/v1/workflows")
  const [requestBody, setRequestBody] = useState("")
  const [response, setResponse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)

  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"]

  const handleSendRequest = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResponse(mockResponse)
      setIsLoading(false)
    }, 1000)
  }

  const handleSelectRequest = (collectionId: string, requestId: string) => {
    const collection = mockCollections.find(c => c.id === collectionId)
    const request = collection?.requests.find(r => r.id === requestId)
    if (request) {
      setSelectedMethod(request.method)
      setUrl(request.url)
      setSelectedCollection(collectionId)
      setSelectedRequest(requestId)
    }
  }

  return (
    <div className="flex-1 flex">
      {/* Sidebar - Collections */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Collections</h2>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              New
            </Button>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {mockCollections.map((collection) => (
            <div key={collection.id} className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Folder className="w-4 h-4" />
                {collection.name}
              </div>
              <div className="ml-6 space-y-1">
                {collection.requests.map((request) => (
                  <button
                    key={request.id}
                    onClick={() => handleSelectRequest(collection.id, request.id)}
                    className={`w-full text-left p-2 rounded text-sm hover:bg-gray-100 flex items-center gap-2 ${
                      selectedCollection === collection.id && selectedRequest === request.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600"
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <Badge variant="outline" className="text-xs">
                      {request.method}
                    </Badge>
                    <span className="truncate">{request.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 space-y-6">
          {/* Request Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                API Request Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* URL Bar */}
              <div className="flex gap-2">
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium"
                >
                  {methods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter API endpoint URL"
                  className="flex-1"
                />
                <Button onClick={handleSendRequest} disabled={isLoading}>
                  {isLoading ? (
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  Send
                </Button>
              </div>

              {/* Request Details */}
              <Tabs defaultValue="body" className="w-full">
                <TabsList>
                  <TabsTrigger value="body">Body</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="params">Params</TabsTrigger>
                </TabsList>
                
                <TabsContent value="body" className="space-y-2">
                  <textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    placeholder="Enter request body (JSON)"
                    className="w-full h-32 p-3 border border-gray-300 rounded-md text-sm font-mono"
                  />
                </TabsContent>
                
                <TabsContent value="headers" className="space-y-2">
                  <div className="text-sm text-gray-500">
                    Headers configuration would go here
                  </div>
                </TabsContent>
                
                <TabsContent value="params" className="space-y-2">
                  <div className="text-sm text-gray-500">
                    Query parameters configuration would go here
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Response */}
          {response && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {response.status < 400 ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    Response
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={response.status < 400 ? "default" : "destructive"}>
                      {response.status} {response.statusText}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="response" className="w-full">
                  <TabsList>
                    <TabsTrigger value="response">Response</TabsTrigger>
                    <TabsTrigger value="headers">Headers</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="response">
                    <pre className="bg-gray-50 p-4 rounded-md text-sm font-mono overflow-auto max-h-96">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </TabsContent>
                  
                  <TabsContent value="headers">
                    <div className="space-y-2">
                      {Object.entries(response.headers).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700">{key}</span>
                          <span className="text-gray-600">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
