require("dotenv").config();

const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));  // Parse URL-encoded data from forms
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/assets")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Contact form endpoint
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create transporter for bangalianawebsite@gmail.com
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_WEBSITE, // website Gmail
      pass: process.env.EMAIL_PASS,          // ⚠️ use App Password, not Gmail password
    },
  });

  // Email options (send to owner Gmail)
  let mailOptions = {
    from: process.env.EMAIL_WEBSITE, // Website's email
    to: process.env.OWNER_EMAIL, // Owner's email
    subject: `New Contact Form Submission for ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };


  try {
    await transporter.sendMail(mailOptions);
    res.redirect('/?status=success');
  } catch (error) {
    console.error(error);
    res.redirect('/?status=error');
  }

});


app.post("/booking", async (req, res) => {
  const { username, email, number, occasion, "occasion-date": occasionDate, location } = req.body;

  // Create transporter for bangalianawebsite@gmail.com
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_WEBSITE, // website Gmail
      pass: process.env.EMAIL_PASS,    // ⚠️ App Password, not Gmail password
    },
  });

  // Email options (send to owner Gmail)
  let mailOptions = {
    from: process.env.EMAIL_WEBSITE,
    to: process.env.OWNER_EMAIL,
    subject: `New Booking Request: ${occasion}`,
    text: `Name: ${username}\nEmail: ${email}\nContact Number: ${number}\nOccasion: ${occasion}\nDate: ${occasionDate}\nLocation: ${location}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.redirect("/?booking=success");
  } catch (error) {
    console.error(error);
    res.redirect("/?booking=error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on : http://localhost:${port}`);
});