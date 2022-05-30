import mongoose, { Schema } from "mongoose";

const inviteSchema = new mongoose.Schema(
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

export const Invite = mongoose.model("Invite", inviteSchema);
