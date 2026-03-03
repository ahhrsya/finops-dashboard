// Shared chart config
export const chartConfig = {
    cartesianGrid: {
        strokeDasharray: "3 3",
        stroke: "rgba(255,255,255,0.04)"
    },
    xAxis: {
        tick: { fill: '#6B7280', fontSize: 10, fontFamily: 'var(--font-ibm-plex-mono)' },
        axisLine: { stroke: '#1E2330' },
        tickLine: false,
    },
    yAxis: {
        tick: { fill: '#6B7280', fontSize: 10, fontFamily: 'var(--font-ibm-plex-mono)' },
        axisLine: false,
        tickLine: false,
    },
    tooltip: {
        contentStyle: {
            background: '#161A22',
            border: '1px solid #1E2330',
            borderRadius: 8,
            fontFamily: 'var(--font-ibm-plex-mono)',
            fontSize: 11,
        }
    },
    colors: {
        normal: '#4D9FFF',
        anomaly: '#FF4040',
        baseline: '#3A4050',
        ec2: '#00D4A0',
        lambda: '#FF8C00',
        s3: '#4D9FFF',
        rds: '#FFB547',
        other: '#6B7280',
        aws: '#FF9900',
        gcp: '#4285F4',
        azure: '#0078D4',
    }
}
