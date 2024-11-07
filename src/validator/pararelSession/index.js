import { paralelSessionPayloadSchema } from "./schema.js";
import InvariantError from "../../exceptions/InvariantError.js";

const ParallelSessionValidator = {
  validateParalelSessionPayload: (payload) => {
    const validationResult = paralelSessionPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default ParallelSessionValidator;
