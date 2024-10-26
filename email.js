import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function sendEmail(EMAIL_USER, EMAIL_PASS, username, email, subject) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  ejs.renderFile(
    __dirname + "/views/welcome.ejs",
    { username },
    (err, template) => {
      if (err) {
        console.log(err);
      } else {
        const mailOptions = {
          from: "retyitpaul60@gmail",
          to: email,
          subject,
          html: template,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent");
          }
        });
      }
    }
  );
}
