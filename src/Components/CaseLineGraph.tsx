import React from "react";
import { useQuery } from "react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { HistoricalData } from "../types/map&LineGraph";

const fetchHistoricalData = async (): Promise<HistoricalData> => {
  const response = await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const CaseLineGraph: React.FC = () => {
  const { data, isLoading, error } = useQuery<HistoricalData>(
    "historicalData",
    fetchHistoricalData
  );

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>An error has occurred: {(error as Error).message}</div>;

  const chartData = Object.entries(data?.cases || {}).map(([date, cases]) => ({
    date,
    cases,
  }));

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">COVID-19 Cases Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cases" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CaseLineGraph;
