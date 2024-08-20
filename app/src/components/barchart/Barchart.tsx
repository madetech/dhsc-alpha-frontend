import React, { useEffect, useRef, useState } from 'react';
import { BarchartProps } from '../../data/interfaces/BarchartProps';
import * as GovUK from 'govuk-react';
import {
    initializeSvg,
    createXAxisScale,
    createYAxisScale,
    calculateMedian,
    renderBars,
    renderXAxis,
    renderYAxis,
    renderLabels,
    renderMedianLine,
    renderLegend,
} from '../utils/charts/barchartHelpers';
import DownloadToCsv from '../downloadToCsv/DownloadToCsv';

const Barchart: React.FC<BarchartProps> = ({
    data,
    width = 1000,
    height = 400,
    margin = { top: 30, right: 150, bottom: 120, left: 80 },
    xLabel,
    yLabel,
    barColor = '#5f0f40',
    medianLineColor = '#808000',
    medianLineDash = '5,5',
    title = 'Barchart',
    showMedian = true,
    showLegend = true,
}) => {
    const [showAsTable, setShowAsTable] = useState(false);
    const toggleShowAsTable = () => setShowAsTable(!showAsTable);
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!data.length) return;

        const chartSvg = initializeSvg(ref, width, height);
        const xAxisScale = createXAxisScale(data, width, margin);
        const yAxisScale = createYAxisScale(data, height, margin);
        const median = calculateMedian(data, showMedian);

        renderBars(
            chartSvg,
            data,
            xAxisScale,
            yAxisScale,
            barColor,
            height,
            margin
        );

        renderXAxis(chartSvg, xAxisScale, height, margin);
        renderYAxis(chartSvg, yAxisScale, margin);
        renderLabels(chartSvg, width, height, margin, xLabel, yLabel, title);

        if (showMedian && median !== null) {
            renderMedianLine(
                chartSvg,
                median,
                yAxisScale,
                width,
                margin,
                medianLineColor,
                medianLineDash
            );
        }

        if (showLegend) {
            renderLegend(
                chartSvg,
                width,
                margin,
                medianLineColor,
                medianLineDash
            );
        }
    }, [
        data,
        width,
        height,
        margin,
        xLabel,
        yLabel,
        barColor,
        medianLineColor,
        medianLineDash,
        title,
        showMedian,
        showLegend,
    ]);

    return (
        <>
            <GovUK.Button onClick={toggleShowAsTable} buttonColour="#1d70b8">
                {!showAsTable ? 'View As Table' : 'View As Graph'}
            </GovUK.Button>
            <div role="img" aria-labelledby="barchart-title barchart-desc">
                {!showAsTable ? (
                    <svg ref={ref}>
                        <title id="barchart-title">{title}</title>
                        <desc id="barchart-desc">
                            A bar chart showing {title}. The x-axis represents{' '}
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
                                        {dataItem.xAxisValue}
                                    </GovUK.Table.Cell>
                                    <GovUK.Table.Cell>
                                        {dataItem.value}
                                    </GovUK.Table.Cell>
                                </GovUK.Table.Row>
                            ))}
                        </GovUK.Table>
                    </div>
                )}
                <DownloadToCsv data={data} filename={title} xLabel={xLabel}>
                    <GovUK.Button buttonColour="#1d70b8">
                        Download To Csv
                    </GovUK.Button>
                </DownloadToCsv>
            </div>
        </>
    );
};

export default Barchart;
