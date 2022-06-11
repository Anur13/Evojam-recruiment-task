import nodemailer from "nodemailer";
import envVars from "../src/bin/config";

const { EMAIL_SERVICE, USER_EMAIL, USER_PASS } = envVars;

const transport = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: USER_EMAIL,
    pass: USER_PASS,
  },
});

export async function sendCreatedInvite(email: string, id: string) {
  const confirmUrl = `http://localhost:3000/invite/confirm?id=${id}`;
  const rejectUrl = `http://localhost:3000/invite/decline?id=${id}`;
  await transport.sendMail({
    from: USER_EMAIL,
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
    from: USER_EMAIL,
    to: email,
    subject: "Status",
    html: `
<b>
    <p>Your invitation status has changed to ${status}</p>
</b>`,
  });
}
