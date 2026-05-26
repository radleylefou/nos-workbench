"use client"

import * as React from "react"
import { UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FileUploadProps extends React.HTMLAttributes<HTMLLabelElement> {
  accept?: string
  multiple?: boolean
  onFiles?: (files: FileList) => void
  description?: string
  disabled?: boolean
}

export function FileUpload({
  className,
  accept,
  multiple = false,
  onFiles,
  description,
  disabled = false,
  ...props
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      onFiles?.(e.target.files)
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    if (!disabled) setIsDragOver(true)
  }

  function handleDragLeave() {
    setIsDragOver(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFiles?.(e.dataTransfer.files)
    }
  }

  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        isDragOver
          ? "border-primary bg-primary/5"
          : "border-border hover:bg-muted/50",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
      />
      <UploadCloud className="size-8 text-muted-foreground" />
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">
          Drop files here or{" "}
          <span className="font-semibold text-foreground">Browse</span>
        </p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </label>
  )
}
