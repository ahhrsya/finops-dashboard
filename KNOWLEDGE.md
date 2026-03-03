# Knowledge Base — FinOps Dashboard

## Domain Context

### What is FinOps?
FinOps = Financial Operations for cloud. It's the practice of bringing financial accountability to the variable-spend model of cloud. Teams use FinOps tools to:
- Track spend in real-time (not just monthly invoices)
- Allocate costs to teams/products
- Set budget caps with alerts
- Detect anomalies (unexpected cost spikes)
- Forecast next month's bill

### Key Terminology
| Term | Meaning |
|---|---|
| MTD | Month-to-Date — total spend since the 1st of the month |
| Budget Cap | Maximum allowed spend for a service/team |
| Anomaly | A spend pattern that deviates significantly from baseline |
| Threshold | A defined limit that triggers an alert |
| Rightsizing | Reducing oversized cloud resources to save cost |
| Showback | Reporting costs to teams without charging them |
| Chargeback | Actually billing internal teams for their cloud usage |
| Reserved Instance | Pre-purchased cloud capacity at discount |

### Cloud Providers in Scope
- **AWS** — primary (EC2, S3, Lambda, RDS, CloudFront, EKS)
- **GCP** — secondary (Compute Engine, Cloud Storage, BigQuery)
- **Azure** — tertiary (VMs, Blob Storage, AKS)

---

## Data Model (UI Mock Data)

### KPI Cards
```
MTD Spend:     $84,320
Budget:        $118,500 (total monthly cap)
Budget Used:   71.1%
Active Alerts: 3 Critical, 5 Warning
MoM Change:    +12.4% ($9,340 more than last month)
Forecast:      $102,800 (projected end of month)
```

### Top Services by Cost (This Month)
```
EC2 Instances    $38,200   45.3%   ↑ +18%  ⚠ SPIKE
S3 Storage       $14,100   16.7%   → stable
RDS Database     $12,400   14.7%   → stable
Lambda           $9,800    11.6%   ↑ +34%  ⚠ SPIKE
CloudFront       $6,200     7.4%   → stable
Other            $3,620     4.3%   → stable
```

### Active Alerts
```
CRITICAL — EC2 (us-east-1): +340% spike detected at 14:32 UTC
           Est. overage: +$12,400 if sustained
           
CRITICAL — Lambda (eu-west-1): Budget 89% consumed (Day 14/28)
           Est. overage: +$2,100

CRITICAL — S3 Transfer: Anomaly pattern — 847GB unexpected egress
           Est. overage: +$890

WARNING  — RDS: Trending +15% above baseline
WARNING  — EKS cluster: Cost per pod increased 22%
WARNING  — CloudFront: Bandwidth 73% of monthly cap
WARNING  — ElastiCache: Reserved instance expiring in 3 days
WARNING  — Redshift: Query costs +45% this week
```

### 7-Day Cost Trend (Chart Data)
```
Day 1 (Feb 8):  $2,840  normal
Day 2 (Feb 9):  $2,910  normal
Day 3 (Feb 10): $2,780  normal
Day 4 (Feb 11): $2,950  normal
Day 5 (Feb 12): $2,820  normal
Day 6 (Feb 13): $6,340  ← ANOMALY (EC2 spike)
Day 7 (Feb 14): $5,890  ← still elevated
```

---

## UI Patterns & Conventions

### Severity Colors
- 🟢 **Green** `#00D4A0` — Safe / Normal / Under budget
- 🟡 **Yellow** `#FFB547` — Warning / Approaching limit (70–89%)
- 🔴 **Red** `#FF4040` — Critical / Over limit / Anomaly detected
- 🔵 **Blue** `#4D9FFF` — Info / Neutral data / Historical

### Alert Badge Format
```
[SEVERITY] SERVICE_NAME: Short description
Est. impact: $X,XXX
Detected: X minutes/hours ago
```

### Budget Progress Bar States
- 0–69%:  Green fill
- 70–89%: Yellow fill  
- 90%+:   Red fill + pulsing animation

### Number Formatting
- Costs: `$XX,XXX` (USD, no decimals for large amounts)
- Percentages: `XX.X%`
- Changes: `+X.X%` (green) or `-X.X%` (green, cost reduction is good)
- Time: UTC for technical users

---

## Competitive Landscape

| Tool | Strength | Design Weakness |
|---|---|---|
| AWS Cost Explorer | Native integration | Dated UI, hard to scan |
| CloudZero | Good anomaly detection | Cluttered interface |
| Apptio Cloudability | Enterprise features | Very complex, overwhelming |
| Grafana (custom) | Flexible | Requires setup, not turnkey |

**Design opportunity:** None of these look like a modern B2B SaaS product. They all feel like IT tools from 2015. A polished, dark-mode FinOps dashboard stands out immediately.

---

## Inspirations

- **Datadog** — Alert state design, severity color system
- **Grafana** — Dense data layouts, dark mode charts
- **Linear** — Sidebar nav, dark UI refinement, typography
- **Vercel Dashboard** — Clean B2B energy, metric cards
- **Bloomberg Terminal** — Data density, trust through information
