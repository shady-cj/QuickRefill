import nodemailer from "nodemailer"
import { EMAIL_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "../secrets";


const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT || 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });


export const sendMail = async (to: string, subject: string, body: string) => {
    const message = await transporter.sendMail({
        from: `Dummy Mail ${EMAIL_FROM}`,
        to,
        subject,
        html: body
    })
    // console.log("Message sent: %s", message.messageId);
    // console.log(message)
}

