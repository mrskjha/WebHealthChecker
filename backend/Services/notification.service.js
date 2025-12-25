// services/notification.service.js
import nodemailer from "nodemailer";
import User from "../model/user.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendSiteDownEmail(userId, siteUrl) {
  const user = await User.findById(userId);
  if (!user || !user.notificationsEnabled) return;

  await transporter.sendMail({
    to: user.email,
    subject: "Website Down Alert",
    html: ` <html>
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
            <p>Hello ${user.username},</p>
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
      </html>`
  });
}

async function sendSiteUpEmail(userId, siteUrl) {
  const user = await User.findById(userId);
  if (!user || !user.notificationsEnabled) return;

  await transporter.sendMail({
    to: user.email,
    subject: "Website Up Alert",
    html: `<p>Hello ${user.username},</p>
           <p>Your site <b>${siteUrl}</b> is back UP.</p>`
  });
}

export { sendSiteDownEmail, sendSiteUpEmail };
