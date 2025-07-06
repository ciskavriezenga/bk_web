const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bkwebkunst@gmail.com",
    pass: "REPLACE_WITH_APP_PW"
  }
});

// API endpoint
app.post("/send", (req, res) => {
  console.log("retrieved an email, sending the email")
  const { email } = req.body;

  const mailOptions = {
    from: "bkwebkunst@gmail.com",
    to: email,
    subject: "Hi!",
    text: "Ha - het werkt!"
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Er ging iets mis.");
    }
    res.status(200).send("Mail verzonden!");
  });
});

app.listen(port, () => {
  console.log(`Server draait op port ${port}`);
});
