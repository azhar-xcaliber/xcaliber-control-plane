"use client"
import { ComponentLayout } from "@/components/component-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Activity, Database, CheckCircle } from "lucide-react"

const mockHdfActivityData = [
  {
    id: "act_hdf_001",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    type: "success" as const,
    action: "Data Quality Check Completed",
    description: "Completed quality validation on patient demographics dataset",
    user: "system",
    metadata: { dataset: "patient_demographics", recordsValidated: 15420, issuesFound: 0 },
  },
  {
    id: "act_hdf_002",
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
    type: "warning" as const,
    action: "Schema Drift Detected",
    description: "Detected schema changes in lab results data feed",
    user: "system",
    metadata: { dataset: "lab_results", fieldsChanged: 2, compatibility: "backward" },
  },
  {
    id: "act_hdf_003",
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
    type: "info" as const,
    action: "Dataset Published",
    description: "Published curated medication dataset to data catalog",
    user: "data.curator@hospital.com",
    metadata: { dataset: "medications_curated", version: "v2.3", records: 8934 },
  },
]

const mockHdfTasksData = [
  {
    id: "task_hdf_001",
    title: "Implement New Data Quality Rules",
    description: "Add validation rules for new patient consent data fields",
    status: "pending" as const,
    priority: "high" as const,
    assignee: "data.quality@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ["data-quality", "validation", "consent"],
  },
  {
    id: "task_hdf_002",
    title: "Optimize ETL Performance",
    description: "Improve performance of nightly ETL processes for claims data",
    status: "in-progress" as const,
    priority: "medium" as const,
    assignee: "etl.team@hospital.com",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    tags: ["performance", "etl", "claims"],
  },
]

const mockHdfConfigData = [
  {
    id: "config_hdf_001",
    name: "Data Quality Threshold",
    type: "number",
    value: 95,
    description: "Minimum data quality score required for dataset publication",
    category: "Quality",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    modifiedBy: "data.quality@hospital.com",
    defaultValue: 90,
  },
  {
    id: "config_hdf_002",
    name: "Enable Data Lineage Tracking",
    type: "boolean",
    value: true,
    description: "Track data lineage for all processed datasets",
    category: "Governance",
    isEditable: false,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    modifiedBy: "governance@hospital.com",
    defaultValue: true,
  },
  {
    id: "config_hdf_003",
    name: "Batch Processing Window",
    type: "string",
    value: "02:00-06:00",
    description: "Time window for batch processing operations",
    category: "Processing",
    isEditable: true,
    isRequired: true,
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modifiedBy: "operations@hospital.com",
    defaultValue: "01:00-05:00",
  },
]

export function HdfView() {
  const handleRefresh = () => {
    console.log("Refreshing Healthcare Data Factory...")
  }

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Datasets</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Processes</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Quality Score</p>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Records/Day</p>
                <p className="text-2xl font-bold text-purple-600">1.2M</p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HDF Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Healthcare Data Factory Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-4">Healthcare Data Factory Management</div>
            <div className="text-sm text-gray-400">
              Centralized healthcare data processing, validation, and transformation hub.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ComponentLayout
      title="Healthcare Data Factory (HDF)"
      description="Centralized healthcare data processing and validation hub"
      dashboardContent={dashboardContent}
      onRefresh={handleRefresh}
      activityData={mockHdfActivityData}
      tasksData={mockHdfTasksData}
      configurationData={mockHdfConfigData}
    >
      {dashboardContent}
    </ComponentLayout>
  )
}
