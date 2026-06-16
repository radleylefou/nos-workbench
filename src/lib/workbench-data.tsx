import type { ReactNode } from "react"
import { Bell, Check, Search, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import { productPatternSlugs } from "@/lib/nos-product-patterns"

export type DemoGroup = {
  label: string
  node: ReactNode
}

export type ComponentEntry = {
  slug: string
  name: string
  description: string
  importLine: string
  exampleCode: string
  variants?: DemoGroup[]
  sizes?: DemoGroup[]
}

export const navigation = {
  components: [
    "button",
    "input",
    "card",
    "badge",
    "select",
    "dialog",
    "tabs",
    "table",
    "checkbox",
    "switch",
    "avatar",
    "skeleton",
    "dropdown",
    "tooltip",
    "radio",
    "textarea",
  ] as const,
  tokens: ["color", "typography", "spacing", "radius", "shadow", "motion"] as const,
  instructions: ["agents", "rules", "compositions"] as const,
  patterns: productPatternSlugs,
}

export type ComponentSlug = (typeof navigation.components)[number]
export type TokenSlug = (typeof navigation.tokens)[number]
export type InstructionSlug = (typeof navigation.instructions)[number]

export const componentEntries: Record<ComponentSlug, ComponentEntry> = {
  button: {
    slug: "button",
    name: "Button",
    description:
      "The primary interactive element for triggering actions.",
    importLine: `import { Button } from "@/components/ui/button"`,
    exampleCode: `<Button variant="default">Save changes</Button>`,
    variants: [
      { label: "default", node: <Button>Default</Button> },
      { label: "outline", node: <Button variant="outline">Outline</Button> },
      { label: "secondary", node: <Button variant="secondary">Secondary</Button> },
      { label: "ghost", node: <Button variant="ghost">Ghost</Button> },
      { label: "destructive", node: <Button variant="destructive">Destructive</Button> },
      { label: "link", node: <Button variant="link">Link</Button> },
    ],
    sizes: [
      { label: "xs", node: <Button size="xs">Extra small</Button> },
      { label: "sm", node: <Button size="sm">Small</Button> },
      { label: "default", node: <Button>Default</Button> },
      { label: "lg", node: <Button size="lg">Large</Button> },
      { label: "icon", node: <Button size="icon" aria-label="Search"><Search /></Button> },
    ],
  },
  input: {
    slug: "input",
    name: "Input",
    description: "Single-line text field with NOS focus ring and motion.",
    importLine: `import { Input } from "@/components/ui/input"`,
    exampleCode: `<Input type="email" placeholder="you@nymbl.com" />`,
    variants: [
      { label: "default", node: <Input placeholder="Default input" /> },
      { label: "disabled", node: <Input placeholder="Disabled" disabled /> },
      { label: "aria-invalid", node: <Input placeholder="Invalid" aria-invalid /> },
    ],
  },
  card: {
    slug: "card",
    name: "Card",
    description: "Surface for grouping related content.",
    importLine: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"`,
    exampleCode: `<Card>
  <CardHeader>
    <CardTitle>Account</CardTitle>
    <CardDescription>Manage your profile</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>`,
    variants: [
      {
        label: "default",
        node: (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Update your name, email, and avatar.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Save</Button>
            </CardFooter>
          </Card>
        ),
      },
    ],
    sizes: [
      {
        label: "default",
        node: (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>Relaxed spacing</CardDescription>
            </CardHeader>
            <CardContent>Body</CardContent>
          </Card>
        ),
      },
      {
        label: "sm",
        node: (
          <Card size="sm" className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Small</CardTitle>
              <CardDescription>Denser spacing</CardDescription>
            </CardHeader>
            <CardContent>Body</CardContent>
          </Card>
        ),
      },
    ],
  },
  badge: {
    slug: "badge",
    name: "Badge",
    description: "Compact label for status, counts, or categorisation.",
    importLine: `import { Badge } from "@/components/ui/badge"`,
    exampleCode: `<Badge>New</Badge>`,
    variants: [
      { label: "default", node: <Badge>Default</Badge> },
      { label: "secondary", node: <Badge variant="secondary">Secondary</Badge> },
      { label: "destructive", node: <Badge variant="destructive">Destructive</Badge> },
      { label: "outline", node: <Badge variant="outline">Outline</Badge> },
      { label: "ghost", node: <Badge variant="ghost">Ghost</Badge> },
    ],
  },
  select: {
    slug: "select",
    name: "Select",
    description: "Dropdown picker built on Radix Select.",
    importLine: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"`,
    exampleCode: `<Select>
  <SelectTrigger><SelectValue placeholder="Choose…" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>`,
    variants: [
      {
        label: "default",
        node: (
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Choose…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
              <SelectItem value="c">Option C</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
    ],
    sizes: [
      {
        label: "sm",
        node: (
          <Select>
            <SelectTrigger size="sm" className="w-48">
              <SelectValue placeholder="Small" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
      {
        label: "default",
        node: (
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
    ],
  },
  dialog: {
    slug: "dialog",
    name: "Dialog",
    description: "Modal overlay for focused tasks and confirmations.",
    importLine: `import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"`,
    exampleCode: `<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm</DialogTitle>
      <DialogDescription>Are you sure?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    variants: [
      {
        label: "default",
        node: (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm action</DialogTitle>
                <DialogDescription>
                  This will permanently update your settings.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ),
      },
    ],
  },
  tabs: {
    slug: "tabs",
    name: "Tabs",
    description: "Switch between sibling views without losing context.",
    importLine: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`,
    exampleCode: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="settings">…</TabsContent>
</Tabs>`,
    variants: [
      {
        label: "default",
        node: (
          <Tabs defaultValue="overview" className="w-80">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-sm text-muted-foreground">
              Overview content
            </TabsContent>
            <TabsContent value="settings" className="text-sm text-muted-foreground">
              Settings content
            </TabsContent>
            <TabsContent value="activity" className="text-sm text-muted-foreground">
              Activity content
            </TabsContent>
          </Tabs>
        ),
      },
    ],
  },
  table: {
    slug: "table",
    name: "Table",
    description: "Dense tabular layout for data rows.",
    importLine: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"`,
    exampleCode: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Alex</TableCell><TableCell>Active</TableCell></TableRow>
  </TableBody>
</Table>`,
    variants: [
      {
        label: "default",
        node: (
          <Table className="w-80">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alex Rivera</TableCell>
                <TableCell>Engineer</TableCell>
                <TableCell className="text-right">
                  <Badge>Active</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Priya Shah</TableCell>
                <TableCell>Designer</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary">Away</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
      },
    ],
  },
  checkbox: {
    slug: "checkbox",
    name: "Checkbox",
    description: "Binary on/off selector. Pairs with a Label.",
    importLine: `import { Checkbox } from "@/components/ui/checkbox"`,
    exampleCode: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>`,
    variants: [
      {
        label: "default",
        node: (
          <div className="flex items-center gap-2">
            <Checkbox id="wb-cb-1" />
            <Label htmlFor="wb-cb-1">Unchecked</Label>
          </div>
        ),
      },
      {
        label: "checked",
        node: (
          <div className="flex items-center gap-2">
            <Checkbox id="wb-cb-2" defaultChecked />
            <Label htmlFor="wb-cb-2">Checked</Label>
          </div>
        ),
      },
      {
        label: "disabled",
        node: (
          <div className="flex items-center gap-2">
            <Checkbox id="wb-cb-3" disabled />
            <Label htmlFor="wb-cb-3">Disabled</Label>
          </div>
        ),
      },
    ],
  },
  switch: {
    slug: "switch",
    name: "Switch",
    description: "On/off toggle for instant settings.",
    importLine: `import { Switch } from "@/components/ui/switch"`,
    exampleCode: `<Switch />`,
    variants: [
      { label: "off", node: <Switch /> },
      { label: "on", node: <Switch defaultChecked /> },
      { label: "disabled", node: <Switch disabled /> },
    ],
  },
  avatar: {
    slug: "avatar",
    name: "Avatar",
    description: "Visual identifier for a user or entity.",
    importLine: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`,
    exampleCode: `<Avatar>
  <AvatarImage src="/avatar.png" alt="Alex" />
  <AvatarFallback>AR</AvatarFallback>
</Avatar>`,
    variants: [
      {
        label: "image",
        node: (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        ),
      },
      {
        label: "fallback",
        node: (
          <Avatar>
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        ),
      },
      {
        label: "icon",
        node: (
          <Avatar>
            <AvatarFallback>
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
        ),
      },
    ],
  },
  skeleton: {
    slug: "skeleton",
    name: "Skeleton",
    description: "Placeholder shape for loading content.",
    importLine: `import { Skeleton } from "@/components/ui/skeleton"`,
    exampleCode: `<Skeleton className="h-4 w-40" />`,
    variants: [
      {
        label: "default",
        node: (
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        ),
      },
      {
        label: "circle",
        node: <Skeleton className="size-12 rounded-full" />,
      },
    ],
  },
  dropdown: {
    slug: "dropdown",
    name: "Dropdown",
    description: "Contextual menu opened by a trigger button.",
    importLine: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"`,
    exampleCode: `<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Menu</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    variants: [
      {
        label: "default",
        node: (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
  },
  tooltip: {
    slug: "tooltip",
    name: "Tooltip",
    description: "Short, on-hover hint anchored to its trigger.",
    importLine: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"`,
    exampleCode: `<Tooltip>
  <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
  <TooltipContent>Helpful hint</TooltipContent>
</Tooltip>`,
    variants: [
      {
        label: "default",
        node: (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <Bell />
                Notifications
              </Button>
            </TooltipTrigger>
            <TooltipContent>3 unread</TooltipContent>
          </Tooltip>
        ),
      },
    ],
  },
  radio: {
    slug: "radio",
    name: "Radio",
    description: "Pick one option from a small set.",
    importLine: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
    exampleCode: `<RadioGroup defaultValue="card">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="card" id="r-card" />
    <Label htmlFor="r-card">Card</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="bank" id="r-bank" />
    <Label htmlFor="r-bank">Bank</Label>
  </div>
</RadioGroup>`,
    variants: [
      {
        label: "default",
        node: (
          <RadioGroup defaultValue="card" className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="card" id="wb-r-card" />
              <Label htmlFor="wb-r-card">Card</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="bank" id="wb-r-bank" />
              <Label htmlFor="wb-r-bank">Bank</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="invoice" id="wb-r-inv" disabled />
              <Label htmlFor="wb-r-inv">Invoice (disabled)</Label>
            </div>
          </RadioGroup>
        ),
      },
    ],
  },
  textarea: {
    slug: "textarea",
    name: "Textarea",
    description: "Multi-line text input with NOS focus ring.",
    importLine: `import { Textarea } from "@/components/ui/textarea"`,
    exampleCode: `<Textarea placeholder="Write a note…" />`,
    variants: [
      { label: "default", node: <Textarea placeholder="Write a note…" className="w-80" /> },
      { label: "disabled", node: <Textarea placeholder="Disabled" disabled className="w-80" /> },
    ],
  },
}

// Token data

export const brandScale = [
  { name: "brand-50",  value: "#F7F6FF" },
  { name: "brand-100", value: "#EEECFF" },
  { name: "brand-200", value: "#D8D9FF" },
  { name: "brand-300", value: "#B5B9FC" },
  { name: "brand-400", value: "#9DA0FC" },
  { name: "brand-500", value: "#6A6CE3" },
  { name: "brand-600", value: "#5D58E2", primary: true },
  { name: "brand-700", value: "#5547EB" },
  { name: "brand-800", value: "#4D35D5" },
  { name: "brand-900", value: "#2C1F7F" },
  { name: "brand-950", value: "#120D35" },
]

export const neutralScale = [
  { name: "zinc-50", value: "#F7F7FB" },
  { name: "zinc-100", value: "#F2F2F7" },
  { name: "zinc-200", value: "#E2E2E9" },
  { name: "zinc-300", value: "#D2D2DA" },
  { name: "zinc-400", value: "#9E9EAD" },
  { name: "zinc-500", value: "#6D6D7E" },
  { name: "zinc-600", value: "#4F4F5E" },
  { name: "zinc-700", value: "#3D3D48" },
  { name: "zinc-800", value: "#24242D" },
  { name: "zinc-900", value: "#17171C" },
  { name: "zinc-950", value: "#09090B" },
]

export const semanticColorScales = [
  {
    label: "Success",
    colors: [
      { name: "success-50", value: "oklch(97% 0.04 145)" },
      { name: "success-100", value: "oklch(92% 0.07 145)" },
      { name: "success-200", value: "oklch(84% 0.10 145)" },
      { name: "success-300", value: "oklch(74% 0.13 145)" },
      { name: "success-400", value: "oklch(63% 0.15 145)" },
      { name: "success-500", value: "oklch(56% 0.15 145)" },
      { name: "success-600", value: "oklch(51% 0.15 145)", primary: true },
      { name: "success-700", value: "oklch(43% 0.13 145)" },
      { name: "success-800", value: "oklch(35% 0.10 145)" },
      { name: "success-900", value: "oklch(27% 0.08 145)" },
      { name: "success-950", value: "oklch(18% 0.06 145)" },
    ],
  },
  {
    label: "Warning",
    colors: [
      { name: "warning-50", value: "oklch(98% 0.04 55)" },
      { name: "warning-100", value: "oklch(94% 0.08 55)" },
      { name: "warning-200", value: "oklch(88% 0.12 55)" },
      { name: "warning-300", value: "oklch(80% 0.16 55)" },
      { name: "warning-400", value: "oklch(72% 0.18 55)" },
      { name: "warning-500", value: "oklch(65% 0.18 55)", primary: true },
      { name: "warning-600", value: "oklch(57% 0.16 55)" },
      { name: "warning-700", value: "oklch(47% 0.13 55)" },
      { name: "warning-800", value: "oklch(37% 0.10 55)" },
      { name: "warning-900", value: "oklch(28% 0.08 55)" },
      { name: "warning-950", value: "oklch(19% 0.06 55)" },
    ],
  },
  {
    label: "Error",
    colors: [
      { name: "error-50", value: "oklch(97% 0.04 25)" },
      { name: "error-100", value: "oklch(92% 0.08 25)" },
      { name: "error-200", value: "oklch(84% 0.13 25)" },
      { name: "error-300", value: "oklch(75% 0.18 25)" },
      { name: "error-400", value: "oklch(64% 0.21 25)" },
      { name: "error-500", value: "oklch(58% 0.22 25)" },
      { name: "error-600", value: "oklch(54% 0.22 25)", primary: true },
      { name: "error-700", value: "oklch(45% 0.18 25)" },
      { name: "error-800", value: "oklch(36% 0.14 25)" },
      { name: "error-900", value: "oklch(28% 0.10 25)" },
      { name: "error-950", value: "oklch(19% 0.07 25)" },
    ],
  },
  {
    label: "Info",
    colors: [
      { name: "info-50", value: "oklch(97% 0.04 245)" },
      { name: "info-100", value: "oklch(92% 0.08 245)" },
      { name: "info-200", value: "oklch(84% 0.12 245)" },
      { name: "info-300", value: "oklch(74% 0.16 245)" },
      { name: "info-400", value: "oklch(63% 0.19 245)" },
      { name: "info-500", value: "oklch(57% 0.20 245)" },
      { name: "info-600", value: "oklch(52% 0.20 245)", primary: true },
      { name: "info-700", value: "oklch(44% 0.17 245)" },
      { name: "info-800", value: "oklch(36% 0.13 245)" },
      { name: "info-900", value: "oklch(28% 0.09 245)" },
      { name: "info-950", value: "oklch(19% 0.07 245)" },
    ],
  },
]

export const typographySizes = [
  { name: "xs", px: 12, rem: "0.75rem" },
  { name: "sm", px: 14, rem: "0.875rem" },
  { name: "base", px: 16, rem: "1rem" },
  { name: "lg", px: 18, rem: "1.125rem" },
  { name: "xl", px: 20, rem: "1.25rem" },
  { name: "2xl", px: 24, rem: "1.5rem" },
  { name: "3xl", px: 30, rem: "1.875rem" },
  { name: "4xl", px: 36, rem: "2.25rem" },
]

export const typographyWeights = [
  { name: "regular", weight: 400 },
  { name: "medium", weight: 500 },
  { name: "semibold", weight: 600 },
  { name: "bold", weight: 700 },
]

export const spacingScale = [
  { name: "0.5", px: 2 },
  { name: "1", px: 4 },
  { name: "1.5", px: 6 },
  { name: "2", px: 8 },
  { name: "3", px: 12 },
  { name: "4", px: 16 },
  { name: "5", px: 20 },
  { name: "6", px: 24 },
  { name: "8", px: 32 },
  { name: "10", px: 40 },
  { name: "12", px: 48 },
  { name: "16", px: 64 },
]

export const radiusScale = [
  { name: "sm", varName: "--radius-sm" },
  { name: "md", varName: "--radius-md" },
  { name: "lg", varName: "--radius-lg" },
  { name: "xl", varName: "--radius-xl" },
  { name: "2xl", varName: "--radius-2xl" },
  { name: "3xl", varName: "--radius-3xl" },
  { name: "4xl", varName: "--radius-4xl" },
]

export const shadowScale = [
  { name: "2xs", varName: "--shadow-2xs", className: "shadow-2xs" },
  { name: "xs", varName: "--shadow-xs", className: "shadow-xs" },
  { name: "sm", varName: "--shadow-sm", className: "shadow-sm" },
  { name: "md", varName: "--shadow-md", className: "shadow-md" },
  { name: "lg", varName: "--shadow-lg", className: "shadow-lg" },
  { name: "xl", varName: "--shadow-xl", className: "shadow-xl" },
  { name: "2xl", varName: "--shadow-2xl", className: "shadow-2xl" },
]

export const durationTokens = [
  { name: "instant", value: 50 },
  { name: "fast", value: 100 },
  { name: "normal", value: 200 },
  { name: "slow", value: 350 },
  { name: "slower", value: 500 },
]

export const easingTokens = [
  { name: "standard", value: "cubic-bezier(0.4, 0.0, 0.2, 1)" },
  { name: "enter", value: "cubic-bezier(0.0, 0.0, 0.2, 1)" },
  { name: "exit", value: "cubic-bezier(0.4, 0.0, 1.0, 1)" },
  { name: "sharp", value: "cubic-bezier(0.4, 0.0, 0.6, 1)" },
]

// Suppress unused-import warning for icons used in conditionally rendered demos
void Check
