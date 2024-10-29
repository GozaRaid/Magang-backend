import Joi from "joi";

const HeroPayloadSchema = Joi.object({
  title: Joi.string().required(),
  city: Joi.string().required(),
});

const HeroCoverSchema = Joi.object({
  "content-type": Joi.string()
    .valid("image/jpeg", "image/png", "image/jpg", "image/gif")
    .required(),
}).unknown();

export { HeroCoverSchema, HeroPayloadSchema };
