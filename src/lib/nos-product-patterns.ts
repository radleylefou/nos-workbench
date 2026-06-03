export type NosModuleId =
  | "prospect"
  | "engage"
  | "scope"
  | "estimate"
  | "staff"
  | "deliver"
  | "manage"
  | "enable"
  | "budget"
  | "guide"

export type LayoutVariation = {
  name: string
  workflow: string
  structure: string
  useWhen: string
}

export type NosModuleReference = {
  id: NosModuleId
  module: string
  tagline: string
  referenceProducts: string[]
  workflowPrompts: string[]
  commonLayouts: string[]
  layoutVariations: LayoutVariation[]
}

export type ProductPatternDefinition = {
  slug: string
  title: string
  description: string
  moduleIds: NosModuleId[]
  workflow: string
  layoutVariation: string
  referenceBuckets: string[]
  composedComponents: string[]
  acceptanceCheck: string
}

export const nosProductPatternModules: NosModuleReference[] = [
  {
    id: "prospect",
    module: "01 Prospect",
    tagline: "Identify. Qualify. Target.",
    referenceProducts: [
      "Apollo",
      "ZoomInfo",
      "Clay",
      "Clearbit",
      "Cognism",
      "Lusha",
      "LinkedIn Sales Navigator",
      "Outreach",
      "Salesloft",
    ],
    workflowPrompts: [
      "lead qualification list",
      "account intelligence dashboard",
      "saved prospect search",
      "contact enrichment panel",
      "outbound signal feed",
    ],
    commonLayouts: [
      "Search-and-filter table with an enrichment side panel",
      "Account scoring dashboard with qualification stages",
      "Saved search library with signal recency and owner handoff",
      "Contact detail drawer combining firmographics, people, and outreach history",
    ],
    layoutVariations: [
      {
        name: "Lead intelligence command center",
        workflow: "Qualify contacts and organisations before pipeline handoff",
        structure: "Left saved-search rail, central lead table, right account intelligence panel",
        useWhen: "A team needs fast scanning, filtering, and enrichment without leaving the list.",
      },
      {
        name: "Signal triage queue",
        workflow: "Prioritise accounts by intent signals and outreach freshness",
        structure: "Stacked signal feed with scorecards, owners, source filters, and dismissal actions",
        useWhen: "Daily prospecting starts from market signals rather than an account list.",
      },
      {
        name: "Account research profile",
        workflow: "Understand an organisation before outreach",
        structure: "Company header, firmographic metrics, stakeholder list, technology fit, recent events",
        useWhen: "A seller or strategist is preparing account-specific outreach.",
      },
      {
        name: "Qualification review board",
        workflow: "Move leads from discovered to qualified or rejected",
        structure: "Kanban stages with lead cards, fit reasons, blockers, and next action chips",
        useWhen: "A team wants lightweight stage movement before CRM promotion.",
      },
    ],
  },
  {
    id: "engage",
    module: "02 Engage",
    tagline: "Map. Connect. Build Pipeline.",
    referenceProducts: [
      "Salesforce",
      "HubSpot",
      "Pipedrive",
      "Attio",
      "Close",
      "Copper",
      "Folk",
      "Affinity",
      "Monday Sales CRM",
    ],
    workflowPrompts: [
      "sales pipeline dashboard",
      "account detail crm",
      "relationship timeline",
      "deal health dashboard",
      "stakeholder map",
    ],
    commonLayouts: [
      "Pipeline board grouped by stage with deal cards and value totals",
      "Account detail page with activity timeline and stakeholder relationship map",
      "CRM table with health, next action, owner, value, and probability columns",
      "Opportunity command page with stage checklist, notes, and forecast rollup",
    ],
    layoutVariations: [
      {
        name: "Pipeline health dashboard",
        workflow: "Track deal flow and commercial momentum",
        structure: "KPI row, stage health grid, engagement table, recent activity rail",
        useWhen: "Leadership needs an at-a-glance pipeline view with drill-down targets.",
      },
      {
        name: "Account workspace",
        workflow: "Manage one account from relationship context to next action",
        structure: "Account header, tabs, activity feed, stakeholder list, opportunity sidebar",
        useWhen: "The user is actively working a single account.",
      },
      {
        name: "Forecast review table",
        workflow: "Review deals by value, probability, stage, risk, and owner",
        structure: "Filter toolbar, sortable table, inline status badges, pinned totals footer",
        useWhen: "Weekly commercial review requires fast comparison across opportunities.",
      },
      {
        name: "Relationship map",
        workflow: "Map sponsors, blockers, champions, and influence paths",
        structure: "Stakeholder cards grouped by role with connection strength and activity recency",
        useWhen: "A complex account needs relationship coverage planning.",
      },
    ],
  },
  {
    id: "scope",
    module: "03 Scope",
    tagline: "Define. Structure. Validate.",
    referenceProducts: [
      "Notion",
      "Coda",
      "Confluence",
      "Productboard",
      "Aha!",
      "Jira Product Discovery",
      "Airfocus",
      "Craft.io",
      "PandaDoc",
      "Qwilr",
      "Proposify",
    ],
    workflowPrompts: [
      "requirements document",
      "proposal builder",
      "product discovery board",
      "structured scope hierarchy",
      "case study builder",
    ],
    commonLayouts: [
      "Document canvas with persistent section navigation and approval status",
      "Requirement hierarchy board grouped by L1-L3 structure",
      "Proposal builder with reusable content blocks and client-facing preview",
      "Discovery backlog with evidence, priority, and decision state",
    ],
    layoutVariations: [
      {
        name: "Structured scope document",
        workflow: "Turn discovery into a client-ready scope",
        structure: "Document nav, content canvas, version status, export/share actions",
        useWhen: "The primary output is a readable client artifact.",
      },
      {
        name: "Requirements hierarchy board",
        workflow: "Arrange solution requirements into L1, L2, and L3 levels",
        structure: "Domain columns, component cards, nested epic detail panels",
        useWhen: "Teams need to see how scope decomposes before estimating.",
      },
      {
        name: "Proposal readiness checklist",
        workflow: "Validate whether scope is complete enough to send",
        structure: "Readiness scorecards, missing items, approvers, generated output preview",
        useWhen: "A scoping artifact is near handoff and needs quality control.",
      },
      {
        name: "Case study generator",
        workflow: "Turn delivery history into reusable commercial proof",
        structure: "Input facts, generated narrative blocks, asset picker, approval timeline",
        useWhen: "The team is converting project outcomes into sales enablement material.",
      },
    ],
  },
  {
    id: "estimate",
    module: "04 Estimate",
    tagline: "Effort. Budget. Plan.",
    referenceProducts: [
      "Productive",
      "Kantata",
      "Scoro",
      "BigTime",
      "Accelo",
      "Forecast",
      "Bonsai",
      "Harvest Forecast",
      "Runn",
    ],
    workflowPrompts: [
      "project estimate dashboard",
      "phase planning table",
      "quote review",
      "cost model variance",
      "timeline budget confidence",
    ],
    commonLayouts: [
      "Tabbed estimate workspace with overview, line items, roll-up, and reconciliation",
      "Phase timeline with effort, cost, confidence, and dependencies",
      "Bottoms-up estimate table with confidence badges and owner review",
      "Quote readiness panel with variance, assumptions, and approval decision",
    ],
    layoutVariations: [
      {
        name: "Estimate workspace",
        workflow: "Finalize units, hours, phases, and cost model",
        structure: "Tabs for overview, detailed table, roll-up tree, and reconciliation decision",
        useWhen: "A solution has been scoped and now needs commercial confidence.",
      },
      {
        name: "Phase budget planner",
        workflow: "Map effort and budget to delivery phases",
        structure: "Phase cards, cost bars, risk notes, owner assignments, milestone dates",
        useWhen: "Stakeholders care about timing and cost envelope more than individual stories.",
      },
      {
        name: "Variance review",
        workflow: "Compare top-down envelope against bottoms-up estimate",
        structure: "Variance scorecards, delta table, drivers, accept/reduce/increase decision",
        useWhen: "An estimate exceeds constraints and needs an explicit decision.",
      },
      {
        name: "Proposal pricing review",
        workflow: "Turn estimates into a quote",
        structure: "Role rates, assumptions, billing milestones, client-ready summary preview",
        useWhen: "Finance and delivery need to approve what goes to the client.",
      },
    ],
  },
  {
    id: "staff",
    module: "05 Staff",
    tagline: "Assign. Optimise. Deploy.",
    referenceProducts: [
      "Float",
      "Runn",
      "Resource Guru",
      "Teamdeck",
      "Productive",
      "Kantata",
      "Mosaic",
      "Saviom",
      "Ganttic",
    ],
    workflowPrompts: [
      "resource allocation grid",
      "capacity planning",
      "staffing timeline",
      "utilization dashboard",
      "skill matching planner",
    ],
    commonLayouts: [
      "Resource allocation grid with people rows and project timeline columns",
      "Capacity heatmap by role, person, week, and utilization risk",
      "Staffing scenario comparison with open roles and recommended matches",
      "Person profile with skills, availability, allocations, and conflicts",
    ],
    layoutVariations: [
      {
        name: "Capacity planner",
        workflow: "Assign people to project demand across weeks",
        structure: "Role demand cards, person availability grid, utilization warnings, staffing sidebar",
        useWhen: "The user needs to balance roles, time, and project dates.",
      },
      {
        name: "Scenario comparison",
        workflow: "Compare possible staffing plans before committing",
        structure: "Two or three scenario columns with coverage, risk, margin, and conflicts",
        useWhen: "Leadership needs to evaluate tradeoffs across assignment options.",
      },
      {
        name: "Skill match board",
        workflow: "Find the best person for an open role",
        structure: "Open role list, ranked people cards, skill chips, capacity bars, conflict notes",
        useWhen: "The constraint is matching capability and availability.",
      },
      {
        name: "Utilization dashboard",
        workflow: "Monitor bench, overload, and future demand",
        structure: "Utilization KPIs, role heatmap, upcoming demand list, exception queue",
        useWhen: "Operations needs to keep staffing health visible.",
      },
    ],
  },
  {
    id: "deliver",
    module: "06 Delyver / Deliver",
    tagline: "Execute. Validate. Release.",
    referenceProducts: [
      "Linear",
      "Jira",
      "Asana",
      "ClickUp",
      "Monday",
      "Shortcut",
      "GitHub Projects",
      "GitLab",
      "Azure DevOps",
      "YouTrack",
    ],
    workflowPrompts: [
      "issue tracking board",
      "release checklist",
      "sprint planning",
      "epic story hierarchy",
      "project blocker dashboard",
    ],
    commonLayouts: [
      "Issue list with status, priority, owner, epic, and validation state",
      "Kanban execution board grouped by delivery status",
      "Release readiness checklist with blockers, tests, and approvals",
      "Epic detail page with story hierarchy, dependencies, and activity timeline",
    ],
    layoutVariations: [
      {
        name: "Release tracker",
        workflow: "Validate that committed work can ship",
        structure: "Release summary, blocker queue, story table, validation checklist",
        useWhen: "Delivery managers need to align completion, QA, and client expectations.",
      },
      {
        name: "Sprint execution board",
        workflow: "Move stories through active delivery states",
        structure: "Kanban columns with priority, owner, dependencies, and due date chips",
        useWhen: "The team needs an operational delivery surface.",
      },
      {
        name: "Epic hierarchy view",
        workflow: "Track epics, stories, tasks, blockers, and validation evidence",
        structure: "Nested tree, detail panel, evidence checklist, dependency warnings",
        useWhen: "Large work needs traceability from epic to release.",
      },
      {
        name: "Validation queue",
        workflow: "Review done stories for acceptance before release",
        structure: "QA queue, acceptance criteria, evidence links, sign-off controls",
        useWhen: "The bottleneck is validating completed work.",
      },
    ],
  },
  {
    id: "manage",
    module: "07 Manage",
    tagline: "Visibility. Sentiment. Status.",
    referenceProducts: [
      "Gainsight",
      "Totango",
      "ChurnZero",
      "Planhat",
      "Vitally",
      "ClientSuccess",
      "Asana Portfolios",
      "Monday Dashboards",
      "Jira Align",
    ],
    workflowPrompts: [
      "project health dashboard",
      "customer health score",
      "portfolio status report",
      "weekly project update",
      "risk summary dashboard",
    ],
    commonLayouts: [
      "Project health dashboard with scorecards, risks, milestones, and sentiment",
      "Client success account view with health score and timeline",
      "Portfolio rollup table grouped by client, status, risk, and margin",
      "Weekly update editor with last week, this week, blockers, and sentiment dimensions",
    ],
    layoutVariations: [
      {
        name: "Portfolio health dashboard",
        workflow: "Review health across active engagements",
        structure: "KPI row, health table, risk panel, activity feed",
        useWhen: "Leadership wants a current status snapshot across clients.",
      },
      {
        name: "Weekly status composer",
        workflow: "Produce consistent project updates",
        structure: "Five-dimension health form, narrative fields, risk list, preview panel",
        useWhen: "Delivery leads need to send structured updates.",
      },
      {
        name: "Client health profile",
        workflow: "Understand why an engagement is healthy or at risk",
        structure: "Score header, timeline, sentiment drivers, risk and action panels",
        useWhen: "Account teams need context behind a health score.",
      },
      {
        name: "Executive report builder",
        workflow: "Package project status for leadership or client review",
        structure: "Report outline, metric cards, charts, narrative blocks, export controls",
        useWhen: "Status needs to become a polished report.",
      },
    ],
  },
  {
    id: "enable",
    module: "08 Enable",
    tagline: "Skills. Capacity. Growth.",
    referenceProducts: [
      "Lattice",
      "Culture Amp",
      "15Five",
      "Leapsome",
      "Workday",
      "Rippling",
      "BambooHR",
      "HiBob",
      "Degreed",
      "360Learning",
    ],
    workflowPrompts: [
      "skills matrix",
      "employee profile",
      "learning path dashboard",
      "capacity readiness",
      "competency levels",
    ],
    commonLayouts: [
      "Skills matrix with people rows, capability columns, proficiency, and gaps",
      "Employee readiness profile with capacity, skills, growth plan, and assignments",
      "Learning path dashboard with required skills and completion status",
      "Team coverage map showing depth by capability and project demand",
    ],
    layoutVariations: [
      {
        name: "Skills matrix",
        workflow: "See who is ready for which work",
        structure: "Team filter, matrix table, competency legend, gap summary",
        useWhen: "Leaders need capability coverage across a team.",
      },
      {
        name: "Readiness profile",
        workflow: "Assess one person's growth and staffing readiness",
        structure: "Profile header, skill radar/list, capacity, learning plan, manager notes",
        useWhen: "The decision is about an individual's next assignment.",
      },
      {
        name: "Learning path dashboard",
        workflow: "Track progress toward required capabilities",
        structure: "Path cards, completion progress, recommended content, due dates",
        useWhen: "Enablement needs structured development follow-through.",
      },
      {
        name: "Coverage heatmap",
        workflow: "Spot skill gaps before staffing plans fail",
        structure: "Capabilities by role, depth indicators, project demand overlay, actions",
        useWhen: "The team is planning hiring, training, or staffing coverage.",
      },
    ],
  },
  {
    id: "budget",
    module: "09 Budget",
    tagline: "Money. Time. Role.",
    referenceProducts: [
      "Harvest",
      "Toggl Track",
      "QuickBooks Time",
      "Xero Projects",
      "FreshBooks",
      "Ramp",
      "Brex",
      "Spendesk",
      "Expensify",
      "Productive",
      "Kantata",
    ],
    workflowPrompts: [
      "time billing dashboard",
      "budget tracking",
      "project accounting",
      "expense approval",
      "billing milestone review",
    ],
    commonLayouts: [
      "Budget control dashboard with burn, margin, role spend, and milestones",
      "Time allocation table grouped by person, role, project bucket, and billability",
      "Expense approval queue with policy state, amount, owner, and project mapping",
      "Invoice readiness view with milestones, logged time, fixed fees, and exceptions",
    ],
    layoutVariations: [
      {
        name: "Budget control center",
        workflow: "Monitor project spend and billing readiness",
        structure: "Budget KPIs, role spend bars, milestone table, exception queue",
        useWhen: "Finance and delivery need a shared view of cost and billing risk.",
      },
      {
        name: "Time allocation review",
        workflow: "Review who used time against project buckets",
        structure: "Timesheet table, role filters, billable/non-billable split, approval controls",
        useWhen: "The user needs to approve time and understand utilisation.",
      },
      {
        name: "Spend approval queue",
        workflow: "Map expenses to projects and approve spend",
        structure: "Policy filters, expense list, receipt preview, approval rail",
        useWhen: "Spend needs explicit operational control.",
      },
      {
        name: "Invoice readiness",
        workflow: "Confirm milestones and billable work before invoicing",
        structure: "Milestone cards, time rollup, exceptions, client invoice preview",
        useWhen: "The project is approaching a billing moment.",
      },
    ],
  },
  {
    id: "guide",
    module: "10 Guide",
    tagline: "Focus. Prioritise. Direct.",
    referenceProducts: [
      "WorkBoard",
      "Quantive",
      "Perdoo",
      "Betterworks",
      "Viva Goals",
      "Jira Align",
      "Aha!",
      "Productboard",
      "Airfocus",
      "Roadmunk",
      "Dragonboat",
    ],
    workflowPrompts: [
      "okr dashboard",
      "strategic priorities",
      "roadmap prioritization",
      "focus area dashboard",
      "decision queue",
    ],
    commonLayouts: [
      "OKR dashboard connecting objectives, key results, owners, and confidence",
      "Priority command center with initiatives, focus areas, scores, and decision queues",
      "Roadmap prioritization board with impact, effort, confidence, and strategic fit",
      "Weekly focus view showing where attention should shift next",
    ],
    layoutVariations: [
      {
        name: "Priority command center",
        workflow: "Direct time and attention toward the right work",
        structure: "Focus area scorecards, initiative queue, alignment warnings, weekly direction panel",
        useWhen: "Leaders need to decide what should move, pause, or escalate.",
      },
      {
        name: "OKR dashboard",
        workflow: "Track progress against strategic objectives",
        structure: "Objective cards, key-result progress, owner list, confidence trend",
        useWhen: "The business needs strategy progress visible and comparable.",
      },
      {
        name: "Prioritization board",
        workflow: "Rank opportunities by strategy, effort, confidence, and urgency",
        structure: "Scored table, quadrant view, decision notes, tradeoff sidebar",
        useWhen: "Teams are deciding what deserves investment.",
      },
      {
        name: "Weekly focus planner",
        workflow: "Translate strategy into this week's direction",
        structure: "Priority list, misalignment alerts, owner commitments, review cadence",
        useWhen: "Daily and weekly execution needs practical guidance.",
      },
    ],
  },
]

export const productPatterns: ProductPatternDefinition[] = [
  {
    slug: "portfolio-dashboard",
    title: "Portfolio Dashboard",
    description: "Engagement portfolio with pipeline metrics, active opportunities, owners, and recent activity.",
    moduleIds: ["engage", "manage"],
    workflow: "Pipeline and portfolio health review",
    layoutVariation: "Pipeline health dashboard",
    referenceBuckets: ["Salesforce", "HubSpot", "Gainsight", "Planhat", "Asana Portfolios"],
    composedComponents: ["StatCard", "DataTable", "ActivityFeed", "AvatarGroup"],
    acceptanceCheck: "A leadership user can scan active engagement value, stage, probability, owner coverage, and recent movement without changing pages.",
  },
  {
    slug: "domain-model-board",
    title: "Domain Model Board",
    description: "Scope hierarchy board for L1 components with nested epic drill-down.",
    moduleIds: ["scope"],
    workflow: "Requirements hierarchy planning",
    layoutVariation: "Requirements hierarchy board",
    referenceBuckets: ["Productboard", "Aha!", "Jira Product Discovery", "Airfocus"],
    composedComponents: ["L1ComponentCard", "EpicCard", "Sheet", "Badge"],
    acceptanceCheck: "A scoping user can move from domain overview to component detail to epic detail while keeping the hierarchy visible.",
  },
  {
    slug: "estimation-screen",
    title: "Estimation Screen",
    description: "Tabbed estimation workspace for overview, detailed units, roll-up tree, and reconciliation.",
    moduleIds: ["estimate"],
    workflow: "Effort and budget estimation",
    layoutVariation: "Estimate workspace",
    referenceBuckets: ["Productive", "Kantata", "Scoro", "Runn"],
    composedComponents: ["Tabs", "StatCard", "DataTable", "EstimationRollUpTree", "ReconciliationPanel"],
    acceptanceCheck: "A delivery lead can compare detailed work, phase rollups, and variance decisions in one estimation surface.",
  },
  {
    slug: "scope-document",
    title: "Client-Facing Scope Document",
    description: "Long-form scope artifact with persistent section navigation, status, and client-ready actions.",
    moduleIds: ["scope"],
    workflow: "Client-ready scope publishing",
    layoutVariation: "Structured scope document",
    referenceBuckets: ["Notion", "Confluence", "PandaDoc", "Qwilr", "Proposify"],
    composedComponents: ["Typography", "Navigation", "Table", "Badge", "Separator"],
    acceptanceCheck: "A client-facing document can be reviewed section-by-section with clear status, phasing, budget, risks, and export actions.",
  },
  {
    slug: "proposal-builder",
    title: "Proposal Builder",
    description: "Document assembly workspace for scope narrative, commercials, proof assets, and approval readiness.",
    moduleIds: ["scope", "estimate"],
    workflow: "Proposal assembly and client-ready publishing",
    layoutVariation: "Proposal pricing review",
    referenceBuckets: ["PandaDoc", "Qwilr", "Proposify", "Notion", "Coda"],
    composedComponents: ["Scrollspy", "Textarea", "FileUpload", "StatusBadge", "Button"],
    acceptanceCheck: "A commercial user can assemble proposal sections, attach proof assets, and see which readiness gates block sharing.",
  },
  {
    slug: "reporting-admin",
    title: "Portfolio Reporting & Admin",
    description: "Leadership reporting dashboard paired with administrative settings.",
    moduleIds: ["manage", "budget"],
    workflow: "Executive reporting and system configuration",
    layoutVariation: "Executive report builder",
    referenceBuckets: ["Monday Dashboards", "Jira Align", "Productive", "Kantata"],
    composedComponents: ["Tabs", "StatCard", "Chart", "Select", "Switch", "Input"],
    acceptanceCheck: "An operator can move between reporting context and configuration controls without mixing the two workflows.",
  },
  {
    slug: "prospect-command-center",
    title: "Prospect Command Center",
    description: "Lead intelligence surface with saved searches, qualification rows, signal history, and account fit.",
    moduleIds: ["prospect"],
    workflow: "Lead qualification and account intelligence",
    layoutVariation: "Lead intelligence command center",
    referenceBuckets: ["Apollo", "ZoomInfo", "Clay", "LinkedIn Sales Navigator", "Outreach"],
    composedComponents: ["Input", "Badge", "Avatar", "Progress", "Table", "Button"],
    acceptanceCheck: "A prospecting user can identify which accounts are worth engaging, why they qualify, and who owns the next action.",
  },
  {
    slug: "account-workspace",
    title: "Account Workspace",
    description: "Single-account CRM workspace for stakeholders, relationship activity, opportunities, notes, and next-best actions.",
    moduleIds: ["engage"],
    workflow: "Account relationship management",
    layoutVariation: "Account workspace",
    referenceBuckets: ["Salesforce", "HubSpot", "Attio", "Affinity", "Folk"],
    composedComponents: ["EntityPicker", "Timeline", "Tabs", "Table", "Avatar"],
    acceptanceCheck: "An account owner can understand relationship coverage, recent activity, opportunity state, and recommended next actions without switching surfaces.",
  },
  {
    slug: "staffing-capacity-planner",
    title: "Staffing Capacity Planner",
    description: "Resource allocation workspace for role demand, capacity, skill fit, utilization, and assignment risk.",
    moduleIds: ["staff"],
    workflow: "Capacity planning and assignment review",
    layoutVariation: "Capacity planner",
    referenceBuckets: ["Float", "Runn", "Resource Guru", "Productive", "Mosaic"],
    composedComponents: ["Avatar", "Progress", "Badge", "Tabs", "Button"],
    acceptanceCheck: "A staffing lead can compare demand against people availability and identify overloads, gaps, and fit risks.",
  },
  {
    slug: "delivery-release-tracker",
    title: "Delivery Release Tracker",
    description: "Release readiness screen with story status, blocker queue, validation checks, and execution board.",
    moduleIds: ["deliver"],
    workflow: "Release validation and delivery execution",
    layoutVariation: "Release tracker",
    referenceBuckets: ["Linear", "Jira", "Asana", "GitHub Projects", "Azure DevOps"],
    composedComponents: ["KanbanBoard", "Badge", "StatusBadge", "Progress", "Table"],
    acceptanceCheck: "A delivery manager can see whether a release is ready, what blocks it, and which stories still need validation.",
  },
  {
    slug: "epic-hierarchy-view",
    title: "Epic Hierarchy View",
    description: "Trace release work from epic to story to validation evidence, dependencies, blockers, and acceptance criteria.",
    moduleIds: ["deliver", "scope"],
    workflow: "Epic, story, and validation traceability",
    layoutVariation: "Epic hierarchy view",
    referenceBuckets: ["Linear", "Jira", "Shortcut", "Azure DevOps", "Productboard"],
    composedComponents: ["Tree", "StatusBadge", "Table", "Badge", "Button"],
    acceptanceCheck: "A delivery user can keep the epic hierarchy visible while reviewing selected story acceptance criteria, evidence, and blockers.",
  },
  {
    slug: "enablement-skills-matrix",
    title: "Enablement Skills Matrix",
    description: "Capability coverage matrix for skills, readiness, learning paths, and assignment fit.",
    moduleIds: ["enable"],
    workflow: "Skills coverage and readiness planning",
    layoutVariation: "Skills matrix",
    referenceBuckets: ["Lattice", "Culture Amp", "Workday", "HiBob", "Degreed"],
    composedComponents: ["Avatar", "Progress", "Badge", "Table", "Tabs"],
    acceptanceCheck: "A people leader can identify skill gaps, readiness levels, and next development actions before staffing decisions.",
  },
  {
    slug: "readiness-profile",
    title: "Readiness Profile",
    description: "Person-centered enablement profile for skill depth, growth plan, capacity forecast, and assignment fit.",
    moduleIds: ["enable", "staff"],
    workflow: "Individual readiness and next-assignment planning",
    layoutVariation: "Readiness profile",
    referenceBuckets: ["Lattice", "Workday", "HiBob", "Degreed", "Runn"],
    composedComponents: ["Avatar", "EntityPicker", "Progress", "Timeline", "Badge"],
    acceptanceCheck: "A people leader can decide whether someone is ready for an assignment by comparing skills, learning actions, capacity, and role fit.",
  },
  {
    slug: "budget-control-center",
    title: "Budget Control Center",
    description: "Project budget dashboard covering burn, role spend, time buckets, billing milestones, and exceptions.",
    moduleIds: ["budget"],
    workflow: "Budget tracking and billing readiness",
    layoutVariation: "Budget control center",
    referenceBuckets: ["Harvest", "Toggl Track", "QuickBooks Time", "Ramp", "Productive", "Kantata"],
    composedComponents: ["StatCard", "Progress", "Badge", "Table", "Button"],
    acceptanceCheck: "A finance or delivery user can connect time, money, roles, and milestones to the current billing decision.",
  },
  {
    slug: "spend-approval-queue",
    title: "Spend Approval Queue",
    description: "Expense review workflow with policy checks, receipt preview, project mapping, and approval actions.",
    moduleIds: ["budget"],
    workflow: "Expense approval and project spend control",
    layoutVariation: "Spend approval queue",
    referenceBuckets: ["Ramp", "Brex", "Spendesk", "Expensify", "QuickBooks Time"],
    composedComponents: ["Table", "StatusBadge", "Badge", "Button", "FileUpload"],
    acceptanceCheck: "A finance operator can review spend with policy state, owner, project bucket, receipt context, and the next approval action visible together.",
  },
  {
    slug: "guide-priority-command",
    title: "Guide Priority Command",
    description: "Strategic focus dashboard for OKRs, priority scoring, alignment warnings, and weekly direction.",
    moduleIds: ["guide"],
    workflow: "Strategic priority and focus planning",
    layoutVariation: "Priority command center",
    referenceBuckets: ["WorkBoard", "Quantive", "Perdoo", "Viva Goals", "Aha!", "Dragonboat"],
    composedComponents: ["Progress", "Badge", "Tabs", "Button", "Table"],
    acceptanceCheck: "A leadership user can see what matters most, which initiatives are misaligned, and what direction to give this week.",
  },
]

export const productPatternSlugs = productPatterns.map((pattern) => pattern.slug)

export function getProductPattern(slug: string) {
  return productPatterns.find((pattern) => pattern.slug === slug)
}

export function getModuleReferences(moduleIds: NosModuleId[]) {
  return nosProductPatternModules.filter((module) => moduleIds.includes(module.id))
}
