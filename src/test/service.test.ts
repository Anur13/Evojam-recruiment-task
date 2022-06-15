import mongoose from "mongoose";

import { inviteService } from "../service/invite-service";
import { Invite } from "../model/invite-model";
import { InviteStatusI } from "../common/iniviteStatus";
import envVars from "../bin/config";

describe("invite service tests", () => {
  const user = { name: "Bob", email: "akrupskyi13@gmail.com" };

  beforeAll(async () => {
    try {
      await mongoose.connect(envVars.MONGODB_URL);
    } catch (e) {
      console.log(e);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Invite.deleteMany();
  });

  it("should create new Invite and save it to db. List all should return two", async () => {
    await inviteService.create(user.name, user.email);

    let createdInvites = await Invite.find({ inviteeEmail: user.email });
    expect(createdInvites.length).toEqual(1);

    await inviteService.create(user.name, user.email);
    createdInvites = await Invite.find({ inviteeEmail: user.email });
    expect(createdInvites.length).toEqual(2);

    const listedInvites = await inviteService.listAll();
    expect(listedInvites.length).toEqual(2);
  });

  it("should change status of created invite", async () => {
    await inviteService.create(user.name, user.email);

    let invite = await Invite.findOne({ inviteeEmail: user.email });

    await inviteService.changeStatus(invite._id, InviteStatusI.confirmed);
    invite = await Invite.findOne({ inviteeEmail: user.email });

    expect(invite.status).toEqual(InviteStatusI.confirmed);

    await inviteService.changeStatus(invite._id, InviteStatusI.declined);
    invite = await Invite.findOne({ inviteeEmail: user.email });
    expect(invite.status).toEqual(InviteStatusI.declined);
  });

  it("should return only confirmed, rejected or by user", async () => {
    let user = {
      inviteeName: "Bob",
      inviteeEmail: "something@gmail.com",
      created: new Date(),
      createdBy: "gava@gmail.com",
      status: "Confirmed",
    };
    await Invite.create(user);

    user = {
      inviteeName: "Bob",
      inviteeEmail: "something@gmail.com",
      created: new Date(),
      createdBy: "gava@gmail.com",
      status: "Rejected",
    };
    await Invite.create(user);

    user = {
      inviteeName: "Bob",
      inviteeEmail: "something@gmail.com",
      created: new Date(),
      createdBy: "mana@gmail.com",
      status: "Rejected",
    };
    await Invite.create(user);

    const confirmed = await inviteService.listConfirmed();

    expect(confirmed.length).toEqual(1);

    const rejected = await inviteService.listRejected();
    expect(rejected.length).toEqual(2);

    const listByMana = await inviteService.listBySender(user.createdBy);
    expect(listByMana.length).toEqual(1);
  });
});
