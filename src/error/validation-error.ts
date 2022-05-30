import APIError from "./baseError";
import { errorStatusCodes } from "../common/error-codes";

export const reqBodyValidationError = {
  inviteError: function (message: string) {
    return new APIError("Invalid request", errorStatusCodes.BAD_REQUEST, message);
  },
};
