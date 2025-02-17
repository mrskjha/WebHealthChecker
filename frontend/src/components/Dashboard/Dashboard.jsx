import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";

const initialChartConfig = {
  type: "line",
  height: 400,
  series: [{ name: "Response Time", data: [] }],
  options: {
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: ["#020617"],
    stroke: { lineCap: "round", curve: "smooth" },
    markers: { size: 0 },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { style: { colors: "#616161", fontSize: "12px" } },
      categories: [],
    },
    yaxis: { labels: { style: { colors: "#616161", fontSize: "12px" } } },
    grid: { borderColor: "#dddddd", strokeDashArray: 5 },
    tooltip: { theme: "dark" },
  },
};

export default function ResponseTimeMonitor() {
  const [chartConfig, setChartConfig] = useState(initialChartConfig);
  const [lastResponseTimes, setLastResponseTimes] = useState([]);
  const [status, setStatus] = useState("");

  console.log("lastResponseTimes", lastResponseTimes);

  useEffect(() => {
    fetchResponseTime();
  }, []); 
  
  const fetchResponseTime = async () => {
    try {
      localStorage.removeItem("chartData");
      const token = localStorage.getItem("token");
      if (!token) return;
      
      const response = await fetch("http://localhost:5000/api/site/response-time/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
  
      if (data?.site) {
        const sortedHistory = [...(data.site.siteHistory || [])].sort(
          (a, b) => new Date(a.checkedAt) - new Date(b.checkedAt)
        );
  
        const responseTimes = sortedHistory.map((entry) => entry.responseTime);
        const timestamps = sortedHistory.map((entry) =>
          new Date(entry.checkedAt).toLocaleString()
        );
  
        setChartConfig((prevConfig) => ({
          ...prevConfig,
          series: [{ name: "Response Time", data: responseTimes }],
          options: { ...prevConfig.options, xaxis: { ...prevConfig.options.xaxis, categories: timestamps } },
        }));
  
        setLastResponseTimes(sortedHistory.map((entry) => ({
          time: entry.responseTime,
          timestamp: new Date(entry.checkedAt).toLocaleString(),
        })));
        setStatus(data.site.status);
  
        localStorage.setItem("chartData", JSON.stringify({
          series: responseTimes,
          categories: timestamps,
          lastResponses: sortedHistory,
          savedStatus: data.site.status,
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <Card>
      <div className="w-full flex flex-col items-center">
        <div className="mt-6 h-72 w-1/3 bg-gradient-to-br from-white to-gray-100 shadow-xl rounded-xl p-6 flex flex-col justify-center items-center border border-gray-300">
          <Typography variant="h4" className="text-gray-800 font-bold mb-4 text-center">
            Current Health
          </Typography>
          <div className="flex items-center gap-3">
            <Typography className="text-gray-700 text-lg font-medium">
              <span className="font-semibold text-gray-900">Status:</span> {status}
            </Typography>
            <div
              className={`w-4 h-4 rounded-full animate-pulse ${
                status === "UP" ? "bg-green-500 shadow-md shadow-green-400" : "bg-red-500 shadow-md shadow-red-400"
              }`}
            ></div>
          </div>
          <Typography className="text-gray-700 text-lg font-medium">
            <span className="font-semibold text-gray-900">Response Time:</span> {lastResponseTimes[lastResponseTimes.length -1]?.time} ms
          </Typography>
          <Typography className="text-gray-700 text-lg font-medium">
            <span className="font-semibold text-gray-900">Last Checked:</span> {lastResponseTimes[lastResponseTimes.length -1]?.timestamp}
          </Typography>
          <Button color="gray" className="mt-4 w-full px-4 md:w-[12rem]" onClick={fetchResponseTime}>
            Refresh Data
          </Button>
        </div>
      </div>
      <CardBody>
        <div className="flex justify-between">
          <Typography>Status: {status}</Typography>
          <Typography>Last Response Time: {lastResponseTimes[lastResponseTimes.length -1]?.time} ms</Typography>
        </div>
        <Chart options={chartConfig.options} series={chartConfig.series} type={chartConfig.type} height={chartConfig.height} />
      </CardBody>
    </Card>
  );
}
