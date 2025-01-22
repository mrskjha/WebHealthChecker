import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";
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
  const [siteId, setSiteId] = useState(""); // Site ID state

  // Fetch response time when siteId changes
  useEffect(() => {
    if (siteId) {
      fetchResponseTime();
    }
  }, [siteId]);

  const fetchResponseTime = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/site/response-time/${siteId}`
      );
      const data = await response.json();

      if (data && data.site) {
        const siteHistory = data.site.siteHistory || [];
        const sortedHistory = [...siteHistory].sort(
          (a, b) => new Date(a.checkedAt) - new Date(b.checkedAt)
        );

        const responseTimes = sortedHistory.map(entry => entry.responseTime);
        const timestamps = sortedHistory.map(entry =>
          new Date(entry.checkedAt).toLocaleString()
        );

        setChartConfig((prevConfig) => ({
          ...prevConfig,
          series: [{ name: "Response Time", data: responseTimes }],
          options: {
            ...prevConfig.options,
            xaxis: { ...prevConfig.options.xaxis, categories: timestamps },
          },
        }));

        setLastResponseTimes(
          sortedHistory.map((entry) => ({
            time: entry.responseTime,
            timestamp: new Date(entry.checkedAt).toLocaleString(),
          }))
        );

        setStatus(data.site.status);
      } else {
        console.warn("No site history data available.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Typography variant="h6">Response Time Monitor</Typography>
      </CardHeader>
      <div className="mt-8 grid w-full place-items-start md:justify-center">
        <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
          <Input
            color="gray"
            label="Enter your website ID to start monitoring"
            size="lg"
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)} // Handling input change
          />
          <Button
            color="blue"
            className="w-full px-4 md:w-[12rem]"
            onClick={fetchResponseTime} // Trigger monitor based on URL input
          >
            Get Started
          </Button>
        </div>
      </div>

      <CardBody>
        <div className="flex justify-between">
          <Typography>Status: {status}</Typography>
          <Typography>Last Response Time: {lastResponseTimes[0]?.time} ms</Typography>
        </div>
        <Chart
          options={chartConfig.options}
          series={chartConfig.series}
          type={chartConfig.type}
          height={chartConfig.height}
        />
      </CardBody>
    </Card>
  );
}
