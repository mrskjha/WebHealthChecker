// services/monitor.service.js
import axios from "axios";
import Site from "../model/site.js";
import MonitorHistory from "../model/siteHistory.js";
import User from "../model/user.js";
import { sendSiteDownEmail, sendSiteUpEmail } from "./notification.service.js";

/**
 * Check a single site and update DB
 */
async function checkSite(siteId) {
  const startTime = Date.now();
  const site = await Site.findById(siteId);
  if (!site) return;

  // Validate URL
  try {
    new URL(site.url);
  } catch (err) {
    console.error("Invalid URL:", site.url);
    return;
  }

  const maxRetries = 2;
  let finalStatus = "down";
  let responseTime = 0;
  let httpStatus = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(site.url, {
        timeout: 15000,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0",
          Accept: "text/html,application/xhtml+xml"
        },
        validateStatus: () => true
      });

      responseTime = Date.now() - startTime;
      httpStatus = response.status;

      if (response.status >= 200 && response.status < 400) {
        finalStatus = "up";
      } else if (response.status === 403) {
        console.warn(`Site ${site.url} returned 403 Forbidden`);
        finalStatus = "up"; 
      }

      break;
    } catch (err) {
      responseTime = Date.now() - startTime;
      console.error(`Attempt ${attempt + 1} failed for ${site.url}:`, err.message);
      if (attempt === maxRetries) finalStatus = "down";
    }
  }

  await MonitorHistory.create({
    siteId: site._id,
    status: finalStatus,
    responseTime,
    httpStatus
  });

  if (site.status !== finalStatus) {
    const user = await User.findById(site.userId);
    if (user?.notificationsEnabled) {
      if (finalStatus === "up") await sendSiteUpEmail(user._id, site.url);
      else if (finalStatus === "down") await sendSiteDownEmail(user._id, site.url);
    }
  }

  await Site.updateOne(
    { _id: site._id },
    {
      status: finalStatus,
      responseTime: finalStatus === "up" ? responseTime : 0,
      lastChecked: new Date(),
      $inc: finalStatus === "down" ? { failureCount: 1 } : { failureCount: 0 }
    }
  );
}

/**
 * Run monitor for all sites
 */
async function runMonitor() {
  console.log("Running site monitor job...");
  const sites = await Site.find({});
  for (const site of sites) {
    await checkSite(site._id);
  }
  console.log("Monitoring completed.");
}

export { checkSite, runMonitor };
