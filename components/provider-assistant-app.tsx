"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, Bot, User, Heart, Clock, AlertCircle } from "lucide-react"

export function ProviderAssistantApp() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Provider Assistant</h1>
            <p className="text-sm text-gray-500 mt-1">AI-powered healthcare provider support system</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-blue-700 bg-blue-50">
              AI Assistant
            </Badge>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-3">
        {/* Chat Interface */}
        <div className="lg:col-span-2 flex flex-col border-r border-gray-200">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm">
                    Hello! I'm your healthcare provider assistant. I can help you with patient information, clinical
                    guidelines, medication interactions, and care recommendations. How can I assist you today?
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-1">9:15 AM</div>
              </div>
            </div>

            <div className="flex items-start gap-3 flex-row-reverse">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-blue-500 text-white rounded-lg p-3 ml-auto max-w-xs">
                  <p className="text-sm">
                    Can you help me review the medication list for patient ID 12345? I'm concerned about potential
                    interactions.
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-right">9:17 AM</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm mb-2">
                    I've reviewed the medication list for Patient #12345. Here's what I found:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span>
                        <strong>Critical Interaction:</strong> Warfarin + Aspirin (bleeding risk)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="w-4 h-4 text-yellow-500" />
                      <span>
                        <strong>Monitor:</strong> ACE inhibitor + Diuretic (potassium levels)
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    Would you like me to suggest alternative medications or provide more details?
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-1">9:18 AM</div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Input placeholder="Ask about patient care, medications, guidelines..." className="flex-1" />
              <Button>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>Suggestions:</span>
              <button className="text-blue-600 hover:underline">Drug interactions</button>
              <button className="text-blue-600 hover:underline">Clinical guidelines</button>
              <button className="text-blue-600 hover:underline">Lab interpretations</button>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="bg-gray-50 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-900">Patient Context</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Current Patient</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <div className="font-medium">John Doe</div>
                  <div className="text-gray-500">ID: 12345</div>
                  <div className="text-gray-500">Age: 38, Male</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span>Drug interaction detected</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span>Lab results pending</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  Check Vitals
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View History
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
