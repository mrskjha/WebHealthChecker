import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Chart from "react-apexcharts";

const initialChartConfig = {
  type: "line",
  height: 400,
  series: [
    {
      name: "Response Time",
      data: [],
    },
  ],
  options: {
    chart: {
      toolbar: { show: false },
    },
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
    yaxis: {
      labels: { style: { colors: "#616161", fontSize: "12px" } },
    },
    grid: { borderColor: "#dddddd", strokeDashArray: 5 },
    tooltip: { theme: "dark" },
  },
};

export default function ResponseTimeMonitor() {
  const [chartConfig, setChartConfig] = useState(initialChartConfig);
  const [lastResponseTimes, setLastResponseTimes] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponseTime = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/sitehistory/678cf88b62e252cd9c60e66a"
        );
        const data = await response.json();
  
        if (data && data.site && data.site.length > 0) {
          // Assuming `data.site[0].siteHistory` contains the history you want
          const siteHistory = data.site[0]?.siteHistory || [];
          const sortedHistory = [...siteHistory].sort(
            (a, b) => new Date(a.checkedAt) - new Date(b.checkedAt)
          );
  
          // Extract response times and timestamps
          const responseTimes = sortedHistory.map(entry => entry.responseTime);
          const timestamps = sortedHistory.map(entry =>
            new Date(entry.checkedAt).toLocaleString()
          );
  
          // Update chart config
          setChartConfig((prevConfig) => ({
            ...prevConfig,
            series: [{ name: "Response Time", data: responseTimes }],
            options: {
              ...prevConfig.options,
              xaxis: { ...prevConfig.options.xaxis, categories: timestamps },
            },
          }));
  
          // Set last response times data for display
          setLastResponseTimes(
            sortedHistory.map((entry) => ({
              time: entry.responseTime,
              timestamp: new Date(entry.checkedAt).toLocaleString(),
            }))
          );
  
          // Set the current status for the last checked site
          setStatus(data.site[0]?.status);
        } else {
          console.warn("No site history data available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchResponseTime();
  }, []);
  

  return (
    <>
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <Square3Stack3DIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Response Time Monitor
            </Typography>
            <Typography variant="small" color="gray" className="max-w-sm font-normal">
              Monitor the response of your site.
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0">
          {loading ? (
            <Typography variant="small" color="gray">
              Loading data...
            </Typography>
          ) : (
            <Chart {...chartConfig} />
          )}
        </CardBody>
      </Card>

      <div>
        <Typography variant="h6" color="blue-gray" className="mt-8">
          Last Response Time
        </Typography>
        {lastResponseTimes.length > 0 ? (
          <div>
            <p>
              <strong>Response Time:</strong> {lastResponseTimes[lastResponseTimes.length - 1].time} ms
            </p>
            <p>
              <strong>Timestamp:</strong> {lastResponseTimes[lastResponseTimes.length - 1].timestamp}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
          </div>
        ) : (
          <Typography variant="small" color="gray">
            No data available to display.
          </Typography>
        )}
      </div>
    </>
  );
}
