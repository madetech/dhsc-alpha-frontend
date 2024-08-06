import React, { useEffect, useRef } from 'react';
import { LinechartProps } from '../../data/interfaces/LinechartProps';
import {
    initializeSvg,
    createXAxisScale,
    createYAxisScale,
    renderLine,
    renderPoints,
    renderXAxis,
    renderYAxis,
    renderTitle,
} from '../utils/linechartHelpers';

const LineChart: React.FC<LinechartProps> = ({
    data,
    width = 1000,
    height = 400,
    margin = { top: 30, right: 150, bottom: 120, left: 80 },
    xLabel,
    yLabel,
    lineColor = '#5f0f40',
    pointColor = '#5f0f40',
    pointRadius = 3,
    title = 'Line Chart',
}) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!data.length) return;

        const chartSvg = initializeSvg(ref, width, height);
        const xAxisScale = createXAxisScale(data, width, margin);
        const yAxisScale = createYAxisScale(data, height, margin);

        renderLine(chartSvg, data, xAxisScale, yAxisScale, lineColor);
        renderPoints(
            chartSvg,
            data,
            xAxisScale,
            yAxisScale,
            pointColor,
            pointRadius
        );
        renderXAxis(chartSvg, xAxisScale, height, width, margin, xLabel);
        renderYAxis(chartSvg, yAxisScale, height, margin, yLabel);
        renderTitle(chartSvg, width, margin, title);
    }, [
        data,
        width,
        height,
        margin,
        xLabel,
        yLabel,
        lineColor,
        pointColor,
        pointRadius,
        title,
    ]);

    return <svg ref={ref}></svg>;
};

export default LineChart;
