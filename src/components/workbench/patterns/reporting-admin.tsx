import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/ui/stat-card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function ChartPlaceholder({ label, height = "h-40" }: { label: string; height?: string }) {
  return (
    <div className={`${height} rounded-md border border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-1`}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="text-[10px] text-muted-foreground/60">Chart component</span>
    </div>
  )
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <Separator />
      {children}
    </div>
  )
}

function SettingsRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <Label className="text-sm">{label}</Label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function ReportingDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Pipeline Value" value="$3.8M" trend={{ direction: "up", value: "+18%", label: "YoY" }} />
        <StatCard label="Win Rate" value="71%" trend={{ direction: "up", value: "+5pp", label: "vs last year" }} />
        <StatCard label="Avg. Engagement Size" value="$320k" trend={{ direction: "neutral", value: "0%", label: "vs last year" }} />
        <StatCard label="Bench Utilisation" value="84%" trend={{ direction: "down", value: "-3pp", label: "vs target" }} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Pipeline by Stage</h3>
          <ChartPlaceholder label="Bar chart — pipeline value per stage" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Win Rate by Service</h3>
          <ChartPlaceholder label="Horizontal bar — win rate %" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Estimation Calibration</h3>
          <ChartPlaceholder label="Scatter plot — estimate vs actual" height="h-32" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Delivery Velocity</h3>
          <ChartPlaceholder label="Line chart — units / sprint" height="h-32" />
        </div>
      </div>
    </div>
  )
}

const adminSections = ["User Roles", "Estimation Model", "Integrations", "Platform Config"]

function AdminSettings() {
  return (
    <div className="flex gap-0 overflow-hidden rounded-lg border border-border">
      {/* Settings nav */}
      <nav className="flex w-44 shrink-0 flex-col border-r border-border bg-muted/30 py-3">
        {adminSections.map((s, i) => (
          <button
            key={s}
            className={`px-4 py-2 text-left text-sm transition-colors ${i === 0 ? "bg-primary/10 font-medium text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground"}`}
          >
            {s}
          </button>
        ))}
      </nav>

      {/* Settings content */}
      <div className="flex flex-1 flex-col gap-8 p-6">
        <SettingsSection title="User Roles & Permissions">
          <SettingsRow
            label="Allow self-service role assignment"
            description="Users can request role changes without admin approval"
          >
            <Switch />
          </SettingsRow>
          <SettingsRow
            label="Default new user role"
            description="Role assigned to newly invited users"
          >
            <Select defaultValue="viewer">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">Viewer</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
              </SelectContent>
            </Select>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="Estimation Model">
          <SettingsRow
            label="Hours per unit"
            description="Multiplier used across all estimates"
          >
            <Input type="number" defaultValue={8} className="w-24 text-right" />
          </SettingsRow>
          <SettingsRow
            label="Confidence factor — low"
            description="Applied when confidence is low"
          >
            <Input type="number" defaultValue={1.5} step={0.1} className="w-24 text-right" />
          </SettingsRow>
          <SettingsRow
            label="Enable AI estimation suggestions"
            description="AI recommends complexity based on similar past stories"
          >
            <Switch defaultChecked />
          </SettingsRow>
        </SettingsSection>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

export function ReportingAdminPattern() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="reporting" className="w-full">
        <TabsList variant="line">
          <TabsTrigger value="reporting">Reporting Dashboard</TabsTrigger>
          <TabsTrigger value="admin">Admin Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="reporting" className="pt-4">
          <ReportingDashboard />
        </TabsContent>

        <TabsContent value="admin" className="pt-4">
          <AdminSettings />
        </TabsContent>
      </Tabs>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h3 className="mb-2 text-sm font-medium">Composes</h3>
        <div className="flex flex-wrap gap-2">
          {["StatCard (T2-03)", "Chart (existing)", "DataTable (T2-06)", "Tabs", "Select", "Switch", "Input"].map((c) => (
            <Badge key={c} variant="secondary" className="font-mono text-xs">{c}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
