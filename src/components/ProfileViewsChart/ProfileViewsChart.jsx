import React, { useState, useEffect } from "react";
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
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ProfileViewsChart = () => {
  const count = useSelector((state) => state.counter.count);
  const [chartWidth, setChartWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setChartWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { name: "Page A", views: 0 },
    { name: "Current Count", views: count },
    { name: "Count", views: 100 },
  ];

  return (
    <ChartContainer>
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
    </ChartContainer>
  );
};

export default ProfileViewsChart;
