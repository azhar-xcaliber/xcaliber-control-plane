"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Search, Filter, BarChart3, Table, FileText, Download, Zap } from "lucide-react"
import type { Activity } from "@/types/activity"

interface DataStudioProps {
  onActivitySelect: (activity: Activity) => void
}

const mockDatasets = [
  {
    id: "ds_001",
    name: "Patient Demographics",
    type: "structured",
    size: "2.4GB",
    records: 125000,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 30),
    status: "active",
  },
  {
    id: "ds_002",
    name: "Clinical Notes",
    type: "unstructured",
    size: "8.1GB",
    records: 340000,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: "processing",
  },
  {
    id: "ds_003",
    name: "Lab Results",
    type: "structured",
    size: "1.8GB",
    records: 890000,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 15),
    status: "active",
  },
]

export function DataStudio({ onActivitySelect }: DataStudioProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDataset, setSelectedDataset] = useState(mockDatasets[0])

  const filteredDatasets = mockDatasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "processing":
        return "bg-blue-100 text-blue-700"
      case "error":
        return "bg-red-100 text-red-700"
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
            <h2 className="text-xl font-semibold text-gray-900">Data Studio</h2>
            <Badge variant="outline" className="text-sm">
              {filteredDatasets.length} datasets
            </Badge>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search datasets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {filteredDatasets.map((dataset) => (
              <Card
                key={dataset.id}
                className={`cursor-pointer transition-colors ${
                  selectedDataset.id === dataset.id ? "ring-2 ring-blue-500" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedDataset(dataset)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">{dataset.name}</h3>
                    <Badge className={getStatusColor(dataset.status)}>{dataset.status}</Badge>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="capitalize">{dataset.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{dataset.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Records:</span>
                      <span>{dataset.records.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Updated:</span>
                      <span>{dataset.lastUpdated.toLocaleTimeString()}</span>
                    </div>
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
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{selectedDataset.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedDataset.records.toLocaleString()} records • {selectedDataset.size} • {selectedDataset.type}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Zap className="w-4 h-4 mr-2" />
                Transform
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="preview" className="h-full">
            <div className="border-b border-gray-200 px-6">
              <TabsList>
                <TabsTrigger value="preview">Data Preview</TabsTrigger>
                <TabsTrigger value="schema">Schema</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="quality">Quality</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="preview" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Table className="w-5 h-5" />
                    Data Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Table className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-500 mb-4">Dataset preview</div>
                    <div className="text-sm text-gray-400">
                      Sample data and records from {selectedDataset.name} will be displayed here.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schema" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Schema Definition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-500 mb-4">Dataset schema</div>
                    <div className="text-sm text-gray-400">
                      Column definitions, data types, and constraints for {selectedDataset.name}.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Data Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-500 mb-4">Statistical analysis</div>
                    <div className="text-sm text-gray-400">
                      Statistical summaries, distributions, and insights for {selectedDataset.name}.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quality" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Data Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-500 mb-4">Quality assessment</div>
                    <div className="text-sm text-gray-400">
                      Data quality metrics, completeness, and validation results for {selectedDataset.name}.
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
