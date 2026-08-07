import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

const RECIPIENT = process.env.CONTACT_RECIPIENT || 'rowen.hutchins@gmail.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { name, email, message, company } = body as Record<string, unknown>;

  // Honeypot: real visitors never fill this hidden field.
  if (typeof company === 'string' && company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !message.trim() ||
    !EMAIL_PATTERN.test(email)
  ) {
    return NextResponse.json(
      { error: 'Please fill in your name, a valid email, and a message.' },
      { status: 400 },
    );
  }

  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { error: 'That message is too long.' },
      { status: 400 },
    );
  }

  try {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from:
          process.env.RESEND_FROM_EMAIL ||
          process.env.EMAIL_FROM ||
          'onboarding@resend.dev',
        to: [RECIPIENT],
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });

      return NextResponse.json({ ok: true });
    }

    const {
      EMAIL_SERVER_HOST,
      EMAIL_SERVER_PORT,
      EMAIL_SERVER_USER,
      EMAIL_SERVER_PASSWORD,
      EMAIL_FROM,
    } = process.env;

    if (!EMAIL_SERVER_HOST || !EMAIL_SERVER_USER || !EMAIL_SERVER_PASSWORD) {
      console.error(
        'Contact form: missing EMAIL_SERVER_* environment variables',
      );
      return NextResponse.json(
        { error: 'Email is not configured yet. Please email me directly.' },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_SERVER_HOST,
      port: Number(EMAIL_SERVER_PORT) || 587,
      secure: Number(EMAIL_SERVER_PORT) === 465,
      auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: EMAIL_FROM || EMAIL_SERVER_USER,
      to: RECIPIENT,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form send failed', error);
    return NextResponse.json(
      { error: 'Could not send your message. Please try again.' },
      { status: 502 },
    );
  }
}
