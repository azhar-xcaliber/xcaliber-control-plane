"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Play, Zap, Terminal, FileCode } from "lucide-react"

export function PlaygroundApp() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Playground</h1>
            <p className="text-sm text-gray-500 mt-1">
              Interactive development environment for healthcare data workflows
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-700 bg-green-50">
              Interactive App
            </Badge>
            <Button>
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2">
          {/* Code Editor */}
          <div className="border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Code Editor
              </h2>
            </div>
            <div className="flex-1 bg-gray-900 text-green-400 font-mono p-4 overflow-y-auto">
              <div className="text-sm">
                <div className="text-gray-500">// Healthcare Data Workflow Example</div>
                <div className="mt-2">
                  <span className="text-blue-400">import</span> <span className="text-yellow-400">{"{"}</span>{" "}
                  DataProcessor, HL7Parser <span className="text-yellow-400">{"}"}</span>{" "}
                  <span className="text-blue-400">from</span>{" "}
                  <span className="text-green-300">'@xcaliber/healthcare'</span>
                  <span className="text-gray-300">;</span>
                </div>
                <div className="mt-1">
                  <span className="text-blue-400">import</span> <span className="text-yellow-400">{"{"}</span>{" "}
                  validateFHIR <span className="text-yellow-400">{"}"}</span>{" "}
                  <span className="text-blue-400">from</span>{" "}
                  <span className="text-green-300">'@xcaliber/validation'</span>
                  <span className="text-gray-300">;</span>
                </div>
                <div className="mt-4">
                  <span className="text-purple-400">const</span> <span className="text-yellow-400">processor</span>{" "}
                  <span className="text-gray-300">=</span> <span className="text-blue-400">new</span>{" "}
                  <span className="text-yellow-400">DataProcessor</span>
                  <span className="text-gray-300">();</span>
                </div>
                <div className="mt-2">
                  <span className="text-purple-400">const</span> <span className="text-yellow-400">patientData</span>{" "}
                  <span className="text-gray-300">=</span> <span className="text-yellow-400">{"{"}</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">id</span>
                  <span className="text-gray-300">:</span> <span className="text-green-300">"12345"</span>
                  <span className="text-gray-300">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">name</span>
                  <span className="text-gray-300">:</span> <span className="text-green-300">"John Doe"</span>
                  <span className="text-gray-300">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">dob</span>
                  <span className="text-gray-300">:</span> <span className="text-green-300">"1985-03-15"</span>
                </div>
                <div>
                  <span className="text-yellow-400">{"}"}</span>
                  <span className="text-gray-300">;</span>
                </div>
                <div className="mt-4">
                  <span className="text-gray-500">// Process and validate patient data</span>
                </div>
                <div className="mt-1">
                  <span className="text-purple-400">const</span> <span className="text-yellow-400">result</span>{" "}
                  <span className="text-gray-300">=</span> <span className="text-blue-400">await</span>{" "}
                  <span className="text-yellow-400">processor</span>
                  <span className="text-gray-300">.</span>
                  <span className="text-blue-400">validate</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-yellow-400">patientData</span>
                  <span className="text-gray-300">);</span>
                </div>
                <div className="mt-1">
                  <span className="text-yellow-400">console</span>
                  <span className="text-gray-300">.</span>
                  <span className="text-blue-400">log</span>
                  <span className="text-gray-300">(</span>
                  <span className="text-yellow-400">result</span>
                  <span className="text-gray-300">);</span>
                </div>
                <div className="mt-6 text-gray-500">
                  <span>{">"}</span> <span className="text-white">Ready to execute...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-medium text-gray-900 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Output
              </h2>
            </div>
            <div className="flex-1 bg-black text-white font-mono p-4 overflow-y-auto">
              <div className="text-green-400">
                <div>$ xcaliber playground --run</div>
                <div className="mt-2 text-white">
                  <span className="text-blue-400">[INFO]</span> Starting healthcare data validation...
                </div>
                <div className="mt-1 text-white">
                  <span className="text-green-400">[SUCCESS]</span> Patient data validated successfully
                </div>
                <div className="mt-1 text-gray-300">
                  {"{"}
                  <br />
                  &nbsp;&nbsp;"valid": true,
                  <br />
                  &nbsp;&nbsp;"patient_id": "12345",
                  <br />
                  &nbsp;&nbsp;"fhir_compliant": true,
                  <br />
                  &nbsp;&nbsp;"quality_score": 0.98
                  <br />
                  {"}"}
                </div>
                <div className="mt-4 text-white">
                  <span className="text-blue-400">[INFO]</span> Execution completed in 234ms
                </div>
                <div className="mt-2 text-green-400">$</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileCode className="w-5 h-5 text-blue-500" />
                  <h3 className="font-medium">Templates</h3>
                </div>
                <p className="text-sm text-gray-600">Ready-made healthcare workflow templates</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-medium">Quick Actions</h3>
                </div>
                <p className="text-sm text-gray-600">Common operations and data transformations</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-5 h-5 text-green-500" />
                  <h3 className="font-medium">Console</h3>
                </div>
                <p className="text-sm text-gray-600">Interactive debugging and testing tools</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
