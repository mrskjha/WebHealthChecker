import cron from "node-cron";
import Site from "../model/site.js";
import { checkSite } from "../Services/monitor.service.js";

cron.schedule("*/30 * * * *", async () => {
  console.log("Running site monitor job...");

  const sites = await Site.find({ isActive: true });

  for (const site of sites) {
    await checkSite(site);
  }

  console.log("Monitoring completed.");
});
