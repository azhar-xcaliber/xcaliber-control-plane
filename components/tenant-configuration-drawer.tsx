"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Edit, Lock, Unlock, Save, Plus, Trash2, Building2, FileText } from "lucide-react"

interface TenantConfigurationDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function TenantConfigurationDrawer({ isOpen, onClose }: TenantConfigurationDrawerProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState({
    organizationName: "Acme Corp",
    primaryContact: "john.doe@acmecorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Suite 100",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    plan: "enterprise",
    maxUsers: "500",
    storageLimit: "10TB",
    apiLimit: "1000000",
  })

  const licenses = [
    { id: "DP-ENT-2024", name: "Data Products Suite", status: "active", expiryDate: "2024-12-31" },
    { id: "AA-PRO-2024", name: "Advanced Analytics", status: "active", expiryDate: "2024-12-31" },
    { id: "WF-STD-2024", name: "Workflow Engine", status: "active", expiryDate: "2024-12-31" },
  ]

  const availableModules = [
    "Real-time Analytics",
    "Advanced Security",
    "Custom Integrations",
    "Premium Support",
    "Multi-region Deployment",
  ]

  const handleSave = () => {
    // Handle save logic
    console.log("Saving configuration:", formData)
    setIsEditMode(false)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    // Reset form data
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 z-40 flex justify-end">
      <div className="bg-white w-96 h-full flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Tenant Configuration</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {isEditMode ? (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => setIsEditMode(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Configuration
              </Button>
            )}
            <div className="ml-auto">
              {isEditMode ? <Unlock className="w-4 h-4 text-green-600" /> : <Lock className="w-4 h-4 text-gray-400" />}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Organization Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Organization Details
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  value={formData.organizationName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, organizationName: e.target.value }))}
                  disabled={!isEditMode}
                />
              </div>

              <div>
                <Label htmlFor="primaryContact">Primary Contact Email</Label>
                <Input
                  id="primaryContact"
                  type="email"
                  value={formData.primaryContact}
                  onChange={(e) => setFormData((prev) => ({ ...prev, primaryContact: e.target.value }))}
                  disabled={!isEditMode}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditMode}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditMode}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Plan & Limits */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Plan & Limits</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="plan">Current Plan</Label>
                <Select
                  value={formData.plan}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, plan: value }))}
                  disabled={!isEditMode}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="maxUsers">Max Users</Label>
                <Input
                  id="maxUsers"
                  value={formData.maxUsers}
                  onChange={(e) => setFormData((prev) => ({ ...prev, maxUsers: e.target.value }))}
                  disabled={!isEditMode}
                />
              </div>

              <div>
                <Label htmlFor="storageLimit">Storage Limit</Label>
                <Input
                  id="storageLimit"
                  value={formData.storageLimit}
                  onChange={(e) => setFormData((prev) => ({ ...prev, storageLimit: e.target.value }))}
                  disabled={!isEditMode}
                />
              </div>

              <div>
                <Label htmlFor="apiLimit">Monthly API Limit</Label>
                <Input
                  id="apiLimit"
                  value={formData.apiLimit}
                  onChange={(e) => setFormData((prev) => ({ ...prev, apiLimit: e.target.value }))}
                  disabled={!isEditMode}
                />
              </div>
            </div>
          </div>

          {/* Active Licenses */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Active Licenses
            </h3>

            <div className="space-y-3">
              {licenses.map((license) => (
                <div key={license.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{license.name}</div>
                    <Badge className="bg-green-100 text-green-700">{license.status}</Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    License ID: {license.id} • Expires: {license.expiryDate}
                  </div>
                  {isEditMode && (
                    <Button variant="outline" size="sm" className="mt-2 text-red-600 bg-transparent">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
              ))}

              {isEditMode && (
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add License
                </Button>
              )}
            </div>
          </div>

          {/* Available Modules */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Available Modules</h3>

            <div className="space-y-2">
              {availableModules.map((module) => (
                <div key={module} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                  <span className="text-sm">{module}</span>
                  {isEditMode && (
                    <Button variant="outline" size="sm">
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
