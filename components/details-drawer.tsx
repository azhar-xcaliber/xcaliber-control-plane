"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Save, Power, Copy, Trash2, Edit3, Lock, Send as Sync, CheckCircle, AlertTriangle, Clock, Database, Workflow, Plug, FileText, Settings, Key, Eye, EyeOff, Radio, BoxSelect as Select, TableOfContents as SelectContent, BoxSelect as SelectItem, BoxSelect as SelectTrigger, BoxSelect as SelectValue } from "lucide-react"
import type { DataSource } from "@/types/datasource"
import type { DataChannel } from "@/types/channel"

interface DetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  item?: DataSource | DataChannel | any
  title: string
  itemType: string
}

export function DetailsDrawer({ isOpen, onClose, item, title, itemType }: DetailsDrawerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(item || {})
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})

  if (!isOpen) return null

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "bg-green-100 text-green-700"
      case "INACTIVE":
        return "bg-gray-100 text-gray-700"
      case "ERROR":
        return "bg-red-100 text-red-700"
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "MODIFYING":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSyncStatusColor = (syncStatus: string) => {
    switch (syncStatus?.toUpperCase()) {
      case "SYNCED":
        return "bg-green-100 text-green-700"
      case "SYNCING":
      case "MODIFYING":
        return "bg-blue-100 text-blue-700"
      case "FAILED":
        return "bg-red-100 text-red-700"
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getLifeCycleColor = (stage: string) => {
    switch (stage?.toUpperCase()) {
      case "LIVE":
        return "bg-green-100 text-green-700"
      case "READY":
        return "bg-blue-100 text-blue-700"
      case "DRAFT":
        return "bg-gray-100 text-gray-700"
      case "PAUSED":
        return "bg-yellow-100 text-yellow-700"
      case "STOPPED":
      case "ARCHIVED":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSyncStatusIcon = (syncStatus: string) => {
    switch (syncStatus?.toUpperCase()) {
      case "SYNCED":
        return <CheckCircle className="w-4 h-4" />
      case "SYNCING":
      case "MODIFYING":
        return <Sync className="w-4 h-4 animate-spin" />
      case "FAILED":
        return <AlertTriangle className="w-4 h-4" />
      case "PENDING":
        return <Clock className="w-4 h-4" />
      default:
        return <Sync className="w-4 h-4" />
    }
  }

  const isDataSource = item && "pipelines" in item && "connectors" in item
  const isDataChannel = item && "version" in item && "createdBy" in item && !("pipelines" in item)

  const toggleSecretVisibility = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-[600px] bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{itemType} Details</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <Lock className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {item && isDataChannel ? (
            // Data Channel specific view
            <div className="p-4 space-y-4">
              {/* Basic Information */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  Channel Information
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name || item.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      value={formData.version || item.version || ""}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || item.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Status</Label>
                    {isEditing ? (
                      <Select
                        value={formData.status || item.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                          <SelectItem value="MODIFYING">MODIFYING</SelectItem>
                          <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                          <SelectItem value="ERROR">ERROR</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="mt-1">
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>Sync Status</Label>
                    {isEditing ? (
                      <Select
                        value={formData.syncStatus || item.syncStatus}
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
                    ) : (
                      <div className="mt-1">
                        <Badge className={getSyncStatusColor(item.syncStatus)}>
                          <div className="flex items-center gap-1">
                            {getSyncStatusIcon(item.syncStatus)}
                            {item.syncStatus}
                          </div>
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Channel Listeners */}
              {item.dataChannelListeners && item.dataChannelListeners.length > 0 && (
                <>
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Workflow className="w-4 h-4" />
                      Data Channel Listeners ({item.dataChannelListeners.length})
                    </h3>

                    {item.dataChannelListeners.map((listener: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{listener.dataChannelName}</h4>
                            <p className="text-sm text-gray-600">Data Source: {listener.dataSourceId}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(listener.status)}>{listener.status}</Badge>
                            <Badge className={getSyncStatusColor(listener.syncStatus)}>
                              <div className="flex items-center gap-1">
                                {getSyncStatusIcon(listener.syncStatus)}
                                {listener.syncStatus}
                              </div>
                            </Badge>
                          </div>
                        </div>

                        {listener.dataPipeline && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Workflow className="w-4 h-4 text-blue-500" />
                              <span className="font-medium text-sm">{listener.dataPipeline.name}</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{listener.dataPipeline.description}</p>
                            
                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div>
                                <span className="text-gray-500">States:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {listener.dataPipeline.states?.map((state: string, stateIndex: number) => (
                                    <Badge key={stateIndex} variant="outline" className="text-xs">
                                      {state}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500">Stages:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {listener.dataPipeline.stages?.map((stage: string, stageIndex: number) => (
                                    <Badge key={stageIndex} variant="outline" className="text-xs">
                                      {stage}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <span className="text-gray-500">Account ID:</span>
                            <div className="font-mono">{listener.accountId}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Tenant ID:</span>
                            <div className="font-mono">{listener.tenantId}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Namespace:</span>
                            <div className="font-mono">{listener.namespaceId}</div>
                          </div>
                        </div>

                        {isEditing && (
                          <div className="pt-2 border-t border-gray-200">
                            <Label className="text-xs">Update Listener Status</Label>
                            <Select
                              value={listener.status}
                              onValueChange={(value) => {
                                // Handle listener status update
                                console.log("Updating listener status:", listener.id, value)
                              }}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PENDING">PENDING</SelectItem>
                                <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                                <SelectItem value="MODIFYING">MODIFYING</SelectItem>
                                <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                                <SelectItem value="ERROR">ERROR</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <Separator />
                </>
              )}

              {/* Metadata */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Metadata</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>ID: {item.id}</div>
                  <div>Created: {new Date(item.createdAt).toLocaleString()}</div>
                  <div>Created by: {item.createdBy}</div>
                  <div>Updated: {new Date(item.updatedAt).toLocaleString()}</div>
                  <div>Entity Version: {item.entityVersion || 'N/A'}</div>
                </div>
              </div>
            </div>
          ) : item && isDataSource ? (
            // Data Source specific view (existing tabs)
            <Tabs defaultValue="overview" className="h-full">
              <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="connectors">Connectors</TabsTrigger>
                <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
                <TabsTrigger value="catalog">Catalog</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-4 space-y-4">
                {/* Basic Information */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Basic Information
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name || item.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={formData.displayName || item.displayName || ""}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description || item.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Type</Label>
                      <Input value={item.type} disabled className="text-sm" />
                    </div>
                    <div>
                      <Label>Protocol</Label>
                      <Input value={item.protocol} disabled className="text-sm" />
                    </div>
                    <div>
                      <Label>Version</Label>
                      <Input value={item.version} disabled={!isEditing} className="text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Status</Label>
                      <div className="mt-1">
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      </div>
                    </div>
                    <div>
                      <Label>Sync Status</Label>
                      <div className="mt-1">
                        <Badge className={getSyncStatusColor(item.syncStatus)}>
                          <div className="flex items-center gap-1">
                            {getSyncStatusIcon(item.syncStatus)}
                            {item.syncStatus}
                          </div>
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label>Lifecycle Stage</Label>
                      <div className="mt-1">
                        <Badge className={getLifeCycleColor(item.lifeCycleStage)}>{item.lifeCycleStage}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Resource Configuration */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Resource Configuration
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Template</Label>
                      <Input value={item.templateName} disabled className="text-sm" />
                    </div>
                    <div>
                      <Label>Pod ID</Label>
                      <Input value={item.podId} disabled className="text-sm" />
                    </div>
                    <div>
                      <Label>Tenant ID</Label>
                      <Input value={item.tenantId} disabled className="text-sm" />
                    </div>
                  </div>

                  <div>
                    <Label>Channels</Label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.channels?.map((channel: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Metadata */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">Metadata</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>ID: {item.id}</div>
                    <div>Created: {new Date(item.createdAt).toLocaleString()}</div>
                    <div>Created by: {item.createdBy}</div>
                    <div>Modified: {new Date(item.modifiedAt).toLocaleString()}</div>
                    <div>Modified by: {item.modifyBy}</div>
                    <div>Entity Version: {item.entityVersion}</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="connectors" className="p-4 space-y-4">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Plug className="w-4 h-4" />
                  Connectors ({item.connectors?.length || 0})
                </h3>

                {item.connectors?.map((connector: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{connector.displayName}</h4>
                        <p className="text-sm text-gray-600">{connector.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">v{connector.version}</Badge>
                        <Badge
                          className={connector.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                        >
                          {connector.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <Label>Type</Label>
                        <div className="mt-1">{connector.type}</div>
                      </div>
                      <div>
                        <Label>Auth Method</Label>
                        <div className="mt-1">{connector.auth?.method || "None"}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Pull Supported</Label>
                        <Badge
                          className={
                            connector.paradigms?.pullSupported
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {connector.paradigms?.pullSupported ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div>
                        <Label>Push Supported</Label>
                        <Badge
                          className={
                            connector.paradigms?.pushSupported
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {connector.paradigms?.pushSupported ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>

                    {connector.secrets?.length > 0 && (
                      <div>
                        <Label className="flex items-center gap-2">
                          <Key className="w-3 h-3" />
                          Secrets
                        </Label>
                        <div className="mt-1 space-y-2">
                          {connector.secrets.map(
                            (secret: any, secretIndex: number) =>
                              secret.key && (
                                <div key={secretIndex} className="flex items-center gap-2">
                                  <Input
                                    value={
                                      secret.sensitive && !showSecrets[`${index}-${secretIndex}`]
                                        ? "***hidden***"
                                        : secret.value
                                    }
                                    disabled={!isEditing}
                                    className="text-sm"
                                  />
                                  {secret.sensitive && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleSecretVisibility(`${index}-${secretIndex}`)}
                                    >
                                      {showSecrets[`${index}-${secretIndex}`] ? (
                                        <EyeOff className="w-4 h-4" />
                                      ) : (
                                        <Eye className="w-4 h-4" />
                                      )}
                                    </Button>
                                  )}
                                </div>
                              ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="pipelines" className="p-4 space-y-4">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <Workflow className="w-4 h-4" />
                  Pipelines ({item.pipelines?.length || 0})
                </h3>

                {item.pipelines?.map((pipeline: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{pipeline.name}</h4>
                        <p className="text-sm text-gray-600">{pipeline.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(pipeline.status)}>{pipeline.status}</Badge>
                        <Badge className={getSyncStatusColor(pipeline.syncStatus)}>
                          <div className="flex items-center gap-1">
                            {getSyncStatusIcon(pipeline.syncStatus)}
                            {pipeline.syncStatus}
                          </div>
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <Label>Batch Size</Label>
                        <div className="mt-1">{pipeline.defaultBatchSize}</div>
                      </div>
                      <div>
                        <Label>Recurring</Label>
                        <Badge
                          className={pipeline.recurring ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                        >
                          {pipeline.recurring ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>

                    {pipeline.cronExpression && (
                      <div>
                        <Label>Cron Expression</Label>
                        <Input value={pipeline.cronExpression} disabled className="text-sm font-mono" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <Label>Connector</Label>
                        <div className="mt-1">{pipeline.connector}</div>
                      </div>
                      <div>
                        <Label>Format</Label>
                        <div className="mt-1">{pipeline.format}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="catalog" className="p-4 space-y-4">
                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Catalog Resources ({item.catalog?.length || 0})
                </h3>

                {item.catalog?.map((catalogEntry: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{catalogEntry.resource}</h4>
                      <Badge
                        className={catalogEntry.enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
                      >
                        {catalogEntry.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>

                    <div>
                      <Label>Sync Interval</Label>
                      <div className="mt-1 text-sm">{catalogEntry.syncInterval}</div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          ) : (
            // Fallback for other item types
            <div className="p-4 space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name || item?.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || item?.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="p-4 border-t border-gray-200">
          {isEditing ? (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {(isDataSource || isDataChannel) && (
                <>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Sync className="w-4 h-4 mr-2" />
                    Trigger Manual Sync
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Power className="w-4 h-4 mr-2" />
                    {item.status === "ACTIVE" ? "Deactivate" : "Activate"}
                  </Button>
                </>
              )}
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate Configuration
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete {itemType}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
