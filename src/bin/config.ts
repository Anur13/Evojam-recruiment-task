import dotenv from "dotenv";
import Joi from "joi";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().positive(),
    USER_EMAIL: Joi.string().email().required(),
    USER_PASS: Joi.string().required(),
    EMAIL_SERVICE: Joi.string().required(),
    MONGODB_URL: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  PORT: envVars.PORT,
  USER_EMAIL: envVars.USER_EMAIL,
  USER_PASS: envVars.USER_PASS,
  EMAIL_SERVICE: envVars.EMAIL_SERVICE,
  MONGODB_URL: envVars.MONGODB_URL,
};
