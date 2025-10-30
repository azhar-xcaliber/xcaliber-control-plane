"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronRight, ChevronLeft } from "lucide-react"
import { ROLES, JOBS, TASKS, type OnboardingData } from "@/types/onboarding"

interface OnboardingModalProps {
  onComplete: (data: OnboardingData) => void
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const totalSteps = 3

  const handleJobToggle = (jobValue: string) => {
    console.log("[v0] Toggling job:", jobValue)
    setSelectedJobs((prev) => {
      const newJobs = prev.includes(jobValue) ? prev.filter((j) => j !== jobValue) : [...prev, jobValue]
      console.log("[v0] Updated jobs:", newJobs)
      return newJobs
    })
  }

  const handleTaskToggle = (taskValue: string) => {
    setSelectedTasks((prev) => (prev.includes(taskValue) ? prev.filter((t) => t !== taskValue) : [...prev, taskValue]))
  }

  const handleComplete = () => {
    const onboardingData: OnboardingData = {
      role: selectedRole,
      job: selectedJobs,
      tasks: selectedTasks,
      completed: true,
    }
    localStorage.setItem("xcaliber-onboarding", JSON.stringify(onboardingData))
    onComplete(onboardingData)
  }

  const canProceed = () => {
    if (step === 1) return selectedRole !== ""
    if (step === 2) return selectedJobs.length > 0
    if (step === 3) return selectedTasks.length > 0
    return false
  }

  const filteredTasks = TASKS.filter((task) => selectedJobs.includes(task.category))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-3xl p-6 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1">Welcome to XCaliber Control Plane</h1>
          <p className="text-sm text-muted-foreground">
            Let's personalize your experience. This will help us show you the most relevant tools and features.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  s <= step
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < totalSteps && (
                <div className={`flex-1 h-0.5 mx-2 transition-colors ${s < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-[280px]">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-1">What's your role?</h2>
                <p className="text-sm text-muted-foreground">Select the role that best describes you</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ROLES.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`p-3 rounded-lg border-2 text-left transition-all hover:border-primary/50 ${
                      selectedRole === role.value ? "border-primary bg-primary/5" : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-0.5 text-sm">{role.label}</h3>
                        <p className="text-xs text-muted-foreground">{role.description}</p>
                      </div>
                      {selectedRole === role.value && <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Job Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-1">What will you be working on?</h2>
                <p className="text-sm text-muted-foreground">Select all job areas that apply to your work</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {JOBS.map((job) => (
                  <button
                    key={job.value}
                    type="button"
                    onClick={() => handleJobToggle(job.value)}
                    className={`p-3 rounded-lg border-2 text-left transition-all hover:border-primary/50 ${
                      selectedJobs.includes(job.value) ? "border-primary bg-primary/5" : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{job.icon}</span>
                        <h3 className="font-semibold text-sm">{job.label}</h3>
                      </div>
                      {selectedJobs.includes(job.value) && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
              {selectedJobs.length > 0 && (
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Selected: {selectedJobs.length} job areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJobs.map((jobValue) => {
                      const job = JOBS.find((j) => j.value === jobValue)
                      return (
                        <Badge key={jobValue} variant="secondary" className="text-xs py-0 px-2">
                          {job?.icon} {job?.label}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Task Selection */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-1">What tasks will you perform?</h2>
                <p className="text-sm text-muted-foreground">
                  Select all tasks that apply to your work (you can change this later)
                </p>
              </div>
              {filteredTasks.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {filteredTasks.map((task) => (
                      <button
                        key={task.value}
                        type="button"
                        onClick={() => handleTaskToggle(task.value)}
                        className={`p-2 rounded-lg border-2 text-left transition-all hover:border-primary/50 ${
                          selectedTasks.includes(task.value) ? "border-primary bg-primary/5" : "border-border bg-card"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium">{task.label}</span>
                          {selectedTasks.includes(task.value) && (
                            <Check className="w-3 h-3 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {selectedTasks.length > 0 && (
                    <div className="pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Selected: {selectedTasks.length} tasks</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTasks.map((taskValue) => {
                          const task = TASKS.find((t) => t.value === taskValue)
                          return (
                            <Badge key={taskValue} variant="secondary" className="text-xs py-0 px-2">
                              {task?.label}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p className="text-sm">No specific tasks available for this job category.</p>
                  <p className="text-xs mt-1">You can proceed to complete the onboarding.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="text-xs text-muted-foreground">
            Step {step} of {totalSteps}
          </div>
          {step < totalSteps ? (
            <Button size="sm" onClick={() => setStep((s) => s + 1)} disabled={!canProceed()}>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button size="sm" onClick={handleComplete} disabled={!canProceed()}>
              Complete Setup
              <Check className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
