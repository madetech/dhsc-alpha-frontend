import { ASCOFData } from './ASCOFData';

export interface BarchartProps {
    data: ASCOFData[];
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
    onBarClick?: (data: ASCOFData) => void;
}
