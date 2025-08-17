"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Menu,
  Building2,
  MoreHorizontal,
  User,
  Settings,
  LogOut,
  Activity,
  Code,
  Workflow,
  Bot,
  ChevronDown,
  ChevronRight,
  Plus,
  Shield,
  Database,
  BarChart3,
  BookOpen,
  Layers,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  selectedPod: string
  onPodSelect: (pod: string) => void
  selectedTenant: string
  onTenantSelect: (tenant: string) => void
  selectedService: string
  onServiceSelect: (service: string) => void
  isCollapsed: boolean
  onToggleCollapse: (collapsed: boolean) => void
}

// Pod workspaces (environments) - top level
const pods = [
  {
    id: "prod-east",
    name: "Production East",
    shortName: "PE",
    version: "v2.4.1",
    status: "healthy",
    color: "bg-green-500",
  },
  {
    id: "prod-west",
    name: "Production West",
    shortName: "PW",
    version: "v2.4.1",
    status: "healthy",
    color: "bg-green-500",
  },
  {
    id: "staging",
    name: "Staging",
    shortName: "ST",
    version: "v2.5.0-rc1",
    status: "warning",
    color: "bg-yellow-500",
  },
  {
    id: "dev",
    name: "Development",
    shortName: "DV",
    version: "v2.5.0-beta",
    status: "healthy",
    color: "bg-blue-500",
  },
]

// Tenants grouped under the selected pod
const tenantGroups = [
  { id: "tenant-1", name: "Acme Corp", plan: "Enterprise", online: true },
  { id: "tenant-2", name: "TechStart Inc", plan: "Professional", online: false },
  { id: "tenant-3", name: "Global Systems", plan: "Enterprise", online: true },
  { id: "tenant-4", name: "StartupCo", plan: "Starter", online: true },
]

// Monitor and Manage section
const monitorManageItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "activity", label: "Activity Feed", icon: Activity },
  { id: "data-quality", label: "Data Quality", icon: Shield },
  { id: "operations", label: "Operations", icon: Settings },
  { id: "data-sources", label: "Data Sources", icon: Database },
  { id: "hdf", label: "HDF", icon: BarChart3 },
]

// Browse and Design section (Studios)
const browseDesignItems = [
  { id: "data-access", label: "Data Access", icon: Code },
  { id: "data-catalog", label: "Data Catalog", icon: BookOpen },
  { id: "workflows", label: "Workflows", icon: Workflow },
  { id: "agents", label: "Agents", icon: Bot },
]

export function Sidebar({
  selectedPod,
  onPodSelect,
  selectedTenant,
  onTenantSelect,
  selectedService,
  onServiceSelect,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [tenantsCollapsed, setTenantsCollapsed] = useState(false)
  const [monitorManageCollapsed, setMonitorManageCollapsed] = useState(false)
  const [browseDesignCollapsed, setBrowseDesignCollapsed] = useState(false)

  const currentPod = pods.find((pod) => pod.id === selectedPod)
  const currentTenant = tenantGroups.find((tenant) => tenant.id === selectedTenant)

  return (
    <div className="flex h-full">
      {/* Pod Workspaces (Leftmost) */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-3">
        {pods.map((pod) => (
          <Button
            key={pod.id}
            variant="ghost"
            className={cn(
              "w-12 h-12 p-0 rounded-lg text-white hover:bg-gray-700 relative",
              selectedPod === pod.id && "bg-gray-700 ring-2 ring-blue-400",
            )}
            onClick={() => onPodSelect(pod.id)}
            title={`${pod.name} (${pod.version})`}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold">{pod.shortName}</span>
              <div className={cn("w-2 h-2 rounded-full mt-1", pod.color)}></div>
            </div>
            {selectedPod === pod.id && (
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-l"></div>
            )}
          </Button>
        ))}
      </div>

      {/* Main Sidebar */}
      <div
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        {/* Header with Pod Info and Toggle */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            {!isCollapsed && (
              <div className="flex-1">
                <h1 className="text-lg font-semibold text-gray-900">XCaliber Control</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">{currentPod?.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {currentPod?.version}
                  </Badge>
                </div>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => onToggleCollapse(!isCollapsed)} className="h-8 w-8 p-0">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          {!isCollapsed ? (
            <div className="p-3 space-y-4">
              {/* Tenants Section - Shadcn Sidebar Header Style */}
              <div>
                <div className="px-2 py-1">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      className="flex-1 justify-start p-2 h-auto font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => setTenantsCollapsed(!tenantsCollapsed)}
                    >
                      {tenantsCollapsed ? (
                        <ChevronRight className="w-4 h-4 mr-2" />
                      ) : (
                        <ChevronDown className="w-4 h-4 mr-2" />
                      )}
                      <Building2 className="w-4 h-4 mr-2" />
                      Tenants
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                      title="Add tenant"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {!tenantsCollapsed && (
                  <div className="px-2 pb-2">
                    {/* Current Selected Tenant Header */}
                    {currentTenant && (
                      <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full flex-shrink-0",
                                currentTenant.online ? "bg-green-500" : "bg-gray-300",
                              )}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-gray-900 truncate">{currentTenant.name}</div>
                              <div className="text-xs text-gray-500">{currentTenant.plan}</div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="w-3 h-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem>
                                <Settings className="w-4 h-4 mr-2" />
                                Tenant Settings
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Activity className="w-4 h-4 mr-2" />
                                View Activity
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Building2 className="w-4 h-4 mr-2" />
                                Switch Tenant
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )}

                    {/* Other Tenants List */}
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-500 px-2 py-1">Other Tenants</div>
                      {tenantGroups
                        .filter((tenant) => tenant.id !== selectedTenant)
                        .map((tenant) => (
                          <Button
                            key={tenant.id}
                            variant="ghost"
                            className="w-full justify-start px-2 py-1.5 h-auto text-sm hover:bg-gray-100"
                            onClick={() => onTenantSelect(tenant.id)}
                          >
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full mr-2 flex-shrink-0",
                                tenant.online ? "bg-green-500" : "bg-gray-300",
                              )}
                            />
                            <span className="truncate flex-1 text-left">{tenant.name}</span>
                            <Badge variant="outline" className="text-xs ml-2">
                              {tenant.plan}
                            </Badge>
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Monitor and Manage Section */}
              {selectedTenant && (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-2 h-auto font-medium text-gray-700"
                    onClick={() => setMonitorManageCollapsed(!monitorManageCollapsed)}
                  >
                    {monitorManageCollapsed ? (
                      <ChevronRight className="w-4 h-4 mr-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 mr-2" />
                    )}
                    <Activity className="w-4 h-4 mr-2" />
                    Monitor & Manage
                  </Button>

                  {!monitorManageCollapsed && (
                    <div className="ml-6 mt-2 space-y-1">
                      {monitorManageItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Button
                            key={item.id}
                            variant={selectedService === item.id ? "secondary" : "ghost"}
                            className={cn(
                              "w-full justify-start px-2 py-1.5 h-auto text-sm",
                              selectedService === item.id && "bg-blue-50 text-blue-700",
                            )}
                            onClick={() => onServiceSelect(item.id)}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </Button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              <Separator />

              {/* Browse and Design Section */}
              {selectedTenant && (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-2 h-auto font-medium text-gray-700"
                    onClick={() => setBrowseDesignCollapsed(!browseDesignCollapsed)}
                  >
                    {browseDesignCollapsed ? (
                      <ChevronRight className="w-4 h-4 mr-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 mr-2" />
                    )}
                    <Layers className="w-4 h-4 mr-2" />
                    Browse & Design
                  </Button>

                  {!browseDesignCollapsed && (
                    <div className="ml-6 mt-2 space-y-1">
                      {browseDesignItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Button
                            key={item.id}
                            variant={selectedService === item.id ? "secondary" : "ghost"}
                            className={cn(
                              "w-full justify-start px-2 py-1.5 h-auto text-sm",
                              selectedService === item.id && "bg-blue-50 text-blue-700",
                            )}
                            onClick={() => onServiceSelect(item.id)}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </Button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Collapsed view - just icons */
            <div className="p-3 space-y-2">
              <Button variant="ghost" className="w-full h-10 p-0" title="Tenants">
                <Building2 className="w-4 h-4" />
              </Button>

              {selectedTenant && (
                <>
                  <Button variant="ghost" className="w-full h-10 p-0" title="Monitor & Manage">
                    <Activity className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" className="w-full h-10 p-0" title="Browse & Design">
                    <Layers className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer with Logged In User */}
        {!isCollapsed && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">John Doe</div>
                <div className="text-xs text-gray-500 truncate">john.doe@company.com</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
