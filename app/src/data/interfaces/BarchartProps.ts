export interface ChartData {
    x_axis_value: string;
    metric: string;
    value: number;
}

export interface BarchartProps {
    data: ChartData[];
    width?: number;
    height?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    xKey: string;
    yKey: string;
    xLabel: string;
    yLabel: string;
    barColor?: string;
    medianLineColor?: string;
    medianLineDash?: string;
    title?: string;
    showMedian?: boolean;
    showLegend?: boolean;
}
