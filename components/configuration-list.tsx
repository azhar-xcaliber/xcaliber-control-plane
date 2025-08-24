"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Lock, Unlock, Search, MoreHorizontal, Eye, Trash2, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ConfigurationItem {
  id: string
  name: string
  description?: string
  status: "active" | "inactive" | "warning" | "error"
  type?: string
  lastModified?: string
  icon?: React.ReactNode
  metadata?: Record<string, any>
}

interface ConfigurationListProps {
  items: ConfigurationItem[]
  title: string
  onItemSelect: (item: ConfigurationItem) => void
  onCreateNew: () => void
  onEdit?: (item: ConfigurationItem) => void
  onDelete?: (item: ConfigurationItem) => void
  searchPlaceholder?: string
  isReadOnly?: boolean
}

export function ConfigurationList({
  items,
  title,
  onItemSelect,
  onCreateNew,
  onEdit,
  onDelete,
  searchPlaceholder = "Search configurations...",
  isReadOnly = true,
}: ConfigurationListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [editMode, setEditMode] = useState(false)

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

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {items.length} configuration{items.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isReadOnly && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2"
              >
                {editMode ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                {editMode ? "Lock" : "Edit"}
              </Button>
            )}
            <Button onClick={onCreateNew} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Configuration List */}
      <div className="flex-1 overflow-y-auto p-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">No configurations found</div>
            <div className="text-sm text-gray-400">
              {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first configuration"}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onItemSelect(item)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {item.icon && <div className="p-2 bg-gray-100 rounded-lg">{item.icon}</div>}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                          {item.type && (
                            <Badge variant="outline" className="text-xs">
                              {item.type}
                            </Badge>
                          )}
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </div>
                        {item.description && <p className="text-sm text-gray-600 mb-2">{item.description}</p>}
                        {item.lastModified && (
                          <div className="text-xs text-gray-500">Last modified: {item.lastModified}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {editMode && (
                        <>
                          {onEdit && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                onEdit(item)
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                onDelete(item)
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onItemSelect(item)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {editMode && onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {editMode && onDelete && (
                            <DropdownMenuItem onClick={() => onDelete(item)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
