import type { OnboardingData } from "@/types/onboarding"

// Define what features each role/job/task should see in each module
export const modulePersonalization = {
  // Overview Dashboard personalization
  overview: {
    roles: {
      developer: ["api-usage", "integrations", "documentation", "sandbox", "deployments"],
      "data-engineer": ["data-pipelines", "data-quality", "sync-status", "performance-metrics", "data-catalog"],
      devops: ["infrastructure", "deployments", "monitoring", "incidents", "system-health"],
      analyst: ["analytics", "reports", "insights", "trends", "dashboards"],
      admin: ["system-health", "tenant-overview", "resource-usage", "alerts", "audit-logs", "user-management"],
      compliance: ["compliance", "security", "audit-logs", "policies", "access-control"],
    },
    jobs: {
      "onboard-practice": ["tenant-setup", "data-source-config", "user-provisioning", "quick-start"],
      "prepare-dataset": ["data-sources", "data-quality", "transformations", "validation", "data-catalog"],
      "manage-systems": ["monitoring", "performance", "availability", "infrastructure", "deployments"],
      "provision-infra": ["resource-allocation", "tenant-management", "infrastructure", "scaling"],
      "diagnose-problems": ["logs", "traces", "metrics", "alerts", "debugging", "monitoring"],
      "explore-apis": ["api-browser", "documentation", "examples", "playground", "integrations"],
      "enable-ai": ["ai-features", "ml-models", "ai-workflows", "agents", "automation"],
      "ensure-compliance": ["audit-logs", "security", "compliance-reports", "policies", "access-control"],
    },
    tasks: {
      // Prepare dataset tasks
      fhir: ["fhir-sources", "fhir-validation", "fhir-transformations"],
      raw: ["raw-data-sources", "data-ingestion", "data-quality"],
      analytics: ["analytics-pipelines", "data-warehouse", "reports"],
      "ai-enabled": ["ai-data-prep", "feature-engineering", "ml-pipelines"],
      sharing: ["data-sharing", "access-control", "data-catalog"],

      // Manage tasks
      "manage-data": ["data-catalog", "data-lineage", "data-quality", "metadata"],
      "manage-application": ["deployments", "configurations", "versions", "updates"],
      "manage-performance": ["metrics", "optimization", "caching", "scaling"],
      "manage-availability": ["uptime", "health-checks", "failover", "redundancy"],
      "financial-analysis": ["cost-tracking", "usage-reports", "billing", "optimization"],
      "manage-infrastructure": ["servers", "networking", "storage", "compute"],

      // Provision tasks
      provision: ["create-tenant", "allocate-resources", "setup-access"],
      "de-provision": ["remove-tenant", "cleanup-resources", "revoke-access"],

      // Diagnose tasks
      monitor: ["real-time-monitoring", "dashboards", "alerts", "metrics"],
      troubleshoot: ["logs", "traces", "debugging", "error-tracking"],

      // Explore tasks
      "api-docs": ["api-reference", "documentation", "guides"],
      "dev-tools": ["playground", "testing", "debugging-tools"],
      "sample-apps": ["examples", "templates", "tutorials"],

      // Enable AI tasks
      "ai-data": ["ai-data-prep", "feature-store", "data-labeling"],
      "healthcare-workflow": ["clinical-workflows", "patient-journey", "care-coordination"],
      automation: ["workflow-automation", "rule-engines", "triggers"],
      migration: ["data-migration", "etl-pipelines", "transformation"],
      agent: ["ai-agents", "agent-studio", "agent-deployment"],
      "data-product": ["data-products", "data-apis", "data-marketplace"],
      "analytical-functions": ["analytics", "ml-models", "predictions"],

      // Compliance tasks
      security: ["security-policies", "encryption", "access-control", "threat-detection"],
      compliance: ["audit-logs", "compliance-reports", "certifications", "policies"],
    },
  },

  // Data Sources personalization
  dataSources: {
    roles: {
      admin: ["all-sources", "create", "edit", "delete", "configure", "monitor", "audit"],
      "data-engineer": ["all-sources", "create", "edit", "configure", "test", "sync", "transform"],
      devops: ["view-sources", "monitor", "troubleshoot", "logs", "health-checks"],
      compliance: ["view-sources", "compliance", "security", "audit", "policies"],
      developer: ["view-sources", "test", "sandbox", "api-access"],
      analyst: ["view-sources", "data-preview", "query"],
    },
    jobs: {
      "onboard-practice": ["create-source", "configure", "test-connection", "validate", "quick-setup"],
      "prepare-dataset": ["select-source", "configure-sync", "transform", "validate", "schedule"],
      "manage-systems": ["monitor-sources", "data-quality", "sync-status", "performance"],
      "diagnose-problems": ["view-logs", "test-connection", "troubleshoot", "error-tracking"],
      "ensure-compliance": ["compliance-check", "security-config", "audit-trail", "encryption"],
    },
    tasks: {
      fhir: ["fhir-sources", "fhir-validation", "fhir-mapping"],
      raw: ["raw-sources", "file-upload", "streaming"],
      analytics: ["analytics-sources", "data-warehouse-connection"],
      "ai-enabled": ["ai-sources", "feature-extraction"],
      sharing: ["shared-sources", "access-permissions"],
      "manage-data": ["source-monitoring", "data-quality-checks"],
      provision: ["create-source", "configure-source"],
      "de-provision": ["delete-source", "cleanup"],
      monitor: ["source-health", "sync-status"],
      troubleshoot: ["connection-test", "error-logs"],
      security: ["encryption", "access-control"],
      compliance: ["audit-trail", "compliance-validation"],
    },
  },

  // Agents Studio personalization
  agents: {
    roles: {
      admin: ["all-agents", "create", "edit", "delete", "deploy", "monitor", "manage"],
      "data-engineer": ["view-agents", "create", "configure", "test", "data-agents"],
      devops: ["view-agents", "deploy", "monitor", "logs", "infrastructure"],
      developer: ["all-agents", "create", "edit", "test", "debug", "api-integration"],
      analyst: ["view-agents", "run", "results", "analytics"],
    },
    jobs: {
      "enable-ai": ["ai-agents", "ml-agents", "automation", "workflows", "deployment"],
      "manage-systems": ["deploy-agents", "version-control", "monitoring", "scaling"],
      "diagnose-problems": ["debug-agents", "logs", "traces", "testing", "error-handling"],
      "explore-apis": ["agent-apis", "integration", "examples"],
    },
    tasks: {
      agent: ["create-agent", "configure-agent", "deploy-agent", "monitor-agent"],
      automation: ["automated-agents", "triggers", "scheduling"],
      "ai-data": ["data-agents", "etl-agents"],
      "healthcare-workflow": ["clinical-agents", "workflow-agents"],
      "analytical-functions": ["analytics-agents", "ml-agents"],
      "manage-application": ["agent-deployment", "version-control"],
      monitor: ["agent-monitoring", "performance-tracking"],
      troubleshoot: ["agent-debugging", "error-logs"],
    },
  },

  // Workflows Studio personalization
  workflows: {
    roles: {
      admin: ["all-workflows", "create", "edit", "delete", "deploy", "monitor", "manage"],
      "data-engineer": ["data-workflows", "create", "edit", "test", "schedule", "etl"],
      devops: ["view-workflows", "deploy", "monitor", "troubleshoot", "infrastructure"],
      developer: ["all-workflows", "create", "edit", "test", "debug", "integration"],
      analyst: ["view-workflows", "run", "results", "reports", "analytics"],
    },
    jobs: {
      "prepare-dataset": ["data-workflows", "transformations", "validation", "scheduling"],
      "enable-ai": ["ai-workflows", "ml-pipelines", "automation", "orchestration"],
      "manage-systems": ["deploy-workflows", "scheduling", "monitoring", "optimization"],
      "diagnose-problems": ["debug-workflows", "logs", "execution-history", "error-handling"],
    },
    tasks: {
      fhir: ["fhir-workflows", "fhir-transformation"],
      raw: ["data-ingestion-workflows", "etl-workflows"],
      analytics: ["analytics-workflows", "reporting-workflows"],
      "ai-enabled": ["ml-workflows", "ai-pipelines"],
      automation: ["automated-workflows", "triggers", "scheduling"],
      migration: ["migration-workflows", "data-transfer"],
      "manage-application": ["workflow-deployment", "version-control"],
      "manage-performance": ["workflow-optimization", "performance-tuning"],
      monitor: ["workflow-monitoring", "execution-tracking"],
      troubleshoot: ["workflow-debugging", "error-analysis"],
    },
  },

  // API Browser personalization
  apiBrowser: {
    roles: {
      developer: ["all-endpoints", "test", "documentation", "examples", "playground", "authentication"],
      "data-engineer": ["data-apis", "query-apis", "bulk-apis", "etl-apis"],
      admin: ["admin-apis", "management-apis", "monitoring-apis", "user-apis"],
      analyst: ["query-apis", "analytics-apis", "reporting-apis"],
    },
    jobs: {
      "explore-apis": ["documentation", "examples", "playground", "testing", "guides"],
      "manage-systems": ["management-apis", "monitoring-apis", "admin-apis"],
      "prepare-dataset": ["data-apis", "ingestion-apis", "transformation-apis"],
      "enable-ai": ["ai-apis", "ml-apis", "inference-apis", "agent-apis"],
    },
    tasks: {
      "api-docs": ["api-reference", "documentation", "guides", "tutorials"],
      "dev-tools": ["playground", "testing-tools", "debugging"],
      "sample-apps": ["code-examples", "templates", "quickstarts"],
      "manage-data": ["data-apis", "crud-operations", "query-apis"],
      agent: ["agent-apis", "agent-management"],
      automation: ["workflow-apis", "automation-apis"],
    },
  },

  // Activity Feed personalization
  activity: {
    roles: {
      admin: ["all-activities", "system-events", "user-actions", "audit", "security-events"],
      devops: ["system-events", "deployments", "incidents", "performance", "infrastructure"],
      "data-engineer": ["data-events", "pipeline-runs", "sync-events", "etl-jobs"],
      compliance: ["user-activities", "access-logs", "compliance-events", "security-events"],
      developer: ["api-calls", "errors", "debugging", "integration-events"],
    },
    jobs: {
      "diagnose-problems": ["errors", "warnings", "traces", "logs", "debugging", "incidents"],
      "manage-systems": ["system-events", "performance-events", "deployments", "monitoring"],
      "ensure-compliance": ["audit-logs", "access-logs", "security-events", "compliance-events"],
    },
    tasks: {
      monitor: ["real-time-events", "system-monitoring", "alerts"],
      troubleshoot: ["error-logs", "debug-traces", "incident-tracking"],
      "manage-performance": ["performance-events", "slow-queries", "bottlenecks"],
      security: ["security-events", "threat-detection", "access-logs"],
      compliance: ["audit-logs", "compliance-events", "policy-violations"],
      "manage-application": ["deployment-events", "version-changes"],
    },
  },
}

// Utility function to check if a feature should be shown
export function shouldShowFeature(
  module: keyof typeof modulePersonalization,
  feature: string,
  onboardingData: OnboardingData | null,
): boolean {
  if (!onboardingData) return true // Show everything if no onboarding data

  const moduleConfig = modulePersonalization[module]
  if (!moduleConfig) return true

  // Check role-based features
  if ("roles" in moduleConfig && onboardingData.role) {
    const roleFeatures = moduleConfig.roles[onboardingData.role as keyof typeof moduleConfig.roles]
    if (roleFeatures && roleFeatures.includes(feature)) return true
  }

  // Check job-based features
  if ("jobs" in moduleConfig && onboardingData.jobs) {
    for (const job of onboardingData.jobs) {
      const jobFeatures = moduleConfig.jobs[job as keyof typeof moduleConfig.jobs]
      if (jobFeatures && jobFeatures.includes(feature)) return true
    }
  }

  // Check task-based features
  if ("tasks" in moduleConfig && onboardingData.tasks) {
    for (const task of onboardingData.tasks) {
      const taskFeatures = moduleConfig.tasks[task as keyof typeof moduleConfig.tasks]
      if (taskFeatures && taskFeatures.includes(feature)) return true
    }
  }

  return false
}

// Get priority features for a module based on onboarding data
export function getPriorityFeatures(
  module: keyof typeof modulePersonalization,
  onboardingData: OnboardingData | null,
): string[] {
  if (!onboardingData) return []

  const features = new Set<string>()
  const moduleConfig = modulePersonalization[module]
  if (!moduleConfig) return []

  // Collect features from role
  if ("roles" in moduleConfig && onboardingData.role) {
    const roleFeatures = moduleConfig.roles[onboardingData.role as keyof typeof moduleConfig.roles]
    if (roleFeatures) roleFeatures.forEach((f) => features.add(f))
  }

  // Collect features from jobs
  if ("jobs" in moduleConfig && onboardingData.jobs) {
    for (const job of onboardingData.jobs) {
      const jobFeatures = moduleConfig.jobs[job as keyof typeof moduleConfig.jobs]
      if (jobFeatures) jobFeatures.forEach((f) => features.add(f))
    }
  }

  // Collect features from tasks (highest priority)
  if ("tasks" in moduleConfig && onboardingData.tasks) {
    for (const task of onboardingData.tasks) {
      const taskFeatures = moduleConfig.tasks[task as keyof typeof moduleConfig.tasks]
      if (taskFeatures) taskFeatures.forEach((f) => features.add(f))
    }
  }

  return Array.from(features)
}

// Get personalized welcome message based on role and tasks
export function getPersonalizedWelcome(onboardingData: OnboardingData | null): string {
  if (!onboardingData) return "Welcome to XCaliber Control Plane"

  const { role, jobs, tasks } = onboardingData

  // Create personalized message based on primary task
  if (tasks && tasks.length > 0) {
    const primaryTask = tasks[0]
    const taskMessages: Record<string, string> = {
      "onboard-practice": "Let's get your practice onboarded quickly",
      "prepare-dataset": "Ready to prepare your datasets",
      "manage-data": "Your data management hub",
      "manage-application": "Application management at your fingertips",
      "manage-performance": "Optimize your platform performance",
      provision: "Manage tenant provisioning",
      "de-provision": "Manage tenant de-provisioning",
      monitor: "Troubleshooting tools ready",
      troubleshoot: "Troubleshooting tools ready",
      "ai-enabled": "Enable AI capabilities",
      "api-docs": "Explore our API ecosystem",
      "sample-apps": "Explore sample applications",
      automation: "Automation tools ready",
      migration: "Data migration tools ready",
      agent: "Agent management tools ready",
      "data-product": "Data product management tools ready",
      "analytical-functions": "Analytical functions ready",
      security: "Security dashboard",
      compliance: "Compliance and security dashboard",
    }
    return taskMessages[primaryTask] || `Welcome, ${role}`
  }

  return `Welcome, ${role}`
}

// Get quick actions based on onboarding data
export function getQuickActions(onboardingData: OnboardingData | null): Array<{
  label: string
  action: string
  icon: string
}> {
  if (!onboardingData) return []

  const actions: Array<{ label: string; action: string; icon: string }> = []

  // Add actions based on tasks
  if (onboardingData.tasks) {
    const taskActions: Record<string, { label: string; action: string; icon: string }> = {
      "onboard-practice": { label: "Create Data Source", action: "data-sources", icon: "plus" },
      "prepare-dataset": { label: "Configure Pipeline", action: "workflows", icon: "workflow" },
      "manage-data": { label: "View Data Catalog", action: "data-fabric", icon: "database" },
      "manage-application": { label: "View Deployments", action: "overview", icon: "rocket" },
      "manage-performance": { label: "View Metrics", action: "overview", icon: "chart" },
      provision: { label: "Manage Tenants", action: "overview", icon: "users" },
      "de-provision": { label: "Manage Tenants", action: "overview", icon: "users" },
      monitor: { label: "View Activity Logs", action: "activity", icon: "bug" },
      troubleshoot: { label: "View Activity Logs", action: "activity", icon: "bug" },
      "ai-enabled": { label: "Create AI Agent", action: "agents", icon: "sparkles" },
      "api-docs": { label: "Browse APIs", action: "api-browser", icon: "code" },
      "sample-apps": { label: "Browse Sample Apps", action: "api-browser", icon: "code" },
      automation: { label: "Configure Workflows", action: "workflows", icon: "workflow" },
      migration: { label: "Migrate Data", action: "workflows", icon: "workflow" },
      agent: { label: "Manage Agents", action: "agents", icon: "sparkles" },
      "data-product": { label: "Manage Data Products", action: "agents", icon: "sparkles" },
      "analytical-functions": { label: "Run Analytics", action: "agents", icon: "sparkles" },
      security: { label: "Manage Security", action: "activity", icon: "shield" },
      compliance: { label: "Manage Compliance", action: "activity", icon: "shield" },
    }

    onboardingData.tasks.slice(0, 3).forEach((task) => {
      if (taskActions[task]) {
        actions.push(taskActions[task])
      }
    })
  }

  return actions
}
