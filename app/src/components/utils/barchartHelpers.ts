import * as d3 from 'd3';
import { ChartData } from '../../data/interfaces/BarchartProps';

export function initializeSvg(
    ref: React.RefObject<SVGSVGElement>,
    width: number,
    height: number
): d3.Selection<SVGGElement, unknown, null, undefined> {
    const svg = d3
        .select(ref.current)
        .attr('width', width)
        .attr('height', height);

    svg.selectAll('*').remove();

    return svg.append('g');
}

export function createXAxisScale(
    data: ChartData[],
    width: number,
    margin: { top: number; right: number; bottom: number; left: number }
): d3.ScaleBand<string> {
    return d3
        .scaleBand()
        .domain(data.map((dataItem) => dataItem.xAxisValue))
        .range([margin.left, width - margin.right])
        .padding(0.1);
}

export function createYAxisScale(
    data: ChartData[],
    height: number,
    margin: { top: number; right: number; bottom: number; left: number }
): d3.ScaleLinear<number, number> {
    return d3
        .scaleLinear()
        .domain([0, d3.max(data, (dataItem) => dataItem.value) ?? 0])
        .nice()
        .range([height - margin.bottom, margin.top]);
}

export function calculateMedian(
    data: ChartData[],
    showMedian: boolean
): number | null {
    return showMedian
        ? (d3.median(data, (dataItem) => dataItem.value) ?? null)
        : null;
}

export function renderBars(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    data: ChartData[],
    xAxisScale: d3.ScaleBand<string>,
    yAxisScale: d3.ScaleLinear<number, number>,
    barColor: string,
    height: number,
    margin: { top: number; right: number; bottom: number; left: number }
): void {
    const barRectElements = chartSvg
        .selectAll<SVGRectElement, ChartData>('rect')
        .data(data, (dataItem: ChartData) => dataItem.xAxisValue);

    barRectElements
        .enter()
        .append('rect')
        .merge(barRectElements)
        .attr('x', (dataItem) => xAxisScale(dataItem.xAxisValue) ?? 0)
        .attr('y', (dataItem) => yAxisScale(dataItem.value) ?? height)
        .attr('width', xAxisScale.bandwidth())
        .attr('height', (dataItem) => {
            const yPos = yAxisScale(dataItem.value);
            return yPos !== undefined ? height - margin.bottom - yPos : 0;
        })
        .attr('fill', barColor);

    barRectElements.exit().remove();
}

export function renderXAxis(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    xAxisScale: d3.ScaleBand<string>,
    height: number,
    margin: { top: number; right: number; bottom: number; left: number }
): void {
    const xAxisGroup = chartSvg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xAxisScale).tickSize(0))
        .attr('class', 'x-axis');

    xAxisGroup
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .attr('text-anchor', 'end')
        .attr('dx', '-0.8em')
        .attr('dy', '0.15em');
}

export function renderYAxis(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    yAxisScale: d3.ScaleLinear<number, number>,
    margin: { top: number; right: number; bottom: number; left: number }
): void {
    chartSvg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yAxisScale))
        .attr('class', 'y-axis');
}

export function renderLabels(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    width: number,
    height: number,
    margin: { top: number; right: number; bottom: number; left: number },
    xLabel: string,
    yLabel: string,
    title: string
): void {
    chartSvg
        .append('text')
        .attr(
            'transform',
            `translate(${width / 2},${height - margin.bottom / 4})`
        )
        .style('text-anchor', 'middle')
        .text(xLabel)
        .attr('class', 'x-axis-label');

    chartSvg
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -(height - margin.bottom) / 2)
        .attr('y', margin.left / 4)
        .style('text-anchor', 'middle')
        .text(yLabel)
        .attr('class', 'y-axis-label');

    chartSvg
        .append('text')
        .attr('x', width / 2)
        .attr('y', margin.top / 2)
        .style('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(title)
        .attr('class', 'chart-title');
}

export function renderMedianLine(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    median: number,
    yAxisScale: d3.ScaleLinear<number, number>,
    width: number,
    margin: { top: number; right: number; bottom: number; left: number },
    medianLineColor: string,
    medianLineDash: string
): void {
    chartSvg
        .append('line')
        .attr('x1', margin.left)
        .attr('x2', width - margin.right)
        .attr('y1', yAxisScale(median))
        .attr('y2', yAxisScale(median))
        .attr('stroke', medianLineColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', medianLineDash)
        .attr('class', 'median-line');
}

export function renderLegend(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    width: number,
    margin: { top: number; right: number; bottom: number; left: number },
    medianLineColor: string,
    medianLineDash: string
): void {
    const legendGroup = chartSvg
        .append('g')
        .attr(
            'transform',
            `translate(${width - margin.right + 20},${margin.top})`
        );

    legendGroup
        .append('rect')
        .attr('x', -10)
        .attr('y', -10)
        .attr('width', 120)
        .attr('height', 30)
        .attr('fill', '#f9f9f9')
        .attr('stroke', '#000000')
        .attr('stroke-width', 1);

    legendGroup
        .append('line')
        .attr('x1', 0)
        .attr('x2', 40)
        .attr('y1', 5)
        .attr('y2', 5)
        .attr('stroke', medianLineColor)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', medianLineDash);

    legendGroup
        .append('text')
        .attr('x', 50)
        .attr('y', 5)
        .text('Median')
        .style('font-size', '14px')
        .attr('alignment-baseline', 'middle');
}
