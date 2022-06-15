import { Invite, InviteModelI } from "../model/invite-model";
import { InviteI } from "../type/inviteI";
import { InviteStatusI } from "../common/iniviteStatus";

export const inviteDao = {
  create: async function(invite: InviteI) {
    return Invite.create(invite);
  },
  listAll: async function(): Promise<InviteI[]> {
    return Invite.find();
  },
  changeStatus: async function(invite: InviteModelI, status: string): Promise<void> {
    await invite.changeStatus(status);
  },
  findInvite: async function(id: string): Promise<InviteModelI | null> {
    return Invite.findOne({ _id: id });
  },
  findBySender: async function(createdBy: string): Promise<InviteI[]> {
    return Invite.find({ createdBy });
  },
  findFiltered: async function(type: InviteStatusI): Promise<InviteI[]> {
    return Invite.find({ status: type });
  },
};
