export const mockKpis = [
    { label: 'MTD Spend', value: 84320, change: 12.4, status: 'bad' },
    { label: 'Active Alerts', value: '3 Critical', change: null, status: 'bad' },
    { label: 'Budget Used', value: 71.1, unit: '%', change: null, status: 'warning' },
    { label: 'MoM Change', value: 12.4, unit: '%', change: null, status: 'bad' }
];

export const mockAlerts = [
    { id: '1', severity: 'critical', service: 'EC2', provider: 'AWS', region: 'us-east-1', description: '+340% spike us-east-1', impact: 12400, detected: '2m', status: 'Open' },
    { id: '2', severity: 'critical', service: 'Lambda', provider: 'AWS', region: 'eu-west-1', description: '89% budget eu-west-1', impact: 2100, detected: '14m', status: 'Open' },
    { id: '3', severity: 'critical', service: 'S3', provider: 'AWS', description: 'Egress anomaly 847GB', impact: 890, detected: '1h', status: 'Open' },
    { id: '4', severity: 'warning', service: 'RDS', provider: 'AWS', description: '+15% above baseline', impact: 1200, detected: '3h', status: 'Open' },
    { id: '5', severity: 'warning', service: 'EKS', provider: 'AWS', description: 'Cost per pod +22%', impact: 780, detected: '5h', status: 'Open' },
];

export const mockServiceBreakdown = [
    { service: 'EC2', provider: 'AWS', cost: 38200, pct: 45.3, change: 18, budget: 40000, trend: 'up' },
    { service: 'S3', provider: 'AWS', cost: 14100, pct: 16.7, change: 2, budget: 20000, trend: 'stable' },
    { service: 'RDS', provider: 'AWS', cost: 12400, pct: 14.7, change: 4, budget: 15000, trend: 'stable' },
    { service: 'Lambda', provider: 'AWS', cost: 9800, pct: 11.6, change: 34, budget: 11000, trend: 'up' },
    { service: 'CloudFront', provider: 'AWS', cost: 6200, pct: 7.4, change: 1, budget: 10000, trend: 'stable' }
];

export const mockChartData = [
    { day: 'Feb 8', cost: 2840, baseline: 2800 },
    { day: 'Feb 9', cost: 2910, baseline: 2800 },
    { day: 'Feb 10', cost: 2780, baseline: 2800 },
    { day: 'Feb 11', cost: 2950, baseline: 2800 },
    { day: 'Feb 12', cost: 2820, baseline: 2800 },
    { day: 'Feb 13', cost: 6340, baseline: 2800, anomaly: true },
    { day: 'Feb 14', cost: 5890, baseline: 2800, anomaly: true }
];
