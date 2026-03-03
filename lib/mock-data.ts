export const mockKpis: Array<{
    label: string;
    value: string | number;
    change: number | null;
    status: 'ok' | 'warning' | 'bad' | 'info';
    percentage: number;
    unit: string;
}> = [
        { label: 'Total Visits', value: '1.2M', change: 12.4, status: 'ok', percentage: 78, unit: 'users' },
        { label: 'Revenue Location', value: '$84,320', change: 4.1, status: 'warning', percentage: 42, unit: '$' },
        { label: 'Active Users', value: '3,124', change: -2.1, status: 'bad', percentage: 91, unit: 'count' },
        { label: 'MTD Growth', value: '18.4%', change: 7.2, status: 'info', percentage: 65, unit: '%' }
    ];

export const mockChartDataMonth = [
    { day: '1', visits: 220, revenue: 160 },
    { day: '5', visits: 180, revenue: 210 },
    { day: '10', visits: 240, revenue: 190 },
    { day: '15', visits: 210, revenue: 260 },
    { day: '20', visits: 190, revenue: 230 },
    { day: '25', visits: 250, revenue: 180 },
    { day: '30', visits: 230, revenue: 240 },
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

export const mockLocationData = [
    { name: 'USA', value: 60, color: '#FF0080' },
    { name: 'Europe', value: 32, color: '#00C8FF' },
    { name: 'Asia', value: 8, color: '#FFD700' },
];

export const mockMostPopular = [
    { name: 'Practical tips for cloud scale...', views: '21,458' },
    { name: 'Steps to build your personal brand...', views: '17,489' },
    { name: 'Designing UX for FinOps 3.0...', views: '13,491' },
    { name: 'Cloud optimization strategies 2026...', views: '11,200' },
];

export const mockStatistics = [
    { label: 'Subscribers', value: '14,855', change: '+219', color: 'text-neon-pink' },
    { label: 'Views', value: '211,348', change: '+978', color: 'text-neon-blue' },
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
