"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Zap, Lock } from "lucide-react"

export function VirtualAssistantsView() {
  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <CardTitle className="text-xl">Virtual Assistants</CardTitle>
          <Badge variant="secondary" className="mx-auto">
            <Lock className="w-3 h-3 mr-1" />
            Feature Not Available
          </Badge>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Virtual Assistants and Digital Co-workers are not currently enabled for your tenant.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-4 border border-gray-200 rounded-lg opacity-50">
              <MessageSquare className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <h4 className="font-medium text-gray-600">AI Chat Assistant</h4>
              <p className="text-xs text-gray-500 mt-1">Conversational AI for data queries</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg opacity-50">
              <Users className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <h4 className="font-medium text-gray-600">Team Collaboration</h4>
              <p className="text-xs text-gray-500 mt-1">AI-powered team workflows</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg opacity-50">
              <Zap className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <h4 className="font-medium text-gray-600">Automation</h4>
              <p className="text-xs text-gray-500 mt-1">Intelligent task automation</p>
            </div>
          </div>

          <div className="pt-4">
            <Button disabled className="mr-2">
              Contact Sales
            </Button>
            <Button variant="outline" disabled>
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
