import * as d3 from 'd3';
import { LinechartData } from '../../../data/interfaces/LinechartProps';

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
    data: LinechartData[],
    width: number,
    margin: { top: number; right: number; bottom: number; left: number }
): d3.ScaleTime<number, number> {
    const xExtent = d3.extent(data, (dataItem) => dataItem.x as Date);
    return d3
        .scaleTime()
        .domain(xExtent as [Date, Date])
        .range([margin.left, width - margin.right]);
}

export function createYAxisScale(
    data: LinechartData[],
    height: number,
    margin: { top: number; right: number; bottom: number; left: number }
): d3.ScaleLinear<number, number> {
    return d3
        .scaleLinear()
        .domain([0, d3.max(data, (dataItem) => dataItem.y) ?? 0])
        .nice()
        .range([height - margin.bottom, margin.top]);
}

export function renderLine(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    data: LinechartData[],
    xAxisScale: d3.ScaleTime<number, number>,
    yAxisScale: d3.ScaleLinear<number, number>,
    lineColor: string
): void {
    const lineGenerator = d3
        .line<LinechartData>()
        .x((d) => xAxisScale(d.x as Date))
        .y((d) => yAxisScale(d.y));

    chartSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', lineColor)
        .attr('stroke-width', 2)
        .attr('d', lineGenerator);
}

export function renderPoints(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    data: LinechartData[],
    xAxisScale: d3.ScaleTime<number, number>,
    yAxisScale: d3.ScaleLinear<number, number>,
    pointColor: string,
    pointRadius: number
): void {
    chartSvg
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d) => xAxisScale(d.x as Date))
        .attr('cy', (d) => yAxisScale(d.y))
        .attr('r', pointRadius)
        .attr('fill', pointColor);
}

export function renderXAxis(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    xAxisScale: d3.ScaleTime<number, number>,
    height: number,
    width: number,
    margin: { top: number; right: number; bottom: number; left: number },
    xLabel: string
): void {
    const xAxis = d3.axisBottom(xAxisScale);

    chartSvg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(xAxis)
        .attr('class', 'x-axis');

    chartSvg
        .append('text')
        .attr('x', (margin.left + width - margin.right) / 2)
        .attr('y', height - margin.bottom / 4)
        .style('text-anchor', 'middle')
        .text(xLabel)
        .attr('class', 'x-axis-label');
}

export function renderYAxis(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    yAxisScale: d3.ScaleLinear<number, number>,
    height: number,
    margin: { top: number; right: number; bottom: number; left: number },
    yLabel: string
): void {
    const yAxis = d3.axisLeft(yAxisScale);

    chartSvg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis)
        .attr('class', 'y-axis');

    chartSvg
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -(margin.top + height - margin.bottom) / 2)
        .attr('y', margin.left / 4)
        .style('text-anchor', 'middle')
        .text(yLabel)
        .attr('class', 'y-axis-label');
}

export function renderTitle(
    chartSvg: d3.Selection<SVGGElement, unknown, null, undefined>,
    width: number,
    margin: { top: number; right: number; bottom: number; left: number },
    title: string
): void {
    chartSvg
        .append('text')
        .attr('x', (margin.left + width - margin.right) / 2)
        .attr('y', margin.top / 2)
        .style('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(title)
        .attr('class', 'chart-title');
}
