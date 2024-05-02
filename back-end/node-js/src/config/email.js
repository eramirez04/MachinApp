import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PWD,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

transporter.verify().then(() => {
  console.log("listo para enviar correos")
})