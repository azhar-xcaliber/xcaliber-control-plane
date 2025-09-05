"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Download, Calendar, Zap, Database, Activity } from "lucide-react"

interface BillingReport {
  id: string
  period: string
  type: string
  totalCost: number
  apiCalls: number
  storageGB: number
  computeHours: number
  status: string
  dueDate: Date
  components: Record<string, number>
}

interface BillingDetailsDrawerProps {
  billing: BillingReport | null
  isOpen: boolean
  onClose: () => void
}

export function BillingDetailsDrawer({ billing, isOpen, onClose }: BillingDetailsDrawerProps) {
  if (!isOpen || !billing) return null

  const handleDownload = () => {
    console.log("Downloading billing report:", billing.id)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-96 h-full flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Billing Details</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className={
                billing.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : billing.status === "finalized"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
              }
            >
              {billing.status}
            </Badge>
            <Badge variant="outline">{billing.type}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Period and Total */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">${billing.totalCost.toLocaleString()}</h3>
            <p className="text-gray-600">{billing.period}</p>
            <p className="text-sm text-gray-500">Due: {billing.dueDate.toLocaleDateString()}</p>
          </div>

          {/* Usage Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Usage Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">API Calls</span>
                </div>
                <span className="font-medium">{billing.apiCalls.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Storage</span>
                </div>
                <span className="font-medium">{billing.storageGB}GB</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Compute Hours</span>
                </div>
                <span className="font-medium">{billing.computeHours}h</span>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown by Component */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(billing.components).map(([component, cost]) => (
                <div key={component} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{component}</span>
                  <span className="font-medium">${cost.toLocaleString()}</span>
                </div>
              ))}

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">${billing.totalCost.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing History */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h4>

            <div className="space-y-2">
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Invoice generated</span>
                <span>•</span>
                <span>Dec 1, 2024</span>
              </div>

              {billing.status === "paid" && (
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Payment received</span>
                  <span>•</span>
                  <span>Dec 10, 2024</span>
                </div>
              )}

              <div className="text-xs text-gray-500 flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>Billing period ended</span>
                <span>•</span>
                <span>Nov 30, 2024</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method</span>
                <span>•••• •••• •••• 4242</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Billing Address</span>
                <span>123 Business Ave</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax ID</span>
                <span>123-456-789</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
