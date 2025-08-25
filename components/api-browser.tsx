"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Code, Globe, Database, Play, Copy, BookOpen } from "lucide-react"

const mockEndpoints = [
  {
    id: "ep_001",
    method: "GET",
    path: "/api/v1/patients",
    description: "Retrieve patient list with optional filtering",
    version: "v1",
    status: "active",
    responseTime: "45ms",
    tags: ["patients", "fhir"],
  },
  {
    id: "ep_002",
    method: "POST",
    path: "/api/v1/patients",
    description: "Create a new patient record",
    version: "v1",
    status: "active",
    responseTime: "120ms",
    tags: ["patients", "fhir", "create"],
  },
  {
    id: "ep_003",
    method: "GET",
    path: "/api/v1/observations",
    description: "Retrieve clinical observations and lab results",
    version: "v1",
    status: "active",
    responseTime: "67ms",
    tags: ["observations", "lab", "fhir"],
  },
  {
    id: "ep_004",
    method: "PUT",
    path: "/api/v1/appointments/{id}",
    description: "Update appointment information",
    version: "v1",
    status: "deprecated",
    responseTime: "89ms",
    tags: ["appointments", "schedule"],
  },
]

export function ApiBrowser() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMethod, setSelectedMethod] = useState("all")
  const [selectedEndpoint, setSelectedEndpoint] = useState(mockEndpoints[0])

  const filteredEndpoints = mockEndpoints.filter((endpoint) => {
    const matchesSearch =
      endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesMethod = selectedMethod === "all" || endpoint.method === selectedMethod

    return matchesSearch && matchesMethod
  })

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-green-100 text-green-700"
      case "POST":
        return "bg-blue-100 text-blue-700"
      case "PUT":
        return "bg-orange-100 text-orange-700"
      case "DELETE":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "deprecated":
        return "bg-yellow-100 text-yellow-700"
      case "beta":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="flex-1 flex">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">API Browser</h2>
            <Badge variant="outline" className="text-sm">
              {filteredEndpoints.length} endpoints
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search endpoints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              {["all", "GET", "POST", "PUT", "DELETE"].map((method) => (
                <Button
                  key={method}
                  variant={selectedMethod === method ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMethod(method)}
                >
                  {method === "all" ? "All" : method}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {filteredEndpoints.map((endpoint) => (
              <Card
                key={endpoint.id}
                className={`cursor-pointer transition-colors ${
                  selectedEndpoint.id === endpoint.id ? "ring-2 ring-blue-500" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedEndpoint(endpoint)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                      <Badge className={getStatusColor(endpoint.status)}>{endpoint.status}</Badge>
                    </div>
                    <span className="text-xs text-gray-500">{endpoint.responseTime}</span>
                  </div>

                  <div className="font-mono text-sm font-medium text-gray-900 mb-2">{endpoint.path}</div>

                  <p className="text-xs text-gray-600 mb-2">{endpoint.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {endpoint.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className={getMethodColor(selectedEndpoint.method)}>{selectedEndpoint.method}</Badge>
              <span className="font-mono text-lg font-medium">{selectedEndpoint.path}</span>
              <Badge className={getStatusColor(selectedEndpoint.status)}>{selectedEndpoint.status}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy cURL
              </Button>
              <Button size="sm">
                <Play className="w-4 h-4 mr-2" />
                Try It
              </Button>
            </div>
          </div>

          <p className="text-gray-600 mt-2">{selectedEndpoint.description}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="documentation" className="h-full">
            <div className="border-b border-gray-200 px-6">
              <TabsList>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="documentation" className="p-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Endpoint Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Method:</span>
                        <span className="ml-2">{selectedEndpoint.method}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Version:</span>
                        <span className="ml-2">{selectedEndpoint.version}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Status:</span>
                        <span className="ml-2">{selectedEndpoint.status}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Avg Response Time:</span>
                        <span className="ml-2">{selectedEndpoint.responseTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{selectedEndpoint.description}</p>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEndpoint.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="parameters" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Parameters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-500 mb-4">Parameter documentation</div>
                    <div className="text-sm text-gray-400">
                      Detailed parameter specifications and validation rules will be displayed here.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="response" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Schema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-500 mb-4">Response schema and examples</div>
                    <div className="text-sm text-gray-400">
                      Response format, status codes, and example payloads will be displayed here.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-500 mb-4">Usage examples</div>
                    <div className="text-sm text-gray-400">
                      Code examples in various programming languages will be displayed here.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
