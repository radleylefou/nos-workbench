"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => toast("Meeting created for 3 PM.")}>
        Default
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast.success("Changes saved successfully.")}>
        Success
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast.error("Failed to save changes.")}>
        Error
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast.warning("Unsaved changes will be lost.")}>
        Warning
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast.info("Your trial ends in 3 days.")}>
        Info
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          const id = toast.loading("Uploading file...")
          setTimeout(() => toast.success("Upload complete!", { id }), 2000)
        }}
      >
        Loading
      </Button>
    </div>
  )
}
