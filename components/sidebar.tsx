"use client"
import { useState } from "react"
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
  SettingsIcon,
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
  ChevronDown,
  ChevronRight,
  Sparkles,
  Server,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  filterJobAreaNavigationBuckets,
  getNavigationItemPriority,
  getJobAreaBucketPriority,
} from "@/lib/navigation-filter"
import type { OnboardingData } from "@/types/onboarding"

interface SidebarProps {
  selectedPod: string
  onPodSelect: (pod: string) => void
  selectedTenant: string
  onTenantSelect: (tenant: string) => void
  selectedService: string
  onServiceSelect: (service: string) => void
  isCollapsed: boolean
  onToggleCollapse: (collapsed: boolean) => void
  onboardingData?: OnboardingData | null
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

const ICON_MAP = {
  Building2,
  Database,
  Settings: SettingsIcon,
  Server,
  Activity,
  Code,
  Bot,
  Shield,
  Home,
  Globe,
  FileText,
  Workflow,
  MessageSquare,
  BarChart3,
}

export function Sidebar({
  selectedPod,
  onPodSelect,
  selectedTenant,
  onTenantSelect,
  selectedService,
  onServiceSelect,
  isCollapsed,
  onToggleCollapse,
  onboardingData,
}: SidebarProps) {
  const [expandedBuckets, setExpandedBuckets] = useState<Set<string>>(new Set())

  const currentPod = pods.find((pod) => pod.id === selectedPod)
  const currentTenant = tenants.find((tenant) => tenant.id === selectedTenant)

  const filteredBuckets = filterJobAreaNavigationBuckets(onboardingData)
  filteredBuckets.forEach((bucket) => expandedBuckets.add(bucket.id))

  const toggleBucket = (bucketId: string) => {
    setExpandedBuckets((prev) => {
      const next = new Set(prev)
      if (next.has(bucketId)) {
        next.delete(bucketId)
      } else {
        next.add(bucketId)
      }
      return next
    })
  }

  const prioritizedBuckets = [...filteredBuckets].sort((a, b) => {
    const priorityA = getJobAreaBucketPriority(a.jobKey, onboardingData)
    const priorityB = getJobAreaBucketPriority(b.jobKey, onboardingData)
    return priorityB - priorityA
  })

  return (
    <div className="flex h-full">
      {/* Pod Workspaces (Leftmost) - Enhanced design */}
      <div className="w-16 bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col items-center py-4 space-y-2 border-r border-gray-800">
        <div className="text-xs font-semibold text-gray-400 mb-2 tracking-wider">PODS</div>
        {pods.map((pod) => (
          <button
            key={pod.id}
            className={cn(
              "group relative w-12 h-12 rounded-xl transition-all duration-200",
              "flex flex-col items-center justify-center",
              "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900",
              selectedPod === pod.id
                ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50"
                : "bg-gray-800 hover:bg-gray-700",
            )}
            onClick={() => onPodSelect(pod.id)}
            title={`${pod.name} (${pod.version})`}
            aria-label={`Switch to ${pod.name}`}
            aria-current={selectedPod === pod.id ? "page" : undefined}
          >
            <span
              className={cn(
                "text-xs font-bold transition-colors",
                selectedPod === pod.id ? "text-white" : "text-gray-300 group-hover:text-white",
              )}
            >
              {pod.shortName}
            </span>
            <div
              className={cn(
                "w-2 h-2 rounded-full mt-1 transition-all",
                pod.color,
                selectedPod === pod.id && "ring-2 ring-white/50",
              )}
            />
            {selectedPod === pod.id && (
              <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-l-full" />
            )}
          </button>
        ))}
      </div>

      {/* Main Sidebar - Enhanced design */}
      <div
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm",
          isCollapsed ? "w-16" : "w-72",
        )}
      >
        {/* Header - Enhanced with better spacing */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between mb-4">
            {!isCollapsed && (
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">XCaliber</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{currentPod?.name}</span>
                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                    {currentPod?.version}
                  </Badge>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleCollapse(!isCollapsed)}
              className="h-9 w-9 p-0 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

          {/* Tenant Selector - Enhanced design */}
          {!isCollapsed && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active Tenant</label>
              <Select value={selectedTenant} onValueChange={onTenantSelect}>
                <SelectTrigger className="w-full h-10 bg-white border-gray-300 hover:border-gray-400 transition-colors">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center">
                        <Building2 className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="truncate font-medium">{currentTenant?.name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {tenants.map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      <div className="flex items-center justify-between w-full gap-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <span>{tenant.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
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

        {/* Navigation Buckets - Enhanced with job-area-based collapsible sections */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="p-3">
            <nav className="space-y-1" role="navigation" aria-label="Main navigation">
              {prioritizedBuckets.map((bucket) => {
                const BucketIcon = ICON_MAP[bucket.icon as keyof typeof ICON_MAP] || Database
                const isExpanded = expandedBuckets.has(bucket.id)
                const bucketPriority = getJobAreaBucketPriority(bucket.jobKey, onboardingData)
                const isHighPriority = bucketPriority >= 30

                return (
                  <div key={bucket.id} className="space-y-1">
                    <button
                      onClick={() => !isCollapsed && toggleBucket(bucket.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all",
                        "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1",
                        isCollapsed ? "justify-center" : "justify-between",
                        "text-gray-700 group",
                      )}
                      aria-expanded={!isCollapsed && isExpanded}
                      aria-label={`${bucket.label} section`}
                    >
                      <div className="flex items-center gap-2">
                        <BucketIcon
                          className={cn(
                            "w-4 h-4 transition-colors",
                            isHighPriority ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700",
                          )}
                        />
                        {!isCollapsed && <span className="text-xs uppercase tracking-wider">{bucket.label}</span>}
                        {!isCollapsed && isHighPriority && <Sparkles className="w-3 h-3 text-blue-500" />}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-gray-400 transition-transform duration-200",
                            isExpanded && "rotate-180",
                          )}
                        />
                      )}
                    </button>

                    {isExpanded && !isCollapsed && (
                      <div className="ml-2 space-y-0.5 pl-4 border-l-2 border-gray-200">
                        {bucket.items.map((item) => {
                          const ItemIcon = ICON_MAP[item.icon as keyof typeof ICON_MAP] || Database
                          const priority = getNavigationItemPriority(item.id, onboardingData)
                          const isItemHighPriority = priority >= 15
                          const isActive = selectedService === item.id

                          return (
                            <button
                              key={item.id}
                              onClick={() => onServiceSelect(item.id)}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all group",
                                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1",
                                isActive
                                  ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-medium shadow-sm border border-blue-200"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                              )}
                              aria-current={isActive ? "page" : undefined}
                            >
                              <ItemIcon
                                className={cn(
                                  "w-4 h-4 flex-shrink-0 transition-colors",
                                  isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600",
                                )}
                              />
                              <span className="truncate flex-1 text-left">{item.label}</span>
                              {isItemHighPriority && (
                                <div
                                  className="w-2 h-2 bg-blue-500 rounded-full ring-2 ring-blue-200"
                                  title="High priority for your role"
                                />
                              )}
                              {isActive && <ChevronRight className="w-4 h-4 text-blue-600" />}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {isCollapsed && (
                      <div className="space-y-1">
                        {bucket.items.map((item) => {
                          const ItemIcon = ICON_MAP[item.icon as keyof typeof ICON_MAP] || Database
                          const priority = getNavigationItemPriority(item.id, onboardingData)
                          const isItemHighPriority = priority >= 15
                          const isActive = selectedService === item.id

                          return (
                            <button
                              key={item.id}
                              onClick={() => onServiceSelect(item.id)}
                              className={cn(
                                "w-full h-10 flex items-center justify-center rounded-lg transition-all relative group",
                                "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1",
                                isActive
                                  ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-200"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                              )}
                              title={item.label}
                              aria-label={item.label}
                              aria-current={isActive ? "page" : undefined}
                            >
                              <ItemIcon className="w-4 h-4" />
                              {isItemHighPriority && (
                                <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                              )}
                            </button>
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

        {!isCollapsed && (
          <div className="p-3 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">John Doe</div>
                <div className="text-xs text-gray-500 truncate">john.doe@company.com</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-200 rounded-lg"
                    aria-label="User menu"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 focus:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="p-3 border-t border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-full h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                  aria-label="User menu"
                >
                  JD
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-semibold">John Doe</div>
                <div className="px-2 pb-2 text-xs text-gray-500">john.doe@company.com</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  )
}
