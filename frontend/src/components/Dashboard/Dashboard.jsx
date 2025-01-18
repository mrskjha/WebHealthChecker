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
      data: [], // Empty initially, will be updated
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
      categories: [], // To be populated with the formatted checkedAt timestamps
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

  useEffect(() => {
    const fetchResponseTime = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/sitehistory/67877738954ff359b5f0083e"
        );
        const data = await response.json();

        if (data && data.responcetime?.length > 0) {
          // Extract siteHistroy and sort by checkedAt date
          const siteHistory = data.responcetime[0]?.siteHistroy || [];
          const sortedHistory = [...siteHistory].sort(
            (a, b) => new Date(a.checkedAt) - new Date(b.checkedAt)
          );
          const status = data.responcetime[0]?.status;

          // Extract responseTimes and timestamps for the chart
          const responseTimes = sortedHistory.map((entry) => entry.responseTime);
          const timestamps = sortedHistory.map((entry) =>
            new Date(entry.checkedAt).toLocaleString()
          );

          // Update chart config with new data
          setChartConfig((prevConfig) => ({
            ...prevConfig,
            series: [{ name: "Response Time", data: responseTimes }],
            options: {
              ...prevConfig.options,
              xaxis: { ...prevConfig.options.xaxis, categories: timestamps },
            },
          }));

          // Set the last response times and timestamps to display as a list
          setLastResponseTimes(
            sortedHistory.map((entry) => ({
              time: entry.responseTime,
              timestamp: new Date(entry.checkedAt).toLocaleString(),
            }))
          );

          setStatus(status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
              Monitor the response of your Site.
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0">
          {/* Chart */}
          <Chart {...chartConfig} />
        </CardBody>
      </Card>

      <div>
        <Typography variant="h6" color="blue-gray" className="mt-8">
          Last Response Time
        </Typography>
        {lastResponseTimes.length > 0 && (
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
        )}
      </div>
    </>
  );
}
