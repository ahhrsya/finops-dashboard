export const mockKpis: Array<{
    label: string;
    value: string | number;
    change: number | null;
    status: 'ok' | 'warning' | 'bad' | 'info';
    percentage: number;
    unit: string;
}> = [
        { label: 'Cloud MTD Spend', value: '84,320', change: 12.4, status: 'bad', percentage: 71, unit: '$' },
        { label: 'Forecasted End', value: '112,000', change: 4.1, status: 'warning', percentage: 92, unit: '$' },
        { label: 'Active Anomalies', value: '3', change: -2.1, status: 'bad', percentage: 100, unit: 'count' },
        { label: 'Optimization Score', value: '88', change: 7.2, status: 'ok', percentage: 88, unit: 'score' }
    ];

export const mockChartData = [
    { day: '01 Feb', cost: 2840, baseline: 2800 },
    { day: '02 Feb', cost: 2910, baseline: 2800 },
    { day: '03 Feb', cost: 2780, baseline: 2800 },
    { day: '04 Feb', cost: 2950, baseline: 2800 },
    { day: '05 Feb', cost: 2820, baseline: 2800 },
    { day: '06 Feb', cost: 6340, baseline: 2800, anomaly: true },
    { day: '07 Feb', cost: 5890, baseline: 2800, anomaly: true },
    { day: '08 Feb', cost: 3120, baseline: 2800 },
    { day: '09 Feb', cost: 3050, baseline: 2800 },
    { day: '10 Feb', cost: 2980, baseline: 2800 },
];

export const mockAlerts = [
    { id: '1', severity: 'critical', service: 'EC2', provider: 'AWS', region: 'us-east-1', description: 'Cross-AZ Data Spike', impact: 12400, detected: '2m ago' },
    { id: '2', severity: 'critical', service: 'Lambda', provider: 'AWS', region: 'eu-west-1', description: 'Execution Timeout Spike', impact: 2100, detected: '14m ago' },
    { id: '3', severity: 'warning', service: 'S3', provider: 'AWS', region: 'Global', description: 'Unusual GET requests', impact: 890, detected: '1h ago' },
];

export const mockServiceBreakdown = [
    { service: 'EC2', provider: 'AWS', cost: 38200, pct: 45.3, change: 18, budget: 40000 },
    { service: 'S3', provider: 'AWS', cost: 14100, pct: 16.7, change: 2, budget: 20000 },
    { service: 'RDS', provider: 'AWS', cost: 12400, pct: 14.7, change: 4, budget: 15000 },
    { service: 'Lambda', provider: 'AWS', cost: 9800, pct: 11.6, change: 34, budget: 11000 },
    { service: 'EKS', provider: 'AWS', cost: 6200, pct: 7.4, change: 1, budget: 10000 }
];
