const { default: axios } = require("axios");
const { model } = require("mongoose");
const validator = require("validator");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

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

  if (!url || !validator.isURL(url)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    const site = model("site");
    const start = Date.now(); // Start time
    await axios.get(url); // Send request
    const responseTime = Date.now() - start; // Calculate response time
    await site.updateMany(
      { url },
      {
        status: "up",
        responseTime,
        lastChecked: Date.now(),

        $push: {
          siteHistroy: {
            status: "up",
            responseTime,
            checkedAt: Date.now(),
          },
        },
      }
    );

    // If a response object is provided, send the response
    if (res) {
      res.status(200).json({
        url,
        responseTime: `${responseTime} ms`,
        status: "up",
      });
    }
  } catch (error) {
    // Update the site status to "down" in case of an error
    const site = model("site");
    await site.updateMany(
      { url },
      {
        responseTime: 0,
        status: "down",
        lastChecked: Date.now(),
      }
    );

    // If a response object is provided, send the error response
    if (res) {
      res.status(500).json({
        url,
        responseTime: "0 ms",
        status: "down",
        error: `Error: ${error.message} `,
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

// Cron job to check all sites every 5 minutes
cron.schedule("*/15 * * * *", async () => {
  try {
    const siteModel = model("site");
    const sites = await siteModel.find(); // Fetch all sites

    for (const site of sites) {
      const req = { body: { url: site.url } }; // Mock request object
      const res = null; // No need for a response object in the cron job
      await handelResponceTime(req, res);
    }

    console.log("Site monitoring task completed successfully.");
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

async function handleEmailsend(req, res) {
  try {
    const { userEmail, username, siteUrl } = req.body;
    const response = await sendSiteDownEmail(userEmail, username, siteUrl);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  handelResponceTime,
  getAllSites,
  handelAddSite,
  handelSiteById,
  handleEmailsend,
};
