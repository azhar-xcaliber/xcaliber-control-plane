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
    const stored = localStorage.getItem("xcaliber-onboarding")
    if (stored) {
      const data = JSON.parse(stored) as OnboardingData
      setOnboardingData(data)
      setShowOnboarding(false)
    } else {
      setShowOnboarding(true)
    }
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
        />

        <MainContent
          selectedPod={selectedPod}
          selectedTenant={selectedTenant}
          selectedService={selectedPodService}
          selectedTab={selectedTab}
          onTabSelect={setSelectedTab}
          onActivitySelect={handleActivitySelect}
        />

        <ActivityDrawer activity={selectedActivity} isOpen={isDrawerOpen} onClose={handleDrawerClose} />
      </div>
    </>
  )
}
