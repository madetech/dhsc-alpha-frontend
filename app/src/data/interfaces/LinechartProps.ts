export interface LinechartData {
    x: number | Date;
    y: number;
}

export interface LinechartProps {
    data: LinechartData[];
    width?: number;
    height?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    xLabel: string;
    yLabel: string;
    lineColor?: string;
    pointColor?: string;
    pointRadius?: number;
    title?: string;
}
