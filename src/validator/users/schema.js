import Joi from "joi";
import "dotenv/config";

const envKeyword = process.env.KEYWORD;

const UserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  keyword: Joi.string().required().valid(envKeyword).messages({
    "any.only": "The keyword is invalid",
  }),
});

export { UserPayloadSchema };
