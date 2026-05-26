import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TeamMember {
  role: string
  name?: string
  avatarUrl?: string
  initials?: string
  type: "billable" | "non-billable"
  allocations: Record<string, number>
}

interface TeamRosterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  phases: string[]
  clientRoles: TeamMember[]
  nymblRoles: TeamMember[]
}

function RosterTable({ members, phases }: { members: TeamMember[]; phases: string[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Role</TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Type</TableHead>
          {phases.map((p) => (
            <TableHead key={p} className="text-right w-20">
              {p}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member, i) => (
          <TableRow key={i}>
            <TableCell className="text-sm font-medium">{member.role}</TableCell>
            <TableCell>
              {member.name ? (
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback className="text-[9px]">
                      {member.initials ?? member.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{member.name}</span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground italic">TBD</span>
              )}
            </TableCell>
            <TableCell>
              <Badge
                variant={member.type === "billable" ? "default" : "secondary"}
                className="text-[10px]"
              >
                {member.type}
              </Badge>
            </TableCell>
            {phases.map((p) => (
              <TableCell key={p} className="text-right text-sm tabular-nums">
                {member.allocations[p] !== undefined ? `${member.allocations[p]}%` : "—"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function TeamRosterPanel({
  phases,
  clientRoles,
  nymblRoles,
  className,
  ...props
}: TeamRosterPanelProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <Tabs defaultValue="nymbl">
        <TabsList>
          <TabsTrigger value="nymbl">Nymbl Delivery</TabsTrigger>
          <TabsTrigger value="client">Client-Side</TabsTrigger>
        </TabsList>
        <TabsContent value="nymbl" className="mt-4">
          <div className="rounded-md border border-border overflow-hidden">
            <RosterTable members={nymblRoles} phases={phases} />
          </div>
        </TabsContent>
        <TabsContent value="client" className="mt-4">
          <div className="rounded-md border border-border overflow-hidden">
            <RosterTable members={clientRoles} phases={phases} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
