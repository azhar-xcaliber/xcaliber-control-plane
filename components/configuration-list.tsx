"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Plus, RefreshCw, Settings } from "lucide-react"

interface ConfigurationItem {
  id: string
  name: string
  type: string
  status: "active" | "inactive" | "error"
  description: string
  lastModified?: Date
  createdBy?: string
}

interface ConfigurationListProps {
  items: ConfigurationItem[]
  onItemSelect: (item: ConfigurationItem) => void
  onCreateNew: () => void
  itemType: string
}

const formatDate = (date?: Date): string => {
  if (!date) return "Unknown"

  try {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toLocaleDateString()
    }

    const parsedDate = new Date(date)
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString()
    }

    return "Invalid Date"
  } catch (error) {
    return "Unknown"
  }
}

export function ConfigurationList({ items, onItemSelect, onCreateNew, itemType }: ConfigurationListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{itemType} Configuration</h2>
          <p className="text-gray-600">Manage and configure {itemType.toLowerCase()} settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={onCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            New {itemType}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={`Search ${itemType.toLowerCase()}s...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{items.length}</p>
              <p className="text-sm text-gray-600">Total {itemType}s</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {items.filter((item) => item.status === "active").length}
              </p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">
                {items.filter((item) => item.status === "inactive").length}
              </p>
              <p className="text-sm text-gray-600">Inactive</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {items.filter((item) => item.status === "error").length}
              </p>
              <p className="text-sm text-gray-600">Errors</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {itemType}s Found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "No items match your current filters."
                  : `No ${itemType.toLowerCase()}s have been configured yet.`}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button onClick={onCreateNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First {itemType}
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onItemSelect(item)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1 line-clamp-2">{item.description}</p>
                      <div className="text-xs text-gray-500">
                        <span>Modified {formatDate(item.lastModified)}</span>
                        {item.createdBy && (
                          <>
                            <span className="mx-2">•</span>
                            <span>by {item.createdBy}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Results Summary */}
      {filteredItems.length > 0 && (
        <div className="text-sm text-gray-600 text-center">
          Showing {filteredItems.length} of {items.length} {itemType.toLowerCase()}s
        </div>
      )}
    </div>
  )
}
