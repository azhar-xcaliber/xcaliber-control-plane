"use client"

import { OverviewDashboard } from "@/components/overview-dashboard"
import { ActivityFeed } from "@/components/activity-feed"
import { ApiBrowser } from "@/components/api-browser"
import { WorkflowsStudio } from "@/components/workflows-studio"
import { AgentsStudio } from "@/components/agents-studio"
import type { Activity } from "@/types/activity"

interface MainContentProps {
  selectedPod: string
  selectedTenant: string
  selectedService: string
  selectedTab: string
  onTabSelect: (tab: string) => void
  onActivitySelect: (activity: Activity) => void
}

export function MainContent({
  selectedPod,
  selectedTenant,
  selectedService,
  selectedTab,
  onTabSelect,
  onActivitySelect,
}: MainContentProps) {
  // Route to different views based on selected service
  switch (selectedService) {
    case "overview":
      return <OverviewDashboard pod={selectedPod} tenant={selectedTenant} />

    case "activity":
      return <ActivityFeed onActivitySelect={onActivitySelect} pod={selectedPod} tenant={selectedTenant} />

    case "data-quality":
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Data Quality</h2>
            <p className="text-gray-600">Data quality monitoring and validation tools</p>
          </div>
        </div>
      )

    case "operations":
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Operations</h2>
            <p className="text-gray-600">Operational management and monitoring</p>
          </div>
        </div>
      )

    case "data-sources":
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Data Sources</h2>
            <p className="text-gray-600">Manage and configure data sources</p>
          </div>
        </div>
      )

    case "hdf":
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Healthcare Data Fabric</h2>
            <p className="text-gray-600">Healthcare-specific data management and processing</p>
          </div>
        </div>
      )

    case "data-access":
      return <ApiBrowser />

    case "data-catalog":
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Data Catalog</h2>
            <p className="text-gray-600">Browse and discover data assets</p>
          </div>
        </div>
      )

    case "workflows":
      return <WorkflowsStudio onActivitySelect={onActivitySelect} />

    case "agents":
      return <AgentsStudio onActivitySelect={onActivitySelect} />

    // Default fallback
    default:
      return <OverviewDashboard pod={selectedPod} tenant={selectedTenant} />
  }
}
