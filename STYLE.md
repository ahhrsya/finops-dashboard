# Style Guide — FinOps Dashboard (Dark Mode)
# Component Library: shadcn/ui + Tailwind CSS

## Design Principle

**"Terminal-Grade Precision"**
This UI feels like a tool built by engineers, for engineers — but designed by someone who deeply cares about aesthetics. Think: Bloomberg Terminal meets Linear.app. High information density, zero noise, every pixel intentional.

---

## shadcn/ui Setup

### Installation
```bash
npx shadcn@latest init
# Choose: TypeScript, Tailwind, dark mode: class
```

### Required Components (install all upfront)
```bash
npx shadcn@latest add card badge button table sheet dialog
npx shadcn@latest add progress tabs input label select
npx shadcn@latest add dropdown-menu separator avatar tooltip
npx shadcn@latest add alert skeleton toast command popover
npx shadcn@latest add checkbox radio-group switch scroll-area
```

---

## Theme Override — globals.css

Override shadcn's CSS variables to match FinOps dark aesthetic.
This goes in `app/globals.css` or `styles/globals.css`.

```css
@layer base {
  :root {
    --background:         220 14% 6%;     /* #0A0C10 */
    --foreground:         225 18% 91%;    /* #E8EAF0 */

    --card:               225 13% 10%;   /* #111318 */
    --card-foreground:    225 18% 91%;   /* #E8EAF0 */

    --popover:            225 15% 12%;   /* #161A22 */
    --popover-foreground: 225 18% 91%;   /* #E8EAF0 */

    --primary:            162 100% 42%;  /* #00D4A0 — teal green */
    --primary-foreground: 220 14% 6%;    /* dark text on green */

    --secondary:          225 15% 14%;   /* #1E2330 */
    --secondary-foreground: 225 10% 60%; /* #6B7280 */

    --muted:              225 15% 14%;   /* #1E2330 */
    --muted-foreground:   225 10% 45%;   /* #6B7280 */

    --accent:             225 15% 16%;   /* #1E2330 hover */
    --accent-foreground:  225 18% 91%;   /* #E8EAF0 */

    --destructive:        0 100% 62%;    /* #FF4040 — critical red */
    --destructive-foreground: 0 0% 100%;

    --border:             225 20% 17%;   /* #1E2330 */
    --input:              225 20% 17%;   /* #1E2330 */
    --ring:               162 100% 42%;  /* #00D4A0 focus ring */

    --radius: 0.5rem;
  }
}

/* Extended semantic tokens */
:root {
  --color-warning:        #FFB547;
  --color-warning-dim:    rgba(255, 181, 71, 0.12);
  --color-orange:         #FF8C00;
  --color-orange-dim:     rgba(255, 140, 0, 0.12);
  --color-info:           #4D9FFF;
  --color-info-dim:       rgba(77, 159, 255, 0.12);
  --color-success:        #00D4A0;
  --color-success-dim:    rgba(0, 212, 160, 0.12);
  --color-critical:       #FF4040;
  --color-critical-dim:   rgba(255, 64, 64, 0.12);

  /* Provider colors */
  --color-aws:            #FF9900;
  --color-gcp:            #4285F4;
  --color-azure:          #0078D4;

  /* Surface layers */
  --surface-1:            #0A0C10;
  --surface-2:            #111318;
  --surface-3:            #161A22;
  --surface-4:            #1E2330;
}
```

---

## Tailwind Config Extension

Add to `tailwind.config.ts`:

```ts
extend: {
  colors: {
    finops: {
      bg:       '#0A0C10',
      surface:  '#111318',
      surface2: '#161A22',
      border:   '#1E2330',
      green:    '#00D4A0',
      red:      '#FF4040',
      orange:   '#FF8C00',
      yellow:   '#FFB547',
      blue:     '#4D9FFF',
      muted:    '#6B7280',
      dim:      '#3A4050',
      aws:      '#FF9900',
      gcp:      '#4285F4',
      azure:    '#0078D4',
    }
  },
  fontFamily: {
    display: ['Syne', 'sans-serif'],
    mono:    ['IBM Plex Mono', 'monospace'],
    sans:    ['DM Sans', 'sans-serif'],
  },
  keyframes: {
    alertPulse: {
      '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 64, 64, 0.4)' },
      '50%':      { boxShadow: '0 0 0 8px rgba(255, 64, 64, 0)' },
    },
    fadeUp: {
      from: { opacity: '0', transform: 'translateY(8px)' },
      to:   { opacity: '1', transform: 'translateY(0)' },
    },
    shimmer: {
      '0%':   { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    }
  },
  animation: {
    'alert-pulse': 'alertPulse 2s ease-in-out infinite',
    'fade-up':     'fadeUp 200ms ease both',
    'shimmer':     'shimmer 1.5s infinite',
  }
}
```

---

## Typography

### Font Stack
```html
<!-- In <head> / layout.tsx -->
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

### Usage Rules
```
font-display  → Syne          → All headers, KPI values, page titles
font-mono     → IBM Plex Mono → All numbers, $$ values, %, code, labels
font-sans     → DM Sans       → Body copy, descriptions, nav items
```

### Tailwind Type Classes
```
text-3xl font-display font-extrabold          → Page titles
text-2xl font-display font-bold               → Section headers, big KPI values
text-base font-sans                           → Body text
text-sm font-sans                             → List items, descriptions
text-xs font-mono uppercase tracking-widest   → Table column headers / labels
text-xs font-mono                             → Inline data values
```

---

## shadcn Component Customization

### Badge — Severity Variants
Extend `components/ui/badge.tsx` with custom variants:

```ts
const badgeVariants = cva(
  "font-mono text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded border inline-flex items-center",
  {
    variants: {
      variant: {
        default:     "bg-primary/10 text-primary border-primary/40",
        critical:    "bg-red-500/15 text-red-400 border-red-500/40 animate-alert-pulse",
        warning:     "bg-yellow-500/15 text-yellow-400 border-yellow-500/40",
        info:        "bg-blue-500/15 text-blue-400 border-blue-500/40",
        ok:          "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
        aws:         "bg-orange-500/15 text-orange-400 border-orange-500/40",
        gcp:         "bg-blue-500/15 text-blue-400 border-blue-500/40",
        azure:       "bg-sky-500/15 text-sky-400 border-sky-500/40",
        outline:     "border-border text-muted-foreground bg-transparent",
        secondary:   "bg-secondary text-secondary-foreground border-transparent",
      }
    },
    defaultVariants: { variant: "default" }
  }
)
```

### Card — Standard Usage
```tsx
// Standard card
<Card className="bg-card border-border">
  <CardHeader>
    <CardTitle className="font-display font-bold text-base">Title</CardTitle>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>

// KPI Card — with hover state
<Card className="bg-card border-border hover:border-primary/40
                 hover:bg-accent/20 transition-all duration-150 cursor-default">
  <CardContent className="p-5">
    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
      MTD Spend
    </p>
    <p className="text-2xl font-display font-bold">$84,320</p>
    <p className="text-xs font-mono text-red-400 mt-1">↑ +12.4% vs last month</p>
  </CardContent>
</Card>
```

### Button Variants (use shadcn as-is)
```tsx
<Button variant="default">       // Primary green CTA
<Button variant="outline">       // Secondary action
<Button variant="ghost">         // Sidebar nav items, icon actions
<Button variant="destructive">   // Delete / Revoke
<Button size="sm">               // Compact table actions
<Button size="icon">             // Icon-only buttons
```

### Progress — Budget Bar with Semantic Color
```tsx
// Helper function (add to lib/utils.ts)
const getBudgetVariant = (pct: number) => {
  if (pct >= 90) return '[&>div]:bg-red-500'
  if (pct >= 70) return '[&>div]:bg-yellow-500'
  return '[&>div]:bg-emerald-500'
}

// Usage
<Progress
  value={71}
  className={cn("h-1.5 bg-muted", getBudgetVariant(71))}
/>
```

### Table — Data Tables
```tsx
<Table>
  <TableHeader>
    <TableRow className="hover:bg-transparent border-border">
      <TableHead className="font-mono text-[10px] uppercase tracking-widest
                            text-muted-foreground h-10">
        Service
      </TableHead>
      <TableHead className="font-mono text-[10px] uppercase tracking-widest
                            text-muted-foreground text-right">
        MTD Cost
      </TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="border-border/40 hover:bg-white/[0.02]">
      <TableCell className="font-sans text-sm py-3">EC2 Instances</TableCell>
      <TableCell className="font-mono text-sm text-right">$38,200</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Sheet — Notification Drawer
```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <Bell className="h-4 w-4" />
    </Button>
  </SheetTrigger>
  <SheetContent
    side="right"
    className="w-[400px] sm:w-[400px] bg-card border-border p-0 overflow-hidden"
  >
    <SheetHeader className="px-5 py-4 border-b border-border bg-popover shrink-0">
      <SheetTitle className="font-display font-bold">Notifications</SheetTitle>
    </SheetHeader>
    <ScrollArea className="flex-1 h-full">
      {/* notification items */}
    </ScrollArea>
  </SheetContent>
</Sheet>
```

### Dialog — Modals (Generate Report, API Key, etc.)
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Generate Report</Button>
  </DialogTrigger>
  <DialogContent className="bg-card border-border max-w-md">
    <DialogHeader>
      <DialogTitle className="font-display font-bold text-xl">
        Generate Report
      </DialogTitle>
      <DialogDescription className="text-muted-foreground text-sm">
        Configure and export your cost report.
      </DialogDescription>
    </DialogHeader>
    {/* form */}
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Generate</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Tabs — Settings Pages
```tsx
<Tabs defaultValue="api-keys">
  <TabsList className="bg-muted/30 border border-border w-full justify-start h-10">
    <TabsTrigger
      value="profile"
      className="data-[state=active]:bg-card data-[state=active]:text-foreground
                 data-[state=active]:border-b-2 data-[state=active]:border-primary
                 font-sans text-sm"
    >
      Profile
    </TabsTrigger>
    <TabsTrigger value="api-keys" className="...">API Keys</TabsTrigger>
  </TabsList>
  <TabsContent value="api-keys" className="mt-6">
    {/* content */}
  </TabsContent>
</Tabs>
```

### Tooltip — Chart Data Points & Icon Hints
```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="cursor-default">{value}</span>
    </TooltipTrigger>
    <TooltipContent
      className="bg-popover border-border font-mono text-xs px-3 py-2"
    >
      $6,340 · Feb 13 14:32 UTC
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Input & Select — Forms
```tsx
// Text input
<Input
  className="bg-input border-border font-mono text-sm
             focus:border-primary focus:ring-1 focus:ring-primary/30"
  placeholder="Budget name"
/>

// Select
<Select>
  <SelectTrigger className="bg-input border-border font-sans text-sm">
    <SelectValue placeholder="Select provider" />
  </SelectTrigger>
  <SelectContent className="bg-popover border-border">
    <SelectItem value="aws" className="font-sans text-sm">AWS</SelectItem>
    <SelectItem value="gcp">GCP</SelectItem>
  </SelectContent>
</Select>
```

### Skeleton — Loading States
```tsx
// All data-heavy components need loading skeletons
<Skeleton className="h-7 w-32 bg-muted/40" />          // KPI value
<Skeleton className="h-[220px] w-full bg-muted/40" />   // Chart area
<Skeleton className="h-10 w-full bg-muted/40" />        // Table row
<Skeleton className="h-4 w-24 bg-muted/40" />           // Label
```

---

## App Shell Layout

```tsx
// Root layout — _layout.tsx or layout.tsx
<div className="flex h-screen bg-background overflow-hidden">

  {/* Sidebar */}
  <aside className={cn(
    "hidden md:flex shrink-0 flex-col",
    "border-r border-border bg-card",
    "w-14 xl:w-[200px] transition-all duration-200"
  )}>
    {/* Logo */}
    <div className="h-14 flex items-center px-4 border-b border-border shrink-0">
      <span className="font-display font-bold text-primary hidden xl:block">FinOps</span>
    </div>
    {/* Nav items */}
    <nav className="flex-1 p-2 space-y-1">
      {/* NavItem — use Button variant="ghost" */}
    </nav>
    {/* User avatar bottom */}
    <div className="p-3 border-t border-border">
      <Avatar className="h-8 w-8" />
    </div>
  </aside>

  {/* Main */}
  <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

    {/* Top nav */}
    <header className="h-14 shrink-0 border-b border-border
                       bg-card/80 backdrop-blur-sm
                       flex items-center px-6 gap-4">
    </header>

    {/* Page content */}
    <main className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6 max-w-[1440px] mx-auto">
        {/* page content */}
      </div>
    </main>

  </div>
</div>
```

---

## Chart Library — Recharts

Recharts integrates best with shadcn/Tailwind:
```bash
npm install recharts
```

Always wrap in shadcn `<Card>`, use FinOps chart config:

```tsx
// Shared chart config (put in lib/chart-config.ts)
export const chartConfig = {
  cartesianGrid: {
    strokeDasharray: "3 3",
    stroke: "rgba(255,255,255,0.04)"
  },
  xAxis: {
    tick: { fill: '#6B7280', fontSize: 10, fontFamily: 'IBM Plex Mono' },
    axisLine: { stroke: '#1E2330' },
    tickLine: false,
  },
  yAxis: {
    tick: { fill: '#6B7280', fontSize: 10, fontFamily: 'IBM Plex Mono' },
    axisLine: false,
    tickLine: false,
  },
  tooltip: {
    contentStyle: {
      background: '#161A22',
      border: '1px solid #1E2330',
      borderRadius: 8,
      fontFamily: 'IBM Plex Mono',
      fontSize: 11,
    }
  },
  colors: {
    normal:   '#4D9FFF',
    anomaly:  '#FF4040',
    baseline: '#3A4050',
    ec2:      '#00D4A0',
    lambda:   '#FF8C00',
    s3:       '#4D9FFF',
    rds:      '#FFB547',
    other:    '#6B7280',
  }
}
```

---

## Responsive Rules

### Breakpoints (Tailwind)
```
sm:   640px  → Mobile landscape
md:   768px  → Tablet (sidebar appears)
lg:  1024px  → Small desktop
xl:  1280px  → Standard desktop
2xl: 1440px  → Wide desktop (design base)
```

### Sidebar
```tsx
className="hidden md:flex w-14 xl:w-[200px]"
// md: icon-only, xl: full with labels
```

### Grid Responsive
```tsx
// KPI Row
<div className="grid grid-cols-2 xl:grid-cols-4 gap-4">

// Chart + Donut
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <div className="lg:col-span-2">{/* Chart */}</div>
  <div className="lg:col-span-1">{/* Donut */}</div>
</div>

// Table → Cards on mobile
<div className="hidden md:block"> {/* Table */} </div>
<div className="md:hidden space-y-3"> {/* Card list */} </div>
```

---

## Utility Functions (lib/utils.ts additions)

```ts
// Budget color helper
export const getBudgetColor = (pct: number) => {
  if (pct >= 90) return { text: 'text-red-400', bar: '[&>div]:bg-red-500', badge: 'critical' }
  if (pct >= 70) return { text: 'text-yellow-400', bar: '[&>div]:bg-yellow-500', badge: 'warning' }
  return { text: 'text-emerald-400', bar: '[&>div]:bg-emerald-500', badge: 'ok' }
}

// Format currency
export const formatCost = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

// Format change %
export const formatChange = (pct: number) => ({
  label: `${pct > 0 ? '+' : ''}${pct.toFixed(1)}%`,
  className: pct > 0 ? 'text-red-400' : 'text-emerald-400'  // cost up = bad (red)
})

// Provider badge variant
export const getProviderVariant = (provider: string) =>
  ({ AWS: 'aws', GCP: 'gcp', Azure: 'azure' })[provider] ?? 'outline'
```

---

## DO / DON'T

### DO
✅ Use shadcn components as base — extend via `className` or `cva` variants
✅ Use `cn()` from shadcn for all conditional class merging
✅ Override shadcn CSS variables in `globals.css` — never fight the system
✅ `font-display` (Syne) for all headers and big numbers
✅ `font-mono` (IBM Plex Mono) for all data, $$ values, %
✅ `<Badge variant="critical">` with pulse animation for critical alerts
✅ `<Skeleton>` for all async/loading states
✅ Recharts inside shadcn `<Card>` for all charts
✅ `<Sheet>` for notification drawer, `<Dialog>` for modals

### DON'T
❌ Don't rewrite shadcn component internals — use variants or className
❌ Don't use Inter (shadcn default) — always set DM Sans + Syne + IBM Plex Mono
❌ Don't use inline `style={{}}` — use Tailwind utilities or CSS variables
❌ Don't use purple gradients — primary is teal `#00D4A0`
❌ Don't hardcode hex colors — use `finops-*` Tailwind tokens or CSS variables
❌ Don't skip `<Skeleton>` on any component that fetches data
❌ Don't use pure black `#000` or pure white `#FFF`
❌ Don't create custom modal/drawer — use shadcn `<Dialog>` / `<Sheet>`
