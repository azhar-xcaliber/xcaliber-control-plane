"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Power, Copy, Trash2 } from "lucide-react"

interface ConfigurationItem {
  id: string
  name: string
  type: string
  status: "active" | "inactive" | "error"
  description: string
  lastModified: Date
  createdBy: string
}

interface ConfigurationListProps {
  items: ConfigurationItem[]
  onItemSelect: (item: ConfigurationItem) => void
  onCreateNew: () => void
  itemType: string
}

export function ConfigurationList({ items, onItemSelect, onCreateNew, itemType }: ConfigurationListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
    <div className="p-6 space-y-4">
      {/* Header with search and create */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={`Search ${itemType.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          Add {itemType}
        </Button>
      </div>

      {/* Items list */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1" onClick={() => onItemSelect(item)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="text-xs text-gray-500">
                      <span>Modified {item.lastModified.toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>by {item.createdBy}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1 ml-4">
                  <Button variant="ghost" size="sm" onClick={() => onItemSelect(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={item.status === "active" ? "text-orange-600" : "text-green-600"}
                  >
                    <Power className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No {itemType.toLowerCase()} found</div>
            <div className="text-sm text-gray-400 mb-4">
              {searchTerm ? "Try adjusting your search terms." : `Create your first ${itemType.toLowerCase()}.`}
            </div>
            {!searchTerm && (
              <Button onClick={onCreateNew}>
                <Plus className="w-4 h-4 mr-2" />
                Add {itemType}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
