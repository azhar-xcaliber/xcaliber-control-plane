"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, ExternalLink, Settings } from "lucide-react"

interface TenantData {
  id: string
  name: string
  fullName: string
  plan: string
  environment: string
  status: string
  sharedCompute: string
  dataLake: string
  softwareVersion: string
  logoUrl: string
  url: string
  operationDuration: string
}

interface TenantContextBannerProps {
  tenant: TenantData
  currentComponent: string
  currentPage: string
}

export function TenantContextBanner({ tenant, currentComponent, currentPage }: TenantContextBannerProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700"
      case "maintenance":
        return "bg-yellow-100 text-yellow-700"
      case "inactive":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getEnvironmentColor = (environment: string) => {
    switch (environment.toLowerCase()) {
      case "production":
        return "bg-red-100 text-red-700"
      case "staging":
        return "bg-yellow-100 text-yellow-700"
      case "development":
        return "bg-blue-100 text-blue-700"
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
            <img src={tenant.logoUrl || "/placeholder.svg"} alt={tenant.name} className="w-8 h-8 rounded" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-gray-900">{tenant.fullName}</h1>
                <Badge className={getStatusColor(tenant.status)}>{tenant.status}</Badge>
                <Badge className={getEnvironmentColor(tenant.environment)}>{tenant.environment}</Badge>
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
              <span className="text-gray-500">Compute:</span>
              <span className="ml-1 font-medium">{tenant.sharedCompute}</span>
            </div>
            <div>
              <span className="text-gray-500">Data Lake:</span>
              <span className="ml-1 font-medium">{tenant.dataLake}</span>
            </div>
            <div>
              <span className="text-gray-500">Version:</span>
              <span className="ml-1 font-medium">{tenant.softwareVersion}</span>
            </div>
            <div>
              <span className="text-gray-500">Runtime:</span>
              <span className="ml-1 font-medium">{tenant.operationDuration}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-blue-600">
              <ExternalLink className="w-4 h-4 mr-1" />
              {tenant.url}
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
