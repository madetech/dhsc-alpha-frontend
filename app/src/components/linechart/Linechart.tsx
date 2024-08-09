import React, { useEffect, useRef, useState } from 'react';
import { LinechartProps } from '../../data/interfaces/LinechartProps';
import * as GovUK from 'govuk-react';
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
    const [showAsTable, setShowAsTable] = useState(false);
    const toggleShowAsTable = () => setShowAsTable(!showAsTable);
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

    return (
        <>
            <GovUK.Button onClick={toggleShowAsTable} buttonColour="#1d70b8">
                {!showAsTable ? 'View As Table' : 'View As Graph'}
            </GovUK.Button>
            <div role="img" aria-labelledby="linechart-title linechart-desc">
                {!showAsTable ? (
                    <svg ref={ref}>
                        <title id="linechart-title">{title}</title>
                        <desc id="linechart-desc">
                            A line chart showing {title}. The x-axis represents
                            {xLabel}, and the y-axis represents {yLabel}.
                        </desc>
                    </svg>
                ) : (
                    <div className="chart-summary">
                        <GovUK.Table
                            caption={title}
                            head={
                                <GovUK.Table.Row>
                                    <GovUK.Table.CellHeader setWidth="three-quarters">
                                        {xLabel}
                                    </GovUK.Table.CellHeader>
                                    <GovUK.Table.CellHeader setWidth="one-quarter">
                                        {yLabel}
                                    </GovUK.Table.CellHeader>
                                </GovUK.Table.Row>
                            }
                        >
                            {data.map((dataItem, index) => (
                                <GovUK.Table.Row key={index}>
                                    <GovUK.Table.Cell>
                                        {dataItem.x instanceof Date
                                            ? dataItem.x.toLocaleDateString()
                                            : dataItem.x.toLocaleString()}
                                    </GovUK.Table.Cell>
                                    <GovUK.Table.Cell>
                                        {dataItem.y}
                                    </GovUK.Table.Cell>
                                </GovUK.Table.Row>
                            ))}
                        </GovUK.Table>
                    </div>
                )}
            </div>
        </>
    );
};

export default LineChart;
