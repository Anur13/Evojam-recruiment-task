import { NextFunction, Request, Response } from "express";
import { inviteValidation } from "../model/schema/invite-schema";
import { reqBodyValidationError } from "../error/validation-error";
import { inviteService } from "../service/invite-service";
import { inviteResponseError } from "../error/inviteResponseError";
import { InviteStatusI } from "../common/iniviteStatus";

export const inviteController = {
  create: async function(req: Request, res: Response, next: NextFunction) {
    const {
      value: { name, email },
      error,
    } = inviteValidation.create.validate(req.body);
    if (error) return next(reqBodyValidationError.inviteError(error.message));
    try {
      const invite = await inviteService.create(name, email);
      res.status(201).send(invite);
    } catch (e) {
      next(e);
    }
  },
  confirm: async function(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if (!id)
      return next(inviteResponseError.statusChangeError("Invite id was not provided"));
    try {
      await inviteService.changeStatus(id.toString(), InviteStatusI.confirmed);
      res.status(200).send("Your invitation was confirmed");
    } catch (e) {
      next(e);
    }
  },
  decline: async function(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if (!id)
      return next(inviteResponseError.statusChangeError("Invite id was not provided"));
    try {
      await inviteService.changeStatus(id.toString(), InviteStatusI.declined);
      res.status(200).send("Your invitation was declined");
    } catch (e) {
      next(e);
    }
  },
  list: async function(req: Request, res: Response, next: NextFunction) {
    const { type, sender } = req.query;
    let invites;
    switch (type) {
      case "confirmed":
        invites = await inviteService.listFiltered(InviteStatusI.confirmed);
        break;
      case "declined":
        invites = await inviteService.listFiltered(InviteStatusI.declined);
        break;
      case "by_sender":
        if (!sender) return next(inviteResponseError.missingSender());
        invites = await inviteService.listBySender(sender.toString());
        break;
      default:
        invites = await inviteService.listAll();
    }
    res.status(200).send(invites);
  },
};
