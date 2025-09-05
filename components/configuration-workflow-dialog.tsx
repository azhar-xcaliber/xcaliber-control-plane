"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Workflow,
  Database,
  Shield,
  Users,
  Zap,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Save,
  Eye,
  Filter,
  Merge,
  FileText,
  Brain,
  Lock,
  Unlock,
} from "lucide-react"

interface WorkflowNode {
  id: string
  type: "source" | "bronze" | "silver" | "gold" | "process"
  name: string
  description: string
  status: "active" | "inactive" | "processing" | "error"
  position: { x: number; y: number }
  inputs?: string[]
  outputs?: string[]
  config?: Record<string, any>
}

interface WorkflowEdge {
  id: string
  source: string
  target: string
  label?: string
}

interface DataModelConfig {
  id: string
  name: string
  description: string
  features: {
    deIdentification: boolean
    empiMatching: boolean
    dataQuality: boolean
    harmonization: boolean
    enrichment: boolean
    realTimeProcessing: boolean
    historicalData: boolean
    alerting: boolean
  }
  workflow: {
    nodes: WorkflowNode[]
    edges: WorkflowEdge[]
  }
  settings: {
    batchSize: number
    processingInterval: string
    retentionPeriod: string
    qualityThreshold: number
  }
}

interface ConfigurationWorkflowDialogProps {
  isOpen: boolean
  onClose: () => void
  dataModel: any
}

const mockDataModelConfig: DataModelConfig = {
  id: "dm_patient_360",
  name: "Patient 360 View",
  description: "Comprehensive patient data model with full clinical history and demographics",
  features: {
    deIdentification: true,
    empiMatching: true,
    dataQuality: true,
    harmonization: true,
    enrichment: false,
    realTimeProcessing: true,
    historicalData: true,
    alerting: false,
  },
  workflow: {
    nodes: [
      // Data Sources (Bronze Layer)
      {
        id: "source_epic",
        type: "source",
        name: "Epic EHR",
        description: "Patient records from Epic system",
        status: "active",
        position: { x: 50, y: 100 },
        outputs: ["bronze_epic"],
      },
      {
        id: "source_athena",
        type: "source",
        name: "Athena PM",
        description: "Practice management data",
        status: "active",
        position: { x: 50, y: 200 },
        outputs: ["bronze_athena"],
      },
      {
        id: "source_labs",
        type: "source",
        name: "Lab Systems",
        description: "Laboratory results and reports",
        status: "active",
        position: { x: 50, y: 300 },
        outputs: ["bronze_labs"],
      },

      // Bronze Layer (Raw Data Ingestion)
      {
        id: "bronze_epic",
        type: "bronze",
        name: "Bronze - Epic Raw",
        description: "Raw Epic data ingestion",
        status: "processing",
        position: { x: 250, y: 100 },
        inputs: ["source_epic"],
        outputs: ["process_validation"],
      },
      {
        id: "bronze_athena",
        type: "bronze",
        name: "Bronze - Athena Raw",
        description: "Raw Athena data ingestion",
        status: "active",
        position: { x: 250, y: 200 },
        inputs: ["source_athena"],
        outputs: ["process_validation"],
      },
      {
        id: "bronze_labs",
        type: "bronze",
        name: "Bronze - Lab Raw",
        description: "Raw lab data ingestion",
        status: "active",
        position: { x: 250, y: 300 },
        inputs: ["source_labs"],
        outputs: ["process_validation"],
      },

      // Processing Layer
      {
        id: "process_validation",
        type: "process",
        name: "Data Validation",
        description: "Schema validation and data quality checks",
        status: "active",
        position: { x: 450, y: 150 },
        inputs: ["bronze_epic", "bronze_athena", "bronze_labs"],
        outputs: ["process_deidentify"],
      },
      {
        id: "process_deidentify",
        type: "process",
        name: "De-identification",
        description: "Remove or mask PHI/PII data",
        status: "active",
        position: { x: 450, y: 250 },
        inputs: ["process_validation"],
        outputs: ["silver_clean"],
      },

      // Silver Layer (Cleaned & Processed)
      {
        id: "silver_clean",
        type: "silver",
        name: "Silver - Clean Data",
        description: "Validated and de-identified data",
        status: "active",
        position: { x: 650, y: 150 },
        inputs: ["process_deidentify"],
        outputs: ["process_empi", "process_harmonize"],
      },
      {
        id: "process_empi",
        type: "process",
        name: "EMPI Matching",
        description: "Enterprise Master Patient Index matching",
        status: "active",
        position: { x: 650, y: 250 },
        inputs: ["silver_clean"],
        outputs: ["process_harmonize"],
      },
      {
        id: "process_harmonize",
        type: "process",
        name: "Data Harmonization",
        description: "Standardize formats and terminologies",
        status: "active",
        position: { x: 850, y: 200 },
        inputs: ["silver_clean", "process_empi"],
        outputs: ["gold_patient360"],
      },

      // Gold Layer (Analytics Ready)
      {
        id: "gold_patient360",
        type: "gold",
        name: "Gold - Patient 360",
        description: "Complete patient view ready for analytics",
        status: "active",
        position: { x: 1050, y: 200 },
        inputs: ["process_harmonize"],
        outputs: [],
      },
    ],
    edges: [
      { id: "e1", source: "source_epic", target: "bronze_epic" },
      { id: "e2", source: "source_athena", target: "bronze_athena" },
      { id: "e3", source: "source_labs", target: "bronze_labs" },
      { id: "e4", source: "bronze_epic", target: "process_validation" },
      { id: "e5", source: "bronze_athena", target: "process_validation" },
      { id: "e6", source: "bronze_labs", target: "process_validation" },
      { id: "e7", source: "process_validation", target: "process_deidentify" },
      { id: "e8", source: "process_deidentify", target: "silver_clean" },
      { id: "e9", source: "silver_clean", target: "process_empi" },
      { id: "e10", source: "silver_clean", target: "process_harmonize" },
      { id: "e11", source: "process_empi", target: "process_harmonize" },
      { id: "e12", source: "process_harmonize", target: "gold_patient360" },
    ],
  },
  settings: {
    batchSize: 1000,
    processingInterval: "15m",
    retentionPeriod: "7y",
    qualityThreshold: 95,
  },
}

export function ConfigurationWorkflowDialog({ isOpen, onClose, dataModel }: ConfigurationWorkflowDialogProps) {
  const [config, setConfig] = useState<DataModelConfig>(mockDataModelConfig)
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleFeatureToggle = (feature: keyof typeof config.features) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature],
      },
    }))
  }

  const handleSettingChange = (setting: keyof typeof config.settings, value: any) => {
    setConfig((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: value,
      },
    }))
  }

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "source":
        return <Database className="w-4 h-4" />
      case "bronze":
        return <FileText className="w-4 h-4" />
      case "silver":
        return <Filter className="w-4 h-4" />
      case "gold":
        return <Zap className="w-4 h-4" />
      case "process":
        return <Settings className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  const getNodeColor = (type: string) => {
    switch (type) {
      case "source":
        return "bg-gray-100 border-gray-300 text-gray-700"
      case "bronze":
        return "bg-amber-100 border-amber-300 text-amber-700"
      case "silver":
        return "bg-slate-100 border-slate-300 text-slate-700"
      case "gold":
        return "bg-yellow-100 border-yellow-300 text-yellow-700"
      case "process":
        return "bg-blue-100 border-blue-300 text-blue-700"
      default:
        return "bg-gray-100 border-gray-300 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-3 h-3 text-green-500" />
      case "processing":
        return <Play className="w-3 h-3 text-blue-500 animate-pulse" />
      case "inactive":
        return <Pause className="w-3 h-3 text-gray-500" />
      case "error":
        return <AlertTriangle className="w-3 h-3 text-red-500" />
      default:
        return <CheckCircle className="w-3 h-3 text-green-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Workflow className="w-5 h-5" />
            {config.name} - Configuration & Workflow
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="configuration" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="configuration" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="workflow" className="flex items-center gap-2">
              <Workflow className="w-4 h-4" />
              Workflow Editor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configuration" className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Feature Toggles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Feature Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        De-identification
                      </Label>
                      <p className="text-sm text-gray-500">Remove or mask PHI/PII data</p>
                    </div>
                    <Switch
                      checked={config.features.deIdentification}
                      onCheckedChange={() => handleFeatureToggle("deIdentification")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        EMPI Matching
                      </Label>
                      <p className="text-sm text-gray-500">Enterprise Master Patient Index</p>
                    </div>
                    <Switch
                      checked={config.features.empiMatching}
                      onCheckedChange={() => handleFeatureToggle("empiMatching")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Data Quality
                      </Label>
                      <p className="text-sm text-gray-500">Automated quality checks and validation</p>
                    </div>
                    <Switch
                      checked={config.features.dataQuality}
                      onCheckedChange={() => handleFeatureToggle("dataQuality")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Merge className="w-4 h-4" />
                        Harmonization
                      </Label>
                      <p className="text-sm text-gray-500">Standardize formats and terminologies</p>
                    </div>
                    <Switch
                      checked={config.features.harmonization}
                      onCheckedChange={() => handleFeatureToggle("harmonization")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Data Enrichment
                      </Label>
                      <p className="text-sm text-gray-500">Enhance data with external sources</p>
                    </div>
                    <Switch
                      checked={config.features.enrichment}
                      onCheckedChange={() => handleFeatureToggle("enrichment")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Real-time Processing
                      </Label>
                      <p className="text-sm text-gray-500">Process data in real-time streams</p>
                    </div>
                    <Switch
                      checked={config.features.realTimeProcessing}
                      onCheckedChange={() => handleFeatureToggle("realTimeProcessing")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Historical Data
                      </Label>
                      <p className="text-sm text-gray-500">Include historical data processing</p>
                    </div>
                    <Switch
                      checked={config.features.historicalData}
                      onCheckedChange={() => handleFeatureToggle("historicalData")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Alerting
                      </Label>
                      <p className="text-sm text-gray-500">Enable data quality and processing alerts</p>
                    </div>
                    <Switch
                      checked={config.features.alerting}
                      onCheckedChange={() => handleFeatureToggle("alerting")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Processing Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="batchSize">Batch Size</Label>
                    <Input
                      id="batchSize"
                      type="number"
                      value={config.settings.batchSize}
                      onChange={(e) => handleSettingChange("batchSize", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="processingInterval">Processing Interval</Label>
                    <Input
                      id="processingInterval"
                      value={config.settings.processingInterval}
                      onChange={(e) => handleSettingChange("processingInterval", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="retentionPeriod">Data Retention Period</Label>
                    <Input
                      id="retentionPeriod"
                      value={config.settings.retentionPeriod}
                      onChange={(e) => handleSettingChange("retentionPeriod", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="qualityThreshold">Quality Threshold (%)</Label>
                    <Input
                      id="qualityThreshold"
                      type="number"
                      min="0"
                      max="100"
                      value={config.settings.qualityThreshold}
                      onChange={(e) => handleSettingChange("qualityThreshold", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="workflow" className="flex-1 flex">
            {/* Workflow Canvas */}
            <div className="flex-1 relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
              {/* Medallion Layer Labels */}
              <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                <Badge className="bg-amber-100 text-amber-700 border-amber-300">Bronze Layer</Badge>
                <Badge className="bg-slate-100 text-slate-700 border-slate-300">Silver Layer</Badge>
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Gold Layer</Badge>
              </div>

              {/* Workflow Visualization */}
              <div className="absolute inset-0 p-8 pt-16 overflow-auto">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Render edges */}
                  {config.workflow.edges.map((edge) => {
                    const sourceNode = config.workflow.nodes.find((n) => n.id === edge.source)
                    const targetNode = config.workflow.nodes.find((n) => n.id === edge.target)
                    if (!sourceNode || !targetNode) return null

                    const x1 = sourceNode.position.x + 120
                    const y1 = sourceNode.position.y + 40
                    const x2 = targetNode.position.x
                    const y2 = targetNode.position.y + 40

                    return (
                      <g key={edge.id}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#94a3b8"
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                      </g>
                    )
                  })}

                  {/* Arrow marker definition */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                    </marker>
                  </defs>
                </svg>

                {/* Render nodes */}
                {config.workflow.nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute w-32 h-20 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getNodeColor(
                      node.type,
                    )} ${selectedNode?.id === node.id ? "ring-2 ring-blue-500" : ""}`}
                    style={{
                      left: node.position.x,
                      top: node.position.y,
                    }}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className="p-2 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        {getNodeIcon(node.type)}
                        {getStatusIcon(node.status)}
                      </div>
                      <div>
                        <div className="text-xs font-medium truncate">{node.name}</div>
                        <div className="text-xs opacity-75 truncate">{node.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Workflow Controls */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Button size="sm" variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Run Workflow
                </Button>
                <Button size="sm" variant="outline">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Edit Mode Toggle */}
              <div className="absolute top-4 right-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2"
                >
                  {isEditing ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  {isEditing ? "Lock" : "Edit"}
                </Button>
              </div>
            </div>

            {/* Node Details Panel */}
            {selectedNode && (
              <div className="w-80 border-l border-gray-200 bg-white p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-2">
                    {getNodeIcon(selectedNode.type)}
                    {selectedNode.name}
                  </h3>
                  <Badge className={getNodeColor(selectedNode.type)}>{selectedNode.type}</Badge>
                </div>

                <p className="text-sm text-gray-600">{selectedNode.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Status:</span>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(selectedNode.status)}
                      <span className="text-sm capitalize">{selectedNode.status}</span>
                    </div>
                  </div>

                  {selectedNode.inputs && selectedNode.inputs.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Inputs:</span>
                      <div className="mt-1 space-y-1">
                        {selectedNode.inputs.map((input, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {input}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNode.outputs && selectedNode.outputs.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Outputs:</span>
                      <div className="mt-1 space-y-1">
                        {selectedNode.outputs.map((output, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {output}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Node Configuration</h4>

                  {selectedNode.type === "process" && (
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="processingMode">Processing Mode</Label>
                        <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm">
                          <option>Batch</option>
                          <option>Stream</option>
                          <option>Hybrid</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="parallelism">Parallelism</Label>
                        <Input id="parallelism" type="number" defaultValue="4" className="text-sm" />
                      </div>
                    </div>
                  )}

                  {selectedNode.type === "bronze" && (
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="compressionType">Compression</Label>
                        <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm">
                          <option>GZIP</option>
                          <option>SNAPPY</option>
                          <option>LZ4</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="partitioning">Partitioning</Label>
                        <Input id="partitioning" defaultValue="date" className="text-sm" />
                      </div>
                    </div>
                  )}

                  {(selectedNode.type === "silver" || selectedNode.type === "gold") && (
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="indexing">Indexing Strategy</Label>
                        <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm">
                          <option>Clustered</option>
                          <option>Non-clustered</option>
                          <option>Columnstore</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="caching">Caching</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
