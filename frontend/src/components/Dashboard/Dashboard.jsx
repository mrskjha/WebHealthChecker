import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

// This chart will display the response time
const chartConfig = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Response Time",
      data: [], // Will store response time data dynamically
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Request 1",
        "Request 2",
        "Request 3",
        "Request 4",
        "Request 5",
      ], // This can represent multiple API requests
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

export default function ResponseTimeMonitor() {
  const [responseTimes, setResponseTimes] = useState([]); // Store response times for multiple requests
  const [lastResponseTime, setLastResponseTime] = useState(null); // Store the latest response time

  // Fetch data from backend and calculate response time
  useEffect(() => {
    const fetchResponseTime = async () => {
      const startTime = performance.now(); // Capture start time before request

      try {
        const response = await fetch("https://your-backend-api.com/api/monitor");
        await response.json();

        const endTime = performance.now(); // Capture end time after request

        // Calculate the response time
        const responseTime = (endTime - startTime).toFixed(2);

        // Set the latest response time and update the response times array
        setLastResponseTime(responseTime);
        setResponseTimes((prevState) => [...prevState, responseTime]); // Store multiple response times
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchResponseTime();
  }, []);

  // Update chart data with the response times
  chartConfig.series[0].data = responseTimes;

  return (
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
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Monitor the response time of your API requests.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
        {lastResponseTime && (
          <Typography variant="small" color="gray" className="mt-4">
            Last Response Time: {lastResponseTime} ms
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}
