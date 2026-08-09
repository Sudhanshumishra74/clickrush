import joi from 'joi';

class BaseDto {
    static schema = joi.object({})

    static validate(data) {
        const { error, value } = this.schema.validate(data, { 
              abortEarly: false, 
            stripUnknown: true,
        });
        if (error) {
            const errors = error.details.map(detail => detail.message);
            return { value: null, error: errors };
        }
        return {value, error: null};
    }
}

export default BaseDto;