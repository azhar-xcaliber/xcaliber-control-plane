"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Play, Save, Share, FileText, Database, Bot, Zap } from "lucide-react"

export function PlaygroundApp() {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* App Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Code className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Playground</h1>
              <p className="text-sm text-gray-500">Interactive development and testing environment</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Tenant: Acme Corp
            </Badge>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Main Playground Interface */}
      <div className="flex-1 flex">
        {/* Left Panel - Tools */}
        <div className="w-80 border-r border-gray-200 bg-gray-50 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Available Tools</h3>
              <div className="space-y-2">
                <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">Data Query</div>
                      <div className="text-xs text-gray-500">Query healthcare data</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">Agent Builder</div>
                      <div className="text-xs text-gray-500">Create custom agents</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-sm">Workflow Designer</div>
                      <div className="text-xs text-gray-500">Design data workflows</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="font-medium text-sm">Report Generator</div>
                      <div className="text-xs text-gray-500">Generate custom reports</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="query" className="flex-1 flex flex-col">
            <div className="border-b border-gray-200 px-4">
              <TabsList>
                <TabsTrigger value="query">Data Query</TabsTrigger>
                <TabsTrigger value="agent">Agent Builder</TabsTrigger>
                <TabsTrigger value="workflow">Workflow Designer</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="query" className="flex-1 p-4">
              <div className="h-full flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Data Query Interface</h3>
                  <Button size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Execute Query
                  </Button>
                </div>
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-sm">Query Editor</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <textarea
                        className="w-full h-full min-h-[300px] p-3 border border-gray-300 rounded-md font-mono text-sm"
                        placeholder="SELECT * FROM patient_records WHERE..."
                      />
                    </CardContent>
                  </Card>
                  <Card className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-sm">Results</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="h-full bg-gray-50 rounded-md p-3 font-mono text-sm">
                        <div className="text-gray-500">Query results will appear here...</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="agent" className="flex-1 p-4">
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Agent Builder</h3>
                <p className="text-gray-600 mb-4">
                  Create and configure custom healthcare agents for your specific use cases.
                </p>
                <Button>Start Building Agent</Button>
              </div>
            </TabsContent>

            <TabsContent value="workflow" className="flex-1 p-4">
              <div className="text-center py-12">
                <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Workflow Designer</h3>
                <p className="text-gray-600 mb-4">
                  Design and test healthcare data workflows with visual drag-and-drop interface.
                </p>
                <Button>Open Designer</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
