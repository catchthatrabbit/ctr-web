import * as d3 from "d3";
import { useEffect, useRef, ReactNode } from "react";
import styles from "./styles.module.css";

interface IRadialBarChartProps {
  data: Array<{
    time: string;
    value: number;
    hour: string;
  }>;
  emptyComponent: ReactNode;
}

const RadialBarChart = ({
  data = null,
  emptyComponent,
}: IRadialBarChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      updateChart();
    }
  }, [data]);

  const updateChart = () => {
    if (!data) {
      return;
    }

    // Clear any existing chart
    d3.select(chartRef.current).selectAll("*").remove();

    // Declare the chart dimensions and margins.
    const width = 1185;
    const height = 412; // Increased by 50px to accommodate the space above the chart
    const marginTop = 80; // Increased by 50px to accommodate the space above the chart
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 70;

    // Declare the x (horizontal position) scale.
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.hour)) // Use 'hour' for the x-axis
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    // Declare the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)]) // Use 'value' for the y-axis
      .range([height - marginBottom, marginTop]);

    const formatValue = d3.format(".2s"); // Format values in millions with 2 decimal places

    // Create the SVG container.
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Add the title text element
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20) // Position the text 20px from the top
      .attr("fill", "rgba(128, 128, 128, 1)") // Set the text color using the fill attribute
      .attr("text-anchor", "middle")
      .attr("style", "font-size: 16px;") // Set the font size using the style attribute
      .text("Pool Hash Rate — Last 24H");

    // Create the tooltip element
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .attr(
        "style",
        "position: absolute; opacity: 0; background-color: #424259; color: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px; pointer-events: none; z-index: 33",
      );

    const onMouseover = (event, datum) => {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
        .text(
          `Time: ${datum.time}\nAverage Hash Rate: ${d3.format(".2s")(datum.value)}`,
        );
    };

    const onMousemove = (event) => {
      tooltip
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`);
    };

    const onMouseout = () => {
      tooltip.transition().duration(200).style("opacity", 0);
    };

    // Add grid lines for the y-axis
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width + marginLeft + marginRight) // Extend grid lines across the chart
          .tickFormat("") // Remove the tick labels
          .tickValues(y.ticks().slice(1)), // Exclude the bottom-most tick
      )
      .call((g) => g.select(".domain").remove()) // Remove the axis line
      .selectAll(".tick line")
      .attr("stroke-dasharray", "8,8") // Apply dashed style to grid lines
      .attr("stroke", "rgba(54, 54, 54, 1)"); // Set the color of the grid lines

    // Add a rect for each bar with animation.
    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.hour))
      .attr("x", (d) => x(d.hour) + 13) // Add 8px space from the y-axis
      .attr("y", height - marginBottom) // Start 8px from the bottom
      .attr("height", 0) // Start with height 0
      .attr("width", 16)
      .attr("rx", 4) // Add horizontal radius
      .attr("ry", 4) // Add vertical radius
      .on("mouseover", onMouseover)
      .on("mousemove", onMousemove)
      .on("mouseout", onMouseout)
      .transition() // Add transition for animation
      .duration(800)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value) - 8);

    // Add the x-axis and label.
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSize(0).tickSizeOuter(0)); // Set the tick size to 0 to remove the ticks

    svg
      .selectAll(".x-axis text")
      .style("fill", "rgba(128, 128, 128, 1)")
      .style("font-size", "16px")
      .attr("transform", "translate(0, 8)"); // Move the text 10px to the left

    // Add the y-axis and label, and remove the domain line.
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickSize(0)
          .tickFormat((d) => (d === 0 ? "" : formatValue(d).replace("M", "M"))),
      )
      .call((g) => g.select(".domain").remove());

    svg
      .selectAll(".y-axis text")
      .style("fill", "rgba(128, 128, 128, 1)")
      .style("font-size", "16px")
      .attr("transform", "translate(-10,0)"); // Move the text 10px to the left

    svg.selectAll(".domain").style("stroke", "rgba(128, 128, 128, 1)"); // Change the color of the axis lines
  };

  return data ? (
    <div id="chart-container" ref={chartRef} className={styles.radialChart} />
  ) : (
    <div className={styles.emptySkeleton}>{emptyComponent}</div>
  );
};

export default RadialBarChart;
