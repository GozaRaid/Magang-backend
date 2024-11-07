import Joi from "joi";

const SchedulePayloadSchema = Joi.array().items(
  Joi.object({
    date: Joi.date().iso().required(),
    items: Joi.array()
      .items(
        Joi.object({
          timestart: Joi.string()
            .pattern(/^\d{2}:\d{2} (AM|PM)$/)
            .required(),
          timeend: Joi.string()
            .pattern(/^\d{2}:\d{2} (AM|PM)$/)
            .required(),
          title: Joi.string().required(),
          speakers: Joi.string(),
          parallelSession: Joi.string(),
        })
      )
      .required(),
  })
);

export { SchedulePayloadSchema };
