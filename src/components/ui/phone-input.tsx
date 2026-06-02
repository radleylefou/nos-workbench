"use client"

import * as React from "react"
import { Phone } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type PhoneCountry = {
  code: string
  label: string
  dialCode: string
}

type PhoneInputValue = {
  country: string
  number: string
}

type PhoneInputProps = Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange" | "value"> & {
  countries?: PhoneCountry[]
  value?: PhoneInputValue
  defaultValue?: PhoneInputValue
  onChange?: (value: PhoneInputValue) => void
  placeholder?: string
  disabled?: boolean
}

const defaultCountries: PhoneCountry[] = [
  { code: "US", label: "United States", dialCode: "+1" },
  { code: "CA", label: "Canada", dialCode: "+1" },
  { code: "GB", label: "United Kingdom", dialCode: "+44" },
  { code: "AU", label: "Australia", dialCode: "+61" },
  { code: "DE", label: "Germany", dialCode: "+49" },
]

function PhoneInput({
  countries = defaultCountries,
  value,
  defaultValue,
  onChange,
  placeholder = "Phone number",
  disabled = false,
  className,
  ...props
}: PhoneInputProps) {
  const [internalValue, setInternalValue] = React.useState<PhoneInputValue>(
    defaultValue ?? { country: countries[0]?.code ?? "US", number: "" },
  )
  const activeValue = value ?? internalValue
  const selectedCountry = countries.find((country) => country.code === activeValue.country) ?? countries[0]

  const commit = (next: PhoneInputValue) => {
    if (!value) setInternalValue(next)
    onChange?.(next)
  }

  return (
    <div
      data-slot="phone-input"
      className={cn(
        "flex h-10 min-w-0 items-center overflow-hidden rounded-md border border-input bg-background shadow-xs focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      <Select
        value={activeValue.country}
        onValueChange={(country) => commit({ ...activeValue, country })}
        disabled={disabled}
      >
        <SelectTrigger className="h-full w-28 rounded-none border-0 bg-muted/30 shadow-none focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.label} {country.dialCode}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex h-full items-center border-l border-border px-3 text-sm text-muted-foreground">
        {selectedCountry?.dialCode}
      </div>
      <div className="relative min-w-0 flex-1">
        <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          disabled={disabled}
          value={activeValue.number}
          onChange={(event) => commit({ ...activeValue, number: event.target.value })}
          placeholder={placeholder}
          className="h-full rounded-none border-0 pl-9 shadow-none focus-visible:ring-0"
          inputMode="tel"
          autoComplete="tel"
        />
      </div>
    </div>
  )
}

export { PhoneInput }
