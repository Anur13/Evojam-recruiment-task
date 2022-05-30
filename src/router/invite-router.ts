import express from "express";
import { constants } from "../common/constants";
import { inviteController } from "../controller/invite-controller";

const inviteRouter = express.Router();

inviteRouter.post(constants.routes.invite.create, inviteController.create);
inviteRouter.get(constants.routes.invite.list, inviteController.listAll);
inviteRouter.get(constants.routes.invite.confirm, inviteController.confirm);
inviteRouter.get(constants.routes.invite.decline, inviteController.decline);

//TODO: add list confirmed, list rejected, list not resolved
//TODO: add health check
export { inviteRouter };
