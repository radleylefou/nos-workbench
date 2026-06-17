export type AppStatus = "live" | "uat" | "poc" | "coming-soon"
export type AppCategory = "NOS" | "Forge" | "Applet"
export type AppPillar = "go-to-market" | "services" | "operations" | "cross-pillar"

export interface App {
  id: string
  name: string
  category: AppCategory
  pillar: AppPillar
  status: AppStatus
}

export const APPS: App[] = [
  // NOS — Core operating-system platforms
  { id: "sign",      name: "Sign",      category: "NOS",    pillar: "go-to-market", status: "live" },
  { id: "tycket",    name: "Tycket",    category: "NOS",    pillar: "services",     status: "live" },
  { id: "staff",     name: "Staff",     category: "NOS",    pillar: "operations",   status: "live" },
  { id: "enable",    name: "Enable",    category: "NOS",    pillar: "go-to-market", status: "poc" },
  { id: "alygn",     name: "Alygn",     category: "NOS",    pillar: "operations",   status: "live" },
  { id: "engage",    name: "Engage",    category: "NOS",    pillar: "go-to-market", status: "coming-soon" },
  { id: "visualize", name: "Visualize", category: "NOS",    pillar: "cross-pillar", status: "coming-soon" },

  // Forge — Custom-built internal tools
  { id: "solution",  name: "Solution",  category: "Forge",  pillar: "go-to-market", status: "poc" },
  { id: "delyver",   name: "Delyver",   category: "Forge",  pillar: "services",     status: "live" },
  { id: "gateway",   name: "Gateway",   category: "Forge",  pillar: "operations",   status: "live" },

  // Applet — Small, focused single-purpose apps
  { id: "decysion",  name: "Decysion",  category: "Applet", pillar: "cross-pillar", status: "coming-soon" },
  { id: "focus",     name: "Focus",     category: "Applet", pillar: "operations",   status: "live" },
  { id: "share",     name: "Share",     category: "Applet", pillar: "services",     status: "live" },
  { id: "mycro",     name: "Mycro",     category: "Applet", pillar: "operations",   status: "live" },
  { id: "objectyve", name: "Objectyve", category: "Applet", pillar: "go-to-market", status: "live" },
]

export const CATEGORY_META: Record<AppCategory, { label: string; description: string }> = {
  NOS:    { label: "NOS",    description: "Core operating-system platforms" },
  Forge:  { label: "FORGE",  description: "Custom-built internal tools" },
  Applet: { label: "APPLET", description: "Small, focused single-purpose apps" },
}

export const PILLAR_META: Record<AppPillar, { label: string }> = {
  "go-to-market": { label: "Go To Market" },
  "services":     { label: "Services" },
  "operations":   { label: "Operations" },
  "cross-pillar": { label: "Cross-Pillar / General" },
}

export const CATEGORIES: AppCategory[] = ["NOS", "Forge", "Applet"]
export const PILLARS: AppPillar[] = ["go-to-market", "services", "operations", "cross-pillar"]
