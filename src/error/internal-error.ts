import APIError from "./baseError";
import { errorStatusCodes } from "../common/error-codes";

const message = "Internal server error";
export const internalError = {
  inviteError: function () {
    return new APIError("Internal Error", errorStatusCodes.INTERNAL, message);
  },
};
