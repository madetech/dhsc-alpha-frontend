import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BarchartProps, ChartData } from '../../data/interfaces/BarchartProps';

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
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!data.length) return;

        /* 
        This line is crucial for ensuring that the chart is correctly refreshed
        and updated with new data, without retaining any stale elements from previous renders.
        TODO: Could be made into a refresh function to remove useEffect bloat and readability
        */
        d3.select(ref.current).selectAll('*').remove();

        //sets width and height of what will be the barchart svg element
        const chartSvg = d3
            .select(ref.current)
            .attr('width', width)
            .attr('height', height);

        //Calculate the median from the chartData values passed in
        const median = showMedian
            ? d3.median(data, (dataItem) => dataItem.value) ?? null
            : null;

        /*
        Below we create an xAxisScale with an array of all the x axis values
        the length of the x-axis is determined by the range.
        the padding is the space between bars.
        */
        const xAxisScale = d3
            .scaleBand()
            .domain(data.map((dataItem) => dataItem.xAxisValue))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        /*
        This creates the yAxisScale from 0 to the largest value passed in.
        The nice method rounds the domain to nice human readable values
        The length of the y-axis is determined by the range
        */
        const yAxisScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (dataItem) => dataItem.value) ?? 0])
            .nice()
            .range([height - margin.bottom, margin.top]);

        /*
        Enter: When new data items are added, D3 creates new <rect> elements 
        for each new x_axis_value.
        Update: If existing data items change (e.g., the value associated with 
        an x_axis_value changes), D3 updates the corresponding <rect> elements to reflect these changes.
        Exit: If data items are removed (e.g., an x_axis_value is no longer present in the data), D3 removes 
        the corresponding <rect> elements.
        */
        const barRectElements = chartSvg
            .selectAll<SVGRectElement, ChartData>('rect')
            .data(data, (dataItem: ChartData) => dataItem.xAxisValue);

        /*
        create a selection of all the data elements which don't have data points where we then create a rect element 
        for all of these. We then merge this so now they're registered as having a dom element.
        Positions each bar horizontally based on its x_axis_value
        Positions each bar vertically based on its value
        Set bar: width, height and color
        */
        barRectElements
            .enter()
            .append('rect')
            .merge(barRectElements)
            .attr('x', (dataItem) => {
                const xPos = xAxisScale(dataItem.xAxisValue);
                return xPos !== undefined ? xPos : 0; // Default to 0 or handle as needed
            })
            .attr('y', (dataItem) => {
                const yPos = yAxisScale(dataItem.value);
                return yPos !== undefined ? yPos : height; // Default to height (bottom of chart)
            })
            .attr('width', xAxisScale.bandwidth())
            .attr('height', (dataItem) => {
                const yPos = yAxisScale(dataItem.value);
                return yPos !== undefined ? height - margin.bottom - yPos : 0; // Default to 0 height if yPos is undefined
            })
            .attr('fill', barColor);

        // For DOM elements that no longer have corresponding data points, elements are removed.
        barRectElements.exit().remove();

        /*
        adds and positions the x-axis in the bar chart, using D3's built-in axis generators to 
        handle tick placement and labeling.
        */
        const xAxisGroup = chartSvg
            .append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xAxisScale).tickSize(0))
            .attr('class', 'x-axis');

        // improve the readability and visual appeal of chart labels
        xAxisGroup
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .attr('text-anchor', 'end')
            .attr('dx', '-0.8em')
            .attr('dy', '0.15em');

        /*
        adds and positions the y-axis in the bar chart, leveraging D3's axis generation 
        */
        chartSvg
            .append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yAxisScale))
            .attr('class', 'y-axis');

        //adds and positions an x-axis label in the bar chart
        chartSvg
            .append('text')
            .attr(
                'transform',
                `translate(${width / 2},${height - margin.bottom / 4})`
            )
            .style('text-anchor', 'middle')
            .text(xLabel)
            .attr('class', 'x-axis-label');

        //adds and positions an y-axis label in the bar chart
        chartSvg
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -(height - margin.bottom) / 2)
            .attr('y', margin.left / 4)
            .style('text-anchor', 'middle')
            .text(yLabel)
            .attr('class', 'y-axis-label');

        //adds and positions a title in the bar chart
        chartSvg
            .append('text')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .style('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('font-weight', 'bold')
            .text(title)
            .attr('class', 'chart-title');

        //adds and positions a median line
        if (showMedian && median !== null) {
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

        if (showLegend) {
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

    return <svg ref={ref}></svg>;
};

export default Barchart;
