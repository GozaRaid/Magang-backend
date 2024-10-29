import Joi from "joi";

// const SpeakerSchema = Joi.object({
//   name: Joi.string().required(),
//   bio: Joi.string().required(),
// });

// const SpeakerPayloadSchema = Joi.alternatives().try(
//   SpeakerSchema,
//   Joi.array().items(SpeakerSchema)
// );

const SpeakerPayloadSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    bio: Joi.string().required(),
  })
);

const SpeakerCoverSchema = Joi.object({
  "content-type": Joi.string()
    .valid("image/jpeg", "image/png", "image/jpg")
    .required(),
}).unknown();

export { SpeakerCoverSchema, SpeakerPayloadSchema };
