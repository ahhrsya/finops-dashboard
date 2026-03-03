# SCREENS.md — FinOps Dashboard: 10 Screen Architecture
# Component Library: shadcn/ui + Tailwind CSS + Recharts

**Platform:** Desktop-first, fully responsive (1440px → 1024px → 375px)
**Total Screens:** 10
**Output:** Interactive vibe code (Antigravity / Next.js)
**Read alongside:** PRD.md · KNOWLEDGE.md · STYLE.md

---

## Screen Map & User Journey

```
[1] Onboarding          → First-run, connect cloud accounts
        ↓
[2] Main Dashboard      → Home base, overview all metrics
        ↓
[3] Notification Center → Alert tray, real-time feed
        ↓
[4] Cost Alerts List    → Investigate all active alerts
        ↓
[5] Anomaly Detail      ← HERO SCREEN — deep dive on spike
        ↓
[6] Service Breakdown   → Root cause by service/resource
        ↓
[7] Cost Explorer       → Drill-down per resource/tag/team
        ↓
[8] Budget Caps Settings → Set guardrails & thresholds
        ↓
[9] Reports & Export    → Generate & share to stakeholders
        ↓
[10] User Profile & API Keys → Identity, integrations, dev access
```

---

## Screen 1 — Onboarding / Empty State

**Route:** `/onboarding`
**Layout:** Centered full-page — NO sidebar, NO top nav
**Mood:** Clean, welcoming, low-anxiety

### Layout Structure
```
Full viewport centered flex
├── Logo + Step indicator (Step 1 of 3)
├── SVG illustration (abstract cloud cost, teal tones)
├── Card: "Connect your first cloud account"
│   ├── 3 Provider buttons (AWS / GCP / Azure)
│   └── "Skip for now" link
└── (hidden on 375px: illustration)
```

### shadcn Components
```
<Card>                   → main onboarding card, max-w-[480px] centered
<CardHeader>             → title + description
<CardContent>            → provider buttons
<Button variant="outline">  → each provider connect button (icon + label)
<Button variant="ghost">    → "Skip for now" link
<Progress>               → step indicator (value=33 for step 1/3)
<Badge variant="ok">     → "Connected ✓" state after connect
<Separator>              → between steps
```

### Responsive
```
xl:   Split layout — illustration left 50%, form right 50%
lg:   Same as xl but illustration smaller
md:   Stacked — illustration 200px height, form below
sm:   Illustration hidden, form full width, p-4
```

### Mock Content
```
Title:    "Connect your cloud accounts"
Subtitle: "Monitor spend across AWS, GCP, and Azure in real-time.
           Setup takes under 2 minutes."
Step:     1 of 3
Providers: AWS / GCP / Azure (with SVG logos)
```

---

## Screen 2 — Main Dashboard (Overview)

**Route:** `/dashboard`
**Layout:** App shell (sidebar + topnav) + main content
**Mood:** Data-rich, authoritative, at-a-glance clarity

### Layout Structure
```
AppShell
├── Sidebar (200px xl / 56px lg / hidden md)
└── Main area
    ├── TopNav (h-14)
    └── Page content (p-6 space-y-6)
        ├── KPI Row (grid 4 cols xl / 2 cols sm)
        ├── Chart Area (grid: 2/3 chart + 1/3 donut)
        └── Active Alerts Panel (full width)
```

### shadcn Components
```
KPI Row:
  <Card> x4 (hover:border-primary/40 transition)
    <CardContent> — label (font-mono xs uppercase) + value (font-display 2xl) + change badge

Chart Area:
  <Card>                    → anomaly chart container
    <CardHeader>            → "Cost Trend" title + date range
    <CardContent>           → <ResponsiveContainer> Recharts LineChart
  <Card>                    → budget donut container
    <CardContent>           → Recharts PieChart (donut)

Active Alerts Panel:
  <Card>
    <CardHeader>            → "Active Alerts" + <Badge>3 Critical</Badge>
    <CardContent>           → alert rows (3 items)
      Per row: <Badge variant="critical"> + service name + description + <Button size="sm" variant="ghost">View</Button>
```

### KPI Data
```
MTD Spend:     $84,320    font-display text-2xl
Active Alerts: 3 Critical  Badge variant="critical"
Budget Used:   71.1%       text-yellow-400 font-mono
MoM Change:    +12.4%      text-red-400 font-mono (cost up = bad)
```

### Responsive
```
xl:   Full layout — 4 KPI cards / 2/3+1/3 chart split
lg:   Sidebar icon-only / charts still side by side
md:   Sidebar hidden (hamburger) / KPI 2x2
sm:   Bottom tab bar / KPI 2x2 / charts stack vertically
```

### Interactions
```
Hover KPI card     → border-primary/40 + bg lift
Click alert row    → navigate to /alerts/[id] (Screen 5)
Click bell icon    → open Sheet (Screen 3)
Click "View All"   → navigate to /alerts (Screen 4)
```

---

## Screen 3 — Notification Center

**Route:** Slide-in drawer from anywhere (bell icon in TopNav)
**Layout:** shadcn Sheet side="right" over blurred dashboard
**Mood:** Urgent but organized, scannable

### Layout Structure
```
<Sheet side="right" w-[400px]>
├── <SheetHeader> — "Notifications" + "Mark all read" Button ghost
├── <Tabs> — All(11) / Critical(2) / Warning(5) / Info(4)
└── <ScrollArea>
    └── Notification items list (space-y-1)
        Each item:
        ├── <Badge variant="critical|warning|info">
        ├── Title (font-sans text-sm font-medium)
        ├── Description (font-mono text-xs text-muted-foreground)
        └── Time (font-mono text-xs text-muted-foreground)
```

### shadcn Components
```
<Sheet>                   → drawer container
<SheetContent side="right" className="w-[400px] p-0">
<SheetHeader>             → title + action
<Tabs> + <TabsList> + <TabsTrigger> + <TabsContent>
<ScrollArea>              → scrollable list
<Badge>                   → severity per item
<Button variant="ghost" size="sm">  → "Mark all read", per-item actions
<Separator>               → between sections
```

### Notification Items Mock
```
[CRITICAL] EC2 Spike Detected            2 min ago
           us-east-1 · +340% · est. $12,400

[CRITICAL] Lambda Budget at 89%          14 min ago
           eu-west-1 · $2,100 to breach

[WARNING]  S3 Egress Anomaly             1 hr ago
           847GB unexpected transfer

[WARNING]  RDS trending +15% baseline    3 hr ago

[WARNING]  EKS cost per pod +22%         5 hr ago

[WARNING]  CloudFront 73% monthly cap    6 hr ago

[WARNING]  ElastiCache RI expiring       2 days

[WARNING]  Redshift query costs +45%     1 day ago

[INFO]     BigQuery usage +12%           2 days ago

[INFO]     GCS storage 60% cap          3 days ago

[INFO]     Monthly report ready         Yesterday
```

### Responsive
```
xl/lg: Sheet drawer 400px, dashboard visible behind
md:    Sheet drawer 360px
sm:    Full-screen (SheetContent className="w-full")
```

---

## Screen 4 — Cost Alerts List

**Route:** `/alerts`
**Layout:** App shell + full-width table
**Mood:** Operational, scannable, action-oriented

### Layout Structure
```
AppShell
└── Page content
    ├── Page header — "Cost Alerts" + <Button>New Alert Rule</Button>
    ├── Summary bar — 3 stat cards (Critical / Warning / Info count)
    ├── Filter bar — severity / provider / service dropdowns + search
    └── <Table> — 11 alert rows, sortable headers
```

### shadcn Components
```
Summary bar:
  <Card> x3 (compact, horizontal)
    critical count in text-red-400 / warning in text-yellow-400 / info in text-blue-400

Filter bar:
  <Select> x3    → Severity / Provider / Service filters
  <Input>        → Search alerts (placeholder: "Search alerts...")
  <Button variant="outline" size="sm">  → Reset filters

Table:
  <Table>
    <TableHeader> — 8 columns (Severity/Service/Provider/Description/Impact/Detected/Status/Actions)
    <TableBody>   — 11 rows
      Per row:
        <Badge variant="critical|warning|info">   → severity
        <Badge variant="aws|gcp|azure">           → provider
        font-mono text-sm                         → $ values
        <Button size="sm" variant="ghost">        → View
        <Button size="sm" variant="outline">      → Snooze
```

### Alert Table Data (11 rows)
```
CRITICAL | EC2        | AWS   | +340% spike us-east-1     | +$12,400 | 2m    | Open | View Snooze
CRITICAL | Lambda     | AWS   | 89% budget eu-west-1      | +$2,100  | 14m   | Open | View Snooze
CRITICAL | S3         | AWS   | Egress anomaly 847GB      | +$890    | 1h    | Open | View Snooze
WARNING  | RDS        | AWS   | +15% above baseline       | +$1,200  | 3h    | Open | View Snooze
WARNING  | EKS        | AWS   | Cost per pod +22%         | +$780    | 5h    | Open | View Snooze
WARNING  | CloudFront | AWS   | 73% monthly cap           | +$450    | 6h    | Open | View Snooze
WARNING  | ElastiCache| AWS   | RI expiring in 3 days     | +$2,400  | 1d    | Open | View
WARNING  | Redshift   | AWS   | Query costs +45% week     | +$600    | 1d    | Open | View
INFO     | BigQuery   | GCP   | Usage +12% this week      | —        | 2d    | Open | View
INFO     | GCS        | GCP   | Storage 60% monthly cap   | —        | 3d    | Ack  | View
INFO     | Azure VMs  | Azure | New resource detected     | —        | 5d    | Ack  | View
```

### Responsive
```
xl/lg: Full table all 8 columns
md:    Hide "Description" column
sm:    Table hidden → <Card> list per alert (Badge + title + amount + actions)
```

---

## Screen 5 — Anomaly Detail ⭐ HERO SCREEN

**Route:** `/alerts/ec2-spike-us-east-1`
**Layout:** App shell + two-column detail
**Mood:** DRAMATIC. Maximum visual tension. This is the money shot.

### Layout Structure
```
AppShell
└── Page content
    ├── Breadcrumb — Alerts > EC2 Spike · us-east-1
    ├── Alert header banner (full width, red tint bg)
    │   ├── <Badge variant="critical" className="animate-alert-pulse">
    │   ├── Title: "EC2 Cost Spike Detected — us-east-1"
    │   └── Detected time + duration
    ├── Main grid (2/3 + 1/3)
    │   ├── LEFT 2/3:
    │   │   ├── <Card> Hero Chart — 30-day annotated area chart
    │   │   └── <Card> Root Cause Analysis
    │   └── RIGHT 1/3:
    │       ├── <Card> Stats grid (8 metrics)
    │       ├── <Card> Affected resources list
    │       └── <Card> Recommended Actions
    └── Action bar — Acknowledge / Snooze / Create Ticket
```

### shadcn Components
```
Alert banner:
  <Alert className="border-red-500/40 bg-red-500/10">
    <AlertTitle className="font-display font-bold text-red-400">
    <AlertDescription>

Hero Chart (2/3):
  <Card>
    <CardHeader> — "30-Day Cost Trend · EC2 · us-east-1"
    <CardContent>
      <ResponsiveContainer height={300}>
        Recharts AreaChart:
        - Normal period: fill="#4D9FFF20" stroke="#4D9FFF"
        - Anomaly region (Feb 13-14): fill="#FF404020" stroke="#FF4040"
        - Baseline: ReferenceLine y={1890} stroke="#3A4050" strokeDasharray="4 4"
        - Anomaly annotation: ReferenceArea + custom label "$6,340 ↑+340%"

Stats Panel (1/3):
  <Card>
    <CardContent>
      Grid 2-col, 8 stat items:
      label: font-mono text-[10px] text-muted-foreground uppercase
      value: font-display font-bold text-lg (red for anomaly values)

Root Cause Card:
  <Card>
    <CardHeader> — "Root Cause Analysis"
    <CardContent>
      Confidence: <Progress value={87} className="h-1.5 [&>div]:bg-primary" />
      Factors: <ul> with <li> items

Recommended Actions:
  <Card>
    <CardContent>
      3 action items with priority <Badge> + description + <Button>

Action bar:
  <Button variant="outline">Snooze 1h</Button>
  <Button variant="outline">Snooze 24h</Button>
  <Button variant="destructive">Acknowledge</Button>
  <Button>Create Ticket</Button>
```

### Stats Data (right panel)
```
Current/day:      $6,340    text-red-400 font-display font-bold
Normal baseline:  $1,890/d  text-muted-foreground
Total overage:    $9,280    text-red-400
Est. monthly:     +$12,400  text-red-400
First detected:   Feb 13 14:32 UTC
Duration:         18 hours
Region:           us-east-1
Instance count:   847 (normal: 240)
```

### Responsive
```
xl:   2/3 + 1/3 side by side
lg:   Same, slightly compressed
md:   Stats panel moves below chart
sm:   All stacked, chart height 220px
```

---

## Screen 6 — Service Breakdown

**Route:** `/services`
**Layout:** App shell + chart top + table bottom
**Mood:** Analytical, structured, comparative

### Layout Structure
```
AppShell
└── Page content
    ├── Page header — "Service Breakdown" + period toggle
    ├── <Card> Stacked bar chart (30-day, by service)
    └── <Card> Service table with inline sparklines
```

### shadcn Components
```
Period toggle:
  <Tabs> — 7D / 30D / 90D / Custom
  (or Button group variant="outline" for compact toggle)

Stacked bar chart:
  <Card>
    <CardHeader> — title + legend (colored dots + service names)
    <CardContent>
      Recharts BarChart stacked:
      - EC2: fill="#00D4A0"
      - Lambda: fill="#FF8C00"
      - S3: fill="#4D9FFF"
      - RDS: fill="#FFB547"
      - Other: fill="#6B7280"

Service table:
  <Table>
    Columns: Service / Provider / MTD Cost / % Total / vs Last Month / Trend / Budget / Status
    Per row:
      <Badge variant="aws|gcp">          → provider
      font-mono text-sm                  → cost values
      text-red-400 / text-emerald-400    → month change
      60px inline Recharts Sparkline     → trend
      <Progress className="w-20 h-1.5"> → budget bar
      <Badge variant="critical|warning|ok"> → status
```

### Table Data
```
EC2          AWS   $38,200  45.3%  +18%  [↑]  $40,000  95%  critical
S3           AWS   $14,100  16.7%   +2%  [→]  $20,000  71%  warning
RDS          AWS   $12,400  14.7%   +4%  [→]  $15,000  83%  warning
Lambda       AWS    $9,800  11.6%  +34%  [↑]  $11,000  89%  warning
CloudFront   AWS    $6,200   7.4%   +1%  [→]  $10,000  62%  ok
EKS          AWS    $2,100   2.5%  +22%  [↑]   $5,000  42%  ok
BigQuery     GCP    $1,200   1.4%  +12%  [↑]   $3,000  40%  ok
GCS          GCP      $320   0.4%   -3%  [↓]   $2,000  16%  ok
```

### Responsive
```
xl/lg: Full table all columns
md:    Hide "Trend" sparkline column
sm:    Table → card list, chart height 180px
```

---

## Screen 7 — Cost Explorer / Resource Drill-down

**Route:** `/explorer`
**Layout:** App shell + filter sidebar left + chart+table right
**Mood:** Power-user analytical tool

### Layout Structure
```
AppShell
└── Page content (flex row, no gap wrapper)
    ├── Filter Panel (280px, sticky)
    │   ├── Group By dropdown
    │   ├── Date range picker
    │   ├── Provider checkboxes
    │   ├── Service checkboxes
    │   ├── Region checkboxes
    │   └── Tag/Team checkboxes
    └── Main area (flex-1)
        ├── <Card> Treemap chart
        └── <Card> Expandable breakdown table
```

### shadcn Components
```
Filter Panel:
  <Card className="w-[280px] shrink-0 sticky top-6">
    <Select>              → Group By (Service/Region/Tag/Team)
    <Popover>             → Date range picker (Calendar)
    <Separator>           → between filter groups
    <Label> + <Checkbox>  → each filter option (provider/service/region)
    <Button variant="outline" size="sm">  → Reset filters
    <Button size="sm">    → Apply

Treemap:
  <Card>
    <CardHeader> — "Cost Distribution · Feb 1–14"
    <CardContent>
      Recharts Treemap:
        color scale: green (#00D4A0) → yellow (#FFB547) → red (#FF4040)
        based on budget % consumed
        each cell: service name + cost + %

Breakdown Table:
  <Table>
    Expandable rows via Collapsible:
    <Collapsible> per service row
    <CollapsibleTrigger> → chevron icon
    <CollapsibleContent> → sub-rows (instance types)
```

### Responsive
```
xl/lg: Filter panel left 280px + chart right
md:    Filter panel becomes top <Sheet> (triggered by filter button)
sm:    Filter as full-screen Sheet, treemap stacks below
```

---

## Screen 8 — Budget Caps Settings

**Route:** `/settings/budgets`
**Layout:** App shell + list-detail split (settings pattern)
**Mood:** Precise, controlled, configuration

### Layout Structure
```
AppShell
└── Page content
    ├── Page header — "Budget Caps" + <Button>+ Add Budget</Button>
    └── Grid: [Budget List 320px] | [Edit Form flex-1]
        Budget List:
          <Card> per budget (clickable, active state = border-primary)
          Each: name + <Progress> + <Badge> status

        Edit Form:
          <Card>
            Budget name <Input>
            Provider <Select>
            Service <Select>
            Monthly cap <Input type="number">
            <Separator>
            Thresholds section:
              <Label> + <Slider> for warn % (70)
              <Label> + <Slider> for critical % (90)
              <Switch> for hard cap
            <Separator>
            Notifications section:
              <Switch> + label per channel (In-app/Email/Slack/PagerDuty)
              <Input> for email address (shown when email enabled)
            <Separator>
            <Button variant="outline">Cancel</Button>
            <Button>Save Budget Cap</Button>
```

### shadcn Components
```
<Card>                → budget list items + form container
<Input>               → name, cap amount, email
<Select>              → provider, service dropdowns
<Slider>              → warn/critical threshold (add: npx shadcn@latest add slider)
<Switch>              → hard cap toggle, notification channels
<Label>               → all form labels
<Separator>           → section dividers
<Button>              → cancel + save
<Progress>            → budget usage in list items (colored by getBudgetColor)
<Badge>               → status in list items
```

### Budget List Data
```
EC2 Instances      $38,200 / $40,000  95%  critical  (active/selected)
Lambda Functions    $9,800 / $11,000  89%  warning
S3 Storage         $14,100 / $20,000  71%  warning
RDS Database       $12,400 / $15,000  83%  warning
CloudFront          $6,200 / $10,000  62%  ok
```

### Responsive
```
xl:   Side-by-side list 320px + form
lg:   Same
md:   List full width, form slides in as Sheet when item clicked
sm:   List full width cards, edit = full page route
```

---

## Screen 9 — Reports & Export

**Route:** `/reports`
**Layout:** App shell + card grid + table
**Mood:** Professional, export-ready, executive-friendly

### Layout Structure
```
AppShell
└── Page content
    ├── Page header — "Reports" + <Button>Generate Report</Button>
    ├── Templates section (grid 3-col)
    │   <Card> x6 per template (icon + name + schedule + format tags)
    └── Recent Reports section
        <Card> with <Table>
```

### shadcn Components
```
Template Cards:
  <Card className="hover:border-primary/40 cursor-pointer transition">
    <CardContent>
      icon (Lucide) + name (font-display font-bold) +
      schedule (font-mono text-xs text-muted-foreground) +
      format <Badge variant="outline"> x2

Recent Reports Table:
  <Table>
    Columns: Name / Period / Format / Generated / Actions
    Per row:
      <Badge variant="outline">PDF/CSV</Badge>
      <Button size="sm" variant="ghost">View</Button>
      <Button size="sm" variant="outline">Download</Button>

Generate Report Modal:
  <Dialog>
    <DialogContent>
      <Select>   → Report Type
      <Select>   → Date Range (month picker)
      <Checkbox> x3 → Include: Charts / Tables / Recommendations
      <RadioGroup> → Format: PDF / CSV / Excel
      <Switch> x2  → Send to: Email / Slack
      <Button>Generate Report</Button>
```

### Report Templates
```
📊 Monthly Cost Summary    Auto · Monthly  · PDF CSV
🔴 Anomaly Report          On-demand       · PDF
📈 Budget vs Actual        Auto · Weekly   · PDF CSV Slack
🏢 Team Chargeback         Auto · Monthly  · CSV Excel
⚡ Executive Summary       Auto · Monthly  · PDF PPT
🔧 Infrastructure Audit    On-demand       · PDF
```

### Responsive
```
xl:   3-col template grid, full table
lg:   3-col grid, full table
md:   2-col grid, condensed table
sm:   1-col grid, table → card list
```

---

## Screen 10 — User Profile & API Keys

**Route:** `/settings/profile`
**Layout:** App shell + settings shell with tabs
**Mood:** Clean, secure, developer-friendly

### Layout Structure
```
AppShell
└── Page content
    ├── Page header — "Account Settings"
    ├── <Tabs> — Profile / API Keys / Integrations / Team
    └── <TabsContent value="api-keys"> (primary shown)
        ├── Section header — "API Keys" + <Button>+ Generate New Key</Button>
        ├── <Table> — existing keys (3 rows)
        └── Code snippet card — example curl usage
```

### shadcn Components
```
Tabs shell:
  <Tabs defaultValue="api-keys">
    <TabsList>
      <TabsTrigger> x4 → Profile / API Keys / Integrations / Team

Profile Tab:
  <Card>
    <Avatar> (80px, with upload overlay on hover)
    <Input> x4 → Full Name / Email / Organization / Timezone <Select>
    <Badge variant="ok">Verified</Badge>   → email verified
    <Button>Save Changes</Button>

API Keys Tab:
  <Table>
    Columns: Name / Key (masked) / Created / Last Used / Scope / Actions
    Per row:
      font-mono text-sm           → masked key "fops_live_••••••8f2a"
      <Badge variant="outline">Read/Write</Badge>  → scope
      <Button size="sm" variant="ghost" size="icon"> → Copy icon
      <Button size="sm" variant="destructive">Revoke</Button>

  Code snippet:
    <Card className="bg-popover border-border">
      <pre className="font-mono text-xs text-muted-foreground p-4">
        curl -H "Authorization: Bearer fops_live_xxxx" \
             https://api.finops.app/v1/costs
      </pre>
      <Button size="sm" variant="ghost" size="icon"> → Copy button

Generate Key Modal:
  <Dialog>
    <Input>       → Key Name
    <RadioGroup>  → Scope: Read-only / Read+Write / Admin
    <RadioGroup>  → Expiry: Never / 90 days / 1 year / Custom
    <Button>Generate Key</Button>

  Post-generate: show full key once in <Alert> with copy button
  <Alert className="border-primary/40 bg-primary/10">
    "Copy this key now — it won't be shown again"
    font-mono text-sm + <Button size="icon" variant="ghost"> copy
```

### API Keys Mock Data
```
Production API    fops_live_••••••8f2a   Jan 10, 2025  2 min ago   Read/Write  Copy Revoke
Grafana Export    fops_live_••••••3c9d   Dec 5, 2024   1 hr ago    Read-only   Copy Revoke
CI/CD Pipeline    fops_live_••••••7b1e   Nov 20, 2024  1 day ago   Read-only   Copy Revoke
```

### Responsive
```
xl/lg: Full settings layout
md:    Same, slightly compressed
sm:    Tabs → horizontal scroll, table → card list per key
```

---

## Global Shared Components (All 10 Screens)

```tsx
// App Shell
<AppShell>         → Sidebar + TopNav wrapper (Screens 2–10)

// Sidebar nav item
<Button variant="ghost" className="w-full justify-start gap-3
  data-[active=true]:bg-primary/10 data-[active=true]:text-primary
  data-[active=true]:border-l-2 data-[active=true]:border-primary">
  <Icon className="h-4 w-4 shrink-0" />
  <span className="hidden xl:block font-sans text-sm">Overview</span>
</Button>

// TopNav
<header>
  Breadcrumb (font-sans text-sm text-muted-foreground)
  <Input placeholder="Search..." className="w-64 hidden lg:flex" />
  <Button variant="ghost" size="icon"> → Bell (Sheet trigger)
  <Avatar> → user menu <DropdownMenu>
</header>

// Empty State (Screens with no data)
<div className="flex flex-col items-center justify-center py-24 text-center">
  <div className="text-muted-foreground/40 mb-4"> {/* SVG illustration */} </div>
  <h3 className="font-display font-bold text-lg mb-2">No alerts yet</h3>
  <p className="text-sm text-muted-foreground max-w-sm mb-6">description</p>
  <Button>Primary CTA</Button>
</div>

// Loading Skeleton
<Skeleton className="h-7 w-32 bg-muted/40" />   // KPI value
<Skeleton className="h-[220px] w-full bg-muted/40" /> // Chart

// Toast
useToast() → "Budget cap saved" / "API key generated" / "Report queued"
```

---

## Global Animation Rules

```tsx
// Page entrance — wrap page content
<div className="animate-fade-up">

// Staggered cards — apply delay via style prop
<Card style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-up">

// Critical alert pulse — on Badge only
<Badge variant="critical" className="animate-alert-pulse">

// Chart draw — handled by Recharts animationDuration prop
<Line animationDuration={800} animationEasing="ease-out" />

// Number count-up — use react-countup or CSS counter trick on KPI values
```

---

## File Structure (Next.js App Router)

```
app/
├── layout.tsx                    → AppShell, fonts, providers
├── onboarding/page.tsx           → Screen 1
├── dashboard/page.tsx            → Screen 2
├── alerts/
│   ├── page.tsx                  → Screen 4
│   └── [id]/page.tsx             → Screen 5
├── services/page.tsx             → Screen 6
├── explorer/page.tsx             → Screen 7
├── settings/
│   ├── budgets/page.tsx          → Screen 8
│   └── profile/page.tsx          → Screen 10
├── reports/page.tsx              → Screen 9
components/
├── ui/                           → shadcn auto-generated
├── app-shell.tsx                 → sidebar + topnav
├── kpi-card.tsx                  → reusable KPI
├── anomaly-chart.tsx             → recharts wrapper
├── alert-badge.tsx               → extended Badge
├── notification-drawer.tsx       → Sheet wrapper
└── budget-progress.tsx           → Progress + color logic
lib/
├── utils.ts                      → cn(), formatCost(), getBudgetColor()
└── chart-config.ts               → shared Recharts config
```
