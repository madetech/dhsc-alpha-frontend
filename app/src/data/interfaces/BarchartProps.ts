export interface ChartData {
    xAxisValue: string;
    metric: string;
    value: number;
}

export interface BarchartProps {
    data: ChartData[];
    width?: number;
    height?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    xLabel: string;
    yLabel: string;
    barColor?: string;
    medianLineColor?: string;
    medianLineDash?: string;
    title?: string;
    showMedian?: boolean;
    showLegend?: boolean;
}
