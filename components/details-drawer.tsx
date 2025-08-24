"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Edit, Power, PowerOff, Copy, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface DetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    name: string
    description?: string
    status: "active" | "inactive" | "warning" | "error"
    type?: string
    lastModified?: string
    icon?: React.ReactNode
    metadata?: Record<string, any>
  } | null
  onEdit?: () => void
  onToggleStatus?: () => void
  onDuplicate?: () => void
  children?: React.ReactNode
}

export function DetailsDrawer({
  isOpen,
  onClose,
  item,
  onEdit,
  onToggleStatus,
  onDuplicate,
  children,
}: DetailsDrawerProps) {
  if (!item) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "inactive":
        return "bg-gray-100 text-gray-700"
      case "warning":
        return "bg-yellow-100 text-yellow-700"
      case "error":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-[600px] bg-white border-l border-gray-200 shadow-xl transition-transform duration-300 overflow-hidden",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {item.icon && <div className="p-2 bg-gray-100 rounded-lg">{item.icon}</div>}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                {item.type && (
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                )}
                <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200 bg-gray-50">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
          {onToggleStatus && (
            <Button variant="outline" size="sm" onClick={onToggleStatus}>
              {item.status === "active" ? (
                <>
                  <PowerOff className="w-4 h-4 mr-2" />
                  Disable
                </>
              ) : (
                <>
                  <Power className="w-4 h-4 mr-2" />
                  Enable
                </>
              )}
            </Button>
          )}
          {onDuplicate && (
            <Button variant="outline" size="sm" onClick={onDuplicate}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
          )}
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="h-full">
            <div className="border-b border-gray-200 px-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="configuration">Configuration</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-4 space-y-4">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">ID:</span>
                      <span className="ml-2 font-mono">{item.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className="ml-2 capitalize">{item.status}</span>
                    </div>
                    {item.type && (
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <span className="ml-2">{item.type}</span>
                      </div>
                    )}
                    {item.lastModified && (
                      <div>
                        <span className="text-gray-500">Last Modified:</span>
                        <span className="ml-2">{item.lastModified}</span>
                      </div>
                    )}
                  </div>
                  {item.description && (
                    <div>
                      <span className="text-gray-500 text-sm">Description:</span>
                      <p className="mt-1 text-sm text-gray-900">{item.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Metadata */}
              {item.metadata && Object.keys(item.metadata).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Additional Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {Object.entries(item.metadata).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                          <span className="font-medium text-right">
                            {typeof value === "object" ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Custom Content */}
              {children}
            </TabsContent>

            <TabsContent value="configuration" className="p-4">
              <div className="text-center py-12">
                <div className="text-gray-500 mb-2">Configuration Details</div>
                <div className="text-sm text-gray-400">
                  Detailed configuration options and settings will appear here.
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="p-4">
              <div className="text-center py-12">
                <div className="text-gray-500 mb-2">Activity History</div>
                <div className="text-sm text-gray-400">Recent activity and changes for this item will appear here.</div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
