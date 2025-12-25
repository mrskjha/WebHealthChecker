"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { getSiteHistory } from "@/lib/api";
import { Card, CardBody, Typography, Button, Spinner } from "@material-tailwind/react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface HistoryItem {
  checkedAt: string;
  status: string;
  responseTime: number;
}

const TypographyF = Typography as any;
const CardF = Card as any;
const CardBodyF = CardBody as any;
const ButtonF = Button as any;

// --- Loading Component for Cards ---
const StatsSkeleton = () => (
  <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-28 animate-pulse rounded-xl border border-slate-800 bg-slate-900/50" />
    ))}
  </div>
);

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true); 
  const [name, setName] = useState("");
  const SpinnerF = Spinner as any;

  const fetchHistory = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getSiteHistory(id);
      setName(data?.site?.url || "");
      if (data?.history) {
        const sorted = [...data.history].sort(
          (a, b) => new Date(a.checkedAt).getTime() - new Date(b.checkedAt).getTime()
        );
        setHistory(sorted);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [id]);

  const latest = history[history.length - 1];
  const status = latest?.status.toUpperCase() ?? "UNKNOWN";

  const chartConfig = useMemo(() => ({
    series: [{ name: "Latency", data: history.map((h) => h.responseTime) }],
    options: {
      chart: { toolbar: { show: false }, fontFamily: "inherit", foreColor: "#94a3b8" },
      colors: ["#22d3ee"],
      stroke: { curve: "smooth" as const, width: 3 },
      fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
      grid: { borderColor: "#1e293b", strokeDashArray: 4 },
      xaxis: {
        categories: history.map((h) => new Date(h.checkedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        labels: { style: { colors: "#64748b" } },
      },
      yaxis: { labels: { formatter: (val: number) => `${val}ms`, style: { colors: "#64748b" } } },
      tooltip: { theme: "dark" },
    },
  }), [history]);

  return (
    <div className="min-h-screen pt-40 bg-[#020617] p-8 text-slate-200">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <TypographyF variant="h3" className="font-bold text-white">Monitoring Logs</TypographyF>
            <div className="flex items-center gap-2">
               <TypographyF className="text-slate-400">Site Name:</TypographyF>
               {loading && !name ? (
                 <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
               ) : (
                 <span className="text-cyan-400 font-mono">{name}</span>
               )}
            </div>
          </div>
          
          <ButtonF 
            variant="outlined" color="white" size="sm"
            onClick={fetchHistory} disabled={loading}
            className="border-slate-700 flex items-center gap-2"
          >
            {loading && <><SpinnerF className="h-4 w-4" /></>}
            {loading ? "Syncing..." : "Refresh"}
          </ButtonF>
        </div>

        {loading && history.length === 0 ? (
          <>
            <StatsSkeleton />
            <div className="h-[450px] animate-pulse rounded-xl border border-slate-800 bg-slate-900/30" />
          </>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <CardF className="border border-slate-800 bg-[#0f172a] shadow-none">
                <CardBodyF>
                  <TypographyF variant="small" className="font-medium uppercase text-slate-500">Status</TypographyF>
                  <div className="mt-2 flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${status === "UP" ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-red-500"}`} />
                    <TypographyF variant="h4" className="text-white">{status}</TypographyF>
                  </div>
                </CardBodyF>
              </CardF>

              <CardF className="border border-slate-800 bg-[#0f172a] shadow-none">
                <CardBodyF>
                  <TypographyF variant="small" className="font-medium uppercase text-slate-500">Avg Latency</TypographyF>
                  <TypographyF variant="h4" className="mt-2 text-white">
                    {latest?.responseTime ?? "0"} <span className="text-lg font-normal text-slate-500">ms</span>
                  </TypographyF>
                </CardBodyF>
              </CardF>

              <CardF className="border border-slate-800 bg-[#0f172a] shadow-none">
                <CardBodyF>
                  <TypographyF variant="small" className="font-medium uppercase text-slate-500">Last Check</TypographyF>
                  <TypographyF className="mt-2 font-mono text-slate-300">
                    {latest ? new Date(latest.checkedAt).toLocaleTimeString() : "--:--"}
                  </TypographyF>
                </CardBodyF>
              </CardF>
            </div>

            {/* Chart Section */}
            <CardF className="border border-slate-800 bg-[#0f172a] shadow-xl overflow-hidden">
              <CardBodyF className="px-2 pb-0">
                <div className="px-4 pt-4">
                  <TypographyF variant="h6" className="text-white">Performance Overview</TypographyF>
                  <TypographyF variant="small" className="text-slate-500">Response time trend over the last few cycles</TypographyF>
                </div>
                
                <div className="min-h-[400px]">
                  {history.length > 0 ? (
                    <Chart type="area" height={400} options={chartConfig.options} series={chartConfig.series} />
                  ) : (
                    <div className="flex h-[400px] items-center justify-center text-slate-600 italic">
                      No logs found for this site.
                    </div>
                  )}
                </div>
              </CardBodyF>
            </CardF>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;