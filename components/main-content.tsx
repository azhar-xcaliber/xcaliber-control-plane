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
import type { OnboardingData } from "@/types/onboarding"

interface MainContentProps {
  selectedPod: string
  selectedTenant: string
  selectedService: string
  selectedTab: string
  onTabSelect: (tab: string) => void
  onActivitySelect: (activity: Activity) => void
  onboardingData: OnboardingData | null
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
    channels: "Data Channels",
    hdf: "Data Products",
    "data-fabric": "Data Operations",
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
  onboardingData,
}: MainContentProps) {
  const currentTenant = mockTenantData[selectedTenant as keyof typeof mockTenantData] || mockTenantData["tenant-1"]
  const currentServiceName = getServiceDisplayName(selectedService)

  const renderContent = () => {
    switch (selectedService) {
      case "overview":
        return <OverviewDashboard pod={selectedPod} tenant={selectedTenant} onboardingData={onboardingData} />

      case "data-sources":
        return <DataSourcesView onboardingData={onboardingData} />

      case "channels":
        return <ChannelsView onboardingData={onboardingData} />

      case "hdf":
        return <HdfView onboardingData={onboardingData} />

      case "data-fabric":
        return <DataFabricView onboardingData={onboardingData} />

      case "data-access":
        return <DataAccessView onboardingData={onboardingData} />

      case "agents":
        return <AgentsStudio onActivitySelect={onActivitySelect} onboardingData={onboardingData} />

      case "workflows":
        return <WorkflowsStudio onActivitySelect={onActivitySelect} onboardingData={onboardingData} />

      case "playground":
        return <PlaygroundApp onboardingData={onboardingData} />

      case "provider-assistant":
        return <ProviderAssistantApp onboardingData={onboardingData} />

      case "analyst":
        return <AnalystApp onboardingData={onboardingData} />

      case "kafka-queues":
        return <KafkaQueuesView onboardingData={onboardingData} />

      case "data-lakes":
        return <DataLakesView onboardingData={onboardingData} />

      case "crm-systems":
        return <CrmSystemsView onboardingData={onboardingData} />

      case "external-databases":
        return <ExternalDatabasesView onboardingData={onboardingData} />

      case "activity":
        return (
          <ActivityFeed
            onActivitySelect={onActivitySelect}
            pod={selectedPod}
            tenant={selectedTenant}
            onboardingData={onboardingData}
          />
        )

      case "api-browser":
        return <ApiBrowser onboardingData={onboardingData} />

      case "data":
        return <DataStudio onActivitySelect={onActivitySelect} onboardingData={onboardingData} />

      default:
        return <OverviewDashboard pod={selectedPod} tenant={selectedTenant} onboardingData={onboardingData} />
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <TenantContextBanner tenant={currentTenant} currentComponent={currentServiceName} currentPage="" />
      <div className="flex-1 overflow-hidden">{renderContent()}</div>
    </div>
  )
}
