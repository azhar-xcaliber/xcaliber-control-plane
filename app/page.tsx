"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { ActivityDrawer } from "@/components/activity-drawer"
import { OnboardingModal } from "@/components/onboarding-modal"
import type { Activity } from "@/types/activity"
import type { OnboardingData } from "@/types/onboarding"

export default function XCaliberControlPanel() {
  const [selectedPod, setSelectedPod] = useState("prod-east")
  const [selectedTenant, setSelectedTenant] = useState("tenant-1")
  const [selectedPodService, setSelectedPodService] = useState("overview")
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)

  useEffect(() => {
    setShowOnboarding(true)
  }, [])

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    setSelectedActivity(null)
  }

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log("[v0] Onboarding completed with data:", data)
    setOnboardingData(data)
    setShowOnboarding(false)
  }

  return (
    <>
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} />}

      <div className="flex h-screen bg-gray-50">
        <Sidebar
          selectedPod={selectedPod}
          onPodSelect={setSelectedPod}
          selectedTenant={selectedTenant}
          onTenantSelect={setSelectedTenant}
          selectedService={selectedPodService}
          onServiceSelect={setSelectedPodService}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={setIsSidebarCollapsed}
          onboardingData={onboardingData}
        />

        <MainContent
          selectedPod={selectedPod}
          selectedTenant={selectedTenant}
          selectedService={selectedPodService}
          selectedTab={selectedTab}
          onTabSelect={setSelectedTab}
          onActivitySelect={handleActivitySelect}
          onboardingData={onboardingData}
        />

        <ActivityDrawer activity={selectedActivity} isOpen={isDrawerOpen} onClose={handleDrawerClose} />
      </div>
    </>
  )
}
