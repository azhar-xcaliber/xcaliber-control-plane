"use client"

import { OverviewDashboard } from "@/components/overview-dashboard"
import { ActivityFeed } from "@/components/activity-feed"
import { ApiBrowser } from "@/components/api-browser"
import { WorkflowsStudio } from "@/components/workflows-studio"
import { AgentsStudio } from "@/components/agents-studio"
import { DataStudio } from "@/components/data-studio"
import { DataSourcesView } from "@/components/data-sources-view"
import { ChannelsView } from "@/components/channels-view"
import { HdfView } from "@/components/hdf-view"
import { DataFabricView } from "@/components/data-fabric-view"
import { DataAccessView } from "@/components/data-access-view"
import { PlaygroundApp } from "@/components/playground-app"
import { ProviderAssistantApp } from "@/components/provider-assistant-app"
import { AnalystApp } from "@/components/analyst-app"
import { KafkaQueuesView } from "@/components/kafka-queues-view"
import { DataLakesView } from "@/components/data-lakes-view"
import { CrmSystemsView } from "@/components/crm-systems-view"
import { ExternalDatabasesView } from "@/components/external-databases-view"
import { TenantContextBanner } from "@/components/tenant-context-banner"
import type { Activity } from "@/types/activity"

interface MainContentProps {
  selectedPod: string
  selectedTenant: string
  selectedService: string
  selectedTab: string
  onTabSelect: (tab: string) => void
  onActivitySelect: (activity: Activity) => void
}

// Mock tenant data - in real app this would come from props or context
const mockTenantData = {
  "tenant-1": {
    id: "tenant-1",
    name: "Acme Corp",
    fullName: "Henry Ford Health Services",
    plan: "Enterprise",
    environment: "Production",
    status: "Active",
    sharedCompute: "AWS-East-1",
    dataLake: "Snowflake",
    softwareVersion: "2.4.1",
    logoUrl: "/placeholder.svg?height=32&width=32&text=HF",
    url: "henryford.xcaliber.health",
    operationDuration: "2y 4m",
  },
  "tenant-2": {
    id: "tenant-2",
    name: "TechStart Inc",
    fullName: "TechStart Healthcare Solutions Inc",
    plan: "Professional",
    environment: "Staging",
    status: "Active",
    sharedCompute: "Azure-Central",
    dataLake: "Databricks",
    softwareVersion: "2.5.0-rc1",
    logoUrl: "/placeholder.svg?height=32&width=32&text=TS",
    url: "techstart.xcaliber.health",
    operationDuration: "8m",
  },
  "tenant-3": {
    id: "tenant-3",
    name: "Global Systems",
    fullName: "Global Healthcare Systems",
    plan: "Enterprise",
    environment: "Production",
    status: "Maintenance",
    sharedCompute: "GCP-West",
    dataLake: "BigQuery",
    softwareVersion: "2.4.1",
    logoUrl: "/placeholder.svg?height=32&width=32&text=GS",
    url: "global.xcaliber.health",
    operationDuration: "1y 2m",
  },
  "tenant-4": {
    id: "tenant-4",
    name: "StartupCo",
    fullName: "StartupCo Health Technologies",
    plan: "Starter",
    environment: "Development",
    status: "Active",
    sharedCompute: "AWS-West-2",
    dataLake: "S3",
    softwareVersion: "2.5.0-beta",
    logoUrl: "/placeholder.svg?height=32&width=32&text=SC",
    url: "startup.xcaliber.health",
    operationDuration: "3m",
  },
}

const getServiceDisplayName = (service: string) => {
  const serviceNames: Record<string, string> = {
    overview: "Platform Overview",
    "data-sources": "Data Sources",
    channels: "Channels",
    hdf: "Healthcare Data Factory",
    "data-fabric": "Data Fabric",
    "data-access": "Data Access",
    agents: "Agents Studio",
    workflows: "Workflows Studio",
    playground: "Playground",
    "provider-assistant": "Provider Assistant",
    analyst: "Analyst",
    "kafka-queues": "Kafka Queues",
    "data-lakes": "Data Lakes",
    "crm-systems": "CRM Systems",
    "external-databases": "External Databases",
    activity: "Activity Feed",
    "api-browser": "API Browser",
    data: "Data Studio",
  }
  return serviceNames[service] || service
}

export function MainContent({
  selectedPod,
  selectedTenant,
  selectedService,
  selectedTab,
  onTabSelect,
  onActivitySelect,
}: MainContentProps) {
  const currentTenant = mockTenantData[selectedTenant as keyof typeof mockTenantData] || mockTenantData["tenant-1"]
  const currentServiceName = getServiceDisplayName(selectedService)

  const renderContent = () => {
    // Route to different views based on selected service
    switch (selectedService) {
      // Platform Components (in new order)
      case "overview":
        return <OverviewDashboard pod={selectedPod} tenant={selectedTenant} />

      case "data-sources":
        return <DataSourcesView />

      case "channels":
        return <ChannelsView />

      case "hdf":
        return <HdfView />

      case "data-fabric":
        return <DataFabricView />

      case "data-access":
        return <DataAccessView />

      case "agents":
        return <AgentsStudio onActivitySelect={onActivitySelect} />

      case "workflows":
        return <WorkflowsStudio onActivitySelect={onActivitySelect} />

      // Co-pilots (Full-scale single-page applications)
      case "playground":
        return <PlaygroundApp />

      case "provider-assistant":
        return <ProviderAssistantApp />

      case "analyst":
        return <AnalystApp />

      // Enterprise Integrations
      case "kafka-queues":
        return <KafkaQueuesView />

      case "data-lakes":
        return <DataLakesView />

      case "crm-systems":
        return <CrmSystemsView />

      case "external-databases":
        return <ExternalDatabasesView />

      // Legacy routes for backward compatibility
      case "activity":
        return <ActivityFeed onActivitySelect={onActivitySelect} pod={selectedPod} tenant={selectedTenant} />

      case "api-browser":
        return <ApiBrowser />

      case "data":
        return <DataStudio onActivitySelect={onActivitySelect} />

      // Default fallback
      default:
        return <OverviewDashboard pod={selectedPod} tenant={selectedTenant} />
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Tenant Context Banner */}
      <TenantContextBanner tenant={currentTenant} currentComponent={currentServiceName} currentPage="" />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">{renderContent()}</div>
    </div>
  )
}
