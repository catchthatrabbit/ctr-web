import React from "react";
import * as d3 from "d3";
import { useEffect, useRef, ReactNode } from "react";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";
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
  const { mobile } = useMediaQueries();

  useEffect(() => {
    if (chartRef.current) {
      updateChart();
    }
  }, [data, mobile]);

  const updateChart = () => {
    if (!data) {
      return;
    }

    // Clear any existing chart
    d3.select(chartRef.current).selectAll("*").remove();

    // Determine the chart dimensions based on the screen size
    const width = mobile ? 500 : 1250;
    const height = mobile ? 412 : 470; // Adjust height for mobile
    const marginTop = mobile ? 40 : 80; // Adjust margin for mobile
    const marginRight = 0;
    const marginBottom = mobile ? 20 : 30; // Adjust margin for mobile
    const marginLeft = mobile ? 40 : 70; // Adjust margin for mobile

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
      .attr("viewBox", `0 -50 ${width} ${height + 50}`);

    // Add the title text element
    svg
      .append("text")
      .attr("x", mobile ? width / 3 : width / 2)
      .attr("y", mobile ? -15 : 20) // Adjust position for mobile
      .attr("fill", "rgba(128, 128, 128, 1)") // Set the text color using the fill attribute
      .attr("text-anchor", "middle")
      .attr("style", `font-size:16px; margin-bottom: 56px`) // Set the font size using the style attribute
      .text("Pool Hash Rate — Last 24H");

    // Create the tooltip element
    const tooltip = d3
      .select(chartRef.current) // Append to the chart container
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
      const [mouseX, mouseY] = d3.pointer(event);
      tooltip
        .style("left", `${mouseX - 60}px`)
        .style("top", `${mouseY - 60}px`);
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
          .tickFormat(() => "")
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
      .attr("x", (d) => x(d.hour) + (mobile ? 5 : 13)) // Adjust spacing for mobile
      .attr("y", height - marginBottom) // Start from the bottom
      .attr("height", 0) // Start with height 0
      .attr("width", mobile ? 10 : 16) // Adjust width for mobile
      .attr("rx", 4) // Add horizontal radius
      .attr("ry", 4) // Add vertical radius
      .on("mouseover", onMouseover)
      .on("mousemove", onMousemove)
      .on("mouseout", onMouseout)
      .transition() // Add transition for animation
      .duration(800)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value) - (mobile ? 5 : 8)); // Adjust height for mobile

    // Add the x-axis and label.
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSize(0).tickSizeOuter(0)); // Set the tick size to 0 to remove the ticks

    svg
      .selectAll(".x-axis text")
      .style("fill", "rgba(128, 128, 128, 1)")
      .style("font-size", mobile ? "12px" : "16px") // Adjust font size for mobile
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
          .tickFormat((d) => (d === 0 ? "" : formatValue(d).replace("M", "M"))), // Filter out the 0 tick value
      )
      .call((g) => g.select(".domain").remove());

    svg
      .selectAll(".y-axis text")
      .style("fill", "rgba(128, 128, 128, 1)")
      .style("font-size", mobile ? "12px" : "16px") // Adjust font size for mobile
      .attr("transform", "translate(-15,0)"); // Move the text 10px to the left

    svg.selectAll(".domain").style("stroke", "rgba(128, 128, 128, 1)"); // Change the color of the axis lines
  };

  return data ? (
    <div id="chart-container" ref={chartRef} className={styles.radialChart} />
  ) : (
    <div className={styles.emptySkeleton}>{emptyComponent}</div>
  );
};

export default RadialBarChart;
