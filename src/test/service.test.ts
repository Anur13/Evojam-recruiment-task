import mongoose from "mongoose";

import { inviteService } from "../service/invite-service";
import { Invite } from "../model/invite-model";
import { InviteStatusI } from "../common/iniviteStatus";

describe("invite service tests", () => {
  const user = { name: "Bob", email: "akrupskyi13@gmail.com" };
  const dbURL = process.env.MONGODB_URL;

  beforeAll(async () => {
    try {
      // @ts-ignore
      mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
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

  afterEach(async () => {});

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

    await inviteService.changeStatus(invite._id, InviteStatusI.rejected);
    invite = await Invite.findOne({ inviteeEmail: user.email });
    expect(invite.status).toEqual(InviteStatusI.rejected);
  });
});
