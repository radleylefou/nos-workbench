"use client"

import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { cva, type VariantProps } from "class-variance-authority"
import { MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type NumberFieldSize = "sm" | "default" | "lg"

const NumberFieldContext = React.createContext<{ size: NumberFieldSize }>({
  size: "default",
})

function NumberField({
  className,
  ...props
}: NumberFieldPrimitive.Root.Props & { className?: string }) {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

const numberFieldGroupVariants = cva(
  "relative inline-flex h-9 items-stretch overflow-hidden rounded-md border border-input shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
  {
    variants: {
      size: {
        sm: "h-7 text-xs",
        default: "h-9 text-sm",
        lg: "h-11 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function NumberFieldGroup({
  className,
  size = "default",
  ...props
}: React.ComponentPropsWithRef<"div"> & VariantProps<typeof numberFieldGroupVariants>) {
  return (
    <NumberFieldContext.Provider value={{ size: size ?? "default" }}>
      <div
        data-slot="number-field-group"
        className={cn(numberFieldGroupVariants({ size }), className)}
        {...props}
      />
    </NumberFieldContext.Provider>
  )
}

function NumberFieldInput({ className, ...props }: NumberFieldPrimitive.Input.Props) {
  const { size } = React.useContext(NumberFieldContext)
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={cn(
        "w-full min-w-0 bg-transparent px-2.5 text-center tabular-nums outline-none disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "px-2 text-xs",
        size === "lg" && "px-3",
        className
      )}
      {...props}
    />
  )
}

const numberFieldButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer select-none items-center justify-center border-input bg-transparent text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "w-6 [&_svg]:size-3",
        default: "w-9 [&_svg]:size-3.5",
        lg: "w-10 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function NumberFieldDecrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Decrement.Props) {
  const { size } = React.useContext(NumberFieldContext)
  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      className={cn(
        numberFieldButtonVariants({ size }),
        "border-r",
        className
      )}
      {...props}
    >
      {children ?? <MinusIcon />}
    </NumberFieldPrimitive.Decrement>
  )
}

function NumberFieldIncrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Increment.Props) {
  const { size } = React.useContext(NumberFieldContext)
  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      className={cn(
        numberFieldButtonVariants({ size }),
        "border-l",
        className
      )}
      {...props}
    >
      {children ?? <PlusIcon />}
    </NumberFieldPrimitive.Increment>
  )
}

function NumberFieldScrubArea({
  className,
  ...props
}: NumberFieldPrimitive.ScrubArea.Props) {
  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="number-field-scrub-area"
      className={cn("cursor-ew-resize select-none", className)}
      {...props}
    />
  )
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
}
