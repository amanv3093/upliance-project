import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;

const ProfileViewsChart = () => {
  const count = useSelector((state) => state.counter.count);
  const [chartWidth, setChartWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { name: " ", views: 0 },
    { name: "Current Count", views: count },
    { name: "Count", views: 100 },
  ];

  return (
    <ChartContainer ref={containerRef}>
      {chartWidth > 0 && (
        <LineChart
          width={chartWidth}
          height={300}
          data={data}
          margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="views" stroke="#8884d8" />
        </LineChart>
      )}
    </ChartContainer>
  );
};

export default ProfileViewsChart;
