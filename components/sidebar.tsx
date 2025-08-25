"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  FileText,
  Workflow,
  Bot,
  Globe,
  Database,
  MessageSquare,
  BarChart3,
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

// Pod workspaces (environments)
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

// Tenants for top-level selector
const tenants = [
  { id: "tenant-1", name: "Acme Corp", plan: "Enterprise" },
  { id: "tenant-2", name: "TechStart Inc", plan: "Professional" },
  { id: "tenant-3", name: "Global Systems", plan: "Enterprise" },
  { id: "tenant-4", name: "StartupCo", plan: "Starter" },
]

const navigationBuckets = [
  {
    id: "platform-components",
    label: "Platform Components",
    icon: Home,
    items: [
      { id: "overview", label: "Home", icon: Home },
      { id: "data-sources", label: "Data Sources", icon: Database },
      { id: "channels", label: "Data Channels", icon: Globe },
      { id: "hdf", label: "Healthcare Data Factory (HDF)", icon: FileText },
      { id: "data-fabric", label: "Healthcare Data Fabric", icon: Activity },
      { id: "data-access", label: "Data Access", icon: Code },
      { id: "agents", label: "Agents", icon: Bot },
      { id: "workflows", label: "Workflows", icon: Workflow },
    ],
  },
  {
    id: "co-pilots",
    label: "Co-pilots",
    icon: Bot,
    items: [
      { id: "playground", label: "Playground", icon: Code },
      { id: "provider-assistant", label: "Provider Assistant", icon: MessageSquare },
      { id: "analyst", label: "Analyst", icon: BarChart3 },
    ],
  },
  {
    id: "enterprise-integrations",
    label: "Enterprise Integrations",
    icon: Globe,
    items: [
      { id: "kafka-queues", label: "Kafka Queues", icon: Activity },
      { id: "data-lakes", label: "Data Lakes", icon: Database },
      { id: "crm-systems", label: "CRM Systems", icon: Building2 },
      { id: "external-databases", label: "External Databases", icon: Database },
    ],
  },
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
  const currentPod = pods.find((pod) => pod.id === selectedPod)
  const currentTenant = tenants.find((tenant) => tenant.id === selectedTenant)

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

          {/* Tenant Selector - Now top-level */}
          {!isCollapsed && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Tenant</label>
              <Select value={selectedTenant} onValueChange={onTenantSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span className="truncate">{currentTenant?.name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {tenants.map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>{tenant.name}</span>
                        </div>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {tenant.plan}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Navigation Buckets */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <nav className="space-y-2">
              {navigationBuckets.map((bucket) => {
                const BucketIcon = bucket.icon
                const isExpanded = !isCollapsed // For now, expand when sidebar is expanded

                return (
                  <div key={bucket.id}>
                    {/* Bucket Header */}
                    <div
                      className={cn(
                        "flex items-center gap-2 px-2 py-2 text-sm font-medium text-gray-700",
                        isCollapsed && "justify-center",
                      )}
                    >
                      <BucketIcon className="w-4 h-4 text-gray-500" />
                      {!isCollapsed && <span>{bucket.label}</span>}
                    </div>

                    {/* Bucket Items */}
                    {isExpanded && !isCollapsed && (
                      <div className="ml-4 space-y-1 border-l border-gray-200 pl-3">
                        {bucket.items.map((item) => {
                          const ItemIcon = item.icon
                          return (
                            <Button
                              key={item.id}
                              variant={selectedService === item.id ? "secondary" : "ghost"}
                              className={cn(
                                "w-full h-8 px-2 justify-start text-sm",
                                selectedService === item.id && "bg-blue-50 text-blue-700 border-blue-200",
                              )}
                              onClick={() => onServiceSelect(item.id)}
                            >
                              <ItemIcon className="w-3 h-3 mr-2 flex-shrink-0" />
                              <span className="truncate">{item.label}</span>
                            </Button>
                          )
                        })}
                      </div>
                    )}

                    {/* Collapsed state - show bucket items as tooltips */}
                    {isCollapsed && (
                      <div className="space-y-1">
                        {bucket.items.map((item) => {
                          const ItemIcon = item.icon
                          return (
                            <Button
                              key={item.id}
                              variant={selectedService === item.id ? "secondary" : "ghost"}
                              className={cn(
                                "w-full h-8 px-2 justify-center",
                                selectedService === item.id && "bg-blue-50 text-blue-700 border-blue-200",
                              )}
                              onClick={() => onServiceSelect(item.id)}
                              title={item.label}
                            >
                              <ItemIcon className="w-3 h-3" />
                            </Button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
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
