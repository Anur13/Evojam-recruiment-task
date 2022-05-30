import nodemailer from "nodemailer";
import dotenv from "dotenv";
// @ts-ignore
dotenv.config();

const fromEmail = process.env.USER_EMAIL;
const pass = process.env.USER_PASS;
const service = process.env.EMAIL_SERVICE;

const transport = nodemailer.createTransport({
  service,
  auth: {
    user: fromEmail,
    pass: pass,
  },
});

export async function sendCreatedInvite(email: string, id: string) {
  const confirmUrl = `http://localhost:3000/invite/confirm?id=${id}`;
  const rejectUrl = `http://localhost:3000/invite/decline?id=${id}`;
  await transport.sendMail({
    from: fromEmail,
    to: email,
    subject: "Confirmation",
    html: `
<b>
    <p>You have received an invitation. Please confirm or reject</p>
    <a rel="noopener" href=${confirmUrl}>Confirm</a>
    <a rel="noopener" href=${rejectUrl}>Reject</a>
</b>`,
  });
}

export async function statusChangeNotification(email: string, status: string) {
  await transport.sendMail({
    from: fromEmail,
    to: email,
    subject: "Status",
    html: `
<b>
    <p>Your invitation status has changed to ${status}</p>
</b>`,
  });
}
