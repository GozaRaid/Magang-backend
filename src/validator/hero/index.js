import InvariantError from "../../exceptions/InvariantError.js";
import { HeroCoverSchema, HeroPayloadSchema } from "./schema.js";

const HeroValidator = {
  validateHeroPayload: (payload) => {
    const validationResult = HeroPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateHeroCover: (payload) => {
    const validationResult = HeroCoverSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default HeroValidator;
