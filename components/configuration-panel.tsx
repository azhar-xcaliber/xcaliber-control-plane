"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Lock, Unlock, Copy, Trash2, Settings } from "lucide-react"

interface Configuration {
  id: string
  name: string
  type: string
  value: any
  description: string
  category: string
  isEditable: boolean
  isRequired: boolean
  lastModified: Date
  modifiedBy: string
  defaultValue?: any
}

interface ConfigurationPanelProps {
  configurations: Configuration[]
  componentName: string
}

export function ConfigurationPanel({ configurations, componentName }: ConfigurationPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingConfigs, setEditingConfigs] = useState<Record<string, any>>({})

  const categories = Array.from(new Set(configurations.map((config) => config.category)))

  const filteredConfigurations = configurations.filter((config) => {
    const matchesSearch =
      config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || config.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleEdit = (configId: string, value: any) => {
    setEditingConfigs((prev) => ({
      ...prev,
      [configId]: value,
    }))
  }

  const handleSave = () => {
    // Handle saving configurations
    console.log("Saving configurations:", editingConfigs)
    setIsEditMode(false)
    setEditingConfigs({})
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setEditingConfigs({})
  }

  const renderConfigValue = (config: Configuration) => {
    const currentValue = editingConfigs[config.id] !== undefined ? editingConfigs[config.id] : config.value

    if (!isEditMode || !config.isEditable) {
      if (typeof config.value === "boolean") {
        return (
          <Badge className={config.value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
            {config.value ? "Enabled" : "Disabled"}
          </Badge>
        )
      }
      if (typeof config.value === "object") {
        return <code className="text-xs bg-gray-100 px-2 py-1 rounded">{JSON.stringify(config.value)}</code>
      }
      return <span className="font-mono text-sm">{String(config.value)}</span>
    }

    // Edit mode
    if (typeof config.value === "boolean") {
      return (
        <select
          value={currentValue ? "true" : "false"}
          onChange={(e) => handleEdit(config.id, e.target.value === "true")}
          className="px-2 py-1 border border-gray-300 rounded text-sm"
        >
          <option value="true">Enabled</option>
          <option value="false">Disabled</option>
        </select>
      )
    }

    return (
      <Input
        value={String(currentValue)}
        onChange={(e) => handleEdit(config.id, e.target.value)}
        className="max-w-xs"
        size="sm"
      />
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
            <p className="text-sm text-gray-500">Manage settings for {componentName}</p>
          </div>
          <div className="flex items-center gap-2">
            {isEditMode ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsEditMode(true)}>
                  {isEditMode ? <Lock className="w-4 h-4 mr-2" /> : <Unlock className="w-4 h-4 mr-2" />}
                  {isEditMode ? "Lock" : "Edit"}
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Config
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search configurations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <Badge variant="outline" className="text-sm">
            {filteredConfigurations.length} configs
          </Badge>
        </div>
      </div>

      {/* Configuration List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {categories.map((category) => {
            const categoryConfigs = filteredConfigurations.filter((config) => config.category === category)
            if (categoryConfigs.length === 0) return null

            return (
              <div key={category}>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  {category}
                </h4>
                <div className="space-y-3 ml-6">
                  {categoryConfigs.map((config) => (
                    <Card key={config.id} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h5 className="font-medium text-gray-900">{config.name}</h5>
                              <Badge variant="outline" className="text-xs">
                                {config.type}
                              </Badge>
                              {config.isRequired && <Badge className="bg-red-100 text-red-700 text-xs">Required</Badge>}
                              {!config.isEditable && (
                                <Badge className="bg-gray-100 text-gray-700 text-xs">Read-only</Badge>
                              )}
                            </div>

                            <p className="text-sm text-gray-600 mb-3">{config.description}</p>

                            <div className="flex items-center gap-4 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Value:</span>
                                {renderConfigValue(config)}
                              </div>
                              {config.defaultValue !== undefined && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">Default:</span>
                                  <span className="font-mono text-sm text-gray-400">{String(config.defaultValue)}</span>
                                </div>
                              )}
                            </div>

                            <div className="text-xs text-gray-500">
                              <span>Modified {config.lastModified.toLocaleDateString()}</span>
                              <span className="mx-2">•</span>
                              <span>by {config.modifiedBy}</span>
                              <span className="mx-2">•</span>
                              <span className="font-mono">{config.id}</span>
                            </div>
                          </div>

                          {!isEditMode && (
                            <div className="flex items-center gap-1 ml-4">
                              <Button variant="ghost" size="sm" disabled={!config.isEditable}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600" disabled={config.isRequired}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}

          {filteredConfigurations.length === 0 && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-500 mb-4">No configurations found</div>
              <div className="text-sm text-gray-400">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search criteria."
                  : "Add your first configuration to get started."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
