import type { OnboardingData } from "@/types/onboarding"

// Define navigation item to job/task mappings
export const NAVIGATION_MAPPINGS = {
  // Platform Components
  "data-sources": {
    jobs: ["onboard-practice", "prepare-dataset", "manage-systems"],
    tasks: ["fhir", "raw", "analytics", "ai-enabled", "manage-data"],
    roles: ["developer", "data-engineer", "admin"],
  },
  channels: {
    jobs: ["prepare-dataset", "manage-systems", "enable-ai"],
    tasks: ["sharing", "manage-data", "healthcare-workflow"],
    roles: ["developer", "data-engineer", "devops"],
  },
  hdf: {
    jobs: ["prepare-dataset", "enable-ai"],
    tasks: ["analytics", "ai-enabled", "data-product", "analytical-functions"],
    roles: ["data-engineer", "analyst", "developer"],
  },
  "data-fabric": {
    jobs: ["manage-systems", "diagnose-problems"],
    tasks: ["manage-data", "manage-performance", "monitor", "troubleshoot"],
    roles: ["devops", "admin", "data-engineer"],
  },
  "data-access": {
    jobs: ["explore-apis", "prepare-dataset"],
    tasks: ["api-docs", "dev-tools", "fhir", "raw"],
    roles: ["developer", "data-engineer"],
  },
  agents: {
    jobs: ["enable-ai"],
    tasks: ["agent", "automation", "healthcare-workflow"],
    roles: ["developer", "data-engineer"],
  },
  workflows: {
    jobs: ["enable-ai", "manage-systems"],
    tasks: ["automation", "healthcare-workflow", "manage-application"],
    roles: ["developer", "devops"],
  },

  // Co-pilots
  playground: {
    jobs: ["explore-apis", "enable-ai"],
    tasks: ["dev-tools", "sample-apps", "agent"],
    roles: ["developer", "data-engineer"],
  },
  "provider-assistant": {
    jobs: ["enable-ai"],
    tasks: ["healthcare-workflow", "agent"],
    roles: ["developer", "analyst"],
  },
  analyst: {
    jobs: ["prepare-dataset", "enable-ai"],
    tasks: ["analytics", "analytical-functions", "financial-analysis"],
    roles: ["analyst", "data-engineer"],
  },

  // Enterprise Integrations
  "kafka-queues": {
    jobs: ["manage-systems", "provision-infra"],
    tasks: ["manage-infrastructure", "provision", "manage-data"],
    roles: ["devops", "data-engineer"],
  },
  "data-lakes": {
    jobs: ["prepare-dataset", "manage-systems"],
    tasks: ["raw", "analytics", "manage-data", "manage-infrastructure"],
    roles: ["data-engineer", "devops"],
  },
  "crm-systems": {
    jobs: ["onboard-practice", "manage-systems"],
    tasks: ["manage-application", "manage-data"],
    roles: ["admin", "developer"],
  },
  "external-databases": {
    jobs: ["prepare-dataset", "manage-systems"],
    tasks: ["raw", "manage-data", "manage-infrastructure"],
    roles: ["data-engineer", "devops"],
  },

  // Overview is always visible
  overview: {
    jobs: [],
    tasks: [],
    roles: [],
  },
}

/**
 * Filters navigation items based on user's onboarding selections
 * Returns true if the item should be visible
 */
export function shouldShowNavigationItem(itemId: string, onboardingData: OnboardingData | null): boolean {
  // If no onboarding data, show all items
  if (!onboardingData) {
    return true
  }

  // Overview is always visible
  if (itemId === "overview") {
    return true
  }

  const mapping = NAVIGATION_MAPPINGS[itemId as keyof typeof NAVIGATION_MAPPINGS]
  if (!mapping) {
    return false
  }

  // Check if user's role matches
  const roleMatches = mapping.roles.length === 0 || mapping.roles.includes(onboardingData.role)

  // Check if any of user's jobs match
  const jobMatches = mapping.jobs.length === 0 || onboardingData.job.some((userJob) => mapping.jobs.includes(userJob))

  // Check if any of user's tasks match
  const taskMatches =
    mapping.tasks.length === 0 || onboardingData.tasks.some((userTask) => mapping.tasks.includes(userTask))

  // Item is visible if role matches AND (job matches OR task matches)
  return roleMatches && (jobMatches || taskMatches)
}

/**
 * Filters an entire navigation bucket
 * Returns the bucket with filtered items, or null if no items are visible
 */
export function filterNavigationBucket(
  bucket: {
    id: string
    label: string
    icon: any
    items: Array<{ id: string; label: string; icon: any }>
  },
  onboardingData: OnboardingData | null,
) {
  const filteredItems = bucket.items.filter((item) => shouldShowNavigationItem(item.id, onboardingData))

  // If no items are visible, hide the entire bucket
  if (filteredItems.length === 0) {
    return null
  }

  return {
    ...bucket,
    items: filteredItems,
  }
}

/**
 * Gets priority score for navigation items based on user selections
 * Higher score = more relevant to user
 */
export function getNavigationItemPriority(itemId: string, onboardingData: OnboardingData | null): number {
  if (!onboardingData || itemId === "overview") {
    return 0
  }

  const mapping = NAVIGATION_MAPPINGS[itemId as keyof typeof NAVIGATION_MAPPINGS]
  if (!mapping) {
    return 0
  }

  let score = 0

  // Add points for role match
  if (mapping.roles.includes(onboardingData.role)) {
    score += 10
  }

  // Add points for each matching job
  const matchingJobs = onboardingData.job.filter((userJob) => mapping.jobs.includes(userJob))
  score += matchingJobs.length * 5

  // Add points for each matching task
  const matchingTasks = onboardingData.tasks.filter((userTask) => mapping.tasks.includes(userTask))
  score += matchingTasks.length * 3

  return score
}

export const JOB_AREA_NAVIGATION_BUCKETS = [
  {
    id: "onboard-practice",
    label: "Onboarding a Practice",
    jobKey: "onboard-practice",
    icon: "Building2",
    items: [
      { id: "overview", label: "Home", icon: "Home" },
      { id: "data-sources", label: "Data Sources", icon: "Database" },
      { id: "crm-systems", label: "CRM Systems", icon: "Building2" },
    ],
  },
  {
    id: "prepare-dataset",
    label: "Prepare a Dataset",
    jobKey: "prepare-dataset",
    icon: "Database",
    items: [
      { id: "data-sources", label: "Data Sources", icon: "Database" },
      { id: "channels", label: "Data Channels", icon: "Globe" },
      { id: "hdf", label: "Data Products", icon: "FileText" },
      { id: "data-lakes", label: "Data Lakes", icon: "Database" },
      { id: "external-databases", label: "External Databases", icon: "Database" },
      { id: "data-access", label: "Data Access", icon: "Code" },
    ],
  },
  {
    id: "manage-systems",
    label: "Manage",
    jobKey: "manage-systems",
    icon: "Settings",
    items: [
      { id: "data-fabric", label: "Data Operations", icon: "Activity" },
      { id: "workflows", label: "Workflows", icon: "Workflow" },
      { id: "kafka-queues", label: "Kafka Queues", icon: "Activity" },
      { id: "data-lakes", label: "Data Lakes", icon: "Database" },
      { id: "crm-systems", label: "CRM Systems", icon: "Building2" },
    ],
  },
  {
    id: "provision-infra",
    label: "Provision / De-provision",
    jobKey: "provision-infra",
    icon: "Server",
    items: [
      { id: "kafka-queues", label: "Kafka Queues", icon: "Activity" },
      { id: "data-lakes", label: "Data Lakes", icon: "Database" },
      { id: "external-databases", label: "External Databases", icon: "Database" },
    ],
  },
  {
    id: "diagnose-problems",
    label: "Diagnose (Monitor & Troubleshoot)",
    jobKey: "diagnose-problems",
    icon: "Activity",
    items: [
      { id: "data-fabric", label: "Data Operations", icon: "Activity" },
      { id: "kafka-queues", label: "Kafka Queues", icon: "Activity" },
    ],
  },
  {
    id: "explore-apis",
    label: "Explore",
    jobKey: "explore-apis",
    icon: "Code",
    items: [
      { id: "playground", label: "Playground", icon: "Code" },
      { id: "data-access", label: "Data Access", icon: "Code" },
    ],
  },
  {
    id: "enable-ai",
    label: "Enable for AI",
    jobKey: "enable-ai",
    icon: "Bot",
    items: [
      { id: "agents", label: "Agents", icon: "Bot" },
      { id: "workflows", label: "Workflows", icon: "Workflow" },
      { id: "hdf", label: "Data Products", icon: "FileText" },
      { id: "playground", label: "Playground", icon: "Code" },
      { id: "provider-assistant", label: "Provider Assistant", icon: "MessageSquare" },
      { id: "analyst", label: "Analyst", icon: "BarChart3" },
      { id: "channels", label: "Data Channels", icon: "Globe" },
    ],
  },
  {
    id: "ensure-compliance",
    label: "Ensure Compliance / Security",
    jobKey: "ensure-compliance",
    icon: "Shield",
    items: [
      { id: "data-access", label: "Data Access", icon: "Code" },
      { id: "data-fabric", label: "Data Operations", icon: "Activity" },
    ],
  },
]

/**
 * Filters job-area-based navigation buckets based on user's onboarding selections
 * Returns buckets that match the user's selected job areas
 */
export function filterJobAreaNavigationBuckets(onboardingData: OnboardingData | null) {
  // If no onboarding data, show all buckets
  if (!onboardingData) {
    return JOB_AREA_NAVIGATION_BUCKETS
  }

  // Filter buckets based on user's selected job areas
  return JOB_AREA_NAVIGATION_BUCKETS.filter((bucket) => {
    // Always show if user selected this job area
    return onboardingData.job.includes(bucket.jobKey)
  }).map((bucket) => {
    // Remove duplicate items within each bucket
    const uniqueItems = Array.from(new Map(bucket.items.map((item) => [item.id, item])).values())
    return {
      ...bucket,
      items: uniqueItems,
    }
  })
}

/**
 * Gets priority score for job area buckets based on user selections
 * Higher score = more relevant to user
 */
export function getJobAreaBucketPriority(bucketJobKey: string, onboardingData: OnboardingData | null): number {
  if (!onboardingData) {
    return 0
  }

  let score = 0

  // High priority if user selected this job area
  if (onboardingData.job.includes(bucketJobKey)) {
    score += 20
  }

  // Additional points based on how many tasks match this job area
  const bucket = JOB_AREA_NAVIGATION_BUCKETS.find((b) => b.jobKey === bucketJobKey)
  if (bucket) {
    bucket.items.forEach((item) => {
      const itemPriority = getNavigationItemPriority(item.id, onboardingData)
      score += itemPriority
    })
  }

  return score
}
