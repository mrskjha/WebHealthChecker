import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";

function Home() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [siteId, setSiteId] = useState(""); // Site ID state
  const [error, setError] = useState(null); // Error state to manage API errors

  const handleOpen = () => setOpen((cur) => !cur);

  // Close the menu on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  // Fetch site data when the page loads
  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/site");
        if (!response.ok) {
          throw new Error("Failed to fetch site data");
        }

        const data = await response.json();

        // Check if 'newSite' exists in the response and set site ID
        if (data && data.newSite && data.newSite._id) {
          setSiteId(data.newSite._id);
        } else {
          setError("Site data is missing or incomplete.");
        }
      } catch (error) {
        setError("Error fetching site data: " + error.message);
      }
    };

    fetchSiteData();
  }, []); // Empty dependency array to fetch only once on component mount

  // Handle the Site Monitor button click
  const handleSiteMonitor = async () => {
    setError(null); // Reset any previous errors

    // Check if the URL input is empty
    if (!url) {
      setError("Please enter a valid URL to monitor.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/site", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      // Handle errors if response does not contain site data
      if (data && data.newSite && data.newSite._id) {
        setSiteId(data.newSite._id); // Set the site ID from the response
      } else {
        setError("Failed to create the site, please try again.");
      }
    } catch (error) {
      console.error("Error creating site:", error);
      setError("An error occurred while creating the site. Please try again.");
    }
  };

  return (
    <>
      {/* Header Section */}
      <header className="bg-white p-20 h-[32rem] lg:h-[40rem]">
        <div className="grid mt-20 min-h-[82vh] w-full lg:h-[54rem] md:h-[34rem] place-items-stretch bg-[url('/image/bg-monitoring.svg')] bg-center bg-cover bg-no-repeat">
          <div className="container mx-auto px-4 text-center">
            <Typography className="inline-flex text-xs rounded-lg border-[1.5px] border-blue-gray-50 bg-white py-1 lg:px-4 px-1 font-medium text-primary">
              Real-Time Monitoring is Here!
            </Typography>
            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full leading-snug text-2xl lg:max-w-3xl lg:text-5xl"
            >
              Track and Monitor Site Performance{" "}
              <span className="text-green-500">in Real-Time</span> with Site
              Monitor.
            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
            >
              Monitor uptime, traffic, and system alerts effortlessly. Stay
              informed about your site's health.
            </Typography>
            <div className="mt-8 grid w-full place-items-start md:justify-center">
              <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
                <Input
                  color="gray"
                  label="Enter your website url to start monitoring"
                  size="lg"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                />
                <Button
                  color="blue"
                  className="w-full px-4 md:w-[12rem]"
                  onClick={handleSiteMonitor}
                >
                  Get Started
                </Button>
              </div>
            </div>
            {error && (
              <Typography className="mt-4 text-red-500">{error}</Typography>
            )}
            {siteId && (
              <Typography className="mt-4 text-green-500">
                Site ID: {siteId}
              </Typography>
            )}
          </div>
        </div>
      </header>

      {/* Feature Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <Typography variant="h3" className="text-3xl font-bold text-gray-800">
            Key Features of Site Monitor
          </Typography>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Typography variant="h5" className="font-semibold text-gray-800">
                Real-Time Site Analytics
              </Typography>
              <Typography className="text-gray-600 mt-2">
                Track site performance, uptime, and real-time traffic data.
              </Typography>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Typography variant="h5" className="font-semibold text-gray-800">
                Automated Alerts
              </Typography>
              <Typography className="text-gray-600 mt-2">
                Get notified instantly if your site experiences any issues or
                downtime.
              </Typography>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Typography variant="h5" className="font-semibold text-gray-800">
                Easy Dashboard
              </Typography>
              <Typography className="text-gray-600 mt-2">
                View all your monitoring data at a glance with an intuitive
                dashboard.
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
