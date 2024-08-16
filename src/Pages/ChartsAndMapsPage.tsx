import React from "react";
import CountryMap from "../Components/CountryMap";
import CaseLineGraph from "../Components/CaseLineGraph";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const ChartsAndMapsPage: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">COVID-19 Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <CaseLineGraph />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <CountryMap />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default ChartsAndMapsPage;
