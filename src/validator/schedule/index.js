import { SchedulePayloadSchema } from "./schema.js";
import InvariantError from "../../exceptions/InvariantError.js";

const ScheduleValidator = {
  validateSchedulePayload: (payload) => {
    const validationResult = SchedulePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default ScheduleValidator;
