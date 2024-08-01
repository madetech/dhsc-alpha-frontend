import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ASCOFData } from '../../data/interfaces/ASCOFData';
import { BarchartProps } from '../../data/interfaces/BarchartProps';

const Barchart: React.FC<BarchartProps> = ({
    data,
    width = 1000,
    height = 400,
    margin = { top: 30, right: 150, bottom: 120, left: 80 },
    xKey,
    yKey,
    xLabel,
    yLabel,
    barColor = '#5f0f40',
    medianLineColor = '#808000',
    medianLineDash = '5,5',
    title = 'Barchart',
    showMedian = true,
    onBarClick,
}) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!data.length) return;

        d3.select(ref.current).selectAll('*').remove();

        const svg = d3
            .select(ref.current)
            .attr('width', width)
            .attr('height', height);

        const median = showMedian
            ? d3.median(data, (d) => d[yKey as keyof ASCOFData] as number)!
            : null;

        const x = d3
            .scaleBand()
            .domain(data.map((d) => d[xKey as keyof ASCOFData] as string))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(data, (d) => d[yKey as keyof ASCOFData] as number)!,
            ])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const bars = svg
            .selectAll<SVGRectElement, ASCOFData>('rect')
            .data(data, (d: ASCOFData) => d[xKey as keyof ASCOFData] as string);

        bars.enter()
            .append('rect')
            .merge(bars)
            .attr('x', (d) => x(d[xKey as keyof ASCOFData] as string)!)
            .attr('y', (d) => y(d[yKey as keyof ASCOFData] as number)!)
            .attr('width', x.bandwidth())
            .attr(
                'height',
                (d) =>
                    height -
                    margin.bottom -
                    y(d[yKey as keyof ASCOFData] as number)!
            )
            .attr('fill', barColor)
            .on('click', (event, d) => {
                if (onBarClick) {
                    onBarClick(d);
                }
            });

        bars.exit().remove();

        const xAxisGroup = svg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSize(0))
            .attr('class', 'x-axis');

        xAxisGroup
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .attr('text-anchor', 'end')
            .attr('dx', '-0.8em')
            .attr('dy', '0.15em');

        const yAxisGroup = svg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .attr('class', 'y-axis');

        svg.append('text')
            .attr(
                'transform',
                `translate(${width / 2},${height - margin.bottom / 4})`
            )
            .style('text-anchor', 'middle')
            .text(xLabel)
            .attr('class', 'x-axis-label');

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -(height - margin.bottom) / 2)
            .attr('y', margin.left / 4)
            .style('text-anchor', 'middle')
            .text(yLabel)
            .attr('class', 'y-axis-label');

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .style('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('font-weight', 'bold')
            .text(title)
            .attr('class', 'chart-title');

        if (showMedian && median !== null) {
            svg.append('line')
                .attr('x1', margin.left)
                .attr('x2', width - margin.right)
                .attr('y1', y(median))
                .attr('y2', y(median))
                .attr('stroke', medianLineColor)
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', medianLineDash)
                .attr('class', 'median-line');
        }
    }, [
        data,
        width,
        height,
        margin,
        xKey,
        yKey,
        xLabel,
        yLabel,
        barColor,
        medianLineColor,
        medianLineDash,
        title,
        showMedian,
        onBarClick,
    ]);

    return <svg ref={ref}></svg>;
};

export default Barchart;
