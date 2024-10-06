import Joi from "joi";

const PostAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { PostAuthenticationPayloadSchema };
