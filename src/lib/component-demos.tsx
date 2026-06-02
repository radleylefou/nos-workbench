import type { ReactNode } from "react"
import {
  Bold,
  CalendarIcon,
  Check,
  ChevronRight,
  Download,
  Italic,
  LayoutDashboard,
  Search,
  Settings,
  Trash2,
  Underline,
  User,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldDescription, FieldError } from "@/components/ui/field"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { NymblAppSidebar, NymblEngagementSidebar } from "@/components/ui/app-sidebar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
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
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ItemGroup, Item as ItemComp } from "@/components/ui/item"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ChartBarDemo, ChartLineDemo } from "@/components/workbench/demos/chart-demo"
import { DatePickerDemo, DateRangeDemo } from "@/components/workbench/demos/date-picker-demo"
import { DirectionDemo } from "@/components/workbench/demos/direction-demo"
import { ToastDemo } from "@/components/workbench/demos/toast-demo"
// Phase 1 — Foundation Atoms
import { IdChip } from "@/components/ui/id-chip"
import { LinkedChip } from "@/components/ui/linked-chip"
import { HealthIndicator } from "@/components/ui/health-indicator"
import { ReadinessItem } from "@/components/ui/readiness-item"
// Phase 2 — NOS Display Atoms
import { StepperCounter } from "@/components/ui/stepper-counter"
import { L1DistributionBar } from "@/components/ui/l1-distribution-bar"
import { AIActionBarDemo, AIActionBarMinimalDemo } from "@/components/workbench/demos/ai-action-bar-demo"
// Phase 3 — Metrics & Feeds
import { StatCard } from "@/components/ui/stat-card"
import { Timeline } from "@/components/ui/timeline"
import { ActivityFeed } from "@/components/ui/activity-feed"
import { MetricPanelsGallery } from "@/components/workbench/demos/metric-panels"
import { FormLayoutsGallery } from "@/components/workbench/demos/form-layouts"
// Phase 4 — Planning
import {
  Stepper,
  StepperNav,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
} from "@/components/ui/stepper"
import { CircleDot, CircleCheck, Circle } from "lucide-react"
import { DataTableDemo } from "@/components/workbench/demos/data-table-demo"
// Phase 5 — Kanban + Gantt
import { KanbanBoardDemo } from "@/components/workbench/demos/kanban-board-demo"
import { Gantt } from "@/components/ui/gantt"
// Phase 6 — AI Features
import { AIDraftStateDemo, AIDraftStateStaticDemo } from "@/components/workbench/demos/ai-draft-state-demo"
import { AISuggestionSuggestionDemo, AISuggestionHintDemo, AISuggestionMatchDemo, AISuggestionWarningDemo } from "@/components/workbench/demos/ai-suggestion-card-demo"
import { SectionDocumentCardDemo, SectionDocumentCardDraftDemo } from "@/components/workbench/demos/section-document-card-demo"
// Phase 7 — Domain Model
import { L1ComponentCard } from "@/components/ui/l1-component-card"
import { EpicCard } from "@/components/ui/epic-card"
import { PhaseColumnHeader } from "@/components/ui/phase-column-header"
// Phase 8 — Governance
import { RiskHeatmap } from "@/components/ui/risk-heatmap"
import { OpenQuestionRow } from "@/components/ui/open-question-row"
import { ApprovalWorkflowCard } from "@/components/ui/approval-workflow-card"
import { ReviewChecklistRow } from "@/components/ui/review-checklist-row"
// Phase 10 — Tier 1 demos
import { WorkspaceNavBreadcrumb, DismissibleAlert, LabelledModeToggle } from "@/components/workbench/demos/tier1-demos"
// Phase 9 — Compounds
import { OutputCard } from "@/components/ui/output-card"
import { IntakeSnapshotCard } from "@/components/ui/intake-snapshot-card"
import { EstimationRollUpTree } from "@/components/ui/estimation-rollup-tree"
import { EstimateDetailDrawerDemo } from "@/components/workbench/demos/estimate-detail-drawer-demo"
import { ReconciliationPanel } from "@/components/ui/reconciliation-panel"
import { TeamRosterPanel } from "@/components/ui/team-roster-panel"
import { PortfolioPipelineView } from "@/components/ui/portfolio-pipeline-view"
import { CompactButton } from "@/components/ui/compact-button"
import { LinkButton } from "@/components/ui/link-button"
import { Banner } from "@/components/ui/banner"
import { ProgressCircle } from "@/components/ui/progress-circle"
import { StatusBadge } from "@/components/ui/status-badge"
import { Tag } from "@/components/ui/tag"
import { Hint } from "@/components/ui/hint"
import { SegmentedControl, SegmentedControlList, SegmentedControlTrigger } from "@/components/ui/segmented-control"
import { TabMenuHorizontal, TabMenuHorizontalList, TabMenuHorizontalTrigger } from "@/components/ui/tab-menu-horizontal"
import { TabMenuVertical, TabMenuVerticalList, TabMenuVerticalTrigger } from "@/components/ui/tab-menu-vertical"
import { Rating } from "@/components/ui/rating"
import { FileUpload } from "@/components/ui/file-upload"
import { Notification } from "@/components/ui/notification"
import { AvatarGroupCompact, AvatarGroupCompactOverflow } from "@/components/ui/avatar"
import { TagDismissibleDemo, TagWithIconDemo, RatingInteractiveDemo, StepperControlledDemo } from "@/components/workbench/demos/extended-ui-demos"
import { AlertCircle, BookOpen, FileText, Home, Info as InfoIcon, LayoutGrid, Search as SearchIcon } from "lucide-react"

export type DemoGroup = { label: string; node: ReactNode }

export type ComponentDemo = {
  importLine: string
  exampleCode: string
  variants?: DemoGroup[]
  sizes?: DemoGroup[]
  variantSpan?: "full"
}

/** Components that require complex setup — link to docs instead of live demo */
export const docOnlySlugs = new Set([
  "sidebar",
  "typography",
])

export const demos: Record<string, ComponentDemo> = {
  // ─── Layout ───────────────────────────────────────────────────────────────

  "aspect-ratio": {
    importLine: `import { AspectRatio } from "@/components/ui/aspect-ratio"`,
    exampleCode: `<AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
  <img src="..." alt="..." className="h-full w-full object-cover" />
</AspectRatio>`,
    variants: [
      {
        label: "16/9",
        node: (
          <AspectRatio ratio={16 / 9} className="w-64 overflow-hidden rounded-md bg-muted">
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              16 / 9
            </div>
          </AspectRatio>
        ),
      },
      {
        label: "4/3",
        node: (
          <AspectRatio ratio={4 / 3} className="w-40 overflow-hidden rounded-md bg-muted">
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              4 / 3
            </div>
          </AspectRatio>
        ),
      },
      {
        label: "1/1",
        node: (
          <AspectRatio ratio={1} className="w-24 overflow-hidden rounded-md bg-muted">
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              1 / 1
            </div>
          </AspectRatio>
        ),
      },
    ],
  },

  "resizable": {
    importLine: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"`,
    exampleCode: `<ResizablePanelGroup orientation="horizontal" className="max-w-md rounded-lg border">
  <ResizablePanel defaultSize={50}>Left</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>Right</ResizablePanel>
</ResizablePanelGroup>`,
    variants: [
      {
        label: "horizontal",
        node: (
          <ResizablePanelGroup orientation="horizontal" className="h-28 w-full rounded-md border">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Left
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Right
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ),
      },
    ],
  },

  "scroll-area": {
    importLine: `import { ScrollArea } from "@/components/ui/scroll-area"`,
    exampleCode: `<ScrollArea className="h-48 rounded-md border">
  {/* long content */}
</ScrollArea>`,
    variants: [
      {
        label: "default",
        node: (
          <ScrollArea className="h-40 w-48 rounded-md border">
            <div className="p-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="py-1 text-sm text-muted-foreground">
                  Row {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        ),
      },
    ],
  },

  "separator": {
    importLine: `import { Separator } from "@/components/ui/separator"`,
    exampleCode: `<Separator />
<Separator orientation="vertical" className="h-8" />`,
    variants: [
      {
        label: "horizontal",
        node: (
          <div className="w-48 space-y-2">
            <div className="text-sm">Above</div>
            <Separator />
            <div className="text-sm">Below</div>
          </div>
        ),
      },
      {
        label: "vertical",
        node: (
          <div className="flex h-10 items-center gap-3 text-sm">
            <span>Left</span>
            <Separator orientation="vertical" />
            <span>Right</span>
          </div>
        ),
      },
    ],
  },

  // ─── Typography ───────────────────────────────────────────────────────────

  "badge": {
    importLine: `import { Badge } from "@/components/ui/badge"`,
    exampleCode: `<Badge>New</Badge>`,
    variants: [
      { label: "default", node: <Badge>Default</Badge> },
      { label: "secondary", node: <Badge variant="secondary">Secondary</Badge> },
      { label: "destructive", node: <Badge variant="destructive">Destructive</Badge> },
      { label: "outline", node: <Badge variant="outline">Outline</Badge> },
      { label: "ghost", node: <Badge variant="ghost">Ghost</Badge> },
      // T1-01: Stage & Status colours
      { label: "Solution Definition", node: <Badge style={{ backgroundColor: "color-mix(in oklch, var(--brand-600) 15%, transparent)", color: "var(--brand-600)" }}>Solution Definition</Badge> },
      { label: "Estimation", node: <Badge style={{ backgroundColor: "color-mix(in oklch, var(--info) 15%, transparent)", color: "var(--info)" }}>Estimation</Badge> },
      { label: "Triage", node: <Badge style={{ backgroundColor: "color-mix(in oklch, var(--warning) 15%, transparent)", color: "var(--warning)" }}>Triage</Badge> },
      { label: "Client Review", node: <Badge style={{ backgroundColor: "var(--brand-600)", color: "white" }}>Client Review</Badge> },
      { label: "On Track", node: <Badge style={{ backgroundColor: "color-mix(in oklch, var(--success) 15%, transparent)", color: "var(--success)" }}>On Track</Badge> },
      { label: "At Risk", node: <Badge style={{ backgroundColor: "color-mix(in oklch, var(--warning) 15%, transparent)", color: "var(--warning)" }}>At Risk</Badge> },
      { label: "Blocked", node: <Badge style={{ backgroundColor: "color-mix(in oklch, var(--error) 15%, transparent)", color: "var(--error)" }}>Blocked</Badge> },
      { label: "Healthy", node: <Badge style={{ backgroundColor: "color-mix(in oklch, var(--success) 15%, transparent)", color: "var(--success)" }}>Healthy</Badge> },
      { label: "Mitigated", node: <Badge variant="secondary">Mitigated</Badge> },
    ],
  },

  "alert": {
    importLine: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"`,
    exampleCode: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
</Alert>`,
    variants: [
      {
        label: "default",
        node: (
          <Alert className="w-full">
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components using the CLI.</AlertDescription>
          </Alert>
        ),
      },
      {
        label: "destructive",
        node: (
          <Alert variant="destructive" className="w-full">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
          </Alert>
        ),
      },
      // T1-04: Dismissible banner
      { label: "dismissible", node: <DismissibleAlert /> },
    ],
  },

  "label": {
    importLine: `import { Label } from "@/components/ui/label"`,
    exampleCode: `<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />`,
    variants: [
      {
        label: "default",
        node: (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="wb-label-1">Email address</Label>
            <Input id="wb-label-1" type="email" placeholder="you@nymbl.com" />
          </div>
        ),
      },
      {
        label: "disabled",
        node: (
          <div className="flex flex-col gap-1.5 opacity-50">
            <Label htmlFor="wb-label-2">Disabled field</Label>
            <Input id="wb-label-2" disabled placeholder="Not editable" />
          </div>
        ),
      },
    ],
  },

  "kbd": {
    importLine: `import { Kbd, KbdGroup } from "@/components/ui/kbd"`,
    exampleCode: `<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`,
    variants: [
      { label: "single", node: <Kbd>⌘</Kbd> },
      {
        label: "chord",
        node: (
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        ),
      },
      {
        label: "sequence",
        node: (
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        ),
      },
    ],
  },

  // ─── Forms & Inputs ───────────────────────────────────────────────────────

  "button": {
    importLine: `import { Button } from "@/components/ui/button"`,
    exampleCode: `<Button>Save changes</Button>`,
    variants: [
      {
        label: "default",
        node: (
          <Button>
            <Check data-icon="inline-start" />
            Approve scope
          </Button>
        ),
      },
      {
        label: "outline",
        node: (
          <Button variant="outline">
            <Download data-icon="inline-start" />
            Export estimate
          </Button>
        ),
      },
      { label: "secondary", node: <Button variant="secondary">Save draft</Button> },
      { label: "ghost", node: <Button variant="ghost">Preview</Button> },
      {
        label: "destructive",
        node: (
          <Button variant="destructive">
            <Trash2 data-icon="inline-start" />
            Delete draft
          </Button>
        ),
      },
      { label: "link", node: <Button variant="link">View details</Button> },
    ],
    sizes: [
      { label: "xs", node: <Button size="xs">Tag action</Button> },
      { label: "sm", node: <Button size="sm">Review</Button> },
      { label: "default", node: <Button>Continue</Button> },
      { label: "lg", node: <Button size="lg">Start intake</Button> },
      {
        label: "icon",
        node: (
          <Button size="icon" aria-label="Search workbench">
            <Search />
          </Button>
        ),
      },
    ],
  },

  "button-group": {
    importLine: `import { ButtonGroup } from "@/components/ui/button-group"`,
    exampleCode: `<ButtonGroup>
  <Button variant="outline">Back</Button>
  <Button>Continue</Button>
</ButtonGroup>`,
    variants: [
      {
        label: "horizontal",
        node: (
          <ButtonGroup>
            <Button variant="outline">Back</Button>
            <Button variant="outline">Filter</Button>
            <Button>Continue</Button>
          </ButtonGroup>
        ),
      },
      {
        label: "vertical",
        node: (
          <ButtonGroup orientation="vertical">
            <Button variant="outline">Top</Button>
            <Button variant="outline">Middle</Button>
            <Button variant="outline">Bottom</Button>
          </ButtonGroup>
        ),
      },
    ],
  },

  "input": {
    importLine: `import { Input } from "@/components/ui/input"`,
    exampleCode: `<Input type="email" placeholder="you@nymbl.com" />`,
    variants: [
      {
        label: "default",
        node: (
          <div className="flex w-72 flex-col gap-1.5">
            <Label htmlFor="wb-input-client">Client name</Label>
            <Input id="wb-input-client" placeholder="Northstar Health" />
          </div>
        ),
      },
      {
        label: "disabled",
        node: (
          <div className="flex w-72 flex-col gap-1.5">
            <Label htmlFor="wb-input-locked">Engagement ID</Label>
            <Input id="wb-input-locked" placeholder="ENG-1042" disabled />
          </div>
        ),
      },
      {
        label: "invalid",
        node: (
          <div className="flex w-72 flex-col gap-1.5">
            <Label htmlFor="wb-input-invalid">Confidence score</Label>
            <Input id="wb-input-invalid" placeholder="0-100" aria-invalid />
            <p className="text-xs text-destructive">Enter a score between 0 and 100.</p>
          </div>
        ),
      },
    ],
  },

  "input-group": {
    importLine: `import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"`,
    exampleCode: `<InputGroup>
  <InputGroupAddon>https://</InputGroupAddon>
  <InputGroupInput placeholder="nymbl.com" />
</InputGroup>`,
    variants: [
      {
        label: "prefix",
        node: (
          <InputGroup className="w-64">
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="nymbl.com" />
          </InputGroup>
        ),
      },
      {
        label: "icon prefix",
        node: (
          <InputGroup className="w-64">
            <InputGroupAddon>
              <User className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Username" />
          </InputGroup>
        ),
      },
    ],
  },

  "input-otp": {
    importLine: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"`,
    exampleCode: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    variants: [
      {
        label: "6-digit",
        node: (
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {Array.from({ length: 6 }, (_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        ),
      },
      {
        label: "4-digit",
        node: (
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              {Array.from({ length: 4 }, (_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        ),
      },
    ],
  },

  "textarea": {
    importLine: `import { Textarea } from "@/components/ui/textarea"`,
    exampleCode: `<Textarea placeholder="Write a note…" />`,
    variants: [
      { label: "default", node: <Textarea placeholder="Write a note…" className="w-full" /> },
      { label: "disabled", node: <Textarea placeholder="Disabled" disabled className="w-full" /> },
    ],
  },

  "checkbox": {
    importLine: `import { Checkbox } from "@/components/ui/checkbox"`,
    exampleCode: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>`,
    variants: [
      {
        label: "unchecked",
        node: (
          <div className="flex items-center gap-2">
            <Checkbox id="wb-chk-1" />
            <Label htmlFor="wb-chk-1">Unchecked</Label>
          </div>
        ),
      },
      {
        label: "checked",
        node: (
          <div className="flex items-center gap-2">
            <Checkbox id="wb-chk-2" defaultChecked />
            <Label htmlFor="wb-chk-2">Checked</Label>
          </div>
        ),
      },
      {
        label: "disabled",
        node: (
          <div className="flex items-center gap-2">
            <Checkbox id="wb-chk-3" disabled />
            <Label htmlFor="wb-chk-3">Disabled</Label>
          </div>
        ),
      },
    ],
  },

  "radio-group": {
    importLine: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
    exampleCode: `<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
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
              <Label htmlFor="wb-r-bank">Bank transfer</Label>
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

  "select": {
    importLine: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"`,
    exampleCode: `<Select>
  <SelectTrigger><SelectValue placeholder="Choose…" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
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

  "native-select": {
    importLine: `import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"`,
    exampleCode: `<NativeSelect>
  <NativeSelectOption value="">Pick one…</NativeSelectOption>
  <NativeSelectOption value="a">Option A</NativeSelectOption>
</NativeSelect>`,
    variants: [
      {
        label: "default",
        node: (
          <NativeSelect>
            <NativeSelectOption value="">Pick one…</NativeSelectOption>
            <NativeSelectOption value="a">Option A</NativeSelectOption>
            <NativeSelectOption value="b">Option B</NativeSelectOption>
          </NativeSelect>
        ),
      },
      {
        label: "disabled",
        node: (
          <NativeSelect disabled>
            <NativeSelectOption value="">Disabled</NativeSelectOption>
          </NativeSelect>
        ),
      },
    ],
    sizes: [
      {
        label: "sm",
        node: (
          <NativeSelect size="sm">
            <NativeSelectOption value="">Small</NativeSelectOption>
          </NativeSelect>
        ),
      },
      {
        label: "default",
        node: (
          <NativeSelect>
            <NativeSelectOption value="">Default</NativeSelectOption>
          </NativeSelect>
        ),
      },
    ],
  },

  "switch": {
    importLine: `import { Switch } from "@/components/ui/switch"`,
    exampleCode: `<Switch />`,
    variants: [
      { label: "off", node: <Switch /> },
      { label: "on", node: <Switch defaultChecked /> },
      { label: "disabled", node: <Switch disabled /> },
    ],
  },

  "slider": {
    importLine: `import { Slider } from "@/components/ui/slider"`,
    exampleCode: `<Slider defaultValue={[50]} max={100} step={1} className="w-64" />`,
    variants: [
      { label: "default", node: <Slider defaultValue={[40]} max={100} step={1} className="w-64" /> },
      { label: "range", node: <Slider defaultValue={[20, 70]} max={100} step={1} className="w-64" /> },
      { label: "disabled", node: <Slider defaultValue={[50]} max={100} disabled className="w-64" /> },
    ],
  },

  "toggle": {
    importLine: `import { Toggle } from "@/components/ui/toggle"`,
    exampleCode: `<Toggle aria-label="Bold"><Bold /></Toggle>`,
    variants: [
      { label: "default", node: <Toggle aria-label="Bold"><Bold /></Toggle> },
      { label: "outline", node: <Toggle variant="outline" aria-label="Italic"><Italic /></Toggle> },
      { label: "pressed", node: <Toggle defaultPressed aria-label="Underline"><Underline /></Toggle> },
      { label: "labelled mode switch", node: <LabelledModeToggle /> },
    ],
  },

  "toggle-group": {
    importLine: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
    exampleCode: `<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
</ToggleGroup>`,
    variants: [
      {
        label: "multiple",
        node: (
          <ToggleGroup type="multiple">
            <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
          </ToggleGroup>
        ),
      },
      {
        label: "single",
        node: (
          <ToggleGroup type="single" defaultValue="sm">
            <ToggleGroupItem value="sm">S</ToggleGroupItem>
            <ToggleGroupItem value="md">M</ToggleGroupItem>
            <ToggleGroupItem value="lg">L</ToggleGroupItem>
          </ToggleGroup>
        ),
      },
    ],
  },

  "calendar": {
    importLine: `import { Calendar } from "@/components/ui/calendar"`,
    exampleCode: `const [date, setDate] = React.useState<Date | undefined>(new Date())
<Calendar mode="single" selected={date} onSelect={setDate} />`,
    variants: [
      {
        label: "default",
        node: <Calendar mode="single" className="rounded-md border" />,
      },
    ],
  },

  "combobox": {
    importLine: `import { Combobox, ComboboxInput, ComboboxContent, ComboboxItem } from "@/components/ui/combobox"`,
    exampleCode: `<Combobox>
  <ComboboxInput placeholder="Search…" />
  <ComboboxContent>
    <ComboboxItem value="react">React</ComboboxItem>
    <ComboboxItem value="vue">Vue</ComboboxItem>
  </ComboboxContent>
</Combobox>`,
    variants: [
      {
        label: "note",
        node: (
          <div className="flex w-full flex-col gap-2 rounded-md border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            <p>
              Combobox uses{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">@base-ui/react</code>{" "}
              and requires a client component with state.
            </p>
            <a
              href="https://ui.shadcn.com/docs/components/combobox"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-4"
            >
              View full documentation →
            </a>
          </div>
        ),
      },
    ],
  },

  "field": {
    importLine: `import { Field, FieldDescription, FieldError } from "@/components/ui/field"`,
    exampleCode: `<Field>
  <Label>Email</Label>
  <Input type="email" />
  <FieldDescription>We'll never share your email.</FieldDescription>
</Field>`,
    variants: [
      {
        label: "default",
        node: (
          <Field className="w-64">
            <Label>Email</Label>
            <Input type="email" placeholder="you@nymbl.com" />
            <FieldDescription>{"We'll never share your email."}</FieldDescription>
          </Field>
        ),
      },
      {
        label: "with error",
        node: (
          <Field className="w-64" data-invalid="true">
            <Label>Password</Label>
            <Input type="password" aria-invalid />
            <FieldError>Password must be at least 8 characters.</FieldError>
          </Field>
        ),
      },
    ],
  },

  "form-layouts": {
    importLine: `import { FormLayoutsGallery } from "@/components/workbench/demos/form-layouts"`,
    exampleCode: `<FormLayoutsGallery />`,
    variants: [
      {
        label: "form layouts",
        node: (
          <div className="w-full">
            <FormLayoutsGallery />
          </div>
        ),
      },
    ],
  },

  // ─── Navigation ───────────────────────────────────────────────────────────

  "breadcrumb": {
    importLine: `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"`,
    exampleCode: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Button</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    variants: [
      {
        label: "default",
        node: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Button</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
      },
      {
        label: "workspace nav",
        node: <WorkspaceNavBreadcrumb />,
      },
    ],
  },

  "menubar": {
    importLine: `import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "@/components/ui/menubar"`,
    exampleCode: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Quit</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    variants: [
      {
        label: "default",
        node: (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New</MenubarItem>
                <MenubarItem>Open</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Quit</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo</MenubarItem>
                <MenubarItem>Redo</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ),
      },
    ],
  },

  "pagination": {
    importLine: `import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"`,
    exampleCode: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
    variants: [
      {
        label: "default",
        node: (
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        ),
      },
    ],
  },

  "tabs": {
    importLine: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`,
    exampleCode: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`,
    variants: [
      {
        label: "default",
        node: (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-sm text-muted-foreground">Overview content</TabsContent>
            <TabsContent value="settings" className="text-sm text-muted-foreground">Settings content</TabsContent>
            <TabsContent value="activity" className="text-sm text-muted-foreground">Activity content</TabsContent>
          </Tabs>
        ),
      },
      {
        label: "underline with counts",
        node: (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pain-points">Pain Points <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">7</Badge></TabsTrigger>
              <TabsTrigger value="wish-list">Wish List <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">12</Badge></TabsTrigger>
              <TabsTrigger value="user-groups">User Groups <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0">4</Badge></TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-sm text-muted-foreground pt-2">Overview content</TabsContent>
            <TabsContent value="pain-points" className="text-sm text-muted-foreground pt-2">Pain points content</TabsContent>
            <TabsContent value="wish-list" className="text-sm text-muted-foreground pt-2">Wish list content</TabsContent>
            <TabsContent value="user-groups" className="text-sm text-muted-foreground pt-2">User groups content</TabsContent>
          </Tabs>
        ),
      },
    ],
  },

  "navigation-menu": {
    importLine: `import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"`,
    exampleCode: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
        <NavigationMenuLink href="#">API Reference</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    variants: [
      {
        label: "with dropdowns",
        node: (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-1">
                    <NavigationMenuLink className="block rounded px-3 py-2 text-sm hover:bg-muted">
                      Documentation
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block rounded px-3 py-2 text-sm hover:bg-muted">
                      API Reference
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-1">
                    <NavigationMenuLink className="block rounded px-3 py-2 text-sm hover:bg-muted">
                      Blog
                    </NavigationMenuLink>
                    <NavigationMenuLink className="block rounded px-3 py-2 text-sm hover:bg-muted">
                      Community
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ),
      },
    ],
  },

  // ─── Overlays & Feedback ──────────────────────────────────────────────────

  "dialog": {
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
            <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm action</DialogTitle>
                <DialogDescription>This will permanently update your settings.</DialogDescription>
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

  "alert-dialog": {
    importLine: `import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"`,
    exampleCode: `<AlertDialog>
  <AlertDialogTrigger asChild><Button variant="destructive">Delete</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    variants: [
      {
        label: "default",
        node: (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
      },
    ],
  },

  "drawer": {
    importLine: `import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"`,
    exampleCode: `<Drawer>
  <DrawerTrigger asChild><Button variant="outline">Open</Button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    variants: [
      {
        label: "default",
        node: (
          <Drawer>
            <DrawerTrigger asChild><Button variant="outline">Open drawer</Button></DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit profile</DrawerTitle>
                <DrawerDescription>Make changes to your profile here.</DrawerDescription>
              </DrawerHeader>
              <div className="px-4 py-2">
                <Input placeholder="Name" />
              </div>
              <DrawerFooter>
                <Button>Save</Button>
                <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ),
      },
    ],
  },

  "sheet": {
    importLine: `import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"`,
    exampleCode: `<Sheet>
  <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    variants: [
      {
        label: "right",
        node: (
          <Sheet>
            <SheetTrigger asChild><Button variant="outline">Open sheet</Button></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>Manage your account settings.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ),
      },
      {
        label: "left",
        node: (
          <Sheet>
            <SheetTrigger asChild><Button variant="outline">Open left</Button></SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>Site navigation drawer.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ),
      },
    ],
  },

  "popover": {
    importLine: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`,
    exampleCode: `<Popover>
  <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
  <PopoverContent>Place content here.</PopoverContent>
</Popover>`,
    variants: [
      {
        label: "default",
        node: (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon />
                Pick date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 text-sm text-muted-foreground">
              A popover can contain any content, like a date picker or form fields.
            </PopoverContent>
          </Popover>
        ),
      },
    ],
  },

  "hover-card": {
    importLine: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"`,
    exampleCode: `<HoverCard>
  <HoverCardTrigger asChild><Button variant="link">@shadcn</Button></HoverCardTrigger>
  <HoverCardContent>Preview content here.</HoverCardContent>
</HoverCard>`,
    variants: [
      {
        label: "default",
        node: (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@nymbl</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex flex-col gap-1">
                <div className="font-semibold">Nymbl</div>
                <div className="text-xs text-muted-foreground">Building modern enterprise SaaS.</div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ),
      },
    ],
  },

  "context-menu": {
    importLine: `import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"`,
    exampleCode: `<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Edit</ContextMenuItem>
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    variants: [
      {
        label: "default",
        node: (
          <ContextMenu>
            <ContextMenuTrigger className="flex h-20 w-48 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem>Edit</ContextMenuItem>
              <ContextMenuItem>Duplicate</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ),
      },
    ],
  },

  "dropdown-menu": {
    importLine: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"`,
    exampleCode: `<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Menu</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
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
              <DropdownMenuItem>
                <User />Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
  },

  "tooltip": {
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
            <TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger>
            <TooltipContent>This is a tooltip</TooltipContent>
          </Tooltip>
        ),
      },
      {
        label: "with kbd",
        node: (
          <Tooltip>
            <TooltipTrigger asChild><Button variant="outline">Command palette</Button></TooltipTrigger>
            <TooltipContent>
              Open <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
            </TooltipContent>
          </Tooltip>
        ),
      },
    ],
  },

  "toast": {
    importLine: `import { toast } from "sonner"`,
    exampleCode: `// Trigger from any client component:
toast("Meeting created for 3 PM.")
toast.success("Changes saved.")
toast.error("Failed to save changes.")
toast.warning("Unsaved changes will be lost.")
toast.info("Your trial ends in 3 days.")`,
    variants: [
      {
        label: "all types",
        node: <ToastDemo />,
      },
    ],
  },

  "sonner": {
    importLine: `import { Toaster } from "@/components/ui/sonner"\nimport { toast } from "sonner"`,
    exampleCode: `// In layout.tsx:
<Toaster />

// To trigger:
toast("Event has been created.")
toast.success("Profile saved!")
toast.error("Something went wrong.")`,
    variants: [
      {
        label: "usage",
        node: (
          <div className="flex w-64 flex-col gap-2 rounded-md border bg-muted/30 p-4 text-sm">
            <p className="text-muted-foreground">
              Add <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">{"<Toaster />"}</code> to your root layout, then call{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">toast()</code> anywhere.
            </p>
          </div>
        ),
      },
    ],
  },

  // ─── Data Display ─────────────────────────────────────────────────────────

  "card": {
    importLine: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"`,
    exampleCode: `<Card>
  <CardHeader>
    <CardTitle>Account</CardTitle>
    <CardDescription>Manage your profile</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
</Card>`,
    variants: [
      {
        label: "default",
        node: (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Scope readiness</CardTitle>
              <CardDescription>Pre-sales review package</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sections complete</span>
                <span className="font-medium">7 / 9</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-3/4 rounded-full bg-primary" />
              </div>
            </CardContent>
            <CardFooter className="justify-between gap-3">
              <Badge variant="secondary">On track</Badge>
              <Button size="sm">Open review</Button>
            </CardFooter>
          </Card>
        ),
      },
    ],
    sizes: [
      {
        label: "default",
        node: (
          <Card className="w-64">
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>Relaxed spacing</CardDescription>
            </CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Content</p></CardContent>
          </Card>
        ),
      },
      {
        label: "sm",
        node: (
          <Card size="sm" className="w-64">
            <CardHeader>
              <CardTitle>Small</CardTitle>
              <CardDescription>Dense spacing</CardDescription>
            </CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Content</p></CardContent>
          </Card>
        ),
      },
    ],
  },

  "table": {
    importLine: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"`,
    exampleCode: `<Table>
  <TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Alex</TableCell></TableRow></TableBody>
</Table>`,
    variants: [
      {
        label: "default",
        node: (
          <Table className="w-full">
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
                <TableCell className="text-right"><Badge>Active</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Priya Shah</TableCell>
                <TableCell>Designer</TableCell>
                <TableCell className="text-right"><Badge variant="secondary">Away</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ),
      },
    ],
  },

  "avatar": {
    importLine: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`,
    exampleCode: `<Avatar>
  <AvatarImage src="/avatar.png" alt="User" />
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
      { label: "fallback", node: <Avatar><AvatarFallback>AR</AvatarFallback></Avatar> },
      {
        label: "icon",
        node: <Avatar><AvatarFallback><User className="size-4" /></AvatarFallback></Avatar>,
      },
    ],
    sizes: [
      { label: "sm", node: <Avatar className="size-6"><AvatarFallback className="text-xs">AR</AvatarFallback></Avatar> },
      { label: "default", node: <Avatar><AvatarFallback>AR</AvatarFallback></Avatar> },
      { label: "lg", node: <Avatar className="size-12"><AvatarFallback>AR</AvatarFallback></Avatar> },
    ],
  },

  "progress": {
    importLine: `import { Progress } from "@/components/ui/progress"`,
    exampleCode: `<Progress value={60} className="w-64" />`,
    variants: [
      { label: "60%", node: <Progress value={60} className="w-64" /> },
      { label: "25%", node: <Progress value={25} className="w-64" /> },
      { label: "100%", node: <Progress value={100} className="w-64" /> },
      { label: "indeterminate", node: <Progress className="w-64" /> },
      {
        label: "budget — on track",
        node: <Progress value={60} className="w-64 [&>div]:bg-[var(--success)]" />,
      },
      {
        label: "budget — at risk",
        node: <Progress value={88} className="w-64 [&>div]:bg-[var(--warning)]" />,
      },
      {
        label: "budget — over",
        node: <Progress value={100} className="w-64 [&>div]:bg-[var(--error)]" />,
      },
      {
        label: "labelled percentage",
        node: (
          <div className="flex w-64 flex-col gap-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Budget consumed</span>
              <span className="font-medium text-foreground">93%</span>
            </div>
            <Progress value={93} className="[&>div]:bg-[var(--warning)]" />
          </div>
        ),
      },
    ],
  },

  "spinner": {
    importLine: `import { Spinner } from "@/components/ui/spinner"`,
    exampleCode: `<Spinner />`,
    variants: [
      { label: "default", node: <Spinner /> },
      { label: "md", node: <Spinner className="size-6" /> },
      { label: "lg", node: <Spinner className="size-8 text-primary" /> },
    ],
  },

  "skeleton": {
    importLine: `import { Skeleton } from "@/components/ui/skeleton"`,
    exampleCode: `<Skeleton className="h-4 w-40" />`,
    variants: [
      {
        label: "text lines",
        node: (
          <div className="flex w-48 flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        ),
      },
      { label: "circle", node: <Skeleton className="size-12 rounded-full" /> },
      { label: "card", node: <Skeleton className="h-32 w-48 rounded-xl" /> },
    ],
  },

  "empty": {
    importLine: `import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"`,
    exampleCode: `<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon"><LayoutDashboard /></EmptyMedia>
    <EmptyTitle>No results</EmptyTitle>
    <EmptyDescription>Try adjusting your filters.</EmptyDescription>
  </EmptyHeader>
</Empty>`,
    variants: [
      {
        label: "default",
        node: (
          <Empty className="w-64">
            <EmptyHeader>
              <EmptyMedia variant="icon"><LayoutDashboard /></EmptyMedia>
              <EmptyTitle>No results</EmptyTitle>
              <EmptyDescription>Try adjusting your filters to find what you&apos;re looking for.</EmptyDescription>
            </EmptyHeader>
            <Button size="sm" variant="outline">Clear filters</Button>
          </Empty>
        ),
      },
    ],
  },

  "chart": {
    importLine: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"\nimport { BarChart, Bar, XAxis, CartesianGrid } from "recharts"`,
    exampleCode: `const chartConfig = {
  value: { label: "Revenue", color: "var(--primary)" },
}

<ChartContainer config={chartConfig} className="h-48 w-full">
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="value" fill="var(--color-value)" radius={4} />
  </BarChart>
</ChartContainer>`,
    variants: [
      { label: "bar chart", node: <ChartBarDemo /> },
      { label: "line chart", node: <ChartLineDemo /> },
    ],
  },

  "carousel": {
    importLine: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"`,
    exampleCode: `<Carousel>
  <CarouselContent>
    {items.map((item) => (
      <CarouselItem key={item}>…</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    variants: [
      {
        label: "horizontal",
        node: (
          <div className="relative w-full px-8">
            <Carousel>
              <CarouselContent>
                {[1, 2, 3, 4, 5].map((i) => (
                  <CarouselItem key={i}>
                    <div className="flex h-36 items-center justify-center rounded-md bg-muted text-xl font-semibold text-muted-foreground">
                      {i}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ),
      },
      {
        label: "multi-item",
        node: (
          <div className="relative w-full px-8">
            <Carousel opts={{ align: "start" }}>
              <CarouselContent className="-ml-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <CarouselItem key={i} className="pl-2 basis-1/3">
                    <div className="flex h-20 items-center justify-center rounded-md bg-muted text-sm font-medium text-muted-foreground">
                      {i}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ),
      },
    ],
  },

  "date-picker": {
    importLine: `import { Calendar } from "@/components/ui/calendar"\nimport { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`,
    exampleCode: `const [date, setDate] = useState<Date | undefined>()

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">
      {date ? date.toDateString() : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} onSelect={setDate} />
  </PopoverContent>
</Popover>`,
    variants: [
      { label: "single date", node: <DatePickerDemo /> },
      { label: "date range", node: <DateRangeDemo /> },
    ],
  },

  "direction": {
    importLine: `import { DirectionProvider, useDirection } from "@/components/ui/direction"`,
    exampleCode: `<DirectionProvider dir="rtl">
  {/* All Radix components inside respect RTL */}
  <Input placeholder="اكتب هنا..." />
</DirectionProvider>`,
    variants: [
      { label: "ltr / rtl toggle", node: <DirectionDemo /> },
    ],
  },

  // ─── Utilities ────────────────────────────────────────────────────────────

  "accordion": {
    importLine: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"`,
    exampleCode: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    variants: [
      {
        label: "single",
        node: (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="a">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>Yes. It comes with default styles that match NOS tokens.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>Yes. Motion tokens drive the expand/collapse animation.</AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      },
    ],
  },

  "collapsible": {
    importLine: `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"`,
    exampleCode: `<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Toggle</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`,
    variants: [
      {
        label: "default",
        node: (
          <Collapsible className="w-64">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                View members
                <ChevronRight className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 flex flex-col gap-1 rounded-md border p-2 text-sm">
                <div>@alice</div>
                <div>@bob</div>
                <div>@carol</div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ),
      },
    ],
  },

  "command": {
    importLine: `import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"`,
    exampleCode: `<Command>
  <CommandInput placeholder="Type a command…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>Dashboard</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    variants: [
      {
        label: "default",
        node: (
          <div className="w-full rounded-md border shadow-md">
            {/* Dynamically import Command to avoid SSR issues with CommandInput */}
            <div className="p-3 text-sm text-muted-foreground">
              Command is used inside dialogs via{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">{"<CommandDialog>"}</code>.
              It powers the Combobox and search palettes.
            </div>
          </div>
        ),
      },
    ],
  },

  "item": {
    importLine: `import { Item, ItemGroup } from "@/components/ui/item"`,
    exampleCode: `<ItemGroup>
  <Item>Dashboard</Item>
  <Item>Settings</Item>
</ItemGroup>`,
    variants: [
      {
        label: "default",
        node: (
          <ItemGroup className="w-48">
            <ItemComp>
              <LayoutDashboard className="size-4" />
              Dashboard
            </ItemComp>
            <ItemComp>
              <Settings className="size-4" />
              Settings
            </ItemComp>
            <ItemComp>
              <User className="size-4" />
              Profile
            </ItemComp>
          </ItemGroup>
        ),
      },
    ],
  },

  // ─── Application Primitives ───────────────────────────────────────────────

  "id-chip": {
    importLine: `import { IdChip } from "@/components/ui/id-chip"`,
    exampleCode: `<IdChip id="EPIC-014" />
<IdChip id="RISK-01" href="#" />`,
    variants: [
      { label: "epic", node: <IdChip id="EPIC-014" /> },
      { label: "risk", node: <IdChip id="RISK-01" /> },
      { label: "question", node: <IdChip id="Q-03" /> },
      { label: "assumption", node: <IdChip id="A-07" /> },
      { label: "component", node: <IdChip id="COMP-02" /> },
      { label: "with href", node: <IdChip id="EPIC-031" href="#" /> },
    ],
  },

  "linked-chip": {
    importLine: `import { LinkedChip } from "@/components/ui/linked-chip"`,
    exampleCode: `<LinkedChip id="EPIC-031" type="epic" />
<LinkedChip id="RISK-01" type="risk" />`,
    variants: [
      { label: "epic", node: <LinkedChip id="EPIC-031" type="epic" /> },
      { label: "story", node: <LinkedChip id="STORY-04" type="story" /> },
      { label: "risk", node: <LinkedChip id="RISK-01" type="risk" /> },
      { label: "question", node: <LinkedChip id="Q-03" type="question" /> },
      { label: "assumption", node: <LinkedChip id="A-07" type="assumption" /> },
      { label: "component", node: <LinkedChip id="COMP-02" type="component" /> },
    ],
  },

  "health-indicator": {
    importLine: `import { HealthIndicator } from "@/components/ui/health-indicator"`,
    exampleCode: `<HealthIndicator status="healthy" />
<HealthIndicator status="warning" message="2 open risks" />
<HealthIndicator status="error" message="Missing estimates" />`,
    variants: [
      { label: "healthy", node: <HealthIndicator status="healthy" /> },
      { label: "warning", node: <HealthIndicator status="warning" message="2 open risks" /> },
      { label: "error", node: <HealthIndicator status="error" message="Missing estimates" /> },
      { label: "no label", node: <HealthIndicator status="warning" showLabel={false} /> },
    ],
  },

  "readiness-item": {
    importLine: `import { ReadinessItem } from "@/components/ui/readiness-item"`,
    exampleCode: `<ReadinessItem label="Scope approved" status="pass" />
<ReadinessItem label="Open questions" status="warning" />
<ReadinessItem label="Missing estimates" status="fail" />`,
    variants: [
      {
        label: "checklist",
        node: (
          <div className="flex flex-col gap-2 w-full">
            <ReadinessItem label="Scope approved" status="pass" />
            <ReadinessItem label="2 open questions remain" status="warning" />
            <ReadinessItem label="Missing estimates on Phase 3" status="fail" />
          </div>
        ),
      },
    ],
  },

  // ─── Phase 2: NOS Display Atoms ──────────────────────────────────────────

  "stepper-counter": {
    importLine: `import { StepperCounter } from "@/components/ui/stepper-counter"`,
    exampleCode: `<StepperCounter current={4} total={12} percent={33} />`,
    variants: [
      { label: "early stage", node: <StepperCounter current={1} total={12} percent={8} /> },
      { label: "mid stage", node: <StepperCounter current={4} total={12} percent={33} /> },
      { label: "late stage", node: <StepperCounter current={10} total={12} percent={83} /> },
    ],
  },

  "l1-distribution-bar": {
    importLine: `import { L1DistributionBar } from "@/components/ui/l1-distribution-bar"`,
    exampleCode: `<L1DistributionBar segments={[
  { type: "Experience", value: 8 },
  { type: "Workflow", value: 12 },
  { type: "Integration", value: 5 },
  { type: "Foundation", value: 3 },
]} />`,
    variants: [
      {
        label: "default (sm)",
        node: (
          <div className="w-full">
            <L1DistributionBar
              segments={[
                { type: "Experience", value: 8 },
                { type: "Workflow", value: 12 },
                { type: "Integration", value: 5 },
                { type: "Foundation", value: 3 },
              ]}
            />
          </div>
        ),
      },
      {
        label: "md height",
        node: (
          <div className="w-full">
            <L1DistributionBar
              height="md"
              segments={[
                { type: "Experience", value: 10 },
                { type: "Workflow", value: 8 },
                { type: "Integration", value: 6 },
                { type: "Foundation", value: 4 },
              ]}
            />
          </div>
        ),
      },
      {
        label: "with legend",
        node: (
          <div className="w-full">
            <L1DistributionBar
              showLegend
              segments={[
                { type: "Experience", value: 8 },
                { type: "Workflow", value: 12 },
                { type: "Integration", value: 5 },
                { type: "Foundation", value: 3 },
              ]}
            />
          </div>
        ),
      },
    ],
  },

  "ai-action-bar": {
    importLine: `import { AIActionBar } from "@/components/ui/ai-action-bar"`,
    exampleCode: `<AIActionBar
  actions={[
    { label: "Regenerate", onClick: () => {} },
    { label: "Expand section", onClick: () => {} },
  ]}
/>`,
    variants: [
      { label: "default", node: <AIActionBarDemo /> },
      { label: "custom label", node: <AIActionBarMinimalDemo /> },
    ],
  },

  // ─── Metrics & Feeds ─────────────────────────────────────────────────────

  "avatar-group": {
    importLine: `import { Avatar, AvatarFallback, AvatarImage, AvatarGroup, AvatarGroupCount, AvatarGroupCompact, AvatarGroupCompactOverflow } from "@/components/ui/avatar"`,
    exampleCode: `<AvatarGroup>
  <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
  <AvatarGroupCount>+4</AvatarGroupCount>
</AvatarGroup>`,
    variants: [
      {
        label: "stacked (3)",
        node: (
          <AvatarGroup>
            <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>MT</AvatarFallback></Avatar>
          </AvatarGroup>
        ),
      },
      {
        label: "with overflow",
        node: (
          <AvatarGroup>
            <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>MT</AvatarFallback></Avatar>
            <AvatarGroupCount>+4</AvatarGroupCount>
          </AvatarGroup>
        ),
      },
      {
        label: "sm size",
        node: (
          <AvatarGroup data-size="sm">
            <Avatar data-size="sm"><AvatarFallback>JD</AvatarFallback></Avatar>
            <Avatar data-size="sm"><AvatarFallback>SC</AvatarFallback></Avatar>
            <AvatarGroupCount data-size="sm">+2</AvatarGroupCount>
          </AvatarGroup>
        ),
      },
      {
        label: "compact · with overflow",
        node: (
          <AvatarGroupCompact>
            <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>MT</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>AJ</AvatarFallback></Avatar>
            <AvatarGroupCompactOverflow>+4</AvatarGroupCompactOverflow>
          </AvatarGroupCompact>
        ),
      },
      {
        label: "compact · lg · stroke",
        node: (
          <AvatarGroupCompact size="lg" variant="stroke">
            <Avatar size="lg"><AvatarFallback>SC</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback>MT</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback>AJ</AvatarFallback></Avatar>
          </AvatarGroupCompact>
        ),
      },
    ],
  },

  "stat-card": {
    importLine: `import { StatCard } from "@/components/ui/stat-card"`,
    exampleCode: `<StatCard
  label="Total Pipeline Value"
  value="$2.4M"
  trend={{ direction: "up", value: "+12%", label: "vs last quarter" }}
/>`,
    variants: [
      {
        label: "positive trend",
        node: (
          <StatCard
            label="Total Pipeline Value"
            value="$2.4M"
            subLabel="Active engagements"
            trend={{ direction: "up", value: "+12%", label: "vs last quarter" }}
          />
        ),
      },
      {
        label: "negative trend",
        node: (
          <StatCard
            label="Avg. Time to Close"
            value="47 days"
            trend={{ direction: "down", value: "-24.4%", label: "vs last quarter" }}
          />
        ),
      },
      {
        label: "neutral",
        node: (
          <StatCard
            label="Win Rate"
            value="68%"
            trend={{ direction: "neutral", value: "0%", label: "unchanged" }}
          />
        ),
      },
      {
        label: "no trend",
        node: (
          <StatCard
            label="Open Questions"
            value={12}
            subLabel="Across all engagements"
          />
        ),
      },
    ],
  },

  "metric-panels": {
    importLine: `import { MetricPanelsGallery } from "@/components/workbench/demos/metric-panels"`,
    exampleCode: `<MetricPanelsGallery />`,
    variants: [
      {
        label: "metric panels",
        node: (
          <div className="w-full">
            <MetricPanelsGallery />
          </div>
        ),
      },
    ],
  },

  "timeline": {
    importLine: `import { Timeline } from "@/components/ui/timeline"`,
    exampleCode: `<Timeline steps={[
  { role: "Solution Architect", reviewer: "Sarah Chen", status: "complete", timestamp: "May 20" },
  { role: "Delivery Lead", reviewer: "Mark Torres", status: "pending" },
  { role: "Client Sponsor", status: "pending" },
]} />`,
    variants: [
      {
        label: "approval flow",
        node: (
          <div className="w-full">
            <Timeline
              steps={[
                { role: "Solution Architect", reviewer: "Sarah Chen", status: "complete", timestamp: "May 20, 2026" },
                { role: "Delivery Lead", reviewer: "Mark Torres", status: "pending" },
                { role: "Client Sponsor", status: "pending" },
              ]}
            />
          </div>
        ),
      },
      {
        label: "with rejection",
        node: (
          <div className="w-full">
            <Timeline
              steps={[
                { role: "Solution Architect", reviewer: "Sarah Chen", status: "complete", timestamp: "May 18" },
                { role: "Delivery Lead", reviewer: "Mark Torres", status: "rejected", timestamp: "May 19", note: "Scope needs revision" },
                { role: "Client Sponsor", status: "pending" },
              ]}
            />
          </div>
        ),
      },
    ],
  },

  "activity-feed": {
    importLine: `import { ActivityFeed } from "@/components/ui/activity-feed"`,
    exampleCode: `<ActivityFeed items={[
  { id: "1", actor: { name: "Alice", initials: "AJ" }, action: "updated", subject: "Clinical Intake Platform", timestamp: "2h ago" },
]} />`,
    variants: [
      {
        label: "default",
        node: (
          <div className="w-full">
            <ActivityFeed
              items={[
                { id: "1", actor: { name: "Alice Johnson", initials: "AJ" }, action: "updated", subject: "Clinical Intake Automation Platform", timestamp: "2h ago" },
                { id: "2", actor: { name: "Ben Carter", initials: "BC" }, action: "commented on", subject: "Domain Model Board", timestamp: "4h ago" },
                { id: "3", actor: { name: "Sarah Chen", initials: "SC" }, action: "approved", subject: "Phase 1 Estimate", timestamp: "Yesterday" },
                { id: "4", actor: { name: "Mark Torres", initials: "MT" }, action: "created", subject: "Reconciliation Panel", timestamp: "2 days ago" },
              ]}
            />
          </div>
        ),
      },
    ],
  },

  // ─── Planning ─────────────────────────────────────────────────────────────

  "stepper": {
    variantSpan: "full",
    importLine: `import { Stepper, StepperNav, StepperItem, StepperTrigger, StepperIndicator, StepperSeparator } from "@/components/ui/stepper"`,
    exampleCode: `<Stepper defaultValue={3}>
  <StepperNav>
    {[1,2,3,4].map((step, i, arr) => (
      <StepperItem key={step} step={step}>
        <StepperTrigger><StepperIndicator /></StepperTrigger>
        {i < arr.length - 1 && <StepperSeparator />}
      </StepperItem>
    ))}
  </StepperNav>
</Stepper>`,
    variants: [
      {
        label: "states",
        node: (
          <div className="w-full">
            <Stepper defaultValue={3}>
              <StepperNav>
                {[1, 2, 3, 4].map((step, i) => (
                  <StepperItem key={step} step={step}>
                    <StepperTrigger><StepperIndicator /></StepperTrigger>
                    {i < 3 && <StepperSeparator />}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
        ),
      },
      {
        label: "indicators",
        node: (
          <div className="w-full">
            <Stepper
              defaultValue={3}
              indicators={{
                active: <CircleDot className="size-3.5" />,
                completed: <CircleCheck className="size-3.5" />,
                inactive: <Circle className="size-3" />,
              }}
            >
              <StepperNav>
                {[1, 2, 3, 4].map((step, i) => (
                  <StepperItem key={step} step={step}>
                    <StepperTrigger><StepperIndicator /></StepperTrigger>
                    {i < 3 && <StepperSeparator />}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
        ),
      },
      {
        label: "controlled",
        node: <StepperControlledDemo />,
      },
      {
        label: "title",
        node: (
          <div className="w-full">
            <Stepper defaultValue={2}>
              <StepperNav>
                {(["Intake", "Discovery", "Scope", "Review"] as const).map((label, i) => (
                  <StepperItem key={i + 1} step={i + 1} className="items-start">
                    <div className="flex shrink-0 flex-col items-center gap-1.5">
                      <StepperTrigger><StepperIndicator /></StepperTrigger>
                      <StepperTitle className="text-xs whitespace-nowrap">{label}</StepperTitle>
                    </div>
                    {i < 3 && <StepperSeparator className="mt-3" />}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
        ),
      },
      {
        label: "title & status",
        node: (
          <div className="w-full">
            <Stepper defaultValue={2}>
              <StepperNav>
                {([
                  { label: "Intake", status: "Complete" },
                  { label: "Discovery", status: "In Progress" },
                  { label: "Scope", status: "Pending" },
                  { label: "Review", status: "Pending" },
                ] as const).map(({ label, status }, i) => (
                  <StepperItem key={i + 1} step={i + 1} className="items-start">
                    <div className="flex shrink-0 flex-col items-center gap-1">
                      <StepperTrigger><StepperIndicator /></StepperTrigger>
                      <StepperTitle className="text-xs whitespace-nowrap">{label}</StepperTitle>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{status}</span>
                    </div>
                    {i < 3 && <StepperSeparator className="mt-3" />}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
        ),
      },
      {
        label: "title & description",
        node: (
          <div className="w-full">
            <Stepper defaultValue={2}>
              <StepperNav>
                {([
                  { label: "Intake", desc: "Discovery call" },
                  { label: "Design", desc: "Domain model" },
                  { label: "Estimate", desc: "Story points" },
                ] as const).map(({ label, desc }, i) => (
                  <StepperItem key={i + 1} step={i + 1} className="items-start">
                    <div className="flex shrink-0 flex-col items-center gap-1">
                      <StepperTrigger><StepperIndicator /></StepperTrigger>
                      <StepperTitle className="text-xs whitespace-nowrap">{label}</StepperTitle>
                      <StepperDescription className="text-[10px] whitespace-nowrap">{desc}</StepperDescription>
                    </div>
                    {i < 2 && <StepperSeparator className="mt-3" />}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
        ),
      },
      {
        label: "inline title",
        node: (
          <div className="w-full">
            <Stepper defaultValue={2}>
              <StepperNav>
                {(["Intake", "Discovery", "Scope"] as const).map((label, i) => (
                  <StepperItem key={i + 1} step={i + 1}>
                    <StepperTrigger>
                      <StepperIndicator />
                      <span className="text-sm font-medium whitespace-nowrap">{label}</span>
                    </StepperTrigger>
                    {i < 2 && <StepperSeparator />}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
        ),
      },
      {
        label: "inline title & description",
        node: (
          <div className="w-full">
            <Stepper defaultValue={2}>
              <StepperNav>
                {([
                  { label: "Intake", desc: "Discovery call" },
                  { label: "Design", desc: "Domain model" },
                  { label: "Estimate", desc: "Story points" },
                ] as const).map(({ label, desc }, i) => (
                  <StepperItem key={i + 1} step={i + 1}>
                    <StepperTrigger>
                      <StepperIndicator />
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-sm font-medium leading-none whitespace-nowrap">{label}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{desc}</span>
                      </div>
                    </StepperTrigger>
                    {i < 2 && <StepperSeparator />}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
        ),
      },
      {
        label: "vertical",
        node: (
          <div className="w-full">
            <Stepper orientation="vertical" defaultValue={2}>
              <StepperNav className="w-full">
                {[1, 2, 3, 4].map((step, i) => (
                  <StepperItem key={step} step={step} className="items-start">
                    <StepperTrigger><StepperIndicator /></StepperTrigger>
                    {i < 3 && <StepperSeparator className="ms-[11px]" />}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
        ),
      },
      {
        label: "vertical title",
        node: (
          <div className="w-full">
            <Stepper orientation="vertical" defaultValue={2}>
              <StepperNav className="w-full">
                {(["Client Intake", "Solution Design", "Estimation"] as const).map((label, i) => (
                  <StepperItem key={i + 1} step={i + 1} className="items-start">
                    <div className="flex flex-row items-center gap-3">
                      <StepperTrigger><StepperIndicator /></StepperTrigger>
                      <StepperTitle className="whitespace-nowrap">{label}</StepperTitle>
                    </div>
                    {i < 2 && <StepperSeparator className="ms-[11px]" />}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
        ),
      },
      {
        label: "vertical title & description",
        node: (
          <div className="w-full">
            <Stepper orientation="vertical" defaultValue={2}>
              <StepperNav className="w-full">
                {([
                  { label: "Client Intake", desc: "Initial discovery call" },
                  { label: "Solution Design", desc: "Domain model & epics" },
                  { label: "Estimation", desc: "Bottom-up story points" },
                ] as const).map(({ label, desc }, i) => (
                  <StepperItem key={i + 1} step={i + 1} className="items-start">
                    <div className="flex flex-row items-center gap-3">
                      <StepperTrigger><StepperIndicator /></StepperTrigger>
                      <div className="flex flex-col gap-0.5">
                        <StepperTitle className="whitespace-nowrap">{label}</StepperTitle>
                        <StepperDescription className="whitespace-nowrap">{desc}</StepperDescription>
                      </div>
                    </div>
                    {i < 2 && <StepperSeparator className="ms-[11px]" />}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
        ),
      },
    ],
  },

  "data-table": {
    importLine: `import { DataTable } from "@/components/ui/data-table"`,
    exampleCode: `<DataTable
  columns={columns}
  data={data}
  searchKey="client"
  rowSelection
/>`,
    variants: [
      { label: "full featured", node: <DataTableDemo /> },
    ],
  },

  "kanban-board": {
    importLine: `import { KanbanBoard } from "@/components/ui/kanban-board"`,
    exampleCode: `<KanbanBoard columns={columns} onItemMove={handleMove} />`,
    variants: [
      { label: "4-column board", node: <KanbanBoardDemo /> },
    ],
  },

  "gantt": {
    importLine: `import { Gantt } from "@/components/ui/gantt"`,
    exampleCode: `<Gantt columns={months} tasks={phases} todayColumn={2} />`,
    variants: [
      {
        label: "project timeline",
        node: (
          <div className="w-full">
            <Gantt
              columns={[
                { id: "jan", label: "Jan" },
                { id: "feb", label: "Feb" },
                { id: "mar", label: "Mar" },
                { id: "apr", label: "Apr" },
                { id: "may", label: "May" },
                { id: "jun", label: "Jun" },
              ]}
              tasks={[
                { id: "1", label: "Phase 1: Discovery", start: 0, duration: 2 },
                { id: "2", label: "Phase 2: Solution Design", start: 1, duration: 3 },
                { id: "3", label: "Phase 3: Estimation", start: 3, duration: 2 },
                { id: "4", label: "Client Review", start: 4, duration: 1, type: "milestone" },
                { id: "5", label: "Phase 4: Delivery", start: 5, duration: 1 },
              ]}
              todayColumn={2}
            />
          </div>
        ),
      },
    ],
  },

  // ─── AI Features ─────────────────────────────────────────────────────────

  "ai-draft-state": {
    importLine: `import { AIDraftState } from "@/components/ui/ai-draft-state"`,
    exampleCode: `<AIDraftState
  status="draft"
  content={<p>AI generated content...</p>}
  onMarkReviewed={() => {}}
  onApprove={() => {}}
/>`,
    variants: [
      { label: "interactive", node: <AIDraftStateDemo /> },
      { label: "all states", node: <AIDraftStateStaticDemo /> },
    ],
  },

  "ai-suggestion-card": {
    importLine: `import { AISuggestionCard } from "@/components/ui/ai-suggestion-card"`,
    exampleCode: `<AISuggestionCard type="suggestion" title="Reuse Clinical Assessment epic" description="..." onApply={() => {}} onDismiss={() => {}} />`,
    variants: [
      { label: "suggestion", node: <AISuggestionSuggestionDemo /> },
      { label: "hint", node: <AISuggestionHintDemo /> },
      { label: "match", node: <AISuggestionMatchDemo /> },
      { label: "warning", node: <AISuggestionWarningDemo /> },
    ],
  },

  "section-document-card": {
    importLine: `import { SectionDocumentCard } from "@/components/ui/section-document-card"`,
    exampleCode: `<SectionDocumentCard title="Solution Overview" status="approved" onEdit={() => {}} aiActions={[...]} />`,
    variants: [
      { label: "approved", node: <SectionDocumentCardDemo /> },
      { label: "draft", node: <SectionDocumentCardDraftDemo /> },
    ],
  },

  // ─── Application Components ───────────────────────────────────────────────

  "l1-component-card": {
    importLine: `import { L1ComponentCard } from "@/components/ui/l1-component-card"`,
    exampleCode: `<L1ComponentCard name="Clinical Intake" type="Experience" epicCount={8} estimate={42} phases={["Phase 1", "Phase 2"]} health="healthy" />`,
    variants: [
      {
        label: "Experience",
        node: (
          <L1ComponentCard
            name="Clinical Intake"
            description="Patient onboarding and eligibility capture flow."
            type="Experience"
            epicCount={8}
            estimate={42}
            phases={["Phase 1", "Phase 2"]}
            health="healthy"
          />
        ),
      },
      {
        label: "Workflow",
        node: (
          <L1ComponentCard
            name="Case Management"
            description="Care-team task routing and case lifecycle."
            type="Workflow"
            epicCount={6}
            estimate={28}
            phases={["Phase 2"]}
            health="warning"
          />
        ),
      },
      {
        label: "Integration",
        node: (
          <L1ComponentCard
            name="EHR Integration"
            description="Bi-directional sync with the hospital EHR system."
            type="Integration"
            epicCount={4}
            estimate={18}
            phases={["Phase 1"]}
            health="error"
          />
        ),
      },
      {
        label: "Foundation",
        node: (
          <L1ComponentCard
            name="Auth & Permissions"
            description="Role-based access control and session management."
            type="Foundation"
            epicCount={3}
            estimate={12}
            phases={["Phase 1"]}
            health="healthy"
            status="Approved"
          />
        ),
      },
    ],
  },

  "epic-card": {
    importLine: `import { EpicCard } from "@/components/ui/epic-card"`,
    exampleCode: `<EpicCard epicId="EPIC-014" title="Patient eligibility API" l1Type="Integration" units={8} hours={32} status="estimated" />`,
    variants: [
      {
        label: "approved",
        node: (
          <EpicCard
            epicId="EPIC-014"
            title="Patient eligibility API"
            l1Type="Integration"
            units={8}
            hours={32}
            milestone="Phase 1"
            status="approved"
          />
        ),
      },
      {
        label: "draft",
        node: (
          <EpicCard
            epicId="EPIC-031"
            title="AI-assisted intake form routing"
            l1Type="Experience"
            units={13}
            hours={52}
            depCount={2}
            status="draft"
          />
        ),
      },
      {
        label: "conflict",
        node: (
          <EpicCard
            epicId="EPIC-022"
            title="Insurance payer network sync"
            l1Type="Integration"
            units={10}
            hours={40}
            status="estimated"
            hasConflict
            conflictMessage="Overlaps with EPIC-018 in Phase 2"
          />
        ),
      },
    ],
  },

  "phase-column-header": {
    importLine: `import { PhaseColumnHeader } from "@/components/ui/phase-column-header"`,
    exampleCode: `<PhaseColumnHeader name="Phase 1" epicCount={12} units={68} hours={272} distributionSegments={[...]} />`,
    variants: [
      {
        label: "on track",
        node: (
          <div className="w-64">
            <PhaseColumnHeader
              name="Phase 1 — Foundation"
              dateRange="Jan – Mar 2026"
              epicCount={12}
              units={68}
              hours={272}
              envelope={72}
              variance={-4}
              distributionSegments={[
                { type: "Experience", value: 8 },
                { type: "Workflow", value: 10 },
                { type: "Integration", value: 6 },
                { type: "Foundation", value: 8 },
              ]}
            />
          </div>
        ),
      },
      {
        label: "over envelope",
        node: (
          <div className="w-64">
            <PhaseColumnHeader
              name="Phase 2 — Core Workflows"
              dateRange="Apr – Jun 2026"
              epicCount={18}
              units={95}
              hours={380}
              envelope={80}
              variance={15}
              distributionSegments={[
                { type: "Experience", value: 14 },
                { type: "Workflow", value: 20 },
                { type: "Integration", value: 8 },
                { type: "Foundation", value: 4 },
              ]}
            />
          </div>
        ),
      },
    ],
  },

  "risk-heatmap": {
    importLine: `import { RiskHeatmap } from "@/components/ui/risk-heatmap"`,
    exampleCode: `<RiskHeatmap risks={[
  { likelihood: "high", impact: "high", count: 2 },
  { likelihood: "medium", impact: "high", count: 3 },
]} />`,
    variants: [
      {
        label: "populated",
        node: (
          <RiskHeatmap
            risks={[
              { likelihood: "high", impact: "high", count: 2 },
              { likelihood: "high", impact: "medium", count: 3 },
              { likelihood: "medium", impact: "high", count: 1 },
              { likelihood: "medium", impact: "medium", count: 4 },
              { likelihood: "low", impact: "low", count: 2 },
              { likelihood: "low", impact: "medium", count: 1 },
            ]}
          />
        ),
      },
    ],
  },

  "open-question-row": {
    importLine: `import { OpenQuestionRow } from "@/components/ui/open-question-row"`,
    exampleCode: `<OpenQuestionRow id="Q-01" impactArea="Estimate" status="open" question="..." askedBy={...} timestamp="3 days ago" />`,
    variants: [
      {
        label: "open",
        node: (
          <div className="w-full">
            <OpenQuestionRow
              id="Q-01"
              impactArea="Estimate"
              status="open"
              question="Does data migration include historical records beyond 2 years, or only active patient records?"
              askedBy={{ name: "Alice Johnson", initials: "AJ", role: "Solution Architect" }}
              timestamp="3 days ago"
              linkedItems={[{ id: "EPIC-031", type: "epic" }]}
            />
          </div>
        ),
      },
      {
        label: "answered",
        node: (
          <div className="w-full">
            <OpenQuestionRow
              id="Q-02"
              impactArea="Scope"
              status="answered"
              question="Will the client provide a dedicated API sandbox environment for integration testing?"
              askedBy={{ name: "Ben Carter", initials: "BC", role: "Delivery Lead" }}
              timestamp="1 week ago"
            />
          </div>
        ),
      },
    ],
  },

  "approval-workflow-card": {
    importLine: `import { ApprovalWorkflowCard } from "@/components/ui/approval-workflow-card"`,
    exampleCode: `<ApprovalWorkflowCard steps={steps} canApprove={true} onApprove={() => {}} />`,
    variants: [
      {
        label: "pending approval",
        node: (
          <ApprovalWorkflowCard
            steps={[
              { role: "Solution Architect", reviewer: "Sarah Chen", status: "complete", timestamp: "May 20" },
              { role: "Delivery Lead", reviewer: "Mark Torres", status: "pending" },
              { role: "Client Sponsor", status: "pending" },
            ]}
            canApprove={false}
            requiredFor="2 decisions"
          />
        ),
      },
      {
        label: "can approve",
        node: (
          <ApprovalWorkflowCard
            steps={[
              { role: "Solution Architect", reviewer: "Sarah Chen", status: "complete", timestamp: "May 20" },
              { role: "Delivery Lead", reviewer: "Mark Torres", status: "complete", timestamp: "May 21" },
              { role: "Client Sponsor", status: "pending" },
            ]}
            canApprove={true}
          />
        ),
      },
    ],
  },

  "review-checklist-row": {
    importLine: `import { ReviewChecklistRow } from "@/components/ui/review-checklist-row"`,
    exampleCode: `<ReviewChecklistRow label="Domain Model" status="complete" reviewer={{ name: "Sarah Chen", initials: "SC" }} />`,
    variants: [
      {
        label: "checklist",
        node: (
          <div className="flex flex-col gap-2 w-full">
            <ReviewChecklistRow
              label="Domain Model reviewed"
              status="complete"
              reviewer={{ name: "Sarah Chen", initials: "SC" }}
            />
            <ReviewChecklistRow
              label="Estimation reviewed"
              status="in-progress"
              reviewer={{ name: "Mark Torres", initials: "MT" }}
            />
            <ReviewChecklistRow
              label="Risk register reviewed"
              status="not-started"
            />
          </div>
        ),
      },
    ],
  },

  "output-card": {
    importLine: `import { OutputCard } from "@/components/ui/output-card"`,
    exampleCode: `<OutputCard title="Scope Document" format="pdf" audience="Client" status="up-to-date" readinessItems={[...]} />`,
    variants: [
      {
        label: "up to date",
        node: (
          <OutputCard
            title="Client Scope Document"
            format="pdf"
            audience="Client"
            version="1.3"
            lastGenerated="May 24, 2026"
            status="up-to-date"
            readinessItems={[
              { label: "Domain model approved", status: "pass" },
              { label: "Estimates finalised", status: "pass" },
              { label: "Open questions resolved", status: "warning" },
            ]}
          />
        ),
      },
      {
        label: "blocked",
        node: (
          <OutputCard
            title="Estimation Package"
            format="package"
            audience="Internal"
            status="stale"
            isBlocked
            blockReason="3 epics missing estimates in Phase 2"
            readinessItems={[
              { label: "All epics have estimates", status: "fail" },
              { label: "Reconciliation complete", status: "fail" },
            ]}
          />
        ),
      },
    ],
  },

  "intake-snapshot-card": {
    importLine: `import { IntakeSnapshotCard } from "@/components/ui/intake-snapshot-card"`,
    exampleCode: `<IntakeSnapshotCard businessArea="Clinical Operations" budget="$180k" systems={["Epic", "Salesforce"]} />`,
    variants: [
      {
        label: "full",
        node: (
          <IntakeSnapshotCard
            businessArea="Clinical Operations"
            budget="$180,000"
            timeline="6 months"
            systems={["Epic", "Salesforce", "Azure AD", "Twilio"]}
            discoveryExcerpt="We need to reduce intake processing time by 60% while maintaining HIPAA compliance across all touchpoints."
          />
        ),
      },
    ],
  },

  "estimation-rollup-tree": {
    importLine: `import { EstimationRollUpTree } from "@/components/ui/estimation-rollup-tree"`,
    exampleCode: `<EstimationRollUpTree data={phases} />`,
    variants: [
      {
        label: "phase tree",
        node: (
          <div className="w-full">
            <EstimationRollUpTree
              data={[
                {
                  id: "p1", name: "Phase 1 — Foundation", type: "phase",
                  units: 68, hours: 272, envelope: 72, variance: -4,
                  children: [
                    {
                      id: "l1-1", name: "Clinical Intake Experience", type: "l1",
                      units: 42, hours: 168, envelope: 40, variance: 2,
                      children: [
                        { id: "l2-1", name: "Intake Form", type: "l2", units: 18, hours: 72, variance: 0 },
                        { id: "l2-2", name: "Eligibility Check", type: "l2", units: 24, hours: 96, variance: 2 },
                      ],
                    },
                    {
                      id: "l1-2", name: "Auth & Permissions", type: "l1",
                      units: 26, hours: 104, envelope: 32, variance: -6,
                    },
                  ],
                },
                {
                  id: "p2", name: "Phase 2 — Core Workflows", type: "phase",
                  units: 95, hours: 380, envelope: 80, variance: 15,
                },
              ]}
            />
          </div>
        ),
      },
    ],
  },

  "estimate-detail-drawer": {
    importLine: `import { EstimateDetailDrawer } from "@/components/ui/estimate-detail-drawer"`,
    exampleCode: `<EstimateDetailDrawer open={open} onClose={() => setOpen(false)} storyId="STORY-047" ... />`,
    variants: [
      { label: "trigger", node: <EstimateDetailDrawerDemo /> },
    ],
  },

  "reconciliation-panel": {
    importLine: `import { ReconciliationPanel } from "@/components/ui/reconciliation-panel"`,
    exampleCode: `<ReconciliationPanel phases={phases} decisionOptions={options} onSubmit={() => {}} />`,
    variants: [
      {
        label: "2-phase",
        node: (
          <div className="w-full">
            <ReconciliationPanel
              phases={[
                { phase: "Phase 1", topDownEnvelope: 72, bottomsUpEstimate: 68, variance: -4, variancePercent: -6 },
                { phase: "Phase 2", topDownEnvelope: 80, bottomsUpEstimate: 95, variance: 15, variancePercent: 19 },
              ]}
              decisionOptions={[
                "Accept bottoms-up and revise envelope",
                "Reduce scope to fit envelope",
                "Defer decision to client review",
              ]}
            />
          </div>
        ),
      },
    ],
  },

  "team-roster-panel": {
    importLine: `import { TeamRosterPanel } from "@/components/ui/team-roster-panel"`,
    exampleCode: `<TeamRosterPanel phases={phases} clientRoles={clientRoles} nymblRoles={nymblRoles} />`,
    variants: [
      {
        label: "3-phase roster",
        node: (
          <div className="w-full">
            <TeamRosterPanel
              phases={["P1", "P2", "P3"]}
              nymblRoles={[
                { role: "Solution Architect", name: "Sarah Chen", initials: "SC", type: "billable", allocations: { P1: 100, P2: 50, P3: 20 } },
                { role: "Delivery Lead", name: "Mark Torres", initials: "MT", type: "billable", allocations: { P1: 50, P2: 100, P3: 100 } },
                { role: "QA Engineer", type: "billable", allocations: { P1: 0, P2: 50, P3: 100 } },
              ]}
              clientRoles={[
                { role: "Product Owner", name: "Alice Johnson", initials: "AJ", type: "non-billable", allocations: { P1: 20, P2: 30, P3: 20 } },
                { role: "Technical Lead", type: "non-billable", allocations: { P1: 30, P2: 50, P3: 50 } },
              ]}
            />
          </div>
        ),
      },
    ],
  },

  "portfolio-pipeline-view": {
    importLine: `import { PortfolioPipelineView } from "@/components/ui/portfolio-pipeline-view"`,
    exampleCode: `<PortfolioPipelineView engagements={engagements} defaultView="table" />`,
    variants: [
      {
        label: "table + kanban",
        node: (
          <div className="w-full">
            <PortfolioPipelineView
              defaultView="table"
              engagements={[
                { id: "1", client: "Acme Health", solution: "Clinical Intake Platform", stage: "Estimation", leads: [{ name: "Sarah Chen", initials: "SC" }], budget: 180000, probability: 75, status: "In Progress" },
                { id: "2", client: "Northstar HealthTech", solution: "Patient Portal", stage: "Client Review", leads: [{ name: "Mark Torres", initials: "MT" }], budget: 240000, probability: 90, status: "Active" },
                { id: "3", client: "Meridian Medical", solution: "Scheduling Automation", stage: "Triage", leads: [{ name: "Alice Johnson", initials: "AJ" }], budget: 120000, probability: 40, status: "New" },
              ]}
            />
          </div>
        ),
      },
    ],
  },

  "app-sidebar": {
    importLine: `import { NymblAppSidebar, NymblEngagementSidebar } from "@/components/ui/app-sidebar"`,
    exampleCode: `<NymblAppSidebar />
<NymblAppSidebar appName="Scope" />
<NymblEngagementSidebar />`,
    variants: [
      {
        label: "app navigation",
        node: <NymblAppSidebar />,
      },
      {
        label: "subproduct",
        node: <NymblAppSidebar appName="Scope" />,
      },
      {
        label: "engagement workflow",
        node: <NymblEngagementSidebar appName="Engage" />,
      },
    ],
  },


  "compact-button": {
    importLine: `import { CompactButton } from "@/components/ui/compact-button"`,
    exampleCode: `<CompactButton variant="stroke"><SearchIcon className="size-4" /></CompactButton>`,
    variants: [
      { label: "stroke", node: <CompactButton variant="stroke"><SearchIcon className="size-4" /></CompactButton> },
      { label: "ghost", node: <CompactButton variant="ghost"><SearchIcon className="size-4" /></CompactButton> },
      { label: "white", node: <div className="p-2 bg-muted rounded"><CompactButton variant="white"><SearchIcon className="size-4" /></CompactButton></div> },
      { label: "sm size", node: <CompactButton size="sm" variant="stroke"><SearchIcon className="size-3.5" /></CompactButton> },
      { label: "full radius", node: <CompactButton fullRadius variant="stroke"><SearchIcon className="size-4" /></CompactButton> },
    ],
  },

  "link-button": {
    importLine: `import { LinkButton } from "@/components/ui/link-button"`,
    exampleCode: `<LinkButton variant="primary" href="#">Learn more</LinkButton>`,
    variants: [
      { label: "gray", node: <LinkButton variant="gray" href="#">Gray link</LinkButton> },
      { label: "primary", node: <LinkButton variant="primary" href="#">Primary link</LinkButton> },
      { label: "error", node: <LinkButton variant="error" href="#">Error link</LinkButton> },
      { label: "no underline", node: <LinkButton variant="gray" underline={false} href="#">No underline</LinkButton> },
      { label: "sm", node: <LinkButton variant="primary" size="sm" href="#">Small</LinkButton> },
    ],
  },

  "banner": {
    importLine: `import { Banner } from "@/components/ui/banner"`,
    exampleCode: `<Banner status="info" variant="light">Maintenance scheduled for Sunday 2 AM UTC.</Banner>`,
    variants: [
      { label: "info · light", node: <div className="w-full"><Banner status="info" variant="light">Your session will expire in 10 minutes.</Banner></div> },
      { label: "success · light", node: <div className="w-full"><Banner status="success" variant="light">Changes saved successfully.</Banner></div> },
      { label: "warning · light", node: <div className="w-full"><Banner status="warning" variant="light">Some items require attention.</Banner></div> },
      { label: "error · light", node: <div className="w-full"><Banner status="error" variant="light">Failed to save changes. Please try again.</Banner></div> },
      { label: "feature · light", node: <div className="w-full"><Banner status="feature" variant="light">New AI estimation features are now available.</Banner></div> },
      { label: "info · filled", node: <div className="w-full"><Banner status="info" variant="filled">Maintenance scheduled for Sunday 2 AM.</Banner></div> },
      { label: "success · filled", node: <div className="w-full"><Banner status="success" variant="filled">Deployment complete.</Banner></div> },
      { label: "info · stroke", node: <div className="w-full"><Banner status="info" variant="stroke">Review period ends in 3 days.</Banner></div> },
    ],
  },

  "progress-circle": {
    importLine: `import { ProgressCircle } from "@/components/ui/progress-circle"`,
    exampleCode: `<ProgressCircle value={72} size={64} />`,
    variants: [
      { label: "80px — 85%", node: <ProgressCircle value={85} size={80}><span className="text-xs font-medium">85%</span></ProgressCircle> },
      { label: "64px — 60%", node: <ProgressCircle value={60} size={64}><span className="text-xs font-medium">60%</span></ProgressCircle> },
      { label: "48px — 33%", node: <ProgressCircle value={33} size={48}><span className="text-[10px] font-medium">33%</span></ProgressCircle> },
      { label: "44px — no label", node: <ProgressCircle value={72} size={44} /> },
    ],
  },

  "status-badge": {
    importLine: `import { StatusBadge } from "@/components/ui/status-badge"`,
    exampleCode: `<StatusBadge status="completed" />`,
    variants: [
      { label: "completed · light", node: <StatusBadge status="completed" variant="light" /> },
      { label: "pending · light", node: <StatusBadge status="pending" variant="light" /> },
      { label: "failed · light", node: <StatusBadge status="failed" variant="light" /> },
      { label: "disabled · light", node: <StatusBadge status="disabled" variant="light" /> },
      { label: "completed · stroke", node: <StatusBadge status="completed" variant="stroke" /> },
      { label: "pending · stroke", node: <StatusBadge status="pending" variant="stroke" /> },
      { label: "failed · stroke", node: <StatusBadge status="failed" variant="stroke" /> },
      { label: "with icon", node: <StatusBadge status="completed" showIcon showDot={false} /> },
    ],
  },

  "tag": {
    importLine: `import { Tag } from "@/components/ui/tag"`,
    exampleCode: `<Tag variant="stroke" onDismiss={() => {}}>Healthcare</Tag>`,
    variants: [
      { label: "stroke", node: <Tag variant="stroke">Healthcare</Tag> },
      { label: "gray", node: <Tag variant="gray">Integration</Tag> },
      { label: "with icon", node: <TagWithIconDemo /> },
      { label: "dismissible", node: <TagDismissibleDemo /> },
      { label: "disabled", node: <Tag variant="stroke" disabled>Disabled</Tag> },
    ],
  },

  "hint": {
    importLine: `import { Hint } from "@/components/ui/hint"`,
    exampleCode: `<Hint>Must be at least 8 characters.</Hint>`,
    variants: [
      { label: "default", node: <Hint>Must be at least 8 characters.</Hint> },
      { label: "with icon", node: <Hint icon={<InfoIcon />}>Passwords are case-sensitive.</Hint> },
      { label: "error", node: <Hint hasError>This field is required.</Hint> },
      { label: "error with icon", node: <Hint hasError icon={<AlertCircle />}>Invalid email address.</Hint> },
      { label: "disabled", node: <Hint disabled>Field is locked during review.</Hint> },
    ],
  },

  "segmented-control": {
    importLine: `import { SegmentedControl, SegmentedControlList, SegmentedControlTrigger, SegmentedControlContent } from "@/components/ui/segmented-control"`,
    exampleCode: `<SegmentedControl defaultValue="list">
  <SegmentedControlList>
    <SegmentedControlTrigger value="list">List</SegmentedControlTrigger>
    <SegmentedControlTrigger value="board">Board</SegmentedControlTrigger>
  </SegmentedControlList>
</SegmentedControl>`,
    variants: [
      {
        label: "2-option",
        node: (
          <SegmentedControl defaultValue="list">
            <SegmentedControlList>
              <SegmentedControlTrigger value="list">List</SegmentedControlTrigger>
              <SegmentedControlTrigger value="board">Board</SegmentedControlTrigger>
            </SegmentedControlList>
          </SegmentedControl>
        ),
      },
      {
        label: "3-option",
        node: (
          <SegmentedControl defaultValue="day">
            <SegmentedControlList>
              <SegmentedControlTrigger value="day">Day</SegmentedControlTrigger>
              <SegmentedControlTrigger value="week">Week</SegmentedControlTrigger>
              <SegmentedControlTrigger value="month">Month</SegmentedControlTrigger>
            </SegmentedControlList>
          </SegmentedControl>
        ),
      },
      {
        label: "with icons",
        node: (
          <SegmentedControl defaultValue="grid">
            <SegmentedControlList>
              <SegmentedControlTrigger value="grid"><LayoutGrid className="size-3.5" />Grid</SegmentedControlTrigger>
              <SegmentedControlTrigger value="list"><FileText className="size-3.5" />List</SegmentedControlTrigger>
            </SegmentedControlList>
          </SegmentedControl>
        ),
      },
    ],
  },

  "tab-menu-horizontal": {
    importLine: `import { TabMenuHorizontal, TabMenuHorizontalList, TabMenuHorizontalTrigger, TabMenuHorizontalContent } from "@/components/ui/tab-menu-horizontal"`,
    exampleCode: `<TabMenuHorizontal defaultValue="overview">
  <TabMenuHorizontalList>
    <TabMenuHorizontalTrigger value="overview">Overview</TabMenuHorizontalTrigger>
    <TabMenuHorizontalTrigger value="epics">Epics</TabMenuHorizontalTrigger>
  </TabMenuHorizontalList>
</TabMenuHorizontal>`,
    variants: [
      {
        label: "4 tabs",
        node: (
          <div className="w-full">
            <TabMenuHorizontal defaultValue="overview">
              <TabMenuHorizontalList>
                <TabMenuHorizontalTrigger value="overview">Overview</TabMenuHorizontalTrigger>
                <TabMenuHorizontalTrigger value="epics">Epics</TabMenuHorizontalTrigger>
                <TabMenuHorizontalTrigger value="risks">Risks</TabMenuHorizontalTrigger>
                <TabMenuHorizontalTrigger value="outputs">Outputs</TabMenuHorizontalTrigger>
              </TabMenuHorizontalList>
            </TabMenuHorizontal>
          </div>
        ),
      },
      {
        label: "with icons",
        node: (
          <div className="w-full">
            <TabMenuHorizontal defaultValue="dashboard">
              <TabMenuHorizontalList>
                <TabMenuHorizontalTrigger value="dashboard" icon={<Home className="size-4" />}>Dashboard</TabMenuHorizontalTrigger>
                <TabMenuHorizontalTrigger value="settings" icon={<Settings className="size-4" />}>Settings</TabMenuHorizontalTrigger>
                <TabMenuHorizontalTrigger value="profile" icon={<User className="size-4" />}>Profile</TabMenuHorizontalTrigger>
              </TabMenuHorizontalList>
            </TabMenuHorizontal>
          </div>
        ),
      },
    ],
  },

  "tab-menu-vertical": {
    importLine: `import { TabMenuVertical, TabMenuVerticalList, TabMenuVerticalTrigger, TabMenuVerticalContent } from "@/components/ui/tab-menu-vertical"`,
    exampleCode: `<TabMenuVertical defaultValue="overview">
  <TabMenuVerticalList>
    <TabMenuVerticalTrigger value="overview" icon={<Home />}>Overview</TabMenuVerticalTrigger>
    <TabMenuVerticalTrigger value="settings" icon={<Settings />}>Settings</TabMenuVerticalTrigger>
  </TabMenuVerticalList>
</TabMenuVertical>`,
    variants: [
      {
        label: "4 items with icons",
        node: (
          <div className="w-48">
            <TabMenuVertical defaultValue="overview">
              <TabMenuVerticalList>
                <TabMenuVerticalTrigger value="overview" icon={<Home className="size-4" />}>Overview</TabMenuVerticalTrigger>
                <TabMenuVerticalTrigger value="docs" icon={<BookOpen className="size-4" />}>Documents</TabMenuVerticalTrigger>
                <TabMenuVerticalTrigger value="settings" icon={<Settings className="size-4" />}>Settings</TabMenuVerticalTrigger>
                <TabMenuVerticalTrigger value="profile" icon={<User className="size-4" />}>Profile</TabMenuVerticalTrigger>
              </TabMenuVerticalList>
            </TabMenuVertical>
          </div>
        ),
      },
    ],
  },

  "rating": {
    importLine: `import { Rating } from "@/components/ui/rating"`,
    exampleCode: `<Rating value={4} onChange={(v) => console.log(v)} />`,
    variants: [
      { label: "interactive — 5 stars", node: <RatingInteractiveDemo /> },
      { label: "read-only — 4.5 stars", node: <Rating value={4.5} readOnly /> },
      { label: "heart variant", node: <Rating symbol="heart" value={3} /> },
      { label: "sm size", node: <Rating value={4} size="sm" readOnly /> },
      { label: "lg size", node: <Rating value={4} size="lg" readOnly /> },
    ],
  },

  "file-upload": {
    importLine: `import { FileUpload } from "@/components/ui/file-upload"`,
    exampleCode: `<FileUpload accept="image/*" onFiles={(files) => console.log(files)} />`,
    variants: [
      { label: "default", node: <div className="w-full"><FileUpload description="PNG, JPG, PDF up to 10MB" /></div> },
      { label: "with accept", node: <div className="w-full"><FileUpload accept=".pdf,.docx" description=".pdf or .docx only" /></div> },
      { label: "disabled", node: <div className="w-full"><FileUpload disabled description="Upload is disabled" /></div> },
    ],
  },

  "notification": {
    importLine: `import { Notification } from "@/components/ui/notification"`,
    exampleCode: `<Notification status="success" title="Saved" description="Your changes have been saved." />`,
    variants: [
      { label: "success · light", node: <Notification status="success" variant="light" title="Estimation saved" description="Your changes have been saved successfully." /> },
      { label: "warning · light", node: <Notification status="warning" variant="light" title="Scope drift detected" description="Phase 2 is 13% over the envelope." /> },
      { label: "error · light", node: <Notification status="error" variant="light" title="Save failed" description="Check your connection and try again." /> },
      { label: "info · light", node: <Notification status="info" variant="light" title="Review requested" description="Sarah Chen has requested your review." /> },
      { label: "feature · light", node: <Notification status="feature" variant="light" title="AI estimation ready" description="Draft estimates have been generated." /> },
      { label: "success · filled", node: <Notification status="success" variant="filled" title="Approved" description="Scope document approved by client." /> },
      { label: "error · stroke", node: <Notification status="error" variant="stroke" title="Conflict found" description="EPIC-031 has a dependency conflict." /> },
    ],
  },

}

// Suppress unused-import lint warning for icons used inside JSX only
void CalendarIcon
