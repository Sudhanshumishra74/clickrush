import joi from 'joi';
import BaseDto from "../../../common/dto/base.dto.js";


class loginDto extends BaseDto {
    static schema = joi.object({
        email: joi.string().email().required().lowercase(),
        password: joi.string().min(8).required().message({ "string.min": "password must contain 8 characters minimum" }),
    })
}

export default loginDto;