"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus } from "lucide-react"

interface DetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  type: "datasource" | "channel" | "dataproduct"
  item?: any
}

export function DetailsDrawer({ isOpen, onClose, type, item }: DetailsDrawerProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    displayName: "",
    description: "",
    type: "",
    protocol: "",
    templateName: "",
    version: "1",
    podId: "",
    tenantId: "",
    status: "PENDING",
    syncStatus: "PENDING",
    lifeCycleStage: "DRAFT",
  })

  if (!isOpen) return null

  const handleCreateNew = () => {
    setIsCreating(true)
    setFormData({
      name: "",
      displayName: "",
      description: "",
      type: "",
      protocol: "",
      templateName: "",
      version: "1",
      podId: "",
      tenantId: "",
      status: "PENDING",
      syncStatus: "PENDING",
      lifeCycleStage: "DRAFT",
    })
  }

  const handleSubmit = () => {
    console.log("Creating new data source:", formData)
    // API call would go here
    setIsCreating(false)
    onClose()
  }

  const handleCancel = () => {
    setIsCreating(false)
    if (!item) {
      onClose()
    }
  }

  const renderDataSourceForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., athena-ehr-prod"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="displayName">
            Display Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="displayName"
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            placeholder="e.g., Athena EHR Production"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe this data source..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">
            Type <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EPIC">EPIC</SelectItem>
              <SelectItem value="ATHENA">ATHENA</SelectItem>
              <SelectItem value="POINT_CLICK_CARE">POINT CLICK CARE</SelectItem>
              <SelectItem value="ELATION">ELATION</SelectItem>
              <SelectItem value="ECW">ECW</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="protocol">
            Protocol <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.protocol} onValueChange={(value) => setFormData({ ...formData, protocol: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select protocol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HL7">HL7</SelectItem>
              <SelectItem value="JSON_RPC">JSON RPC</SelectItem>
              <SelectItem value="FHIR">FHIR</SelectItem>
              <SelectItem value="CCDA">CCDA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="templateName">
            Template Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="templateName"
            value={formData.templateName}
            onChange={(e) => setFormData({ ...formData, templateName: e.target.value })}
            placeholder="e.g., athena-v2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="version">
            Version <span className="text-red-500">*</span>
          </Label>
          <Input
            id="version"
            type="number"
            value={formData.version}
            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
            placeholder="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="podId">
            Pod ID <span className="text-red-500">*</span>
          </Label>
          <Input
            id="podId"
            value={formData.podId}
            onChange={(e) => setFormData({ ...formData, podId: e.target.value })}
            placeholder="e.g., prod-east"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenantId">
            Tenant ID <span className="text-red-500">*</span>
          </Label>
          <Input
            id="tenantId"
            value={formData.tenantId}
            onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
            placeholder="e.g., tenant-001"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">PENDING</SelectItem>
              <SelectItem value="INACTIVE">INACTIVE</SelectItem>
              <SelectItem value="MODIFYING">MODIFYING</SelectItem>
              <SelectItem value="ACTIVE">ACTIVE</SelectItem>
              <SelectItem value="DELETED">DELETED</SelectItem>
              <SelectItem value="ERROR">ERROR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="syncStatus">Sync Status</Label>
          <Select
            value={formData.syncStatus}
            onValueChange={(value) => setFormData({ ...formData, syncStatus: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PENDING">PENDING</SelectItem>
              <SelectItem value="MODIFYING">MODIFYING</SelectItem>
              <SelectItem value="SYNCED">SYNCED</SelectItem>
              <SelectItem value="FAILED">FAILED</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lifeCycleStage">Lifecycle Stage</Label>
          <Select
            value={formData.lifeCycleStage}
            onValueChange={(value) => setFormData({ ...formData, lifeCycleStage: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">DRAFT</SelectItem>
              <SelectItem value="READY">READY</SelectItem>
              <SelectItem value="LIVE">LIVE</SelectItem>
              <SelectItem value="PAUSED">PAUSED</SelectItem>
              <SelectItem value="STOPPED">STOPPED</SelectItem>
              <SelectItem value="ARCHIVED">ARCHIVED</SelectItem>
              <SelectItem value="DELETED">DELETED</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    if (isCreating || !item) {
      return (
        <>
          <div className="flex-1 overflow-y-auto p-6">
            {type === "datasource" && renderDataSourceForm()}
            {type === "channel" && <div>Channel form coming soon...</div>}
            {type === "dataproduct" && <div>Data Product form coming soon...</div>}
          </div>

          <div className="p-6 border-t border-gray-200 flex gap-3">
            <Button onClick={handleSubmit} className="flex-1">
              Create {type === "datasource" ? "Data Source" : type === "channel" ? "Channel" : "Data Product"}
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </>
      )
    }

    // View mode for existing item
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium">{item?.name || "N/A"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <Badge>{item?.status || "Unknown"}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 z-40 flex justify-end">
      <div className="bg-white w-[600px] h-full flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {isCreating || !item
                ? `New ${type === "datasource" ? "Data Source" : type === "channel" ? "Channel" : "Data Product"}`
                : `${type === "datasource" ? "Data Source" : type === "channel" ? "Channel" : "Data Product"} Details`}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {!isCreating && item && (
            <Button onClick={handleCreateNew} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          )}
        </div>

        {renderContent()}
      </div>
    </div>
  )
}
