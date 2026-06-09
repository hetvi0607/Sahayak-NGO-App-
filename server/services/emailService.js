import nodemailer from 'nodemailer';

function transporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
}

export async function sendEmail({ to, subject, html }) {
  const tx = transporter();
  if (!tx) {
    console.log(`Email skipped. To: ${to}. Subject: ${subject}`);
    return;
  }
  await tx.sendMail({
    from: process.env.EMAIL_FROM || 'SahayaK <no-reply@sahayak.local>',
    to,
    subject,
    html
  });
}

export function taskAcceptedTemplate(task, volunteer) {
  return `<h2>Your SahayaK request was accepted</h2><p>${volunteer.name} accepted "${task.title}". They may contact you soon.</p>`;
}

export function taskCompletedTemplate(task) {
  return `<h2>Your SahayaK request is completed</h2><p>The task "${task.title}" was marked completed. Please review the proof and note.</p>`;
}
