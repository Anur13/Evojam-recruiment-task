import { Request, Response, NextFunction } from "express";
import { inviteValidation } from "../model/schema/invite-schema";
import { reqBodyValidationError } from "../error/validation-error";
import { inviteService } from "../service/invite-service";
import { inviteResponseError } from "../error/inviteResponseError";
import { InviteStatusI } from "../common/iniviteStatus";

export const inviteController = {
  listAll: async function (req: Request, res: Response, next: NextFunction) {
    const invites = await inviteService.listAll();
    res.status(200).send(invites);
  },

  create: async function (req: Request, res: Response, next: NextFunction) {
    const { value, error } = inviteValidation.create.validate(req.body);
    if (error) return next(reqBodyValidationError.inviteError(error.message));
    try {
      const invite = await inviteService.create(value.name, value.email);
      res.status(201).send(invite);
    } catch (e) {
      next(e);
    }
  },
  confirm: async function (req: Request, res: Response, next: NextFunction) {
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
  decline: async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if (!id)
      return next(inviteResponseError.statusChangeError("Invite id was not provided"));
    try {
      await inviteService.changeStatus(id.toString(), InviteStatusI.rejected);
      res.status(200).send("Your invitation was rejected");
    } catch (e) {
      next(e);
    }
  },
};
