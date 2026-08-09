import ApiError from "../utils/apiError.js";

const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

  
if(error){
    const errors = error.details.map(detail => detail.message);
    throw ApiError.badRequest(errors.join(', '))
}

    req.body = value;
    next();
    }
}
    export default validateMiddleware;