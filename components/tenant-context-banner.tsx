"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Globe, Clock, Database, Settings } from "lucide-react"

interface TenantContextBannerProps {
  tenant: {
    id: string
    name: string
    fullName: string
    plan: string
    environment: string
    status: string
    sharedCompute: string
    dataLake: string
    softwareVersion: string
    logoUrl?: string
    url: string
    operationDuration: string
  }
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

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumb and current context */}
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">
            <span className="capitalize">{currentComponent}</span>
            {currentPage && (
              <>
                <span className="mx-2">›</span>
                <span className="text-gray-900 font-medium">{currentPage}</span>
              </>
            )}
          </div>
        </div>

        {/* Right side - Tenant information */}
        <div className="flex items-center gap-4">
          {/* Tenant Logo */}
          {tenant.logoUrl ? (
            <img src={tenant.logoUrl || "/placeholder.svg"} alt={`${tenant.name} logo`} className="w-8 h-8 rounded" />
          ) : (
            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
          )}

          {/* Tenant Details */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex flex-col">
              <div className="font-semibold text-gray-900">{tenant.fullName}</div>
              <div className="text-xs text-gray-500">{tenant.url}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">{tenant.environment}</span>
              </div>

              <Badge className={getStatusColor(tenant.status)}>{tenant.status}</Badge>

              <div className="flex items-center gap-1">
                <Database className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">{tenant.sharedCompute}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-gray-600">{tenant.operationDuration}</span>
              </div>

              <div className="text-gray-600">v{tenant.softwareVersion}</div>
            </div>
          </div>

          {/* Settings button */}
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
