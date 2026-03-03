export const mockKpis: Array<{
    label: string;
    value: string | number;
    change: number | null;
    status: 'ok' | 'warning' | 'bad' | 'info';
    percentage: number;
    unit: string;
}> = [
        { label: 'Forecasted MTD Spend', value: '84,320', change: 12.4, status: 'bad', percentage: 71, unit: '$' },
        { label: 'Budget Utilization', value: '92', change: 4.1, status: 'warning', percentage: 92, unit: '%' },
        { label: 'Active Anomalies', value: '3', change: null, status: 'bad', percentage: 100, unit: 'count' },
        { label: 'Optimization Score', value: '88', change: 7.2, status: 'ok', percentage: 88, unit: 'score' }
    ];

export const mockChartData = [
    { day: 'Feb 21', cost: 2840, baseline: 2800 },
    { day: 'Feb 22', cost: 2910, baseline: 2800 },
    { day: 'Feb 23', cost: 2780, baseline: 2800 },
    { day: 'Feb 24', cost: 3150, baseline: 2800 },
    { day: 'Feb 25', cost: 3320, baseline: 2800 },
    { day: 'Feb 26', cost: 6340, baseline: 2800, anomaly: true },
    { day: 'Feb 27', cost: 5890, baseline: 2800, anomaly: true },
    { day: 'Feb 28', cost: 3120, baseline: 2800 },
];

export const mockAlerts = [
    { id: '1', severity: 'critical', service: 'EC2', provider: 'AWS', region: 'us-east-1', description: 'Cross-AZ Data Spike', impact: 12400, detected: '2m ago' },
    { id: '2', severity: 'critical', service: 'EKS', provider: 'AWS', region: 'eu-west-1', description: 'Node Provisioning Surge', impact: 2100, detected: '14m ago' },
    { id: '3', severity: 'warning', service: 'S3', provider: 'AWS', region: 'Global', description: 'Standard Storage Growth', impact: 420, detected: '1h ago' },
];

export const mockServiceBreakdown = [
    { service: 'Cloud Compute', provider: 'AWS', cost: 38200, pct: 45.3, change: 18, budget: 40000 },
    { service: 'Database Services', provider: 'AWS', cost: 21100, pct: 16.7, change: 2, budget: 20000 },
    { service: 'Object Storage', provider: 'AWS', cost: 12400, pct: 14.7, change: 4, budget: 15000 },
    { service: 'Serverless Functions', provider: 'AWS', cost: 9800, pct: 11.6, change: 34, budget: 11000 },
    { service: 'Container Orchestration', provider: 'AWS', cost: 6200, pct: 7.4, change: 1, budget: 10000 }
];

// Fallback for older components that might still reference these
export const mockChartDataMonth = mockChartData;
export const mockLocationData = [];
export const mockMostPopular = [];
export const mockStatistics = [];
