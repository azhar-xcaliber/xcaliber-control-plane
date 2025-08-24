"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, User, Bot, FileText, Calendar, AlertCircle, TrendingUp } from "lucide-react"

const mockConversation = [
  {
    id: 1,
    type: "user",
    message: "Show me the latest lab results for patient John Smith",
    timestamp: "2:34 PM",
  },
  {
    id: 2,
    type: "assistant",
    message:
      "I found the latest lab results for John Smith (DOB: 03/15/1978). Here are the key findings from his blood work completed yesterday:",
    timestamp: "2:34 PM",
    data: {
      results: [
        { test: "Hemoglobin", value: "14.2 g/dL", status: "normal" },
        { test: "White Blood Cell Count", value: "8,500/μL", status: "normal" },
        { test: "Glucose", value: "145 mg/dL", status: "elevated" },
      ],
    },
  },
  {
    id: 3,
    type: "user",
    message: "What's the trend for his glucose levels over the past 6 months?",
    timestamp: "2:35 PM",
  },
  {
    id: 4,
    type: "assistant",
    message: "John Smith's glucose levels have shown an upward trend over the past 6 months. Here's the analysis:",
    timestamp: "2:35 PM",
    data: {
      trend: "increasing",
      recommendation: "Consider diabetes screening and dietary consultation",
    },
  },
]

export function ProviderAssistantApp() {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* App Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Provider Assistant</h1>
              <p className="text-sm text-gray-500">AI-powered clinical decision support and patient insights</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Tenant: Acme Corp
            </Badge>
            <Badge className="bg-green-100 text-green-700">
              <Bot className="w-3 h-3 mr-1" />
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="flex-1 flex">
        {/* Sidebar - Quick Actions */}
        <div className="w-80 border-r border-gray-200 bg-gray-50 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Patient Summary
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Follow-up
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Clinical Alerts
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trend Analysis
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Recent Patients</h3>
              <div className="space-y-2">
                <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">John Smith</div>
                      <div className="text-xs text-gray-500">Last visit: Today</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Sarah Johnson</div>
                      <div className="text-xs text-gray-500">Last visit: Yesterday</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockConversation.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-2xl ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    {message.data && (
                      <div className="mt-3 space-y-2">
                        {message.data.results && (
                          <div className="bg-gray-50 p-3 rounded border">
                            <div className="text-xs font-medium text-gray-700 mb-2">Lab Results</div>
                            {message.data.results.map((result: any, idx: number) => (
                              <div key={idx} className="flex justify-between text-xs">
                                <span>{result.test}</span>
                                <span className={result.status === "elevated" ? "text-orange-600" : "text-green-600"}>
                                  {result.value} ({result.status})
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                        {message.data.trend && (
                          <div className="bg-orange-50 p-3 rounded border border-orange-200">
                            <div className="text-xs font-medium text-orange-800 mb-1">Clinical Recommendation</div>
                            <div className="text-xs text-orange-700">{message.data.recommendation}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 px-3">{message.timestamp}</div>
                </div>
                <div className={`flex items-end ${message.type === "user" ? "order-1 mr-2" : "order-2 ml-2"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === "user" ? "bg-blue-100" : "bg-green-100"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Bot className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask about patient data, clinical guidelines, or request analysis..."
                className="flex-1"
              />
              <Button>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Provider Assistant can help with patient data analysis, clinical decision support, and care
              recommendations.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
