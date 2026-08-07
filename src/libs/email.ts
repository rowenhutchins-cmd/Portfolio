import nodemailer from 'nodemailer';
import { Resend } from 'resend';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export const sendEmail = async (data: EmailPayload) => {
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    return resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        process.env.EMAIL_FROM ||
        'onboarding@resend.dev',
      to: [data.to],
      subject: data.subject,
      html: data.html,
      text: data.text,
    });
  }

  const smtpOptions = {
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '2525'),
    secure: false,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    ...data,
  });
};
