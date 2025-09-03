"use client"

import { useState } from "react"
import { ComponentLayout } from "@/components/component-layout"
import { ConfigurationList } from "@/components/configuration-list"
import { DetailsDrawer } from "@/components/details-drawer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Package, TrendingUp, AlertCircle, Plus, Settings } from "lucide-react"

const mockDataProducts = [
  {
    id: "dp_001",
    name: "Patient Analytics Dataset",
    type: "Analytics Product",
    status: "active" as const,
    description: "Curated patient analytics data for population health insights",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    createdBy: "analytics.team@hospital.com",
    consumers: 12,
    version: "v2.3.1",
  },
  {
    id: "dp_002",
    name: "Clinical Outcomes API",
    type: "API Product",
    status: "active" as const,
    description: "RESTful API providing access to clinical outcomes data",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 8),
    createdBy: "api.team@hospital.com",
    consumers: 8,
    version: "v1.5.2",
  },
  {
    id: "dp_003",
    name: "Quality Metrics Dashboard",
    type: "Dashboard Product",
    status: "maintenance" as const,
    description: "Interactive dashboard for healthcare quality metrics",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 4),
    createdBy: "dashboard.team@hospital.com",
    consumers: 25,
    version: "v3.1.0",
  },
  {
    id: "dp_004",
    name: "Predictive Risk Models",
    type: "ML Product",
    status: "development" as const,
    description: "Machine learning models for patient risk prediction",
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2),
    createdBy: "ml.team@hospital.com",
    consumers: 3,
    version: "v0.8.0-beta",
  },
]

const mockActivityData = [
  {
    id: "act_dp_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    type: "success" as const,
    action: "Product Published",
    description: "Patient Analytics Dataset v2.3.1 successfully published to catalog",
    user: "analytics.team@hospital.com",
    metadata: { product: "dp_001", version: "v2.3.1", consumers: 12 },
  },
  {
    id: "act_dp_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    type: "info" as const,
    action: "Schema Updated",
    description: "Clinical Outcomes API schema updated with new fields",
    user: "api.team@hospital.com",
    metadata: { product: "dp_002", changes: 5, breaking: false },
  },
  {
    id: "act_dp_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    type: "warning" as const,
    action: "High Usage Detected",
    description: "Quality Metrics Dashboard approaching rate limits",
    user: "system",
    metadata: { product: "dp_003", usage: "85%", threshold: "80%" },
  },
  {
    id: "act_dp_004",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: "error" as const,
    action: "Deployment Failed",
    description: "Predictive Risk Models deployment failed validation checks",
    user: "ml.team@hospital.com",
    metadata: { product: "dp_004", error: "Model accuracy below threshold", threshold: "0.85" },
  },
]

const mockTasksData = [
  {
    id: "task_dp_001",
    title: "Update Data Product Documentation",
    description: "Update API documentation for Clinical Outcomes API with new endpoint specifications",
    status: "pending" as const,
    priority: "medium" as const,
    assignee: "api.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["documentation", "api", "endpoints"],
  },
  {
    id: "task_dp_002",
    title: "Optimize Dashboard Performance",
    description: "Investigate and resolve performance issues with Quality Metrics Dashboard",
    status: "in-progress" as const,
    priority: "high" as const,
    assignee: "dashboard.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    tags: ["performance", "dashboard", "optimization"],
  },
  {
    id: "task_dp_003",
    title: "ML Model Validation",
    description: "Complete validation testing for Predictive Risk Models before production deployment",
    status: "in-progress" as const,
    priority: "critical" as const,
    assignee: "ml.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    tags: ["ml", "validation", "testing", "deployment"],
  },
  {
    id: "task_dp_004",
    title: "Data Lineage Documentation",
    description: "Document data lineage for Patient Analytics Dataset",
    status: "completed" as const,
    priority: "medium" as const,
    assignee: "analytics.team@hospital.com",
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    tags: ["documentation", "lineage", "analytics"],
  },
]

const mockConfigurationData = [
  {
    id: "config_dp_001",
    name: "Product Catalog Visibility",
    type: "string",
    value: "public",
    description: "Default visibility level for new data products",
    category: "Catalog",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    modifiedBy: "admin@hospital.com",
    defaultValue: "private",
    options: ["public", "private", "restricted"],
  },
  {
    id: "config_dp_002",
    name: "Auto-versioning Enabled",
    type: "boolean",
    value: true,
    description: "Automatically version data products on schema changes",
    category: "Versioning",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    modifiedBy: "devops@hospital.com",
    defaultValue: false,
  },
  {
    id: "config_dp_003",
    name: "Quality Gate Threshold",
    type: "number",
    value: 0.85,
    description: "Minimum quality score required for product deployment",
    category: "Quality",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24),
    modifiedBy: "quality.team@hospital.com",
    defaultValue: 0.8,
  },
  {
    id: "config_dp_004",
    name: "Data Retention Policy",
    type: "number",
    value: 2555,
    description: "Default data retention period in days for data products",
    category: "Governance",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "compliance@hospital.com",
    defaultValue: 2555,
  },
  {
    id: "config_dp_005",
    name: "Consumer Rate Limit",
    type: "number",
    value: 10000,
    description: "Default API rate limit per consumer per hour",
    category: "API",
    isEditable: true,
    isRequired: false,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    modifiedBy: "api.team@hospital.com",
    defaultValue: 5000,
  },
]

export function HdfView() {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleItemSelect = (item: any) => {
    setSelectedItem(item)
    setIsDrawerOpen(true)
  }

  const handleCreateNew = () => {
    setSelectedItem(null)
    setIsDrawerOpen(true)
  }

  const handleRefresh = () => {
    console.log("Refreshing data products...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{mockDataProducts.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockDataProducts.filter((dp) => dp.status === "active").length}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Consumers</p>
                <p className="text-2xl font-bold text-purple-600">
                  {mockDataProducts.reduce((sum, dp) => sum + dp.consumers, 0)}
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Development</p>
                <p className="text-2xl font-bold text-orange-600">
                  {mockDataProducts.filter((dp) => dp.status === "development").length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Analytics Product", "API Product", "Dashboard Product", "ML Product"].map((type) => {
          const products = mockDataProducts.filter((p) => p.type === type)
          return (
            <Card key={type} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{type}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {products.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {products.slice(0, 2).map((product) => (
                    <div key={product.id} className="text-sm">
                      <div className="font-medium text-gray-900 truncate">{product.name}</div>
                      <div className="text-gray-500 text-xs">{product.consumers} consumers</div>
                    </div>
                  ))}
                  {products.length > 2 && <div className="text-xs text-gray-400">+{products.length - 2} more</div>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Data Products</CardTitle>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDataProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {product.type}
                      </Badge>
                      <span className="text-xs text-gray-500">v{product.version}</span>
                      <span className="text-xs text-gray-500">{product.consumers} consumers</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : product.status === "maintenance"
                          ? "bg-yellow-100 text-yellow-700"
                          : product.status === "development"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                    }
                  >
                    {product.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const configurationContent = (
    <ConfigurationList
      items={mockDataProducts}
      onItemSelect={handleItemSelect}
      onCreateNew={handleCreateNew}
      itemType="Data Product"
    />
  )

  return (
    <>
      <ComponentLayout
        title="Data Products"
        description="Manage and catalog data products for healthcare analytics and insights"
        dashboardContent={dashboardContent}
        configurationContent={configurationContent}
        onRefresh={handleRefresh}
        activityData={mockActivityData}
        tasksData={mockTasksData}
        configurationData={mockConfigurationData}
      >
        {dashboardContent}
      </ComponentLayout>

      <DetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        item={selectedItem}
        title={selectedItem?.name || "New Data Product"}
        itemType="Data Product"
      />
    </>
  )
}
