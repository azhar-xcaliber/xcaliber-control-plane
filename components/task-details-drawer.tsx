"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, CheckSquare, Clock, User, Calendar, Tag, MessageSquare } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  dueDate: Date
  assignee: string
  component: string
  isScheduled: boolean
  estimatedHours: number
}

interface TaskDetailsDrawerProps {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}

export function TaskDetailsDrawer({ task, isOpen, onClose }: TaskDetailsDrawerProps) {
  if (!isOpen || !task) return null

  const handleStatusChange = (newStatus: string) => {
    console.log("Updating task status:", task.id, newStatus)
  }

  const handleComplete = () => {
    handleStatusChange("completed")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 z-40 flex justify-end">
      <div className="bg-white w-96 h-full flex flex-col shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              className={
                task.priority === "critical"
                  ? "bg-red-100 text-red-700"
                  : task.priority === "high"
                    ? "bg-orange-100 text-orange-700"
                    : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
              }
            >
              {task.priority} priority
            </Badge>
            <Badge variant="outline">{task.status}</Badge>
            {task.isScheduled && <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title and Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
          </div>

          {/* Task Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <User className="w-4 h-4" />
                Assignee
              </div>
              <div className="font-medium">{task.assignee}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Calendar className="w-4 h-4" />
                Due Date
              </div>
              <div className="font-medium">{task.dueDate.toLocaleDateString()}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Clock className="w-4 h-4" />
                Estimated
              </div>
              <div className="font-medium">{task.estimatedHours} hours</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Tag className="w-4 h-4" />
                Component
              </div>
              <div className="font-medium">{task.component}</div>
            </div>
          </div>

          {/* Status Update */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Update Status</label>
            <Select value={task.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Comments Section */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Comments
            </h4>

            <div className="space-y-3 mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    SJ
                  </div>
                  <span className="text-sm font-medium">Sarah Johnson</span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-700">
                  Started working on the FHIR mapping updates. The new R4 requirements are more complex than expected.
                </p>
              </div>
            </div>

            <Textarea placeholder="Add a comment..." className="mb-2" />
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Add Comment
            </Button>
          </div>

          {/* Task History */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Activity History</h4>

            <div className="space-y-2">
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Task created by Mike Chen</span>
                <span>•</span>
                <span>3 days ago</span>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Assigned to Sarah Johnson</span>
                <span>•</span>
                <span>2 days ago</span>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Status changed to In Progress</span>
                <span>•</span>
                <span>2 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-2">
            {task.status !== "completed" && (
              <Button onClick={handleComplete} className="flex-1">
                <CheckSquare className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            )}
            <Button variant="outline" className="flex-1 bg-transparent">
              Edit Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
