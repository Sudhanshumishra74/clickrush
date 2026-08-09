import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
  static schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required(),

    email: Joi.string()
      .email()
      .required()
      .lowercase(),

    password: Joi.string()
      .min(8)
      .required()
      .messages({
        "string.min": "Password must contain 8 characters minimum",
      }),
  });
}

export default RegisterDto;