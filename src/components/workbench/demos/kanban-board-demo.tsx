"use client"

import { KanbanBoard } from "@/components/ui/kanban-board"

const COLUMNS = [
  {
    id: "backlog",
    title: "Backlog",
    items: [
      { id: "1", content: <p className="text-xs">Clinical intake form redesign</p> },
      { id: "2", content: <p className="text-xs">Insurance verification API</p> },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    items: [
      { id: "3", content: <p className="text-xs">Patient portal SSO</p> },
    ],
  },
  {
    id: "review",
    title: "Review",
    items: [
      { id: "4", content: <p className="text-xs">Appointment scheduling flow</p> },
    ],
  },
  {
    id: "done",
    title: "Done",
    items: [
      { id: "5", content: <p className="text-xs">Discovery interviews</p> },
      { id: "6", content: <p className="text-xs">Stakeholder mapping</p> },
    ],
  },
]

export function KanbanBoardDemo() {
  return <KanbanBoard columns={COLUMNS} columnMinWidth={220} />
}
