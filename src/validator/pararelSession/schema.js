import Joi from "joi";

const paperPayloadSchema = Joi.object({
  id: Joi.string(),
  paperId: Joi.string().required(),
  title: Joi.string().required(),
  authors: Joi.string().required(),
  mode: Joi.string().required(),
});

const paralelSessionPayloadSchema = Joi.array().items(
  Joi.object({
    id: Joi.string(),
    date: Joi.date().iso().required(),
    name: Joi.string().required(),
    papers: Joi.array().items(paperPayloadSchema).required(),
  })
);

export { paralelSessionPayloadSchema };
