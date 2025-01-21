const { default: axios } = require("axios");
const { model } = require("mongoose");
const validator = require("validator");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const userData = require('../model/userdata');

const Site = model("site");

async function handelAddSite(req, res) {
  const { url } = req.body;
  try {
    const newSite = new Site({
      url,
    });

    if (!validator.isURL(url)) {
      return res.status(400).json({ error: "Invalid URL" });
    } else {
      await newSite.save();
      res.status(200).json({ newSite });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handelResponceTime(req, res) {
  const { url } = req.body;

  // Validate URL
  if (!url || !validator.isURL(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const site = model("site");

    // Start time for response measurement
    const start = Date.now();
    await axios.get(url); // Send GET request to the URL
    const responseTime = Date.now() - start; // Calculate response time

    // Update site document
    updateSiteHistory(url, "up", responseTime);
     await site.updateOne(
      { url },
      {
        $set: {
          status: "up",
          responseTime,
          lastChecked: new Date(),
        },
        $push: {
          siteHistroy: {
            status: "up",
            responseTime,
            checkedAt: new Date(),
          },
        },
      }
    );

    

    // Respond to client
    if (res) {
      res.status(200).json({
        url,
        responseTime: `${responseTime} ms`,
        status: "up",
      });
    }
  } catch (error) {
    // Handle error (site is down)
    const site = model("site");
     await site.updateMany(
      { url },
      {
        $set: {
          status: "down",
          responseTime: 0,
          lastChecked: new Date(),
        },
        $push: {
          siteHistroy: {
            status: "down",
            responseTime: 0,
            checkedAt: new Date(),
          },
        },
      }
    );

    // Respond to client with error details
    if (res) {
      res.status(500).json({
        url,
        responseTime: "0 ms",
        status: "down",
        error: error.message,
      });
    }
  }
}

async function handelSiteById(req, res) {
  try {
    const id = req.params.id;
    const site = await Site.findById(id);
    res.status(200).json({ site });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const checkServiceStatus = async () => {
  try {
    const siteModel = model("site");
    const sites = await siteModel.find();

    

    for (const site of sites) {

      const { status, alertSent, url } = site;


      if (status === "down" && !alertSent) {
        console.log(`Service is down for ${url}. Sending alerts...`);
        await sendAlertToAllUsers(url, false); // Pass false for "down"
        await siteModel.updateOne({ url }, { $set: { alertSent: true } });
      } else if (status === "up" && alertSent) {
        console.log(`Service is up for ${url}. Sending alerts...`);
        await sendAlertToAllUsers(url, true); // Pass true for "up"
        await siteModel.updateOne({ url }, { $set: { alertSent: false } });
      }
    }

    console.log("Service status check completed.");
  } catch (error) {
    console.error("Error during service status check:", error.message);
  }
};

const sendAlertToAllUsers = async (siteUrl, isSiteUp) => {
  try {
    // const userModel = model("User");
    const userData = model("userdata");
    const users = await userData.find();

    for (let user of users) {
      if (isSiteUp) {
        // Notify users that the site is back up
        console.log(`Sending "Site Up" email to ${user.email}`);
        await sendsiteupEmail(user.email, user.username, siteUrl);
      } else {
        // Notify users that the site is down
        console.log(`Sending "Site Down" email to ${user.email}`);
        await sendSiteDownEmail(user.email, user.username, siteUrl);
      }
    }
  } catch (error) {
    console.error("Error sending alert to users:", error.message);
  }
};

// Cron job to check all sites every 5 minutes
cron.schedule("*/1 * * * *", async () => {
  try {
    const siteModel = model("site");
    const sites = await siteModel.find(); // Fetch all sites

    for (const site of sites) {
      const req = { body: { url: site.url } }; // Mock request object
      const res = null; // No need for a response object in the cron job
      await handelResponceTime(req, res);
    }

    console.log("Site monitoring task completed successfully.");
    await checkServiceStatus(); 
  } catch (error) {
    console.error("Error during site monitoring:", error.message);
  }
});

async function getAllSites(req, res) {
  try {
    const sites = await model("site").find();
    res.status(200).json({ sites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function sendSiteDownEmail(userEmail, username, siteUrl) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Using Gmail's service
      secure: false, // Enable SSL (use secure port 465)
      port: 465, // Secure port for Gmail
      auth: {
        user: "mrskjha30@gmail.com", // Your Gmail address
        pass: "kclv rlaq qoby iwwu", // Use your app-specific password here if 2FA enabled
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <mrskjha@gmail.com>', // Proper sender format
      to: userEmail, // Correct email address format
      subject: "Website Down Notification ", // Subject line
      text: "Hello world?", // Plain text body
      html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              background-color: #f4f4f9;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h2 {
              color: #2c3e50;
            }
            p {
              line-height: 1.6;
              font-size: 16px;
              color: #555;
            }
            a {
              color: #3498db;
              text-decoration: none;
            }
            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Website Down Notification</h2>
            <p>Hello ${username},</p>
            <p>We wanted to inform you that our website is currently experiencing technical difficulties and is temporarily down. Our team is actively working to resolve the issue and restore the service as soon as possible.</p>
            <p>We sincerely apologize for any inconvenience this may cause and appreciate your patience during this time.</p>
            <p>If you have any questions or concerns, feel free to reach out to us at <a href="mailto:support@example.com">support@example.com</a>. We're here to assist you.</p>
            <br>
            <p>Thank you for your understanding,</p>
            <p>Your Website Team</p>
            
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Website. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, message: "Mail sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}

async function sendsiteupEmail(userEmail, username, siteUrl) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Using Gmail's service
      secure: false, // Enable SSL (use secure port 465)
      port: 465, // Secure port for Gmail
      auth: {
        user: "mrskjha30@gmail.com",
        pass: "kclv rlaq qoby iwwu",
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <mrskjha@gmail.com>', // Proper sender format
      to: userEmail, // Correct email address format
      subject: "Website Up Notification", // Subject line
      text: "Hello world?", // Plain text body
      html: `<p>Hello ${username},</p><p>Your website ${siteUrl} is back up.</p>`, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, message: "Mail sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}


async function handleEmailsend(req, res) {
  try {
    const { userEmail, username, siteUrl } = req.body;
    const response = await sendSiteDownEmail(userEmail, username, siteUrl);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handlesiteHistory(req, res) {
  try{
    const site = await Site.find();
    res.status(200).json({ site });

  }catch(error){
    res.status(500).json({ error: error.message });
  }
}

const updateSiteHistory = async (url, status, responseTime) => {
  try {
    const result = await Site.updateOne(
      { url }, // Match the document with the given URL
      {
        $set: {
          status,
          responseTime,
          lastChecked: new Date(),
        },
        $push: {
          siteHistory: {
            status,
            responseTime,
            checkedAt: new Date(),
          },
        },
      }
    );

    if (result.modifiedCount > 0) {
      console.log("Successfully updated site history.");
    } else {
      console.log("No changes made. Please check if the site URL exists.");
    }
  } catch (error) {
    console.error("Error updating site history:", error.message);
  }
};


module.exports = {
  handelResponceTime,
  getAllSites,
  handelAddSite,
  handelSiteById,
  handleEmailsend,
  handlesiteHistory,
  updateSiteHistory
};
