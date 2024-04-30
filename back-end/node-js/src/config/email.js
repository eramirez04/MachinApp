//const nodemailer = require("nodemailer");

//import nodemailer from "nodemailer"

import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "machinappsena@gmail.com",
    pass: "1940",
  },
    tls: {
        ciphers:'SSLv3'
    }
});

