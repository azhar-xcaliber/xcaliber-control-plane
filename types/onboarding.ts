export interface OnboardingData {
  role: string
  job: string[]
  tasks: string[]
  completed: boolean
}

export const ROLES = [
  { value: "developer", label: "Developer", description: "Build and integrate applications" },
  { value: "data-engineer", label: "Data Engineer", description: "Manage and prepare datasets" },
  { value: "devops", label: "DevOps Engineer", description: "Provision and manage infrastructure" },
  { value: "analyst", label: "Data Analyst", description: "Analyze and visualize data" },
  { value: "admin", label: "System Administrator", description: "Manage system operations" },
  { value: "compliance", label: "Compliance Officer", description: "Ensure security and compliance" },
]

export const JOBS = [
  { value: "onboard-practice", label: "Onboarding a practice", icon: "🏥" },
  { value: "prepare-dataset", label: "Prepare a dataset", icon: "📊" },
  { value: "manage-systems", label: "Manage systems", icon: "⚙️" },
  { value: "provision-infra", label: "Provision infrastructure", icon: "🔧" },
  { value: "diagnose-problems", label: "Diagnose problems", icon: "🔍" },
  { value: "explore-apis", label: "Explore APIs", icon: "📚" },
  { value: "enable-ai", label: "Enable for AI", icon: "🤖" },
  { value: "ensure-compliance", label: "Ensure compliance/security", icon: "🔒" },
]

export const TASKS = [
  // Prepare dataset tasks
  { value: "fhir", label: "FHIR", category: "prepare-dataset" },
  { value: "raw", label: "Raw data", category: "prepare-dataset" },
  { value: "analytics", label: "Analytics", category: "prepare-dataset" },
  { value: "ai-enabled", label: "AI enabled", category: "prepare-dataset" },
  { value: "sharing", label: "Data sharing", category: "prepare-dataset" },

  // Manage tasks
  { value: "manage-data", label: "Data", category: "manage-systems" },
  { value: "manage-application", label: "Application", category: "manage-systems" },
  { value: "manage-performance", label: "Performance", category: "manage-systems" },
  { value: "manage-availability", label: "Availability", category: "manage-systems" },
  { value: "financial-analysis", label: "Financial analysis", category: "manage-systems" },
  { value: "manage-infrastructure", label: "Infrastructure", category: "manage-systems" },

  // Provision tasks
  { value: "provision", label: "Provision resources", category: "provision-infra" },
  { value: "de-provision", label: "De-provision resources", category: "provision-infra" },

  // Diagnose tasks
  { value: "monitor", label: "Monitor systems", category: "diagnose-problems" },
  { value: "troubleshoot", label: "Troubleshoot issues", category: "diagnose-problems" },

  // Explore tasks
  { value: "api-docs", label: "API documentation", category: "explore-apis" },
  { value: "dev-tools", label: "Developer tools", category: "explore-apis" },
  { value: "sample-apps", label: "Sample apps", category: "explore-apis" },

  // Enable AI tasks
  { value: "ai-data", label: "AI data preparation", category: "enable-ai" },
  { value: "healthcare-workflow", label: "Healthcare workflow", category: "enable-ai" },
  { value: "automation", label: "Automation", category: "enable-ai" },
  { value: "migration", label: "Migration", category: "enable-ai" },
  { value: "agent", label: "AI Agent", category: "enable-ai" },
  { value: "data-product", label: "Data product", category: "enable-ai" },
  { value: "analytical-functions", label: "Analytical functions", category: "enable-ai" },

  // Compliance tasks
  { value: "security", label: "Security", category: "ensure-compliance" },
  { value: "compliance", label: "Compliance", category: "ensure-compliance" },
]
