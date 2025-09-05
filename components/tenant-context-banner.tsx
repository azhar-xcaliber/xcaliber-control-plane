"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink, Settings } from "lucide-react"

interface TenantData {
  id: string
  createdAt: string
  createdBy: string
  status: "PENDING" | "INACTIVE" | "MODIFYING" | "ACTIVE" | "DELETED" | "ERROR"
  modifiedAt: string
  modifyBy: string
  syncStatus: "PENDING" | "MODIFYING" | "SYNCED" | "FAILED"
  entityVersion: number
  name: string
  description: string
  displayName: string
  url: string
  infrastructureType: "SHARED_INFRA" | "DEDICATED_INFRA"
  manageConfig: string
  namespaceId: string
  accountId: string
  podId: string
}

interface TenantContextBannerProps {
  tenant: TenantData
  currentComponent: string
  currentPage: string
}

export function TenantContextBanner({ tenant, currentComponent, currentPage }: TenantContextBannerProps) {
  const getStatusColor = (status: string) => {
    if (!status) return "bg-gray-100 text-gray-700"

    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "modifying":
        return "bg-blue-100 text-blue-700"
      case "inactive":
      case "deleted":
      case "error":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getInfrastructureColor = (infraType: string) => {
    if (!infraType) return "bg-gray-100 text-gray-700"

    switch (infraType) {
      case "DEDICATED_INFRA":
        return "bg-purple-100 text-purple-700"
      case "SHARED_INFRA":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSyncStatusColor = (syncStatus: string) => {
    if (!syncStatus) return "bg-gray-100 text-gray-700"

    switch (syncStatus.toLowerCase()) {
      case "synced":
        return "bg-green-100 text-green-700"
      case "pending":
      case "modifying":
        return "bg-yellow-100 text-yellow-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Tenant info and breadcrumb */}
        <div className="flex items-center gap-4">
          {/* Tenant logo and basic info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {tenant.displayName?.charAt(0) || tenant.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-gray-900">{tenant.displayName || tenant.name}</h1>
                <Badge className={getStatusColor(tenant.status)}>{tenant.status}</Badge>
                <Badge className={getInfrastructureColor(tenant.infrastructureType)}>
                  {tenant.infrastructureType === "DEDICATED_INFRA" ? "Dedicated" : "Shared"}
                </Badge>
                <Badge className={getSyncStatusColor(tenant.syncStatus)}>{tenant.syncStatus}</Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span>Platform</span>
                <ChevronRight className="w-3 h-3" />
                <span>{currentComponent}</span>
                {currentPage && (
                  <>
                    <ChevronRight className="w-3 h-3" />
                    <span>{currentPage}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Tenant details and actions */}
        <div className="flex items-center gap-6">
          {/* Tenant details */}
          <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600">
            <div>
              <span className="text-gray-500">Pod ID:</span>
              <span className="ml-1 font-medium">{tenant.podId}</span>
            </div>
            <div>
              <span className="text-gray-500">Namespace:</span>
              <span className="ml-1 font-medium">{tenant.namespaceId}</span>
            </div>
            <div>
              <span className="text-gray-500">Account:</span>
              <span className="ml-1 font-medium">{tenant.accountId}</span>
            </div>
            <div>
              <span className="text-gray-500">Version:</span>
              <span className="ml-1 font-medium">v{tenant.entityVersion}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {tenant.url && (
              <Button variant="ghost" size="sm" className="text-blue-600">
                <ExternalLink className="w-4 h-4 mr-1" />
                {tenant.url}
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
