import APIError from "./baseError";
import { errorStatusCodes } from "../common/error-codes";

export const inviteError = {
  notFound: function (message: string) {
    return new APIError("Invalid request", errorStatusCodes.NOT_FOUND, message);
  },
};
