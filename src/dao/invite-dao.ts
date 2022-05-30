import { Invite } from "../model/invite-model";
import { InviteI } from "../type/inviteI";

export const inviteDao = {
  create: async function (invite: InviteI) {
    return Invite.create(invite);
  },
  listAll: async function () {
    return Invite.find();
  },
  changeStatus: async function (id: string, invite: InviteI) {
    return Invite.findOneAndUpdate({ _id: id }, invite, { new: true });
  },

  findInvite: async function (id: string) {
    return Invite.findOne({ _id: id });
  },
};
