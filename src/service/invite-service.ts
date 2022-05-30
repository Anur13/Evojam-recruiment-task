import { inviteDao } from "../dao/invite-dao";
import { InviteI } from "../type/inviteI";
import { internalError } from "../error/internal-error";
import { sendCreatedInvite, statusChangeNotification } from "../../util/emailer";
import { inviteError } from "../error/inviteError";
import { InviteStatusI } from "../common/iniviteStatus";

export const inviteService = {
  create: async function (name: string, email: string): Promise<InviteI> {
    const userEmail = process.env.USER_EMAIL;

    if (!userEmail) throw internalError.inviteError();
    const invite: InviteI = {
      inviteeName: name,
      inviteeEmail: email,
      created: new Date(),
      createdBy: userEmail,
      status: InviteStatusI.notResolved,
    };
    const createdInvite = await inviteDao.create(invite);
    await sendCreatedInvite(email, createdInvite._id);
    return createdInvite;
  },
  listAll: async function (): Promise<InviteI[]> {
    return await inviteDao.listAll();
  },
  changeStatus: async function (id: string, status: string): Promise<void> {
    const invite = await inviteDao.findInvite(id);
    if (!invite) throw inviteError.notFound("Invite was not found.");
    invite.status = status;
    await inviteDao.changeStatus(id, invite);
    await statusChangeNotification(invite.inviteeEmail, status);
  },
  listConfirmed: async function () {
    return await inviteDao.findConfirmed();
  },
  listRejected: async function () {
    return await inviteDao.findRejected();
  },
  listBySender: async function (sender: string) {
    return await inviteDao.findBySender(sender);
  },
};
