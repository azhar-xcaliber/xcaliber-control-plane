"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Save, Power, Copy, Trash2, Edit3, Lock } from "lucide-react"

interface DetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  item?: any
  title: string
  itemType: string
}

export function DetailsDrawer({ isOpen, onClose, item, title, itemType }: DetailsDrawerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(item || {})

  if (!isOpen) return null

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "inactive":
        return "bg-gray-100 text-gray-700"
      case "error":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {item && (
            <>
              {/* Basic Info */}
              <div className="space-y-3">
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
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={formData.type || item.type || ""}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <div className="mt-1">
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
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
              </div>

              <Separator />

              {/* Metadata */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Metadata</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Created: {item.lastModified?.toLocaleString() || "Unknown"}</div>
                  <div>Modified: {item.lastModified?.toLocaleString() || "Unknown"}</div>
                  <div>Created by: {item.createdBy || "Unknown"}</div>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent" disabled={!isEditing}>
                    <Power className="w-4 h-4 mr-2" />
                    {item.status === "active" ? "Disable" : "Enable"}
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                    disabled={!isEditing}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {isEditing && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
