/* import nodemailer from "nodemailer"

export const mantenimiento_correo = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PWD,
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

mantenimiento_correo.verify().then(() => {
  console.log("listo para enviar correos de mantenimiento")
}) */