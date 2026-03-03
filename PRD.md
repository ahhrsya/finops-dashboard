# PRD — FinOps Dashboard: Main Dashboard (Dark Mode)

**Product:** FinOps Cost Control Dashboard
**Focus:** App — Cost Alerts, Budget Caps, Anomaly Detection
**Month:** Februari · Week 2
**Shot Theme:** Main Dashboard (Dark Mode)

---

## Overview

A B2B SaaS dashboard for engineering and finance teams to monitor real-time cloud spend across AWS, GCP, and Azure. The core value proposition: detect anomalies and budget overruns **before** they become expensive surprises.

This is a Dribbble shot — the goal is to showcase a **production-grade, visually impressive** UI that communicates the product value instantly.

---

## Problem Statement

Cloud costs are opaque and unpredictable. Teams using AWS/GCP have no unified view of:
- Where money is being spent right now
- Which services are spiking unexpectedly
- When a budget cap is about to be breached

Existing tools (AWS Cost Explorer, CloudZero) are functional but visually poor. There is a design gap in the FinOps space.

---

## Target Users

| Role | Pain Point |
|---|---|
| Platform / SRE Engineers | Need to catch cost spikes before on-call wakes up |
| FinOps Analysts | Need budget visibility across teams and services |
| CTOs / VPs Engineering | Want a single number: are we on track this month? |

---

## Core Features (Scope for This Shot)

### 1. KPI Overview Bar
- **MTD Spend** — total month-to-date cloud cost (e.g. $84,320)
- **Active Alerts** — count of critical/warning alerts
- **Budget Used** — % of monthly budget consumed
- **MoM Change** — % increase/decrease vs last month

### 2. Anomaly Detection Chart
- Time-series line chart (7–30 day range)
- Multi-service overlay (AWS, GCP, Azure)
- Visual anomaly spike highlighted in red/orange
- Threshold line showing expected baseline

### 3. Budget Ring (Donut Chart)
- Budget cap per service (EC2, S3, Lambda, RDS, etc.)
- Color-coded by severity: green (safe) → yellow (warning) → red (critical)
- Center shows total % consumed

### 4. Active Alerts Panel
- List of real-time alerts with severity badge
- Each alert shows: service name, % spike, time detected, estimated overrun $$$
- Quick action: Acknowledge / Snooze / Investigate

### 5. Sidebar Navigation
- Links: Overview, Cost Alerts, Budget Caps, Anomalies, Services, Reports
- Active state clearly visible
- Compact, professional

---

## Out of Scope (For This Shot)
- User authentication / login screens
- Settings / configuration pages
- Multi-cloud account management
- Billing / invoicing

---

## Success Criteria (Dribbble)
- Viewer immediately understands this is a cost monitoring tool
- The anomaly spike creates visual drama and draws the eye
- Feels like a tool engineers would actually trust and use
- Dark mode execution is polished — not just "dark colors"
- Gets saves/likes from B2B SaaS and dashboard design community

---

## Shot Deliverables
1. **Main Dashboard** — full overview (this file's scope)
2. **Cost Alerts UI** — alert detail + anomaly breakdown modal (next shot)
