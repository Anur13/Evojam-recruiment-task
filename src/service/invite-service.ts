import { inviteDao } from "../dao/invite-dao";
import { InviteI } from "../type/inviteI";
import envVars from "../bin/config";
import { inviteError } from "../error/inviteError";
import { InviteStatusI } from "../common/iniviteStatus";

export const inviteService = {
  create: async function(name: string, email: string): Promise<InviteI> {
    const invite: InviteI = {
      inviteeName: name,
      inviteeEmail: email,
      created: new Date(),
      createdBy: envVars.USER_EMAIL,
      status: InviteStatusI.notResolved,
    };
    const createdInvite = await inviteDao.create(invite);

    // await sendCreatedInvite(email, createdInvite._id);
    return createdInvite;
  },
  listAll: async function(): Promise<InviteI[]> {
    return await inviteDao.listAll();
  },
  changeStatus: async function(id: string, status: string): Promise<void> {
    const invite = await inviteDao.findInvite(id);
    if (!invite) throw inviteError.notFound("Invite was not found.");

    await inviteDao.changeStatus(invite,status);
    // await statusChangeNotification(invite.inviteeEmail, status);
  },
  listBySender: async function(sender: string): Promise<InviteI[]> {
    return await inviteDao.findBySender(sender);
  },
  listFiltered: async function( type:InviteStatusI): Promise<InviteI[]> {
    return await inviteDao.findFiltered(type);
  },
};
