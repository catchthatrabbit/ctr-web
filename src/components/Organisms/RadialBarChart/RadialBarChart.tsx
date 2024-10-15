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
    const height = 362;
    const marginTop = 30;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;

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
    // .attr("style", "max-width: 100%; height: auto;");

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

    svg
      .append("g")
      .attr("style", "stroke-dasharray : 8, 8; color: rgba(54, 54, 54, 1); ")
      .attr("class", "grid")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(y)
          .tickSize(-width + marginRight + marginLeft) // Set the tick size to span the width of the chart
          .tickFormat("") // Remove the tick labels
          .tickValues(y.ticks().slice(1)), // Skip the first tick (10M)
      )
      .call((g) => g.select(".domain").remove());

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
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg
      .selectAll(".x-axis text")
      .style("fill", "rgba(128, 128, 128, 1)")
      .style("font-size", "16px");

    // Add the y-axis and label, and remove the domain line.
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat((d) => formatValue(d).replace("M", "M")))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "red")
          .attr("text-anchor", "start")

          .text("↑ Frequency (%)"),
      );
    svg
      .selectAll(".y-axis text")
      .style("fill", "rgba(128, 128, 128, 1)")
      .style("font-size", "16px");

    svg.selectAll(".domain").style("stroke", "rgba(128, 128, 128, 1)"); // Change the color of the axis lines
  };

  return data ? (
    <div id="chart-container" ref={chartRef} className={styles.radialChart} />
  ) : (
    <div className={styles.emptySkeleton}>{emptyComponent}</div>
  );
};

export default RadialBarChart;
