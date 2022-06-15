import mongoose, { Document, Schema, Model } from "mongoose";
import { InviteI } from "../type/inviteI";


export interface InviteModelI extends InviteI, Document {
  changeStatus(newStatus: string): void;
}

const inviteSchema = new Schema(
  {
    inviteeName: {
      type: String,
      required: true,
    },
    inviteeEmail: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

inviteSchema.methods.changeStatus = function(newStatus: string) {
  this.status = newStatus;
  this.save();
};

export const Invite: Model<InviteModelI> = mongoose.model<InviteModelI>("Invite", inviteSchema);
