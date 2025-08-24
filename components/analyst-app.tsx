"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, PieChart, Download, Filter, Database, Users, Activity } from "lucide-react"

const mockMetrics = [
  { label: "Total Patients", value: "12,450", change: "+5.2%", trend: "up" },
  { label: "Avg Length of Stay", value: "3.2 days", change: "-0.8%", trend: "down" },
  { label: "Readmission Rate", value: "8.4%", change: "-1.2%", trend: "down" },
  { label: "Patient Satisfaction", value: "4.7/5", change: "+0.3", trend: "up" },
]

export function AnalystApp() {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* App Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Analyst</h1>
              <p className="text-sm text-gray-500">Healthcare analytics and business intelligence platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Tenant: Acme Corp
            </Badge>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Analytics Interface */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="overview" className="h-full">
          <div className="border-b border-gray-200 px-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="patients">Patient Analytics</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{metric.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp
                            className={`w-3 h-3 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                          />
                          <span className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Patient Volume Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Patient volume chart would render here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Department Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Department distribution chart would render here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Monthly Quality Metrics", date: "2 hours ago", type: "Quality" },
                    { name: "Patient Satisfaction Survey", date: "1 day ago", type: "Survey" },
                    { name: "Financial Performance Q4", date: "3 days ago", type: "Financial" },
                  ].map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="font-medium text-sm">{report.name}</div>
                          <div className="text-xs text-gray-500">{report.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="p-6">
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Analytics</h3>
              <p className="text-gray-600 mb-4">Detailed patient demographics, outcomes, and care pathway analytics.</p>
              <Button>Explore Patient Data</Button>
            </div>
          </TabsContent>

          <TabsContent value="operations" className="p-6">
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Operations Analytics</h3>
              <p className="text-gray-600 mb-4">
                Operational efficiency, resource utilization, and workflow optimization insights.
              </p>
              <Button>View Operations Dashboard</Button>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="p-6">
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Analytics</h3>
              <p className="text-gray-600 mb-4">
                Revenue cycle management, cost analysis, and financial performance metrics.
              </p>
              <Button>Open Financial Dashboard</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
