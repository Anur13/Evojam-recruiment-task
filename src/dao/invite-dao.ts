import { Invite } from "../model/invite-model";
import { InviteI } from "../type/inviteI";
import { InviteStatusI } from "../common/iniviteStatus";

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
  findConfirmed: async function () {
    return Invite.find({ status: InviteStatusI.confirmed });
  },
  findRejected: async function () {
    return Invite.find({ status: InviteStatusI.rejected });
  },
  findBySender: async function (createdBy: string) {
    return Invite.find({ createdBy });
  },
};
